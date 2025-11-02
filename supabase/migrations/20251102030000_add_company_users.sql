-- Migration: Add company_users table to link users to companies
-- Purpose: Allow multiple users (max 3) to represent a single company
-- Created: 2025-11-02

-- 1. Create company_users table
CREATE TABLE IF NOT EXISTS public.company_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL, -- Company name from product data (e.g., "MVision AI", "Oncosoft")
  assigned_by UUID REFERENCES auth.users(id), -- Admin who assigned this user
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT, -- Optional notes about the assignment
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure a user can only be assigned to one company
  UNIQUE(user_id),
  
  -- Check constraint: max 3 active users per company
  CONSTRAINT check_max_users_per_company CHECK (
    (SELECT COUNT(*) 
     FROM public.company_users 
     WHERE company_name = company_users.company_name 
     AND is_active = TRUE
    ) <= 3
  )
);

-- 2. Enable RLS on company_users
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for company_users

-- Policy: Users can view their own company assignment
CREATE POLICY "Users can view own company assignment" ON public.company_users
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Admins can view all company assignments
CREATE POLICY "Admins can view all company assignments" ON public.company_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can insert company assignments
CREATE POLICY "Admins can create company assignments" ON public.company_users
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update company assignments
CREATE POLICY "Admins can update company assignments" ON public.company_users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can delete company assignments
CREATE POLICY "Admins can delete company assignments" ON public.company_users
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_company_users_user_id ON public.company_users(user_id);
CREATE INDEX IF NOT EXISTS idx_company_users_company_name ON public.company_users(company_name);
CREATE INDEX IF NOT EXISTS idx_company_users_is_active ON public.company_users(is_active);

-- 5. Create function to get company name for a user
CREATE OR REPLACE FUNCTION public.get_user_company(p_user_id UUID)
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_name
  FROM public.company_users
  WHERE user_id = p_user_id AND is_active = TRUE
  LIMIT 1;
$$;

-- 6. Create function to check if user can manage a product
CREATE OR REPLACE FUNCTION public.can_manage_product(p_user_id UUID, p_company_name TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.company_users
    WHERE user_id = p_user_id 
    AND company_name = p_company_name
    AND is_active = TRUE
  );
$$;

-- 7. Update company_revisions table to link to company_users
-- Add company verification through company_users
ALTER TABLE public.company_revisions
ADD COLUMN IF NOT EXISTS company_user_id UUID REFERENCES public.company_users(id);

-- 8. Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_company_users_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_company_users_updated_at
  BEFORE UPDATE ON public.company_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_company_users_updated_at();

-- 9. Create function to enforce max 3 users per company
CREATE OR REPLACE FUNCTION public.check_company_user_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  active_count INTEGER;
BEGIN
  -- Only check if the user is being set to active
  IF NEW.is_active = TRUE THEN
    SELECT COUNT(*)
    INTO active_count
    FROM public.company_users
    WHERE company_name = NEW.company_name
    AND is_active = TRUE
    AND id != NEW.id; -- Exclude current record if updating
    
    IF active_count >= 3 THEN
      RAISE EXCEPTION 'Company % already has 3 active users. Please deactivate one before adding another.', NEW.company_name;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_check_company_user_limit
  BEFORE INSERT OR UPDATE ON public.company_users
  FOR EACH ROW
  EXECUTE FUNCTION public.check_company_user_limit();

-- 10. Comment on table and columns
COMMENT ON TABLE public.company_users IS 'Links users to companies for product management. Max 3 active users per company.';
COMMENT ON COLUMN public.company_users.company_name IS 'Must match the company field in product data files';
COMMENT ON COLUMN public.company_users.is_active IS 'Only active users can certify products. Max 3 active per company.';
COMMENT ON COLUMN public.company_users.assigned_by IS 'Admin user who assigned this company access';
