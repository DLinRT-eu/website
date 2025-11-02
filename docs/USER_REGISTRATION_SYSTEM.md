# User Registration & Email Validation System

## Overview

The DLinRT.eu platform implements a **mandatory institutional email verification system** for all new user registrations. This ensures that only users from legitimate institutions (universities, hospitals, research centers, companies) can access the platform.

## Key Features

### 🔒 Institutional Email Requirement
- **Only institutional email addresses are allowed**
- Free email providers are automatically blocked (Gmail, Yahoo, Hotmail, Outlook, etc.)
- Educational (.edu), government (.gov), academic (.ac.*), and organizational (.org) domains are preferred
- Company domains (.com, .net, .eu) are allowed but require manual verification

### 📧 Automatic Admin Notification
- When a new user registers, an automated email is sent to `info@dlinrt.eu`
- Email contains complete user information and verification checklist
- Admin receives real-time notifications for all registration attempts

### ✅ Manual Verification Process
- Admins must manually verify each new user registration
- Verification includes:
  - Email domain validation
  - User identity confirmation
  - Institution affiliation check
  - Email verification status

### 🚫 Blocked Registration Tracking
- Non-institutional email registrations are automatically blocked
- Blocked attempts are logged for security monitoring
- Admins can review blocked registrations in the dashboard

## System Architecture

### 1. Client-Side Validation (`AuthContext.tsx`)

**Location:** `src/contexts/AuthContext.tsx`

**Function:** `signUp(email, password, data)`

**Process:**
1. Validates email domain against blocked list
2. Prevents registration if using free email provider
3. Calls Supabase Auth signup
4. Triggers notification Edge Function on success

**Blocked Domains:**
```typescript
const blockedDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'live.com', 'msn.com', 'aol.com', 'icloud.com',
  'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
  'gmx.com', 'inbox.com', 'fastmail.com', 'hushmail.com'
];
```

### 2. Edge Function (`notify-user-registration`)

**Location:** `supabase/functions/notify-user-registration/index.ts`

**Purpose:** Send admin notification email via Resend API

**Key Functions:**
- `isInstitutionalEmail(email)` - Server-side validation
- Email template generation with user details
- Security checks (service role authentication)
- Error handling and logging

**Email Template Includes:**
- User name and email
- Email domain
- Registration timestamp
- User UUID
- Verification checklist
- Link to admin dashboard

### 3. Database Layer

**Migration:** `20251102040000_add_user_registration_notifications.sql`

#### Tables

**`user_registration_notifications`**
```sql
CREATE TABLE user_registration_notifications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  notification_sent_at TIMESTAMPTZ,
  notification_status TEXT, -- 'sent', 'failed', 'blocked', 'pending'
  failure_reason TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Functions

**`is_institutional_email(email TEXT)`**
- Validates email domain
- Blocks free email providers
- Allows institutional patterns

**`handle_new_user()`** - Trigger Function
- Called automatically on new user creation
- Checks email domain
- Creates user profile (only for institutional emails)
- Logs notification request
- Blocks non-institutional registrations

**`verify_user_registration(p_user_id UUID, p_verified BOOLEAN)`**
- Admin function to verify/reject users
- Updates notification record
- Records who verified and when

**`send_pending_registration_notifications()`**
- Processes pending notifications
- Can be called manually or via cron job
- Handles retry logic for failed notifications

### 4. Admin Interface

**Component:** `UserRegistrationReview.tsx`

**Location:** `src/pages/admin/UserRegistrationReview.tsx`

**Route:** `/admin/registrations`

**Features:**
- View pending registrations
- Verify or reject users
- See verification history
- Monitor blocked registrations
- Real-time status updates

**Statistics Display:**
- Pending review count
- Verified users count
- Blocked attempts count

## User Registration Flow

```
1. User submits registration form
   ↓
2. Client validates email domain
   ↓ (if blocked)
   → Error: "Only institutional emails allowed"
   
   ↓ (if allowed)
3. Supabase Auth creates user account
   ↓
4. Database trigger (handle_new_user) fires
   ↓
5. Profile created (institutional only)
   ↓
6. Notification logged in database
   ↓
7. Edge Function called (notify-user-registration)
   ↓
8. Email sent to info@dlinrt.eu
   ↓
9. Admin receives notification
   ↓
10. Admin reviews in /admin/registrations
   ↓
11. Admin verifies or rejects user
   ↓
12. User can access platform (if verified)
```

## Admin Verification Workflow

### Step 1: Access Admin Dashboard
Navigate to: `https://dlinrt.eu/admin/registrations`

### Step 2: Review Pending Registrations
- Check user name and email
- Verify email domain authenticity
- Confirm institution affiliation

### Step 3: Validate Email Verification
- Ensure user has verified their email address
- Check Supabase Auth dashboard if needed

### Step 4: Make Decision
- **Verify**: User gains full platform access
- **Reject**: User account remains inactive

### Step 5: Document Decision
- System automatically records:
  - Verification status
  - Admin who made decision
  - Timestamp of decision

## Email Domain Validation Rules

### ✅ Automatically Allowed
- `.edu` - Educational institutions
- `.gov` - Government agencies
- `.ac.*` - Academic institutions (e.g., .ac.uk, .ac.jp)
- `.org` - Organizations

### ⚠️ Allowed with Manual Verification
- `.com` - Company domains
- `.net` - Network organizations
- `.eu` - European organizations
- Other institutional domains

### ❌ Automatically Blocked
All free email providers including:
- Gmail, Yahoo, Hotmail, Outlook
- Live, MSN, AOL, iCloud
- ProtonMail, Mail.com, Zoho, Yandex
- GMX, Inbox, FastMail, HushMail

## Security Features

### Rate Limiting
- Edge Function implements rate limiting
- Prevents spam registrations
- IP-based throttling

### Authentication
- Edge Function requires service role key
- Only Supabase can invoke the function
- Prevents unauthorized access

### Data Validation
- HTML escaping prevents injection attacks
- Email format validation
- Field length restrictions
- Payload size limits

### Row Level Security (RLS)
- Only admins can view notifications
- Service role can manage all records
- Users cannot access notification data

## Configuration

### Environment Variables Required

**Supabase Edge Function:**
```bash
RESEND_API_KEY=<your-resend-api-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

**Email Configuration:**
```typescript
From: "DLinRT.eu User Registration <noreply@dlinrt.eu>"
To: "info@dlinrt.eu"
```

## Deployment Checklist

### 1. Apply Database Migration
```bash
cd supabase/migrations
psql -f 20251102040000_add_user_registration_notifications.sql
```

### 2. Deploy Edge Function
```bash
supabase functions deploy notify-user-registration
```

### 3. Set Environment Variables
```bash
supabase secrets set RESEND_API_KEY=<key>
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<key>
```

### 4. Update Frontend Types
```bash
# Types already updated in:
# src/integrations/supabase/types.ts
```

### 5. Verify Email Delivery
- Test registration with institutional email
- Check info@dlinrt.eu inbox
- Verify email template rendering

### 6. Test Admin Interface
- Navigate to /admin/registrations
- Verify pending registrations appear
- Test verify/reject functionality

## Monitoring & Maintenance

### Database Queries

**View Pending Registrations:**
```sql
SELECT * FROM user_registration_notifications
WHERE verified = FALSE
AND notification_status != 'blocked'
ORDER BY created_at DESC;
```

**Count Registration Statistics:**
```sql
SELECT 
  notification_status,
  COUNT(*) as count
FROM user_registration_notifications
GROUP BY notification_status;
```

**Recent Blocked Attempts:**
```sql
SELECT email, created_at, failure_reason
FROM user_registration_notifications
WHERE notification_status = 'blocked'
ORDER BY created_at DESC
LIMIT 10;
```

### Cron Job Setup (Optional)

Process pending notifications automatically:

```sql
-- Create pg_cron job (if extension available)
SELECT cron.schedule(
  'process-registration-notifications',
  '*/5 * * * *', -- Every 5 minutes
  $$SELECT send_pending_registration_notifications()$$
);
```

## Troubleshooting

### Issue: Email not received
**Check:**
1. Resend API key is configured
2. Edge Function deployed successfully
3. Service role key is correct
4. Check `user_registration_notifications` table for status

### Issue: User blocked incorrectly
**Solution:**
1. Check email domain against blocked list
2. Manually update notification status if needed:
```sql
UPDATE user_registration_notifications
SET notification_status = 'pending',
    failure_reason = NULL
WHERE user_id = '<user-uuid>';
```

### Issue: Admin can't verify users
**Check:**
1. User has admin role in `user_roles` table
2. RLS policies are applied correctly
3. `verify_user_registration` function exists

## Future Enhancements

### Planned Features
- [ ] Bulk verification for trusted domains
- [ ] Automatic approval for specific domain patterns
- [ ] Email confirmation reminder system
- [ ] Admin notification preferences
- [ ] Registration analytics dashboard
- [ ] Whitelist/blacklist domain management UI

### Integration Opportunities
- [ ] Integration with institutional email verification services
- [ ] ORCID authentication
- [ ] LinkedIn institution verification
- [ ] Google Workspace/Microsoft 365 SSO

## Support

For issues or questions about the user registration system:
- Email: info@dlinrt.eu
- Check: `/admin/registrations` dashboard
- Review: Database notification logs
- Monitor: Supabase Edge Function logs

## Related Documentation

- [SECURITY.md](../SECURITY.md) - Overall security practices
- [ADMIN_GUIDE.md](../ADMIN_GUIDE.md) - Admin functionality guide
- [Database Schema](../supabase/migrations/) - Migration files
- [Edge Functions](../supabase/functions/) - Supabase Functions

---

**Last Updated:** November 2, 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready
