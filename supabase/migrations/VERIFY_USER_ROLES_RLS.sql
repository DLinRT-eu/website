-- Verify and fix RLS policies for user_roles table
-- Run this in Supabase SQL Editor if role assignment permission issues occur

-- Step 1: Check current policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'user_roles'
ORDER BY policyname;

-- Step 2: Check if is_admin() function exists and works
SELECT public.is_admin();

-- Step 3: Test if current user can insert into user_roles
-- Replace 'test-user-id' with an actual user ID
DO $$
DECLARE
  test_user_id UUID := 'test-user-id'; -- Replace with actual user ID
  test_granted_by UUID := auth.uid();
BEGIN
  -- Try to insert a test role (will be rolled back)
  INSERT INTO public.user_roles (user_id, role, granted_by)
  VALUES (test_user_id, 'reviewer', test_granted_by);
  
  RAISE NOTICE 'Insert successful - permissions are working';
  
  -- Clean up test data
  DELETE FROM public.user_roles 
  WHERE user_id = test_user_id AND role = 'reviewer' AND granted_by = test_granted_by;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Insert failed with error: %', SQLERRM;
END;
$$;

-- Step 4: If policies are missing or broken, recreate them
-- First, drop all existing policies on user_roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Service role full access" ON public.user_roles;
DROP POLICY IF EXISTS "Users can always view own roles" ON public.user_roles;

-- Recreate is_admin() function if needed
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Create the correct policies
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT 
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT 
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE 
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE 
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Service role full access" ON public.user_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 5: Verify policies were created
SELECT 
  policyname,
  cmd,
  qual IS NOT NULL as has_using,
  with_check IS NOT NULL as has_with_check
FROM pg_policies
WHERE tablename = 'user_roles'
ORDER BY policyname;

-- Step 6: Check granted_by column constraints
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_roles'
ORDER BY ordinal_position;

COMMENT ON FUNCTION public.is_admin() IS 'Security definer function to check admin status without triggering RLS recursion';
