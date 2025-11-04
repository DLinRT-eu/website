-- Fix audit log RLS policy to use is_admin() function
-- This prevents RLS recursion issues

-- Drop the existing policy that causes recursion
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.admin_audit_log;

-- Create new policy using is_admin() function which has SECURITY DEFINER
CREATE POLICY "Admins can view audit logs"
  ON public.admin_audit_log
  FOR SELECT
  TO authenticated
  USING (public.is_admin());