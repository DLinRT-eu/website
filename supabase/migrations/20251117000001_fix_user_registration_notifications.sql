-- Fix user_registration_notifications RLS Policies
-- Date: 2025-11-17
-- Issue: Internal error when accessing user_registration_notifications table
-- Root Cause: Multiple conflicting policies from different migrations

-- ============================================================================
-- DIAGNOSIS
-- ============================================================================
-- The user_registration_notifications table has been modified by multiple migrations:
-- 1. 20251102040000 - Initial creation with basic policies
-- 2. 20251106120545 - Updated policies with is_admin_secure()
-- 3. 20251106122140 - Further policy modifications
-- Result: Conflicting or duplicate policies causing internal errors

-- ============================================================================
-- SOLUTION: Clean slate approach
-- ============================================================================

-- Step 1: Drop ALL existing policies
DO $$ 
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'user_registration_notifications'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_registration_notifications', pol.policyname);
    RAISE NOTICE 'Dropped policy: %', pol.policyname;
  END LOOP;
END $$;

-- Step 2: Verify is_admin_secure function exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
      AND p.proname = 'is_admin_secure'
  ) THEN
    -- Create the function if it doesn't exist
    CREATE FUNCTION public.is_admin_secure()
    RETURNS boolean
    LANGUAGE sql
    STABLE
    SECURITY DEFINER
    SET search_path = public
    AS $func$
      SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = auth.uid()
          AND role = 'admin'::app_role
      );
    $func$;
    
    RAISE NOTICE 'Created is_admin_secure function';
  END IF;
END $$;

-- Step 3: Create clean, simple policies

-- Admins can SELECT all notifications
CREATE POLICY "reg_notifications_select_admin"
ON public.user_registration_notifications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'admin'
  )
);

-- Admins can INSERT notifications
CREATE POLICY "reg_notifications_insert_admin"
ON public.user_registration_notifications
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'admin'
  )
);

-- Admins can UPDATE notifications
CREATE POLICY "reg_notifications_update_admin"
ON public.user_registration_notifications
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'admin'
  )
);

-- Admins can DELETE notifications
CREATE POLICY "reg_notifications_delete_admin"
ON public.user_registration_notifications
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'admin'
  )
);

-- Service role can do everything (for triggers and functions)
CREATE POLICY "reg_notifications_service_role"
ON public.user_registration_notifications
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'service_role'
)
WITH CHECK (
  auth.jwt()->>'role' = 'service_role'
);

-- Step 4: Ensure RLS is enabled
ALTER TABLE public.user_registration_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_registration_notifications FORCE ROW LEVEL SECURITY;

-- Step 5: Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_registration_notifications TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Step 6: Add helpful comments
COMMENT ON TABLE public.user_registration_notifications IS 
'Tracks registration notifications sent to admins for user verification. Admins can view all, service role can manage via triggers.';

COMMENT ON POLICY "reg_notifications_select_admin" ON public.user_registration_notifications IS
'Admins can view all registration notifications';

COMMENT ON POLICY "reg_notifications_update_admin" ON public.user_registration_notifications IS
'Admins can update notifications (mark as verified, etc.)';

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Run these queries to verify the fix:

-- Check all policies on the table
-- SELECT policyname, cmd, qual::text, with_check::text
-- FROM pg_policies
-- WHERE tablename = 'user_registration_notifications';

-- Test as admin user (should work):
-- SELECT * FROM user_registration_notifications LIMIT 5;

-- Test as non-admin (should return no results):
-- SELECT * FROM user_registration_notifications LIMIT 5;

-- ============================================================================
-- NOTES
-- ============================================================================
-- This migration uses inline EXISTS checks instead of is_admin_secure() 
-- to avoid potential function dependency issues.
-- The service_role policy is kept for triggers that insert notifications.
