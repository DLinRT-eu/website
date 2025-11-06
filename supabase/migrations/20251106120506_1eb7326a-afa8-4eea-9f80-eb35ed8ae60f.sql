-- Phase 1: Create Centralized Security Functions
-- These SECURITY DEFINER functions bypass RLS to prevent circular dependencies

-- Enhanced admin check with better error handling
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
  );
$$;

-- Check if user can manage reviews (admin or reviewer)
CREATE OR REPLACE FUNCTION public.can_manage_reviews(user_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param
      AND role IN ('admin'::app_role, 'reviewer'::app_role)
  );
$$;

-- Check if user can view security data (admins only)
CREATE OR REPLACE FUNCTION public.can_view_security_data(user_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param
      AND role = 'admin'::app_role
  );
$$;

-- Get user's highest role safely
CREATE OR REPLACE FUNCTION public.get_user_role_secure(user_id_param uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = user_id_param
  ORDER BY 
    CASE 
      WHEN role = 'admin'::app_role THEN 1
      WHEN role = 'reviewer'::app_role THEN 2
      WHEN role = 'company'::app_role THEN 3
      ELSE 4
    END
  LIMIT 1;
$$;

-- Admin health check for diagnostics
CREATE OR REPLACE FUNCTION public.admin_health_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  user_id_val uuid;
BEGIN
  user_id_val := auth.uid();
  
  SELECT jsonb_build_object(
    'auth_uid', user_id_val,
    'has_admin_role', public.is_admin_secure(),
    'can_manage_reviews', public.can_manage_reviews(user_id_val),
    'can_view_security', public.can_view_security_data(user_id_val),
    'user_roles', (
      SELECT jsonb_agg(role)
      FROM user_roles
      WHERE user_id = user_id_val
    ),
    'timestamp', now()
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_admin_secure() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_reviews(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_view_security_data(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role_secure(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_health_check() TO authenticated;