# Company Certification System - Complete Documentation

## Overview

The Company Certification System allows designated company representatives to certify product information in the DLinRT catalog. This creates a "Verified by Company" badge on product pages, providing users with confidence that the information has been validated by the manufacturer.

## System Architecture

### Database Schema

#### `company_representatives`
Stores company representative assignments.

```sql
- id: uuid (PK)
- user_id: uuid (FK to auth.users)
- company_name: text
- company_id: text
- position: text (optional)
- verified: boolean (default: false)
- verified_by: uuid (FK to admin)
- verified_at: timestamp
- created_at: timestamp
```

**Constraints:**
- Maximum 3 verified representatives per company (enforced by trigger)
- Unique constraint on (user_id, company_id)

#### `company_product_verifications`
Stores product certifications by companies.

```sql
- id: uuid (PK)
- company_id: text
- product_id: text
- verified_by: uuid (FK to company_representatives)
- verified_at: timestamp
- verification_notes: text (optional)
- supporting_documents: jsonb (optional)
- created_at: timestamp
- updated_at: timestamp
```

#### `company_revisions`
Audit trail for all company certifications.

```sql
- id: uuid (PK)
- product_id: text
- company_id: text
- revised_by: uuid
- revision_date: date
- changes_summary: text
- verification_status: text (approved/pending/rejected)
- verified_by: uuid
- verified_at: timestamp
- reviewer_feedback: text (optional)
- priority: text (high/medium/low)
- created_at: timestamp
```

### Security Functions

#### `can_represent_company(user_id, company_id)`
Security definer function that checks if a user is authorized to represent a company.

**Returns:** boolean

**Logic:**
1. Checks if user has 'company' role
2. Verifies user is a verified representative of the specified company

#### `check_company_rep_limit()`
Trigger function that enforces the 3-representative limit per company.

**Triggers on:** INSERT or UPDATE to `company_representatives`

**Logic:**
- When setting verified=true, counts existing verified representatives
- Raises exception if count >= 3

### Row-Level Security (RLS)

#### `company_representatives`
```sql
-- Admins can view all
SELECT: is_admin_secure()

-- Users can view own
SELECT: auth.uid() = user_id

-- Users can insert own (unverified)
INSERT: auth.uid() = user_id

-- Admins can update
UPDATE: is_admin_secure()
```

#### `company_product_verifications`
```sql
-- Public can view all
SELECT: true

-- Company reps can certify own products
INSERT: can_represent_company(auth.uid(), company_id)

-- Admins and company reps can manage
ALL: has_role(auth.uid(), 'admin') OR company_id IN (SELECT company_id FROM company_representatives WHERE user_id = auth.uid() AND verified = true)
```

## User Flows

### 1. Company Representative Registration

**User Journey:**
1. User registers on platform with institutional email
2. User navigates to Profile → Request Role
3. User selects "Company Representative" role
4. User searches and selects their company from catalog
5. User provides justification (position, reason for access)
6. System creates:
   - Entry in `role_requests` (status: pending)
   - Entry in `company_representatives` (verified: false)
7. User receives confirmation message

**Admin Journey:**
1. Admin navigates to Admin → Role Requests (or Admin → Company Management → Pending)
2. Admin reviews request details:
   - User email and profile
   - Company name
   - Justification
3. Admin clicks "Approve"
4. System:
   - Grants 'company' role to user
   - Sets verified=true on company_representatives entry
   - Updates role_request status to 'approved'
5. User can now access Company Dashboard

### 2. Product Certification

**Company Representative Journey:**
1. Navigate to Company Dashboard (`/company/dashboard`)
2. View list of company's products
3. Click "Certify Product" button
4. Select certification date
5. Confirm certification
6. System:
   - Inserts record into `company_product_verifications`
   - Inserts record into `company_revisions` (audit trail)
   - Product page displays "Verified by Company" badge

**Badge Display:**
- Badge appears on product page
- Shows certification date
- Tooltip may show verification notes
- Badge styling: Blue background with checkmark icon

### 3. Admin Company Management

**Admin Capabilities:**
1. View all companies in catalog
2. See representative assignments per company
3. Manually assign users to companies:
   - Search user by email
   - Specify position (optional)
   - Creates unverified representative entry
4. Verify/unverify representatives
5. Remove representatives
6. View pending verifications
7. Monitor statistics:
   - Total companies with representatives
   - Total verified representatives
   - Pending verifications

## Implementation Details

### Frontend Components

#### `/admin/companies` - Company Management Page
**File:** `src/pages/admin/CompanyManagement.tsx`

**Features:**
- Overview tab: Statistics and summary
- All Companies tab: Browse and manage companies
- Pending Verifications tab: Review pending representatives

**Key Functions:**
```typescript
fetchRepresentatives() // Load all company reps
handleAssignUser() // Manually assign user to company
handleVerify() // Verify representative + grant role
handleUnverify() // Revoke verification
handleRemove() // Delete representative
```

#### `/company/dashboard` - Company Dashboard
**File:** `src/pages/company/Dashboard.tsx`

**Features:**
- View company's products
- Certify products
- Track certification history
- View pending/approved certifications

**Key Functions:**
```typescript
fetchCompanyUser() // Load company assignment
fetchRevisions() // Load certification history
handleCertifyProduct() // Create certification (inserts to both tables)
```

#### Role Request Form
**File:** `src/components/profile/RoleRequestForm.tsx`

**Enhancement:** When user requests company role:
```typescript
// Creates company_representatives entry automatically
await supabase.from('company_representatives').insert({
  user_id: user.id,
  company_name: companyName,
  company_id: companyId,
  position: justification.substring(0, 100),
  verified: false
});
```

#### Role Request Manager
**File:** `src/components/admin/RoleRequestManager.tsx`

**Enhancement:** When admin approves company role:
```typescript
// Checks for existing company_representatives entry
// If exists: sets verified=true
// If not exists: creates new entry with verified=true
// Also grants 'company' role via user_roles table
```

### Backend Services

#### DataService
**File:** `src/services/DataService.ts`

**Enhancement:** Loads company verifications on initialization
```typescript
async loadCompanyVerifications() {
  // Fetches from company_product_verifications
  // Merges verified_at dates into product data
  // Populates companyRevisionDate field
}
```

**Product Retrieval:** All product methods now check verification status and return products with `companyRevisionDate` populated if certified.

### Navigation

#### Admin Navigation
**File:** `src/components/Header.tsx`

Added "Company Management" link in admin menu:
- Path: `/admin/companies`
- Icon: Building2
- Description: Manage company representatives

#### App Routes
**File:** `src/App.tsx`

Added route:
```tsx
<Route path="/admin/companies" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <CompanyManagement />
  </ProtectedRoute>
} />
```

## Security Considerations

### 1. Role-Based Access Control
- Only verified company representatives can certify products
- Only for their assigned company's products
- Enforced at database level via RLS policies

### 2. Representative Limit
- Maximum 3 verified representatives per company
- Enforced by database trigger
- Prevents excessive access proliferation

### 3. Verification Requirement
- Representatives must be verified by admin
- Unverified representatives have no certification permissions
- Two-step approval process (role request + verification)

### 4. Audit Trail
- All certifications logged in `company_revisions`
- Includes: who certified, when, which product
- Supports compliance and accountability

### 5. Conflict of Interest Prevention
- Users with product adoptions cannot become company reps
- Company role incompatible with reviewer role
- Checked during role request submission

## GDPR Compliance

### Data Processing
- Representative data limited to: name, email, position, company
- Explicit consent required during role request
- User controls own data via profile

### Data Retention
- Representative assignments kept indefinitely (business requirement)
- Certifications kept indefinitely (regulatory requirement)
- Users can request removal via admin

### Data Access
- Representatives can view own assignment
- Admins can view all assignments
- Public can view certified product badges (anonymous)

### Right to Erasure
- Admin can remove representative assignments
- Removes access but preserves certification history for integrity
- User profile can be deleted (cascades to representative entries)

## Testing Checklist

### User Registration Flow
- [ ] User can request company role
- [ ] Company selector shows all companies
- [ ] Justification field accepts input
- [ ] Request creates both role_request and company_representatives entries
- [ ] User receives confirmation

### Admin Approval Flow
- [ ] Admin can view pending requests in role requests manager
- [ ] Admin can view pending requests in company management
- [ ] Approval grants role and verifies representative
- [ ] User appears in verified representatives list
- [ ] Max 3 representatives enforced

### Certification Flow
- [ ] Company rep can access dashboard
- [ ] Dashboard shows only company's products
- [ ] Certification creates records in both tables
- [ ] Product page shows verification badge
- [ ] Badge displays correct date

### Security Tests
- [ ] Non-company users cannot access company dashboard
- [ ] Company reps cannot certify other companies' products
- [ ] Unverified representatives cannot certify
- [ ] RLS policies block unauthorized access
- [ ] Trigger prevents >3 verified reps

## Troubleshooting

### Issue: Representative Cannot Certify
**Check:**
1. User has 'company' role? (`SELECT * FROM user_roles WHERE user_id = '...'`)
2. Representative entry verified? (`SELECT verified FROM company_representatives WHERE user_id = '...'`)
3. Company ID matches product? (`SELECT company_id FROM company_representatives WHERE user_id = '...'`)

### Issue: Badge Not Appearing
**Check:**
1. Certification exists? (`SELECT * FROM company_product_verifications WHERE product_id = '...'`)
2. DataService loaded verifications? (Check browser console for errors)
3. Product page component rendering badge logic correctly?

### Issue: Cannot Assign Representative
**Check:**
1. Company already has 3 verified reps? (`SELECT COUNT(*) FROM company_representatives WHERE company_id = '...' AND verified = true`)
2. User already assigned to company? (`SELECT * FROM company_representatives WHERE user_id = '...' AND company_id = '...'`)
3. User email exists in profiles? (`SELECT * FROM profiles WHERE email = '...'`)

## Future Enhancements

1. **Bulk Certification:** Allow certifying multiple products at once
2. **Expiration Dates:** Add certification validity periods
3. **Re-certification Reminders:** Email alerts when certifications expire
4. **Supporting Documents:** Upload product documentation during certification
5. **Certification History:** Detailed timeline of all certifications
6. **Email Notifications:** Notify representatives of approval, product changes
7. **Company Dashboard Analytics:** Certification metrics and trends
8. **Public Directory:** List of certified products per company
9. **API Access:** Programmatic certification for automation
10. **Multi-language Support:** Certification notes in multiple languages

## Maintenance

### Regular Tasks
- Monitor pending verifications (Admin → Company Management → Pending)
- Review certification activity (company_revisions table)
- Audit representative assignments quarterly
- Verify email addresses remain valid

### Database Maintenance
```sql
-- Check certification statistics
SELECT company_id, COUNT(*) as cert_count
FROM company_product_verifications
GROUP BY company_id
ORDER BY cert_count DESC;

-- Check representative distribution
SELECT company_id, COUNT(*) as rep_count, 
       SUM(CASE WHEN verified THEN 1 ELSE 0 END) as verified_count
FROM company_representatives
GROUP BY company_id
ORDER BY rep_count DESC;

-- Find stale pending verifications (>30 days)
SELECT cr.*, p.email
FROM company_representatives cr
JOIN profiles p ON p.id = cr.user_id
WHERE cr.verified = false 
  AND cr.created_at < NOW() - INTERVAL '30 days';
```

## Support Contacts

For issues or questions:
- **Technical Support:** info@dlinrt.eu
- **Admin Access:** Contact platform administrator
- **Database Issues:** Review security_events table

## Version History

- **v1.0 (2025-11-11):** Initial implementation
  - Company registration flow
  - Admin management interface
  - Product certification
  - Security validation
  - Documentation complete
