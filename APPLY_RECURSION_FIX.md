# Fix Infinite Recursion in user_roles Policies

## Problem
The user_roles table has infinite recursion because the admin policies try to check if a user is admin by querying the same table they're protecting. This creates a circular dependency:

1. User tries to query user_roles
2. Policy checks if user is admin by querying user_roles
3. That query triggers the policy again (infinite loop)

## Solution
Created a `SECURITY DEFINER` function called `is_admin()` that bypasses RLS when checking admin status. This breaks the recursion cycle.

## Steps to Apply

1. **Open Supabase Dashboard**
   - Go to your project at https://supabase.com
   - Navigate to: SQL Editor

2. **Apply the Migration**
   - Copy all contents from: `supabase/migrations/20251102023000_fix_user_roles_recursion.sql`
   - Paste into SQL Editor
   - Click "Run" or press Ctrl+Enter

3. **Verify the Fix**
   - The migration will:
     - Drop all existing user_roles policies
     - Create `is_admin()` security definer function
     - Recreate policies using this function
     - Add service_role policy for backend operations

4. **Test**
   - Refresh your browser at http://localhost:8080/profile
   - The infinite recursion error should be gone
   - Profile should load normally

## What Changed

### Before (Causes Recursion):
```sql
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur  -- ❌ Queries same table
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );
```

### After (No Recursion):
```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER  -- ✅ Bypasses RLS
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT 
  USING (public.is_admin());  -- ✅ Uses function that bypasses RLS
```

## Technical Details

**SECURITY DEFINER** means the function runs with the privileges of the function owner (who created it), not the user calling it. Since the function owner typically has superuser/admin access in Supabase, the function can query user_roles without triggering RLS policies, breaking the recursion cycle.

## Need Help?

If you encounter errors:
1. Check the SQL Editor output for specific error messages
2. Verify you're connected to the correct project
3. Ensure you have admin access in Supabase dashboard
