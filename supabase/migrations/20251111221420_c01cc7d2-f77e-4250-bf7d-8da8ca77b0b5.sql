-- Phase 4: Company Certification Validation & Security
-- This migration adds validation functions, triggers, and security policies

-- Function to check if user can represent a company
CREATE OR REPLACE FUNCTION public.can_represent_company(
  p_user_id uuid,
  p_company_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- User must have company role
  IF NOT has_role(p_user_id, 'company'::app_role) THEN
    RETURN FALSE;
  END IF;
  
  -- User must be verified representative of this company
  RETURN EXISTS (
    SELECT 1 FROM company_representatives
    WHERE user_id = p_user_id
      AND company_id = p_company_id
      AND verified = true
  );
END;
$$;

-- Trigger function to enforce max 3 representatives per company
CREATE OR REPLACE FUNCTION public.check_company_rep_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  active_count integer;
BEGIN
  IF NEW.verified = true THEN
    SELECT COUNT(*) INTO active_count
    FROM company_representatives
    WHERE company_id = NEW.company_id
      AND verified = true
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);
    
    IF active_count >= 3 THEN
      RAISE EXCEPTION 'Company already has maximum of 3 verified representatives';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce company representative limit
DROP TRIGGER IF EXISTS enforce_company_rep_limit ON company_representatives;
CREATE TRIGGER enforce_company_rep_limit
  BEFORE INSERT OR UPDATE ON company_representatives
  FOR EACH ROW
  EXECUTE FUNCTION check_company_rep_limit();

-- Update RLS policy for company_product_verifications INSERT
DROP POLICY IF EXISTS "Company reps can certify own products" ON company_product_verifications;
CREATE POLICY "Company reps can certify own products"
ON company_product_verifications
FOR INSERT
TO authenticated
WITH CHECK (
  can_represent_company(auth.uid(), company_id)
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_company_reps_user_company 
  ON company_representatives(user_id, company_id, verified);

CREATE INDEX IF NOT EXISTS idx_company_product_verifications_lookup 
  ON company_product_verifications(product_id, company_id, verified_at DESC);

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.can_represent_company(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_company_rep_limit() TO authenticated;

COMMENT ON FUNCTION public.can_represent_company IS 'Checks if a user is a verified representative of a specific company';
COMMENT ON FUNCTION public.check_company_rep_limit IS 'Enforces maximum of 3 verified representatives per company';