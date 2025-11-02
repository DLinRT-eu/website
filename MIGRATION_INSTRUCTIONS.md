# Profile Loading Fix - Migration Instructions

## Issue Fixed
Users were unable to access their profile page after logging in due to:
1. Missing or inaccessible profiles in the database
2. Circular dependency in RLS policies
3. No error handling or profile creation fallback

## Migrations to Apply

You need to apply 3 SQL migrations in the Supabase Dashboard:

### Migration 1: Fix User Roles RLS (from earlier)
**File**: `20251102002517_fix_user_roles_rls.sql`

### Migration 2: Fix Profile Loading
**File**: `20251102021126_fix_profile_loading.sql`

### Migration 3: Add Role Requests RLS  
**File**: `20251102021400_add_role_requests_rls.sql`

## How to Apply

1. **Go to Supabase Dashboard**  
   https://supabase.com/dashboard/project/msyfxyxzjyowwasgturs/editor

2. **Open SQL Editor**  
   Click "SQL Editor" in the left sidebar

3. **Apply Each Migration**  
   - Click "New query"
   - Copy the content from each migration file
   - Click "Run" (or press Ctrl+Enter)
   - Wait for success message
   - Repeat for all 3 migrations

## Verification Steps

After applying all migrations:

1. **Test Profile Loading**
   - Login with an existing account
   - Navigate to `/profile`
   - Profile should load without errors
   - If profile doesn't exist, it will be auto-created

2. **Test Error Handling**
   - Check that error messages are clear
   - Retry button should work if errors occur

3. **Test Role Requests**
   - Users can view their own role requests
   - Users can create new role requests
   - No duplicate requests are allowed
   - Admins can see all requests at `/admin/role-requests`

## Code Changes Applied

✅ **AuthContext.tsx** - Added `refreshProfile` function  
✅ **Profile.tsx** - Added robust error handling and auto-creation  
✅ **3 SQL Migrations** - Fixed RLS policies and added indexes  

## What This Fixes

- ✅ Profile page no longer gets stuck loading
- ✅ Profiles are auto-created if missing
- ✅ Clear error messages with retry functionality
- ✅ Proper RLS policies with no circular dependencies
- ✅ Role requests system is fully functional
- ✅ Performance indexes for faster queries

## Testing Checklist

- [ ] Existing user can login and access profile
- [ ] New user registration creates profile automatically
- [ ] Profile page shows clear loading states
- [ ] Error states show helpful messages with retry
- [ ] Role requests can be created
- [ ] Admin can view/approve role requests
- [ ] No console errors appear

## Rollback (if needed)

If you need to rollback, you can drop the policies:
\`\`\`sql
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own requests" ON public.role_requests;
-- etc...
\`\`\`

Then reapply the original policies from your backup.
