# Enhanced Reviewer Assignment System - Complete Guide

## 🎯 System Overview

The DLinRT.eu reviewer assignment system provides a comprehensive platform for:
1. **Multi-Dimensional Preferences** - Categories, companies, and products
2. **Intelligent Assignment** - Weighted scoring with workload balancing
3. **Manual Override** - Full control over assignments with preview
4. **Assignment Tracking** - Complete audit trail of all changes
5. **Automated Notifications** - Email alerts for new assignments

## 📋 Table of Contents

1. [Reviewer Preferences System](#1-reviewer-preferences-system)
2. [Review Round Management](#2-review-round-management)
3. [Assignment Algorithm](#3-assignment-algorithm)
4. [Assignment History & Audit Trail](#4-assignment-history--audit-trail)
5. [Email Notifications](#5-email-notifications)
6. [Best Practices](#6-best-practices)
7. [Troubleshooting](#7-troubleshooting)
8. [Technical Reference](#8-technical-reference)

---

## 1. Reviewer Preferences System

### Overview

Reviewers can now specify expertise across three dimensions:
- **Task Categories** (10 categories: Auto-Contouring, Treatment Planning, etc.)
- **Companies** (All companies in the database)
- **Products** (All products in the database)

### Accessing Preferences

**Location**: Profile Page → "Review Preferences" section

### Tab 1: Task Categories

**Purpose**: General expertise areas

**How to Use**:
1. Click on category buttons to select/deselect
2. Set priority for each (1 = highest expertise, 10 = minimal)
3. Categories include:
   - Auto-Contouring
   - Clinical Prediction
   - Image Enhancement
   - Image Synthesis
   - Performance Monitor
   - Platform
   - Reconstruction
   - Registration
   - Tracking
   - Treatment Planning

**Priority Guide**:
- **1-3**: Primary expertise - Can review independently and provide deep insights
- **4-6**: Secondary expertise - Familiar, can review with occasional consultation
- **7-10**: Tertiary expertise - Basic knowledge, review only if needed

### Tab 2: Companies

**Purpose**: Indicate familiarity with specific vendors

**How to Use**:
1. Use search box to find companies
2. Click "Add" to include company in preferences
3. Set priority level (1-10 scale)
4. **Bulk Action**: Click 📦+ icon to "Select all products from this company"
   - Automatically adds all products from selected company to Product preferences
   - Inherits same priority level
   - Useful for vendors you're very familiar with

**Use Cases**:
- Worked with company's products clinically
- Attended training from vendor
- Familiar with company's development approach
- Used multiple products from same vendor

### Tab 3: Products

**Purpose**: Direct expertise with specific products

**How to Use**:
1. Search by product name, company, or category
2. Use filters to narrow results:
   - Filter by company
   - Filter by category
3. Click "Add" to include product
4. Set priority level (1-10 scale)
5. Add notes (optional) - e.g., "Used clinically for 3 years"

**Advanced Search**:
- Type to search across product names
- Results show: Product Name | Company | Category
- Real-time filtering as you type

### Import/Export Functionality

**Purpose**: Share preference templates or backup preferences

**Export**:
1. Click "Export" button
2. Downloads JSON file with all preferences
3. Includes: categories, companies, products, priorities, notes
4. Filename: `reviewer-preferences-[date].json`

**Import**:
1. Click "Import" button
2. Select previously exported JSON file
3. Review preview showing what will be imported
4. Existing preferences are preserved
5. Only new items are added
6. Click "Confirm Import"

**Use Cases**:
- Institutional templates (e.g., "Hospital physics team expertise")
- Backup before making changes
- Share with colleagues with similar expertise
- Onboard new reviewers with team's preferences

### Clear All Preferences

**Purpose**: Reset all preferences and start fresh

**How to Use**:
1. Click "Clear All Preferences" button (red, bottom of page)
2. Confirmation dialog shows: "X categories, Y companies, Z products will be removed"
3. Click "Clear All Preferences" to confirm
4. All `reviewer_expertise` entries deleted
5. Button is disabled if no preferences exist

**Warning**: This action cannot be undone. Consider exporting preferences first as backup.

---

## 2. Review Round Management

### Creating a Review Round

**Location**: Admin Dashboard → Review Rounds

**Step 1: Basic Information**
1. Click "Create New Round"
2. Fill in:
   - Round name
   - Deadline
   - Description
3. Click "Create Round"
4. Round appears with status "draft"

**Step 2: Start Round (Enhanced Flow)**

1. Click "Start Round" button
2. **Reviewer Selection Dialog opens**

### Reviewer Selection Dialog

**Purpose**: Choose which reviewers will participate in this round

**Interface**:
- Table showing all reviewers with:
  - Name & Email
  - Expertise counts (categories, companies, products)
  - Current workload (pending + in-progress reviews)
  - Estimated new assignments (calculated in real-time)

**Actions**:
- ✅ All reviewers selected by default
- Click checkboxes to select/deselect individual reviewers
- "Select All" / "Deselect All" toggle button
- Search to find specific reviewers

**Summary Panel** (updates dynamically):
- Total selected: X reviewers
- Products to assign: Y products
- Average per reviewer: ~Z products each
- Max variance: ±1 product (balanced distribution)

**Example Workflow**:
```
Initial state:
- 5 reviewers available
- 100 products to assign
- All selected by default
- Estimated: 20 products each

Admin notices Reviewer A has 50 pending reviews:
- Deselect Reviewer A
- Updated: 4 reviewers, ~25 products each

Admin clicks "Continue"
```

### Assignment Preview Dialog

**Purpose**: Review and manually adjust proposed assignments before finalizing

**Interface**:

**Summary Panel** (sticky header):
- Total assignments: X
- Reviewers involved: Y
- Unassigned products: Z (if any)
- Workload distribution visual (horizontal bars showing min-max-avg)
- Match quality indicators

**Assignment Table**:
| Product | Company | Category | Assigned To | Match Score | Actions |
|---------|---------|----------|-------------|-------------|---------|
| Product A | Company X | Auto-Contouring | Reviewer 1 | ⭐⭐⭐⭐⭐ (95%) | Reassign |
| Product B | Company Y | Treatment Planning | Reviewer 2 | ⭐⭐⭐⭐ (80%) | Reassign |

**Match Score Indicators**:
- ⭐⭐⭐⭐⭐ (90-100%): Perfect match - Product + Company + Category expertise
- ⭐⭐⭐⭐ (70-89%): Excellent - Company + Category expertise
- ⭐⭐⭐ (50-69%): Good - Category expertise only
- ⭐⭐ (30-49%): Fair - Secondary expertise
- ⭐ (0-29%): Limited - No direct match

**Grouping Options**:
- Group by reviewer (shows workload per reviewer)
- Group by category
- Group by company

**Sort Options**:
- By match score (highest/lowest first)
- By product name
- By reviewer workload
- By category

### Manual Reassignment

**Individual Product**:
1. Click "Reassign" button on product row
2. Dropdown shows all selected reviewers with:
   - Name
   - Current assignment count
   - Expertise match: ✓ Expert | ~ Familiar | ✗ No match
   - Color: 🟢 Below avg | 🟡 At avg | 🔴 Above avg
3. Click reviewer name to reassign
4. Table updates in real-time
5. Summary panel recalculates

**Bulk Actions**:
1. Select multiple products (checkboxes)
2. Click "Bulk Actions" dropdown:
   - "Reassign all to..." → Choose reviewer
   - "Distribute evenly" → Auto-balance among selected reviewers
   - "Assign by expertise only" → Ignore workload, maximize match
   - "Remove from round" → Unassign selected products

### Workload Balancing Tools

**Auto-Balance Button**:
- Redistributes to minimize variance (max ±1 product)
- Maintains expertise matches where possible
- Shows before/after comparison
- Requires confirmation

**Rerun Algorithm Button**:
- Discards all manual changes
- Reruns automatic assignment
- Uses current reviewer selection
- Useful if you want to start over

**Warnings** (shown automatically):
- ⚠️ "Reviewer X has 15 assignments (50% above average)"
- ⚠️ "5 products assigned to reviewers with no matching expertise"
- ⚠️ "Workload variance: 8 products (rebalancing recommended)"

### Finalization

**Footer Buttons**:
- **Cancel**: Discard all changes, return to rounds list
- **Save as Draft**: Save assignments but keep round in draft status
- **Confirm & Start Round**: 
  - Inserts assignments into database
  - Changes round status to "active"
  - Records all assignments in history
  - Triggers email notifications to all assigned reviewers

---

## 3. Assignment Algorithm

### Scoring System

The algorithm uses **weighted expertise scoring** to match products with reviewers:

**Scoring Formula**:
```
Total Score = (Product Match Score) + (Company Match Score) + (Category Match Score)
```

**Component Scores**:

1. **Product Match** (Highest Priority):
   - Base weight: 5x
   - Score: (11 - priority) × 5
   - Example: Priority 1 = 10×5 = 50 points

2. **Company Match** (Medium Priority):
   - Base weight: 2x
   - Score: (11 - priority) × 2
   - Example: Priority 3 = 8×2 = 16 points

3. **Category Match** (Base Priority):
   - Base weight: 3x
   - Score: (11 - priority) × 3
   - Example: Priority 2 = 9×3 = 27 points

**Example Scoring**:

```
Product: "Limbus Contour" (Limbus AI, Auto-Contouring)

Reviewer A preferences:
- Product: "Limbus Contour" (Priority 1) → 50 points
- Company: "Limbus AI" (Priority 2) → 18 points
- Category: "Auto-Contouring" (Priority 1) → 30 points
Total: 98 points (Excellent match!)

Reviewer B preferences:
- Category: "Auto-Contouring" (Priority 4) → 21 points
Total: 21 points (Fair match)

Assignment: Product goes to Reviewer A
```

### Workload Balancing

**Balanced Distribution Algorithm**:

1. **Calculate Target**:
   ```
   Total products = 100
   Selected reviewers = 4
   Base allocation = floor(100/4) = 25 per reviewer
   Remainder = 100 % 4 = 0 (no bonus slots needed)
   ```

2. **Distribute with Max Variance of 1**:
   - Some reviewers get N products
   - Some get N+1 products
   - **Never** N+2 or more difference
   - Example: 100 products, 3 reviewers → 33, 33, 34

3. **Consider Current Workload**:
   - If reviewer already has 20 pending reviews:
     - Reduce new assignments proportionally
     - Redistribute to reviewers with lighter load
   - Maintains team balance

4. **Real-Time Tracking**:
   - Algorithm tracks assignments as it progresses
   - Adjusts remaining assignments to maintain balance
   - If reviewer reaches target, skips to next best match

**Example Distribution**:

```
Round: 30 products to assign
Reviewers: 3 selected

Initial workload:
- Reviewer A: 5 pending reviews
- Reviewer B: 15 pending reviews  
- Reviewer C: 10 pending reviews

Target for round: 10 products each (30/3)

Algorithm adjusts for current load:
- Reviewer B gets 8 products (has high existing load)
- Reviewer A gets 12 products (has low existing load)
- Reviewer C gets 10 products (has average load)

Result: 
- A: 5+12 = 17 total (balanced)
- B: 15+8 = 23 total (protected from overload)
- C: 10+10 = 20 total (balanced)
```

### Priority Consideration

**Priority affects scoring** (lower number = higher expertise):

- Priority 1-3: Gets 8-10 points multiplier
- Priority 4-6: Gets 5-7 points multiplier
- Priority 7-10: Gets 1-4 points multiplier

This ensures:
- Primary experts get relevant products first
- Secondary experts fill gaps
- Tertiary experts only receive if no better match exists

---

## 4. Assignment History & Audit Trail

### Overview

Every assignment change is tracked in the `assignment_history` table, creating a complete audit trail.

### What's Tracked

**Change Types**:
- `initial`: Product assigned when round started
- `reassign`: Product moved from one reviewer to another
- `remove`: Product unassigned from reviewer

**Information Recorded**:
- Review round ID
- Product ID
- Assigned to (current reviewer)
- Previous assignee (for reassignments)
- Changed by (admin who made the change)
- Change type
- Reason (optional notes)
- Timestamp

### Viewing Assignment History

**Location**: Admin Dashboard → Review Rounds → Click round name → "Assignment History" tab

**Interface**:

**Current Assignments Tab**:
- Shows active assignments for the round
- Reviewer name, product list, status
- Links to product details

**Assignment History Tab**:
- Complete chronological log
- Filterable by:
  - Change type (initial, reassign, remove)
  - Reviewer
  - Date range
  - Product
  - Admin who made change

**History Table**:
| Timestamp | Action | Product | From | To | Changed By | Notes |
|-----------|--------|---------|------|-----|------------|-------|
| 2025-11-04 14:32 | Initial | Product A | - | Reviewer 1 | System | Auto-assigned |
| 2025-11-04 15:45 | Reassign | Product A | Reviewer 1 | Reviewer 2 | Admin Name | Workload balance |
| 2025-11-04 16:10 | Remove | Product B | Reviewer 3 | - | Admin Name | Product withdrawn |

### Use Cases

**Audit & Compliance**:
- Track who changed what and when
- Demonstrate fair distribution process
- Review decision-making rationale

**Process Improvement**:
- Analyze manual override patterns
- Identify frequently reassigned products (may need better matching)
- Track admin intervention frequency

**Conflict Resolution**:
- Verify original assignments
- Understand reassignment decisions
- Document workload adjustments

---

## 5. Email Notifications

### Overview

Automatic email notifications are sent to reviewers when they're assigned products in a review round.

### Setup Requirements

**Prerequisites**:
1. **Resend API Key**: Must be configured in Supabase
   - Location: Project Settings → Edge Functions → Secrets
   - Secret name: `RESEND_API_KEY`
2. **Verified Domain**: Domain must be verified in Resend dashboard
3. **Edge Function**: `notify-reviewer-assignment` must be deployed

### When Notifications Are Sent

**Triggered by**:
- Starting a new review round (all assigned reviewers notified)
- Confirming assignments in preview dialog

**Not triggered by**:
- Saving assignments as draft (only when confirmed/started)
- Reassignments (future enhancement)
- Assignment removal

### Email Content

**Subject**: "New Review Assignments - [Round Name]"

**Contains**:
- **Header**: DLinRT.eu branding with gradient
- **Greeting**: Personalized with reviewer name
- **Round Details**:
  - Round name
  - Deadline (formatted as human-readable date)
  - Description
- **Assignment Summary**:
  - Number of products assigned
  - List of product names (bulleted)
- **Call-to-Action**:
  - "Go to Review Dashboard" button
  - Direct link to reviewer dashboard
- **Deadline Reminder**:
  - Highlighted deadline date
  - Urgency indicator if deadline is soon
- **Footer**:
  - Help/support contact

**Example Email**:

```
Subject: New Review Assignments - Q1 2025 Product Review

Hi John,

You have been assigned 5 products to review for the Q1 2025 Product Review round.

Deadline: January 31, 2025

Products assigned to you:
• Limbus Contour v2.0 (Limbus AI)
• MVision Contours+ (MVision AI)
• RayStation 12B (RaySearch)
• ProteusOne (ProteusOne)
• Pinnacle³ Auto-Planning (Philips)

[Go to Review Dashboard]

Please complete your reviews by the deadline.

Best regards,
The DLinRT.eu Team
```

### Email Functionality

**Technical Details**:
- Sent via Resend API
- HTML formatted with responsive design
- Plain text fallback included

**Grouping Logic**:
- One email per reviewer per round
- Multiple products grouped in single email
- Batch processing for efficiency

**Error Handling**:
- Failed emails logged to edge function logs
- Admin notified of delivery failures (future)
- Retry mechanism for transient failures (future)

### Viewing Email Logs

**Location**: Supabase Dashboard → Edge Functions → `notify-reviewer-assignment` → Logs

**Information Available**:
- Email send attempts
- Success/failure status
- Error messages
- Reviewer email addresses
- Timestamp

---

## 6. Best Practices

### For Reviewers

**Setting Up Preferences**:
1. **Start with Categories**: Set your general expertise areas first
2. **Add Companies**: Include vendors you're familiar with
3. **Use Bulk Actions**: For companies you know well, use "Select all products from this company"
4. **Be Honest with Priorities**: Accurate priorities ensure you get appropriate assignments
5. **Keep Updated**: Review and update preferences as you gain experience
6. **Export Regularly**: Backup your preferences before major changes

**Priority Guidelines**:
- Don't set everything to Priority 1 (dilutes your expertise)
- Use full range 1-10 for better matching
- Priority 1-3: Products/areas you can review authoritatively
- Priority 4-6: Products/areas you're familiar with
- Priority 7-10: Products/areas you've had limited exposure to

**Import/Export**:
- Export before clearing preferences
- Share templates with team members with similar roles
- Update imported preferences with your own experience

### For Admins

**Creating Rounds**:
1. **Clear Naming**: Use descriptive names (e.g., "Q1 2025 - New Products Review")
2. **Reasonable Deadlines**: Allow 2-4 weeks for thorough reviews
3. **Balanced Selection**: Include mix of experienced and newer reviewers
4. **Check Workload**: Review current assignments before selecting reviewers

**Reviewer Selection**:
1. **Start with All**: Begin with all reviewers selected, then refine
2. **Consider Workload**: Deselect reviewers with >30 pending reviews
3. **Expertise Match**: Ensure selected reviewers have relevant expertise
4. **Team Balance**: Include diverse perspectives and backgrounds

**Assignment Preview**:
1. **Review Match Scores**: Check for low-scoring assignments
2. **Manual Adjustments**: Reassign products with poor matches
3. **Workload Check**: Use auto-balance if variance >2 products
4. **Document Reasoning**: Add notes for significant manual changes

**After Launch**:
1. **Monitor Progress**: Check completion rates regularly
2. **Send Reminders**: Contact reviewers nearing deadline
3. **Review History**: Analyze assignment history for insights
4. **Adjust Future Rounds**: Use data to improve next round's assignments

### For Organizations

**Institutional Templates**:
1. Create preference template for role (e.g., "Medical Physics Team")
2. Export and share with team members
3. Each person customizes to their specific experience
4. Maintain team template repository

**Onboarding New Reviewers**:
1. Provide relevant preference template
2. Review and import template
3. Customize based on individual experience
4. Start with Priority 5-7 initially, adjust as they gain familiarity

**Quality Assurance**:
1. Regular audits of assignment history
2. Review manual override frequency
3. Analyze reviewer feedback on assignments
4. Adjust algorithm weights if needed (contact admin)

---

## 7. Troubleshooting

### Reviewer Preferences Issues

**Problem**: "Clear All Preferences" button is disabled
- **Cause**: No preferences exist in database
- **Solution**: Add at least one preference first

**Problem**: Can't find company in search
- **Cause**: Company not in database yet
- **Solution**: Company must have at least one product added first

**Problem**: Import shows "0 items to import"
- **Cause**: All items in file already exist in preferences
- **Solution**: This is normal - import only adds new items

**Problem**: Bulk "Select all products" adds too many
- **Cause**: Company has many products
- **Solution**: Review added products, remove unwanted ones individually

### Assignment Issues

**Problem**: No reviewers shown in selection dialog
- **Cause**: No users with reviewer role exist
- **Solution**: Assign reviewer role to users first

**Problem**: All match scores are low
- **Cause**: Reviewers haven't set preferences for this product area
- **Solution**: Ask reviewers to update preferences before round

**Problem**: Workload is unbalanced despite auto-balance
- **Cause**: Odd number of products or existing workload differences
- **Solution**: ±1 variance is expected and acceptable

**Problem**: Assignment preview shows unassigned products
- **Cause**: No reviewers with expertise in that category
- **Solution**: Manually assign or recruit reviewers for that area

### Email Notification Issues

**Problem**: Emails not being sent
- **Cause**: RESEND_API_KEY not configured
- **Solution**: Add API key in Supabase → Project Settings → Edge Functions → Secrets

**Problem**: Emails going to spam
- **Cause**: Domain not verified in Resend
- **Solution**: Verify domain in Resend dashboard

**Problem**: Reviewer didn't receive email
- **Cause**: Email address incorrect or bounced
- **Solution**: Check edge function logs for delivery status

### Database Issues

**Problem**: "assignment_history table doesn't exist"
- **Cause**: Migration not run
- **Solution**: Run migration `20251104225808_*.sql`

**Problem**: TypeScript errors for assignment_history
- **Cause**: Types not regenerated after migration
- **Solution**: Regenerate types: `supabase gen types typescript`

### Performance Issues

**Problem**: Preference search is slow
- **Cause**: Large product database
- **Solution**: Use filters to narrow search, add more specific keywords

**Problem**: Assignment preview loads slowly
- **Cause**: Many products/reviewers
- **Solution**: Normal for large rounds (>100 products), wait for initial load

---

## 8. Technical Reference

### Database Tables

**reviewer_expertise**:
```sql
CREATE TABLE reviewer_expertise (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  preference_type TEXT CHECK (preference_type IN ('category', 'company', 'product')),
  category TEXT,
  company_id TEXT,
  product_id TEXT,
  priority INTEGER CHECK (priority BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**assignment_history**:
```sql
CREATE TABLE assignment_history (
  id UUID PRIMARY KEY,
  review_round_id UUID REFERENCES review_rounds,
  product_id TEXT,
  assigned_to UUID REFERENCES auth.users,
  previous_assignee UUID REFERENCES auth.users,
  changed_by UUID REFERENCES auth.users,
  change_type TEXT CHECK (change_type IN ('initial', 'reassign', 'remove')),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Edge Functions

**notify-reviewer-assignment**:
- **Purpose**: Send email notifications to reviewers
- **Trigger**: Called by `bulkAssignProducts` function
- **Inputs**: reviewerId, roundId, assignedProducts
- **Output**: Email sent via Resend API
- **Logs**: Available in Supabase Dashboard

### Utility Functions

**calculateProposedAssignments()**:
- **Location**: `src/utils/reviewRoundUtils.ts`
- **Purpose**: Generate balanced assignment proposals
- **Inputs**: products[], selectedReviewerIds[]
- **Output**: ProposedAssignment[]
- **Algorithm**: Weighted scoring + workload balancing

**bulkAssignProducts()**:
- **Location**: `src/utils/reviewRoundUtils.ts`
- **Purpose**: Insert assignments and trigger notifications
- **Inputs**: roundId, proposedAssignments[]
- **Side Effects**: Database inserts, email sends, history logging

---

## 9. Future Enhancements

Planned improvements:
1. **Notification Preferences**: Let reviewers choose email frequency
2. **Assignment Analytics**: Dashboard showing match quality metrics
3. **Automated Reminders**: Email reminders for approaching deadlines
4. **Reviewer Availability**: Calendar integration for vacation periods
5. **Historical Performance**: Track review quality and completion rates
6. **Machine Learning**: Suggest optimal assignments based on past reviews
7. **Bulk Reassignment**: Move multiple products between reviewers
8. **Assignment Templates**: Save and reuse assignment patterns
9. **Reviewer Groups**: Assign to teams rather than individuals
10. **Real-time Notifications**: In-app notifications for new assignments

---

## Contact & Support

For questions, issues, or feature requests:
- **Email**: info@dlinrt.eu
- **GitHub**: Open an issue
- **Documentation**: https://github.com/DLinRT-eu/website/docs

## Changelog

- **2025-11-04**: Complete overhaul with multi-dimensional preferences, balanced assignments, history tracking, and email notifications
- **2025-01-15**: Initial reviewer expertise system
