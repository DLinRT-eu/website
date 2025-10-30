-- Fix RLS policy for user_roles to prevent session establishment issues
-- This policy allows users to view their own roles even during initial session establishment

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a more robust policy that works during session establishment
CREATE POLICY "Users can always view own roles" ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
);

-- Grant explicit select permission to authenticated users
GRANT SELECT ON public.user_roles TO authenticated;

-- Add comment for documentation
COMMENT ON POLICY "Users can always view own roles" ON public.user_roles IS 
'Allows authenticated users to view their own roles. This policy is designed to work reliably during session establishment.';