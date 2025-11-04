-- Fix permission issues with is_admin() function and role assignment

-- Grant execute permission on is_admin() to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) TO authenticated;

-- Recreate the INSERT policy for user_roles to ensure it works correctly
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  -- Check if the current user is an admin using the security definer function
  public.is_admin()
);

-- Add a comment to document this
COMMENT ON POLICY "Admins can insert roles" ON public.user_roles IS 
'Allows users with admin role to grant roles to other users. Uses is_admin() security definer function to bypass RLS recursion.';