# Reviewer Assignment System - Setup and Usage Guide

This guide explains how to use the enhanced reviewer assignment system with automatic distribution, email invitations, and expertise management.

## 🎯 Overview

The enhanced review assignment system provides three major capabilities:
1. **Email Invitations** - Send secure registration invites to new reviewers with expertise preferences
2. **Expertise Management** - Configure reviewer expertise by product category with priority weighting
3. **Auto-Distribution** - Intelligently assign products to reviewers based on expertise and workload

## 📋 Prerequisites

### 1. Database Migration

First, run the database migration to create the necessary tables:

```sql
-- Run this migration in Supabase SQL Editor
-- File: supabase/migrations/20250115000000_add_reviewer_expertise.sql
```

This creates:
- `reviewer_expertise` table - Stores reviewer expertise preferences
- `reviewer_invitations` table - Manages email invitation tokens

### 2. Edge Function Deployment

Deploy the invitation Edge Function:

```bash
# Navigate to your project directory
cd website

# Deploy the function to Supabase
supabase functions deploy invite-reviewer

# Verify RESEND_API_KEY is configured in Supabase dashboard
# Go to: Project Settings → Edge Functions → Secrets
# Add: RESEND_API_KEY=your_resend_api_key
```

### 3. Update Route Configuration

The enhanced review assignment page is at:
- **File**: `src/pages/admin/ReviewAssignmentEnhanced.tsx`
- **Route**: `/admin/review-assignment` (protected, admin only)

Update `App.tsx` if needed to use the new component:
```tsx
import ReviewAssignmentEnhanced from '@/pages/admin/ReviewAssignmentEnhanced';

// Replace old ReviewAssignment route with:
<Route path="/admin/review-assignment" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <ReviewAssignmentEnhanced />
  </ProtectedRoute>
} />
```

## 🚀 Using the System

### Feature 1: Invite New Reviewers

Navigate to **Admin Dashboard → Review Management → Reviewers Tab**

#### Send Invitation:

1. Click **"Invite Reviewer"** button
2. Fill in details:
   - **Email*** (required): reviewer@institution.edu
   - **First Name/Last Name**: Optional, personalizes email
   - **Institution**: University Hospital, etc.
   - **Personal Message**: Optional custom message
3. Select **Expertise Categories**:
   - Click category buttons to toggle selection
   - Set priority levels (1-10, where 1 = highest expertise)
4. Click **"Send Invitation"**

#### Invitation Email Contains:
- Welcome message with personal note (if provided)
- List of expertise areas with priorities
- Secure registration link (expires in 7 days)
- Instructions for accessing the platform

#### Example: Inviting the 8 Reviewers

**Thebeemang (Primary: Reconstruction, Image Enhancement)**
```
Email: bryanthebeemang@gmail.com
First Name: Bryan
Expertise: 
  - Reconstruction (Priority: 1)
  - Image Enhancement (Priority: 2)
  - Treatment Planning (Priority: 3)
  - Performance Monitor (Priority: 4)
```

**Usman Lula (Ordered by priority)**
```
Email: usman.lula@uhb.nhs.uk
First Name: Usman
Last Name: Lula
Institution: University Hospitals Birmingham NHS Trust
Expertise:
  - Treatment Planning (Priority: 1)
  - Tracking (Priority: 2)
  - Performance Monitor (Priority: 3)
  - Clinical Prediction (Priority: 4)
  - Auto-Contouring (Priority: 5)
  - Registration (Priority: 6)
```

**Amith Kamath**
```
Email: amithjkamath@outlook.com
First Name: Amith
Last Name: Kamath
Expertise:
  - Auto-Contouring (Priority: 1)
  - Treatment Planning (Priority: 2)
  - Performance Monitor (Priority: 3)
  - Clinical Prediction (Priority: 4)
```

**Mark Gooding (Industry)**
```
Email: mark.gooding@inpictura.com
First Name: Mark
Last Name: Gooding
Institution: Inpictura Ltd (Industry)
Expertise:
  - Auto-Contouring (Priority: 1)
  - Registration (Priority: 2)
Message: "Welcome Mark! As an industry expert, your perspective on commercial products will be invaluable."
```

**Adam Miovecz**
```
Email: adam.miovecz@gmail.com
First Name: Adam
Last Name: Miovecz
Expertise:
  - Image Enhancement (Priority: 1)
  - Reconstruction (Priority: 2)
```

**Marcos Jiménez**
```
Email: mjaponc@gmail.com
First Name: Marcos
Last Name: Jiménez
Expertise:
  - Treatment Planning (Priority: 1)
  - Clinical Prediction (Priority: 2)
```

**Khaled Wahid**
```
Email: kawahid@mdanderson.org
First Name: Khaled
Last Name: Wahid
Institution: MD Anderson Cancer Center
Expertise:
  - Image Synthesis (Priority: 1)
  - Reconstruction (Priority: 2)
```

**Matthew Jones**
```
Email: matthew.jones@uhcw.nhs.uk
First Name: Matthew
Last Name: Jones
Institution: University Hospitals Coventry & Warwickshire NHS Trust
Expertise:
  - Tracking (Priority: 1)
  - Performance Monitor (Priority: 2)
  - Platform (Priority: 3)
```

### Feature 2: Manage Existing Reviewer Expertise

For reviewers who are already registered:

1. Go to **Reviewers Tab**
2. Click **"Manage Expertise"** button
3. Select reviewer from dropdown
4. Add/remove expertise categories
5. Set priority levels for each category
6. Click **"Save Expertise"**

This updates the reviewer's expertise profile for auto-distribution.

### Feature 3: Auto-Distribute Products

Automatically assign unassigned products to reviewers:

1. Go to **Assignments Tab**
2. Click **"Auto-Distribute"** button
3. Select categories to distribute:
   - Shows unassigned count per category
   - Check categories you want to assign
4. Click **"Auto-Distribute"**

#### Distribution Algorithm:

The system assigns products using this logic:

1. **Expertise Matching**: Only assigns to reviewers with expertise in that category
2. **Priority Weighting**: Prefers reviewers with lower priority numbers (1-3 = primary, 4-6 = secondary)
3. **Load Balancing**: Among equally qualified reviewers, assigns to those with fewer current assignments
4. **Fair Distribution**: Updates workload counts after each assignment for balanced distribution

#### Example Distribution Scenario:

**Products to Distribute**: 5 Auto-Contouring products

**Eligible Reviewers**:
- Amith Kamath (Priority: 1, Current: 2 assignments)
- Mark Gooding (Priority: 1, Current: 0 assignments)
- Usman Lula (Priority: 5, Current: 5 assignments)

**Distribution Result**:
1. Product 1 → Mark Gooding (Priority 1, lowest workload)
2. Product 2 → Amith Kamath (Priority 1, next lowest workload)
3. Product 3 → Mark Gooding (Priority 1, still lower than Amith)
4. Product 4 → Amith Kamath (workloads now equal)
5. Product 5 → Mark Gooding (balanced distribution)

Usman Lula (Priority 5) only receives assignments if no Priority 1-4 reviewers are available.

### Feature 4: Manual Assignment

For specific product assignments:

1. Go to **Assignments Tab**
2. Click **"Assign Review"** button
3. Search and select product
4. Choose reviewer (shows current workload)
5. Set priority (Low/Medium/High/Critical)
6. Set deadline (optional)
7. Click **"Assign Review"**

## 📊 Reviewer Dashboard

The Reviewers tab shows:
- **Name & Email** of each reviewer
- **Active Assignments** count
- **Top 3 Expertise Areas** (sorted by priority)
- Workload distribution across team

Use this to:
- Monitor workload balance
- Identify expertise gaps
- Check who has capacity for new assignments

## 🔧 Product Categories

The system recognizes these categories (matching your product structure):

- **auto-contouring** - Automated organ segmentation
- **clinical-prediction** - Outcome prediction models
- **image-enhancement** - Image quality improvement
- **image-synthesis** - Synthetic image generation
- **performance-monitor** - QA and monitoring tools
- **platform** - Comprehensive platforms
- **reconstruction** - 3D reconstruction
- **registration** - Image registration/fusion
- **tracking** - Motion tracking
- **treatment-planning** - Treatment planning systems

## 🎓 Best Practices

### Setting Expertise Priorities:

- **1-3 (Primary)**: Main research/clinical focus, can review independently
- **4-6 (Secondary)**: Knowledgeable, can review with occasional consultation
- **7-10 (Tertiary)**: Basic familiarity, review only if needed

### Invitation Tips:

- **Use institutional emails** when possible for auto-verification
- **Include personal messages** for known colleagues
- **Set accurate priorities** - this directly affects distribution
- **Send invitations in batches** to manage onboarding

### Auto-Distribution Guidelines:

- **Run after new products added** to quickly assign to experts
- **Select related categories together** for cohesive reviewer workload
- **Review distribution results** and manually adjust if needed
- **Balance automatic and manual** - use auto for bulk, manual for special cases

## 🔒 Security & Permissions

### Who Can:
- **Admin Only**: Invite reviewers, manage expertise, auto-distribute, manual assign
- **Reviewers**: View own expertise, update own priorities (if RLS updated)

### Invitation Security:
- Tokens expire after 7 days
- Secure UUID-based tokens
- One-time use (marked accepted after registration)
- Email verification required

## 📧 Email Invitation Template

Sent emails include:
- **Subject**: "You're invited to join DLinRT.eu as a Reviewer"
- **From**: noreply@dlinrt.eu
- **Branding**: DLinRT.eu gradient header
- **Content**:
  - Personalized greeting
  - Invitation message with custom note
  - Expertise areas with priority levels
  - Institution (if provided)
  - Call-to-action button with registration link
  - Expiration warning
  - Responsibilities overview
  - Contact information

## 🐛 Troubleshooting

### Email Not Sending:
1. Check `RESEND_API_KEY` is configured in Supabase Edge Functions secrets
2. Verify `from` domain is verified in Resend dashboard
3. Check Edge Function logs: `supabase functions logs invite-reviewer`

### Table Not Found Errors:
1. Run migration: `20250115000000_add_reviewer_expertise.sql`
2. Verify tables created: Check Supabase Table Editor
3. Check RLS policies are enabled

### Auto-Distribution Not Working:
1. Verify reviewers have expertise configured
2. Check products aren't already assigned
3. Ensure selected categories match product categories exactly
4. Review database constraints (status, priority values)

### TypeScript Errors (Expected):
- Edge Function Deno imports show errors in VS Code (normal, compiles fine)
- `reviewer_expertise` table errors before migration (run migration first)
- After migration, regenerate types: `supabase gen types typescript --local`

## 🔄 Updating Reviewer List

To add all 8 reviewers at once, use the invitation feature sequentially or create a batch script:

```typescript
// Example batch invitation script (run in browser console on admin page)
const reviewers = [
  { email: 'bryanthebeemang@gmail.com', firstName: 'Bryan', expertise: [
    { category: 'reconstruction', priority: 1 },
    { category: 'image-enhancement', priority: 2 },
    { category: 'treatment-planning', priority: 3 },
    { category: 'performance-monitor', priority: 4 }
  ]},
  // ... add all 8 reviewers
];

// Send invitations (requires admin auth token)
for (const reviewer of reviewers) {
  await sendInvitation(reviewer);
  await new Promise(r => setTimeout(r, 1000)); // Rate limit
}
```

## 📝 Next Steps

1. **Run database migration** to create tables
2. **Deploy Edge Function** with Resend API key
3. **Send test invitation** to verify email delivery
4. **Invite the 8 reviewers** with their expertise
5. **Wait for registrations** (7-day expiration)
6. **Configure additional expertise** for any existing reviewers
7. **Run auto-distribution** for unassigned products
8. **Monitor dashboard** for workload balance

## 📚 Related Documentation

- `/docs/ASSIGN_ADMIN_ROLE.md` - Admin role assignment
- `/docs/USER_REGISTRATION_SYSTEM.md` - Registration workflow
- `/supabase/migrations/` - Database schemas
- `/supabase/functions/invite-reviewer/` - Email invitation logic

## 💡 Future Enhancements

Potential improvements:
- Bulk CSV import for reviewer invitations
- Auto-expiration reminder emails (3 days before expiry)
- Reviewer availability calendar integration
- Machine learning-based assignment suggestions
- Performance analytics per reviewer
- Slack/Teams integration for notifications

---

For questions or issues, contact: info@dlinrt.eu
