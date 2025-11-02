# User Management Permission Fix

## Problem
The user management page was experiencing permission errors when trying to fetch user roles from the `user_roles` table. This was caused by:

1. **Multiple individual queries**: The old implementation made separate queries for each user's roles, which was inefficient and could hit RLS policy limits
2. **RLS policy restrictions**: The Row Level Security policies might block bulk queries on `user_roles` table

## Solution

### 1. Optimized Data Fetching
Changed from N+1 queries (one per user) to a single bulk fetch:
- Fetch all profiles once
- Fetch all roles once  
- Combine them in memory using a Map for O(1) lookup

### 2. Database Function (Optional Enhancement)
Created a new database function `get_users_with_roles_admin_only()` that:
- Uses `SECURITY DEFINER` to bypass RLS policies
- Checks if the user is an admin before returning data
- Returns all users with their roles in a single query
- Is more efficient (single JOIN query vs multiple queries)

### 3. Fallback Strategy
The code now:
1. First tries to use the optimized database function
2. Falls back to manual fetching if the function doesn't exist
3. Shows detailed error messages for debugging

## How to Apply

### Option 1: Apply Database Migration (Recommended)
Run this migration in Supabase SQL Editor:

```bash
# The migration file is located at:
supabase/migrations/20251102_create_admin_user_view.sql
```

Or copy the SQL content and run it directly in Supabase Dashboard → SQL Editor.

### Option 2: Use Without Migration
The code works without the migration using the fallback method. The migration just makes it more efficient.

## Testing

1. **Login as admin**
2. **Navigate to** `/admin/users`
3. **Check browser console** for any errors
4. **Verify** that all users and their roles are displayed
5. **Test role assignment** - try adding/removing roles

## Error Messages

The new implementation provides detailed error messages:
- "Failed to fetch users: [specific error]"
- "Failed to fetch roles: [specific error]" 
- "Unexpected error: [details]"

Check the browser console for full error details including:
- Error message
- Error code
- Stack trace

## Files Changed

### 1. `src/pages/admin/UserManagement.tsx`
- Added `UserWithRolesFromDB` interface
- Optimized `fetchUsers()` to fetch all roles at once
- Added RPC function call with fallback
- Enhanced error handling and logging
- Maintained all existing features (search, filter, sort)

### 2. `supabase/migrations/20251102_create_admin_user_view.sql` (NEW)
- Created `get_users_with_roles()` function
- Created `get_users_with_roles_admin_only()` wrapper with admin check
- Both use `SECURITY DEFINER` to bypass RLS

## Performance Improvements

### Before:
- 1 query for profiles
- N queries for roles (one per user)
- Total: N+1 queries

### After:
- **With migration**: 1 query (RPC function with JOIN)
- **Without migration**: 2 queries (profiles + all roles)
- Total: 1-2 queries

## Security Notes

- The `get_users_with_roles_admin_only()` function checks admin status before returning data
- `SECURITY DEFINER` is safe here because we verify the user is an admin
- RLS policies are still active on insert/update/delete operations
- Only read operations use the optimized function

## Troubleshooting

### If you still see permission errors:

1. **Check admin role assignment**:
```sql
SELECT * FROM user_roles WHERE user_id = auth.uid() AND role = 'admin';
```

2. **Check RLS policies**:
```sql
SELECT * FROM pg_policies WHERE tablename = 'user_roles';
```

3. **Verify is_admin() function works**:
```sql
SELECT is_admin();
```

4. **Check browser console** for detailed error messages

5. **Run the verification script**:
```bash
supabase/migrations/VERIFY_USER_ROLES_RLS.sql
```

## Next Steps

If issues persist:
1. Share the exact error message from browser console
2. Check Supabase logs for RLS policy violations
3. Verify your user has admin role in the database
4. Consider running the `VERIFY_USER_ROLES_RLS.sql` script to reset policies
