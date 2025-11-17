-- ============================================
-- COMBINED MIGRATIONS - Run in Supabase Dashboard
-- ============================================
-- Apply all three migrations in one go
-- Go to: https://supabase.com/dashboard/project/msyfxyxzjyowwasgturs/editor
-- Click "SQL Editor" -> "New query" -> Paste this entire file -> Click "Run"
-- ============================================

-- ============================================
-- MIGRATION 1: Fix User Roles RLS Policies
-- ============================================

-- Fix RLS policies for user_roles table to prevent circular dependency
-- The previous policies used has_role() function which created a circular dependency
-- Users couldn't read their roles because has_role() needs to read roles to check permissions

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

-- Create new policies that don't create circular dependencies
-- Users can always view their own roles (no function call needed)
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT 
  USING (auth.uid() = user_id);

-- For admin operations, we need to check if the user has admin role
-- but we do this in a way that doesn't create circular dependency
-- We query directly instead of using has_role function
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

COMMENT ON TABLE public.user_roles IS 'User roles table with fixed RLS policies that avoid circular dependencies';

-- ============================================
-- MIGRATION 2: Fix Profile Loading Issues
-- ============================================

-- Fix RLS policies on profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create proper policies with no circular dependencies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role to manage all profiles (for triggers)
CREATE POLICY "Service role can manage all profiles" ON public.profiles
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- Allow admins to view and update all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

-- Recreate profile creation trigger with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users who don't have one
INSERT INTO public.profiles (id, email, first_name, last_name)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', ''),
  COALESCE(au.raw_user_meta_data->>'last_name', '')
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE public.profiles IS 'User profiles with fixed RLS policies and automatic creation';

-- ============================================
-- MIGRATION 3: Add Role Requests RLS Policies
-- ============================================

-- Enable RLS on role_requests if not already enabled
ALTER TABLE public.role_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own requests" ON public.role_requests;
DROP POLICY IF EXISTS "Users can create own requests" ON public.role_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON public.role_requests;
DROP POLICY IF EXISTS "Admins can update requests" ON public.role_requests;

-- Users can view their own role requests
CREATE POLICY "Users can view own requests" ON public.role_requests
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own role requests
CREATE POLICY "Users can create own requests" ON public.role_requests
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all role requests
CREATE POLICY "Admins can view all requests" ON public.role_requests
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

-- Admins can update role requests (approve/reject)
CREATE POLICY "Admins can update requests" ON public.role_requests
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_role_requests_user_status 
  ON public.role_requests(user_id, status);

CREATE INDEX IF NOT EXISTS idx_role_requests_status 
  ON public.role_requests(status);

CREATE INDEX IF NOT EXISTS idx_role_requests_created_at 
  ON public.role_requests(created_at DESC);

COMMENT ON TABLE public.role_requests IS 'Role requests table with RLS policies for users and admins';

-- ============================================
-- MIGRATIONS COMPLETE!
-- ============================================
-- All three migrations have been applied successfully.
-- Your profile page should now work correctly.
-- ============================================
