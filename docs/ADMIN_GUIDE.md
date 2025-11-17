# Admin Guide

> Complete guide for administrators managing the DLinRT.eu platform

## Quick Access

- **Admin Dashboard**: `/admin` - Overview of all admin functions
- **User Management**: `/admin/users` - Manage user roles and permissions
- **Review Assignment**: `/admin/reviews` - Assign product reviews to reviewers
- **Review Rounds**: `/admin/review-rounds` - Create and manage review rounds
- **Company Management**: `/admin/companies` - Manage company representatives
- **Security Dashboard**: `/admin/security` - Monitor security events

---

## Table of Contents

1. [User Management](#1-user-management)
2. [Review Round Management](#2-review-round-management)
3. [Reviewer Assignment](#3-reviewer-assignment)
4. [Company Management](#4-company-management)
5. [Security Monitoring](#5-security-monitoring)

---

## 1. User Management

Manage user accounts, roles, and permissions.

### Accessing User Management
**Route**: `/admin/users`

### Features
- **Search & Filter**: Search by name, email, or institution; filter by role
- **Sortable Columns**: Click column headers to sort
- **Role Management**: Add/remove admin, reviewer, or company roles
- **Role Requests**: Approve or reject user role elevation requests

### Adding/Removing Roles

1. Find the user in the list
2. Click their row to expand details
3. Use "Add Role" dropdown to assign roles
4. Click X on existing roles to remove them

**Available Roles**:
- `admin` - Full system access
- `reviewer` - Can review products
- `company` - Company representative access

---

## 2. Review Round Management

Organize product reviews in structured rounds with balanced assignments.

### Accessing Review Rounds
**Route**: `/admin/review-rounds`

### Creating a Review Round

1. Navigate to Review Rounds page
2. Click "Create New Round"
3. Fill in details:
   - **Name**: e.g., "Q1 2025 Product Review"
   - **Deadline**: Target completion date
4. Select products to include
5. Click "Create Round"

### Assigning Reviewers

The system uses intelligent assignment based on:
- Reviewer preferences (expertise, companies, products)
- Current workload balance
- Historical assignment patterns

**Steps**:
1. Open the round details
2. Click "Auto-Assign" for balanced distribution
3. Review assignments in preview
4. Manually adjust if needed
5. Click "Confirm Assignments"
6. System sends email notifications automatically

### Round Status Tracking
- View completion progress
- See individual reviewer status
- Access audit trail of changes
- Export assignment reports

---

## 3. Reviewer Assignment

Assign individual product reviews to reviewers.

### Accessing Review Assignment
**Route**: `/admin/reviews`

### Manual Assignment

1. Select product from dropdown
2. Choose reviewer (system shows workload)
3. Set priority (low, medium, high, critical)
4. Set deadline
5. Add notes (optional)
6. Click "Assign Review"

### Bulk Operations
- Use review rounds for multiple assignments
- Export assignment lists
- Track completion status

**See also**: [Reviewer Assignment Guide](./REVIEWER_ASSIGNMENT_GUIDE.md) for detailed workflows

---

## 4. Company Management

Manage company representatives and product ownership.

### Accessing Company Management
**Route**: `/admin/companies`

### Verifying Company Representatives

1. View pending verification requests
2. Review user's company claim
3. Verify documentation (if provided)
4. Approve or reject

### Assigning Products to Companies

1. Select company representative
2. Choose products they can manage
3. Set access level
4. Save assignments

### Company Oversight

Admins have full visibility of:
- All company revisions
- Product update requests
- Verification status
- Company representative activities

---

## 5. Security Monitoring

Monitor platform security and user activities.

### Accessing Security Dashboard
**Route**: `/admin/security`

### Key Metrics
- Failed login attempts
- Suspicious activity patterns
- Role escalation requests
- Database access logs

### Security Best Practices

1. **Regular Audits**: Review user permissions monthly
2. **Role Principle**: Grant minimum necessary permissions
3. **Monitor Logs**: Check security dashboard weekly
4. **Review Requests**: Respond to role requests promptly
5. **Update Access**: Remove access for inactive users

### Emergency Procedures

**Suspected Breach**:
1. Document the issue
2. Revoke affected user's access immediately
3. Review security logs
4. Change admin credentials if needed
5. Report to project lead

**Inappropriate Content**:
1. Remove content immediately
2. Document incident
3. Warn or suspend user
4. Review moderation policies

---

## Common Admin Tasks

### Granting Admin Access

**Via Database** (Supabase Dashboard):
```sql
-- Check if user exists
SELECT id, email FROM auth.users WHERE email = 'user@example.com';

-- Grant admin role
INSERT INTO public.user_roles (user_id, role, granted_by)
VALUES ('user-uuid-here', 'admin', auth.uid())
ON CONFLICT (user_id, role) DO NOTHING;
```

**Via Application**:
1. Go to `/admin/users`
2. Find the user
3. Add "admin" role

### Removing User Access

1. Navigate to User Management
2. Find user
3. Remove all roles
4. Optionally suspend account (via Supabase Auth)

### Managing Product Reviews

1. Assign via Review Rounds for structured reviews
2. Use direct assignment for urgent reviews
3. Monitor progress in admin dashboard
4. Follow up on overdue reviews

---

## Troubleshooting

### User Can't Access Admin Pages
- **Check**: User has admin role in `user_roles` table
- **Check**: User is logged in with correct account
- **Check**: RLS policies are applied correctly

### Reviews Not Appearing
- **Check**: Review assigned correctly in database
- **Check**: Reviewer has reviewer role
- **Check**: Product exists in system

### Permission Errors (403)
- **Check**: RLS policies on tables
- **Check**: User roles are correctly assigned
- **Check**: No circular dependencies in policies
- **Apply**: Latest RLS fix migration if needed

---

## Additional Resources

- [Reviewer Guide](./REVIEWER_GUIDE.md) - For understanding reviewer workflow
- [Reviewer Assignment Guide](./REVIEWER_ASSIGNMENT_GUIDE.md) - Detailed assignment procedures
- [Admin Routes Documentation](./ADMIN_COMPANY_ROUTES.md) - Complete route reference

---

**Last Updated**: November 2025
