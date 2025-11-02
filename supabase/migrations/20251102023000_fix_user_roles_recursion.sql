-- Fix infinite recursion in user_roles RLS policies
-- The problem: Admin policies query user_roles to check if user is admin,
-- but that query itself triggers the policies, causing infinite recursion.
-- Solution: Create a security definer function that bypasses RLS to check admin status.

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

-- Create a security definer function that bypasses RLS to check if user is admin
-- This function runs with the privileges of the function owner (which has superuser access)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user has admin role by querying user_roles directly
  -- SECURITY DEFINER means this query bypasses RLS policies
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Now create policies that use this function
-- Users can always view their own roles (no recursion here)
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all roles (using is_admin() which bypasses RLS)
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT 
  TO authenticated
  USING (public.is_admin());

-- Admins can insert roles
CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT 
  TO authenticated
  WITH CHECK (public.is_admin());

-- Admins can update roles
CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE 
  TO authenticated
  USING (public.is_admin());

-- Admins can delete roles
CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE 
  TO authenticated
  USING (public.is_admin());

-- Service role can do everything (for backend operations)
CREATE POLICY "Service role full access" ON public.user_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON FUNCTION public.is_admin() IS 'Security definer function to check admin status without triggering RLS recursion';
COMMENT ON TABLE public.user_roles IS 'User roles table with RLS policies that avoid infinite recursion using security definer function';
