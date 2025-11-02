# Admin & Company Routes Implementation

## Overview
Complete implementation of admin panel and company oversight functionality with proper routing, role-based access control, and user-friendly interfaces.

## Admin Panel Routes

### 1. Admin Overview (`/admin`)
**Purpose:** Main admin dashboard with quick stats and navigation
**Features:**
- Pending role requests count and quick actions
- Unassigned reviews overview
- Pending product revisions
- Recent user registrations
- Quick navigation cards to all admin functions
- Administrative tools section

### 2. User Management (`/admin/users`)
**Purpose:** Comprehensive user management interface
**Features:**
- Search by name, email, or institution
- Filter by role (All, Admin, Reviewer, Company, No Roles)
- Sortable columns (Name, Email, Institution)
- Bulk data fetching (optimized from N+1 queries)
- Add/remove role functionality
- Detailed error handling and user feedback

### 3. Review Assignment (`/admin/reviews`)
**Purpose:** Assign product reviews to reviewers
**Features:**
- View all reviewers with assignment counts
- Search and filter functionality
- Assign reviews with priority and deadline
- Reassign existing reviews
- Track review status (pending, in progress, completed)
- Reviewer workload balancing

### 4. Role Requests (`/admin/role-requests`)
**Purpose:** Manage user role elevation requests
**Features:**
- View pending requests with justifications
- Approve/reject role requests
- User profile information
- Request history tracking

### 5. Product Revisions (`/admin/revisions`)
**Purpose:** Review and approve product revisions from companies
**Features:**
- View all pending revisions
- Filter by verification status
- Approve/reject changes
- View revision details and summaries
- Track verification history

### 6. User Registrations (`/admin/registrations`)
**Purpose:** Review new user registrations
**Features:**
- View pending registrations
- Approve/reject users
- Check email verification status
- User profile preview

## Company Oversight Routes

### 1. Company Dashboard (`/company/dashboard`)
**Purpose:** Main company oversight and product management
**Features:**
- View assigned company products
- Submit product revisions with change summaries
- Track revision status (pending, approved, rejected)
- Certify product information with declaration
- View revision history
- Admin oversight for all companies (when accessed by admin)

### 2. Company Products Manager (`/company/products`)
**Purpose:** Detailed product management interface
**Features:**
- View all assigned products
- Edit product information
- Submit updates for verification
- Track update status
- Product-specific revision history
- Batch operations support

## Access Control

### Admin Routes
- **Protected by:** `ProtectedRoute` with `allowedRoles={['admin']}`
- **Redirects:** Non-admin users redirected to home page
- **Available to:** Users with 'admin' role in user_roles table

### Company Routes
- **Protected by:** `ProtectedRoute` with `allowedRoles={['company', 'admin']}`
- **Redirects:** Unauthorized users redirected to auth page
- **Available to:** 
  - Users with 'company' role (limited to their assigned products)
  - Users with 'admin' role (full oversight of all companies)

## Key Implementation Details

### Route Structure in App.tsx
```typescript
// Admin Routes
<Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminOverview /></ProtectedRoute>} />
<Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
<Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={['admin']}><ReviewAssignment /></ProtectedRoute>} />
<Route path="/admin/role-requests" element={<ProtectedRoute allowedRoles={['admin']}><RoleRequests /></ProtectedRoute>} />
<Route path="/admin/revisions" element={<ProtectedRoute allowedRoles={['admin']}><ProductRevisions /></ProtectedRoute>} />
<Route path="/admin/registrations" element={<ProtectedRoute allowedRoles={['admin']}><UserRegistrationReview /></ProtectedRoute>} />

// Company Routes
<Route path="/company/dashboard" element={<ProtectedRoute allowedRoles={['company', 'admin']}><CompanyDashboard /></ProtectedRoute>} />
<Route path="/company/products" element={<ProtectedRoute allowedRoles={['company', 'admin']}><CompanyProductsManager /></ProtectedRoute>} />
```

### Context Providers Hierarchy
```typescript
QueryClientProvider → AuthProvider → RoleProvider → TooltipProvider → App Content
```

### Role Checking
- `useAuth()` provides `isAdmin`, `isReviewer`, `isCompany` flags
- `useRoles()` provides detailed role information
- `ProtectedRoute` component validates access before rendering

## User Experience Highlights

### Easy Navigation
- Admin overview has direct links to all admin functions
- Consistent UI across all pages using shadcn/ui components
- Breadcrumb navigation for context

### Search & Filter
- User management: Search by multiple fields, filter by role
- Review assignment: Search products and reviewers
- All tables support sorting by clicking column headers

### Clear Feedback
- Toast notifications for all actions
- Loading states with spinners
- Error messages with specific context
- Success confirmations

### Lean & Accurate
- Optimized queries (bulk fetching vs N+1)
- Minimal unnecessary data loading
- Clean, focused interfaces
- Mobile-responsive design

## Testing Checklist

- [ ] Admin can access `/admin` and see overview dashboard
- [ ] Admin can manage users at `/admin/users`
- [ ] Admin can assign reviews at `/admin/reviews`
- [ ] Admin can approve role requests at `/admin/role-requests`
- [ ] Admin can review revisions at `/admin/revisions`
- [ ] Company users can access `/company/dashboard`
- [ ] Company users can manage products at `/company/products`
- [ ] Non-admin users cannot access admin routes
- [ ] Non-company users cannot access company routes
- [ ] All search/filter/sort functions work correctly
- [ ] Toast notifications appear for all actions
- [ ] Loading states display properly

## Database Requirements

### Tables Used
- `user_roles` - Role assignments
- `profiles` - User information
- `product_reviews` - Review assignments
- `product_revisions` - Company updates
- `company_users` - Company product assignments
- `role_requests` - Role elevation requests

### Required Functions
- `get_users_with_roles()` - Fetch users with roles (SECURITY DEFINER)
- `is_admin()` - Check if user is admin
- RLS policies on all tables

## Next Steps

1. Apply database migration: `20251102_create_admin_user_view.sql`
2. Test all admin routes with admin user
3. Test company routes with company user
4. Verify role-based access restrictions
5. Check search/filter/sort functionality
6. Test all CRUD operations
7. Verify toast notifications work
8. Check mobile responsiveness

## Files Modified

- `src/App.tsx` - Added all admin and company routes
- `src/pages/admin/UserManagement.tsx` - Enhanced with search/filter/sort
- `supabase/migrations/20251102_create_admin_user_view.sql` - Database function

## Documentation References

- `docs/USER_MANAGEMENT_FIX.md` - User management permission fixes
- `docs/ADMIN_GUIDE.md` - General admin guide
- `docs/REVIEWER_ASSIGNMENT_GUIDE.md` - Review assignment workflow
- `docs/COMPANY_VERIFICATION_IMPLEMENTATION.md` - Company verification process
