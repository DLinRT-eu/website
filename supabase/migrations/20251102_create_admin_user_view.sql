-- Create a view for admins to easily fetch all users with their roles
-- This view uses SECURITY DEFINER to bypass RLS policies

-- First, create a function that returns users with roles (SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_users_with_roles()
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  institution TEXT,
  created_at TIMESTAMPTZ,
  roles TEXT[]
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.email,
    p.first_name,
    p.last_name,
    p.institution,
    p.created_at,
    COALESCE(
      ARRAY_AGG(ur.role::TEXT) FILTER (WHERE ur.role IS NOT NULL),
      ARRAY[]::TEXT[]
    ) as roles
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON ur.user_id = p.id
  GROUP BY p.id, p.email, p.first_name, p.last_name, p.institution, p.created_at
  ORDER BY p.created_at DESC;
$$;

-- Grant execute permission only to authenticated users (will be further restricted by checking admin role)
GRANT EXECUTE ON FUNCTION public.get_users_with_roles() TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.get_users_with_roles() IS 
  'Returns all users with their roles. Uses SECURITY DEFINER to bypass RLS. Should only be called by admin users.';

-- Create a safer wrapper function that checks if user is admin before returning data
CREATE OR REPLACE FUNCTION public.get_users_with_roles_admin_only()
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  institution TEXT,
  created_at TIMESTAMPTZ,
  roles TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Return the data
  RETURN QUERY
  SELECT * FROM public.get_users_with_roles();
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_users_with_roles_admin_only() TO authenticated;

COMMENT ON FUNCTION public.get_users_with_roles_admin_only() IS 
  'Admin-only function to get all users with roles. Checks admin permission before returning data.';
