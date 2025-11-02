-- Migration: Add role compatibility constraints
-- Prevents users from having incompatible roles and product adoptions

-- 1. Function to check if user has company role before allowing product adoption
CREATE OR REPLACE FUNCTION public.check_company_role_before_product_adoption()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user has company role
  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Users with Company Representative role cannot adopt products (conflict of interest)';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 2. Function to check if user has products before allowing company role
CREATE OR REPLACE FUNCTION public.check_products_before_company_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only check for company role
  IF NEW.role = 'company' THEN
    -- Check if user has any product adoptions
    IF EXISTS (
      SELECT 1 FROM public.user_products
      WHERE user_id = NEW.user_id
      LIMIT 1
    ) THEN
      RAISE EXCEPTION 'Users with product adoptions cannot be assigned Company Representative role (conflict of interest)';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 3. Function to check role compatibility (company vs reviewer)
CREATE OR REPLACE FUNCTION public.check_role_compatibility()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if trying to add company role when user has reviewer role
  IF NEW.role = 'company' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'reviewer'
  ) THEN
    RAISE EXCEPTION 'Company Representative role is incompatible with Reviewer role';
  END IF;
  
  -- Check if trying to add reviewer role when user has company role
  IF NEW.role = 'reviewer' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Reviewer role is incompatible with Company Representative role';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 4. Apply triggers to user_products table
DROP TRIGGER IF EXISTS trigger_check_company_role_on_product_adoption ON public.user_products;
CREATE TRIGGER trigger_check_company_role_on_product_adoption
  BEFORE INSERT ON public.user_products
  FOR EACH ROW
  EXECUTE FUNCTION public.check_company_role_before_product_adoption();

-- 5. Apply triggers to user_roles table
DROP TRIGGER IF EXISTS trigger_check_products_on_company_role ON public.user_roles;
CREATE TRIGGER trigger_check_products_on_company_role
  BEFORE INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_products_before_company_role();

DROP TRIGGER IF EXISTS trigger_check_role_compatibility ON public.user_roles;
CREATE TRIGGER trigger_check_role_compatibility
  BEFORE INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_role_compatibility();

-- 6. Add helpful comments
COMMENT ON FUNCTION public.check_company_role_before_product_adoption IS 
  'Prevents users with Company Representative role from adopting products to avoid conflict of interest';

COMMENT ON FUNCTION public.check_products_before_company_role IS 
  'Prevents assigning Company Representative role to users who have already adopted products';

COMMENT ON FUNCTION public.check_role_compatibility IS 
  'Ensures Company Representative and Reviewer roles are mutually exclusive';

-- 7. Create a helper function to check if a user can adopt a product
CREATE OR REPLACE FUNCTION public.can_user_adopt_product(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- User cannot adopt products if they have company role
  RETURN NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
    AND role = 'company'
  );
END;
$$;

-- 8. Create a helper function to check if a user can be assigned company role
CREATE OR REPLACE FUNCTION public.can_assign_company_role(p_user_id UUID)
RETURNS TABLE(can_assign BOOLEAN, reason TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  has_products BOOLEAN;
  has_reviewer_role BOOLEAN;
BEGIN
  -- Check for products
  SELECT EXISTS (
    SELECT 1 FROM public.user_products
    WHERE user_id = p_user_id
    LIMIT 1
  ) INTO has_products;
  
  IF has_products THEN
    RETURN QUERY SELECT FALSE, 'User has product adoptions'::TEXT;
    RETURN;
  END IF;
  
  -- Check for reviewer role
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
    AND role = 'reviewer'
  ) INTO has_reviewer_role;
  
  IF has_reviewer_role THEN
    RETURN QUERY SELECT FALSE, 'User has Reviewer role'::TEXT;
    RETURN;
  END IF;
  
  RETURN QUERY SELECT TRUE, 'OK'::TEXT;
END;
$$;

GRANT EXECUTE ON FUNCTION public.can_user_adopt_product TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_assign_company_role TO authenticated;

COMMENT ON FUNCTION public.can_user_adopt_product IS 
  'Helper function to check if a user is allowed to adopt products';

COMMENT ON FUNCTION public.can_assign_company_role IS 
  'Helper function to check if company role can be assigned to a user and why not if it cannot';
