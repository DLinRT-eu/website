# Role Selection & Role Request Features - Implementation Summary

## Features Added

### 1. **Role Selector Component** (`src/components/profile/RoleSelector.tsx`)
A new component that allows users with multiple roles to select which role they want to use for their current session.

**Features:**
- Only displays for users with 2+ roles
- Shows dropdown to select active role
- Displays role descriptions and permissions
- Saves selection to localStorage for persistence
- Visual indicators for each role type (admin/reviewer/company)

**UI Elements:**
- Select dropdown with all assigned roles
- Badge indicators showing role types
- Info alert describing the selected role's capabilities
- List of all assigned roles at the bottom

### 2. **Enhanced Profile Page** (`src/pages/Profile.tsx`)
Updated the profile page to show role selection and request capabilities.

**Changes:**
- Added RoleSelector component (shows only when user has multiple roles)
- Enhanced "Assigned Roles" section to show active role with ✓ indicator
- Role request form now visible to ALL users (not just non-admins)
- Better help text guiding users to request roles if they have none

### 3. **Role Request Form** (Already existed, now more accessible)
The existing `RoleRequestForm` component is now visible to all users, allowing:
- Users without roles to request their first role
- Users with one role to request additional compatible roles
- Proper validation for role compatibility (e.g., company vs reviewer conflicts)
- Email verification requirement
- Institutional email validation

## User Workflows

### Workflow 1: User with No Roles
1. User logs in and goes to Profile page
2. Sees "No roles assigned yet" in Account Status card
3. Sees "Use the role request form below to request a role" message
4. Scrolls down to "Request a Role" card
5. Selects desired role (Reviewer or Company Representative)
6. Fills in justification
7. Submits request
8. Admin approves via Admin Dashboard
9. User refreshes and sees new role

### Workflow 2: User with One Role Requesting Another
1. User has "Reviewer" role
2. Wants to add "Company Representative" role
3. Goes to Profile page
4. Scrolls to "Request a Role" card
5. Selects "Company Representative" from dropdown
6. System warns if incompatible (Reviewer ↔ Company conflict)
7. If compatible, user fills justification and submits

### Workflow 3: User with Multiple Roles Switching Between Them
1. User has both "Reviewer" and "Admin" roles
2. Goes to Profile page
3. Sees "Active Role" card (RoleSelector)
4. Sees their assigned roles with ✓ on currently active one
5. Opens dropdown and selects different role
6. Selection saved to localStorage
7. App behavior changes based on active role
8. On next visit, last selected role is remembered

## Role Compatibility Rules

**Compatible:**
- Admin + Reviewer ✅
- Admin + Company ✅
- (Admin can have any combination)

**Incompatible:**
- Reviewer + Company ❌ (conflict of interest)
- Company + having user_products ❌ (conflict of interest)

## Technical Implementation

### State Management
- **RoleContext** (`src/contexts/RoleContext.tsx`): Central role management
  - `roles`: Array of all assigned roles
  - `activeRole`: Currently selected role
  - `setActiveRole()`: Function to switch roles
  - `highestRole`: Highest priority role (admin > reviewer > company)
  - Persists active role to localStorage

### Database Tables
- **user_roles**: Stores role assignments (user_id, role)
- **role_requests**: Stores pending/approved/rejected role requests

### Security
- RLS policies on user_roles use `is_admin()` security definer function to avoid infinite recursion
- Role requests require verified email
- Role requests require institutional email validation
- Role conflicts are checked before submission

## Admin Actions Required

After user submits role request:
1. Admin receives notification (if implemented)
2. Admin goes to Admin Dashboard → Role Requests
3. Reviews justification and user details
4. Approves or rejects request
5. User receives notification and role is granted (if approved)

## Future Enhancements (Optional)

1. **Role Badges on Header**: Show active role badge in navigation bar
2. **Role-Specific Dashboards**: Different landing pages based on active role
3. **Email Notifications**: Notify users when role requests are approved/rejected
4. **Role Request Comments**: Admins can leave comments on requests
5. **Automatic Role Suggestions**: Suggest roles based on user profile data
6. **Role Removal**: Allow users to request removal of unwanted roles
7. **Role Expiration**: Time-limited roles that auto-expire

## Testing Checklist

- [ ] User with no roles can see and submit role request
- [ ] User with one role can request additional compatible role
- [ ] User cannot request incompatible role (reviewer + company)
- [ ] User with multiple roles sees Role Selector
- [ ] Role switching persists across page reloads
- [ ] Active role indicator (✓) updates when role changes
- [ ] Role request form validates email verification
- [ ] Role request form validates institutional email
- [ ] Admin can see and approve role requests
- [ ] After approval, user's roles update correctly

## Files Modified

1. `src/components/profile/RoleSelector.tsx` - **NEW** - Role selection component
2. `src/pages/Profile.tsx` - Enhanced with role selector and better role display
3. `src/contexts/RoleContext.tsx` - Already had role switching logic, now fully utilized
4. `src/components/profile/RoleRequestForm.tsx` - Already existed, now accessible to all

## Migration Status

The user_roles table RLS policies have been fixed to use the `is_admin()` security definer function, which prevents infinite recursion when checking admin permissions.

**Migration file**: `supabase/migrations/20251102023000_fix_user_roles_recursion.sql`
**Status**: ✅ Applied (user confirmed)
