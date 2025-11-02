# Assigning Admin Role - Quick Guide

If you're unable to access admin pages (like `/admin/users`, `/admin/reviews`, `/admin/security`), it means your account doesn't have the admin role assigned yet.

## Problem
When you try to access admin URLs like:
- `https://dlinrt.eu/admin/users`
- `https://dlinrt.eu/admin/reviews`
- `https://dlinrt.eu/admin/security`
- `https://dlinrt.eu/admin/user-products`

You see an "Access Denied" message that says you need the `admin` role.

## Solution

### Option 1: Assign Admin Role via Supabase Dashboard (Recommended)

1. **Log into Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your DLinRT project

2. **Open SQL Editor**
   - Navigate to "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run this SQL to assign admin role:**
   ```sql
   -- Replace 'your-email@example.com' with your actual email
   INSERT INTO public.user_roles (user_id, role, granted_by)
   SELECT 
     id as user_id,
     'admin' as role,
     id as granted_by
   FROM auth.users
   WHERE email = 'your-email@example.com'
   ON CONFLICT (user_id, role) DO NOTHING;
   ```

4. **Verify the role was added:**
   ```sql
   -- Check your roles
   SELECT ur.role, u.email, ur.created_at
   FROM public.user_roles ur
   JOIN auth.users u ON u.id = ur.user_id
   WHERE u.email = 'your-email@example.com';
   ```

5. **Refresh your browser** and try accessing the admin pages again

### Option 2: Use the AdminAccessTest Page

1. Navigate to `https://dlinrt.eu/admin/access-test`
2. Click "Run Tests" to see your current roles
3. Check the console for detailed logs
4. If you have no roles, use Option 1 above

### Option 3: Request Role via Profile Page

1. Go to your profile: `https://dlinrt.eu/profile`
2. Scroll to "Request a Role" section
3. Select "Reviewer" role (if you need admin, someone with admin access must assign it)
4. An existing admin must approve your request

## Verifying Access

After assigning the admin role, you should see:

1. **On Profile Page** (`/profile`):
   - Your roles section should show "admin" badge

2. **On AdminAccessTest Page** (`/admin/access-test`):
   - Context Roles should show "admin"
   - Database Roles Test should find your admin role
   - has_role() function should return "Yes"

3. **Access to Admin Pages**:
   - `/admin` - Admin Overview (works)
   - `/admin/dashboard` - Admin Dashboard (works)
   - `/admin/users` - User Management (works)
   - `/admin/reviews` - Review Assignment (works)
   - `/admin/security` - Security Dashboard (works)
   - `/admin/user-products` - User Product Adoptions (works)
   - `/admin/registrations` - User Registration Review (works)

## Common Issues

### "Access Denied" still appears after assigning role
**Solution:** Clear your browser cache and refresh, or sign out and sign back in.

### SQL error: "permission denied for table user_roles"
**Solution:** Make sure you're running the SQL in Supabase Dashboard as a superuser, not from the application.

### Can't find your email in auth.users
**Solution:** Make sure you've created an account first by signing up at `/auth`

### Multiple admin roles appear in database
**Solution:** This is fine. The `ON CONFLICT DO NOTHING` clause prevents duplicates.

## SQL Helper Queries

### List all users with admin role:
```sql
SELECT 
  u.email,
  u.created_at as registered_at,
  ur.role,
  ur.created_at as role_assigned_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin'
ORDER BY ur.created_at DESC;
```

### Remove admin role from a user:
```sql
-- Replace 'user-email@example.com' with the user's email
DELETE FROM public.user_roles
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'user-email@example.com'
)
AND role = 'admin';
```

### Check all roles for all users:
```sql
SELECT 
  u.email,
  ARRAY_AGG(ur.role) as roles
FROM auth.users u
LEFT JOIN public.user_roles ur ON ur.user_id = u.id
GROUP BY u.id, u.email
ORDER BY u.created_at DESC;
```

## Security Note

⚠️ **Important**: Admin role grants full access to:
- User management (view, edit, delete users)
- Role assignment (grant/revoke roles)
- Product review assignment
- Security monitoring
- All administrative functions

Only assign admin role to trusted team members.
