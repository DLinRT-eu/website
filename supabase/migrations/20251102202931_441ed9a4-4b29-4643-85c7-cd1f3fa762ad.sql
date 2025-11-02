-- Grant admin users company oversight privileges
-- This allows admins to access company features and oversee all companies

-- First add unique constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'company_representatives_user_id_company_name_key'
  ) THEN
    ALTER TABLE company_representatives 
    ADD CONSTRAINT company_representatives_user_id_company_name_key 
    UNIQUE (user_id, company_name);
  END IF;
END $$;

-- Function to grant admin users company oversight privileges
CREATE OR REPLACE FUNCTION grant_admin_company_oversight()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When admin role is granted, also create a company representative entry
  -- with special "ADMIN_OVERSIGHT" designation
  IF NEW.role = 'admin' THEN
    INSERT INTO company_representatives (
      user_id,
      company_name,
      company_id,
      position,
      verified,
      verified_by,
      verified_at
    )
    VALUES (
      NEW.user_id,
      'ADMIN_OVERSIGHT',
      'admin_all_companies',
      'System Administrator',
      true,
      NEW.granted_by,
      NOW()
    )
    ON CONFLICT (user_id, company_name) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-grant company oversight to admins
DROP TRIGGER IF EXISTS admin_company_oversight_trigger ON user_roles;
CREATE TRIGGER admin_company_oversight_trigger
  AFTER INSERT ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION grant_admin_company_oversight();

-- Backfill existing admins
INSERT INTO company_representatives (user_id, company_name, company_id, position, verified, verified_by, verified_at)
SELECT 
  ur.user_id,
  'ADMIN_OVERSIGHT',
  'admin_all_companies',
  'System Administrator',
  true,
  ur.granted_by,
  NOW()
FROM user_roles ur
WHERE ur.role = 'admin'
ON CONFLICT (user_id, company_name) DO NOTHING;

-- Update RLS policies to allow admins full access to company features

-- Allow admins to view ALL company representatives (in addition to existing policies)
DROP POLICY IF EXISTS "Admins can view all company reps v2" ON company_representatives;
CREATE POLICY "Admins can view all company reps v2"
ON company_representatives FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to manage ALL company revisions (in addition to existing policies)
DROP POLICY IF EXISTS "Admins can manage all revisions" ON company_revisions;
CREATE POLICY "Admins can manage all revisions"
ON company_revisions FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to manage ALL product verifications (in addition to existing policies)
DROP POLICY IF EXISTS "Admins can manage verifications" ON company_product_verifications;
CREATE POLICY "Admins can manage verifications"
ON company_product_verifications FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));