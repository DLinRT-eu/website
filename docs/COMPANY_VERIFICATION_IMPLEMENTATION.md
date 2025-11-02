# Company Product Certification Feature - Implementation Guide

## Overview

This feature allows company representatives (max 3 per company) to certify their products, which displays a "Company Verified" badge on the public product pages.

## Architecture

### Database Schema

#### 1. `company_users` Table
Links users to companies with a limit of 3 active users per company.

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to auth.users
- `company_name` (TEXT) - Must match company names in product data files
- `assigned_by` (UUID) - Admin who assigned this user
- `assigned_at` (TIMESTAMP) - When assigned
- `is_active` (BOOLEAN) - Only active users can certify (max 3 per company)
- `notes` (TEXT) - Optional notes
- `created_at`, `updated_at` (TIMESTAMP)

**Constraints:**
- UNIQUE(user_id) - User can only belong to one company
- CHECK: Maximum 3 active users per company (enforced by trigger)

#### 2. `company_revisions` Table (Already Exists)
Tracks product certifications and revisions.

**New Column:**
- `company_user_id` (UUID) - Links to company_users table

**Important Fields:**
- `product_id` - Product identifier
- `company_id` - Company name
- `revision_date` - Date of certification (becomes `companyRevisionDate` in UI)
- `verification_status` - 'pending' | 'approved' | 'rejected'

### User Flow

```
1. Admin assigns user to company (via Admin Dashboard)
   ↓
2. User logs in with 'company' role
   ↓
3. User sees Company Dashboard with products from their company
   ↓
4. User clicks "Certify Product" button
   ↓
5. User selects date and confirms
   ↓
6. System creates approved company_revision record
   ↓
7. DataService merges static product data with companyRevisionDate
   ↓
8. Public product page shows "Company Verified" badge
```

## Implementation Status

###  Completed
- ✅ Database migration created (`20251102030000_add_company_users.sql`)
- ✅ TypeScript types updated (`company_users` added to Supabase types)
- ✅ UI components updated:
  - ProductHeaderInfo shows blue "Company Verified" badge
  - GeneralInformationDetails shows "Revised by Company" date
- ✅ Pricing removed from all product files

### 🚧 In Progress / To Do

#### 1. Complete Company Dashboard Enhancement
**File:** `src/pages/company/Dashboard.tsx`

**Needs:**
- Add certification dialog with date picker
- Show only products from user's assigned company
- Display certification status for each product
- Button to certify/recertify products

**UI Elements to Add:**
```tsx
// Certification Dialog
<Dialog open={certifyDialogOpen} onOpenChange={setCertifyDialogOpen}>
  <DialogTrigger asChild>
    <Button className="gap-2">
      <BadgeCheck className="h-4 w-4" />
      Certify Product
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Certify Product</DialogTitle>
      <DialogDescription>
        Certify that this product information is accurate and up-to-date.
        This will display a "Company Verified" badge on the product page.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Product</Label>
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select a product from your company</option>
          {companyProducts.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <Label>Certification Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !certificationDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {certificationDate ? format(certificationDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={certificationDate}
              onSelect={(date) => date && setCertificationDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Company Verification</AlertTitle>
        <AlertDescription>
          By certifying this product, you confirm that the information is accurate
          as of the selected date. A "Company Verified" badge will appear publicly.
        </AlertDescription>
      </Alert>
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setCertifyDialogOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleCertifyProduct}>
        Certify Product
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### 2. Update DataService to Load Company Revisions
**File:** `src/services/DataService.ts`

**Add Method:**
```typescript
async loadCompanyRevisions() {
  const { data } = await supabase
    .from('company_revisions')
    .select('product_id, revision_date')
    .eq('verification_status', 'approved')
    .order('revision_date', { ascending: false });
  
  if (data) {
    // Create a map of product_id -> latest revision_date
    const revisionMap = new Map<string, string>();
    data.forEach(rev => {
      if (!revisionMap.has(rev.product_id)) {
        revisionMap.set(rev.product_id, rev.revision_date);
      }
    });
    
    // Merge with ALL_PRODUCTS
    this.products = ALL_PRODUCTS.map(product => ({
      ...product,
      companyRevisionDate: revisionMap.get(product.id) || undefined
    }));
  }
}

// Call this in constructor or init method
```

#### 3. Add Admin Interface for Company User Management
**File:** `src/pages/admin/CompanyUserManagement.tsx` (NEW)

**Features:**
- List all companies (extracted from product data)
- For each company, show assigned users (max 3)
- Add/remove users from companies
- Activate/deactivate company users
- Search users by email
- Display assignment history

**UI Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Company: {companyName}</CardTitle>
    <CardDescription>{assignedUsers.length}/3 users assigned</CardDescription>
  </CardHeader>
  <CardContent>
    {/* List of assigned users */}
    {/* Button to add new user (if < 3) */}
    {/* Toggle active/inactive */}
  </CardContent>
</Card>
```

#### 4. Update Navigation
**File:** `src/App.tsx`

Add route for admin company management:
```typescript
<Route path="/admin/company-users" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <CompanyUserManagement />
  </ProtectedRoute>
} />
```

#### 5. Update Documentation

**File:** `docs/FIELD_REFERENCE.md`

Add:
```markdown
| `companyRevisionDate` | string | No | Date when company last verified product information. Displays "Company Verified" badge. Format: YYYY-MM-DD |
```

**Create:** `docs/COMPANY_VERIFICATION_GUIDE.md`

Contents:
- How company verification works
- Steps for admins to assign users
- Steps for company users to certify products
- What happens when a product is certified
- How to update/revoke certifications
- Limits (3 users per company)

## Security Considerations

1. **RLS Policies:** Only admins can assign company users
2. **Company Matching:** company_name must exactly match product.company field
3. **User Limit:** Enforced at database level with trigger
4. **Auto-approval:** Company certifications are auto-approved (they're the authoritative source)
5. **Public Display:** Anyone can see the verification badge, but only assigned company users can create them

## Testing Checklist

- [ ] Run migration successfully
- [ ] Admin can assign user to company
- [ ] Assignment respects 3-user limit
- [ ] Company user sees only their company's products
- [ ] Company user can certify a product
- [ ] Certification creates approved revision with correct date
- [ ] DataService merges companyRevisionDate
- [ ] Product page shows "Company Verified" badge
- [ ] General Information shows "Revised by Company" date
- [ ] Badge displays correctly with date
- [ ] Non-certified products don't show badge

## Database Migration Deployment

1. Apply migration:
```sql
-- Run in Supabase SQL Editor
\i supabase/migrations/20251102030000_add_company_users.sql
```

2. Verify tables created:
```sql
SELECT * FROM company_users LIMIT 0;
SELECT * FROM company_revisions WHERE company_user_id IS NOT NULL;
```

3. Test functions:
```sql
-- Test company lookup
SELECT public.get_user_company('some-user-uuid');

-- Test permission check
SELECT public.can_manage_product('some-user-uuid', 'MVision AI');
```

## Next Steps

1. Complete Company Dashboard certification UI
2. Implement DataService revision loading
3. Create Admin Company User Management page
4. Write comprehensive documentation
5. Test end-to-end flow
6. Deploy migration to production

## Notes

- The `companyRevisionDate` field was already added to ProductDetails type
- UI components (ProductHeaderInfo, GeneralInformationDetails) are ready
- Company role already exists in auth system
- company_revisions table already exists, just needs company_user_id
