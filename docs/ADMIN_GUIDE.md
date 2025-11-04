# DLinRT.eu Admin Guide

## Overview

This guide covers all administrative functions in the DLinRT.eu platform, focusing on managing reviews, reviewers, products, and system monitoring.

## Table of Contents

1. [Review Round Management](#1-review-round-management)
2. [Reviewer Management](#2-reviewer-management)
3. [Product Review Management](#3-product-review-management)
4. [User Role Management](#4-user-role-management)
5. [System Monitoring](#5-system-monitoring)

---

## 1. Review Round Management

Review rounds provide a structured way to organize product reviews with balanced assignments and deadline tracking.

### Accessing Review Rounds

**Location**: `/admin/review-rounds` (Admin only)

### Creating a New Round

1. **Navigate** to Review Rounds page
2. **Click** "Create New Round" button
3. **Fill in details**:
   - **Name**: Descriptive name (e.g., "Q1 2025 Product Review")
   - **Deadline**: Target completion date
   - **Description**: Purpose and scope of the round
4. **Click** "Create Round"
5. Round is created with status "draft"

### Starting a Round with Balanced Assignments

**Step 1: Select Reviewers**

1. **Click** "Start Round" button
2. **Reviewer Selection Dialog** opens showing:
   - All reviewers with expertise data
   - Current workload for each reviewer
   - Estimated new assignments based on selection
3. **Review** and adjust selection:
   - All reviewers are selected by default
   - Deselect reviewers with high workload or unavailable
   - Use search to find specific reviewers
4. **Check summary**:
   - Total selected reviewers
   - Products to assign
   - Average assignments per reviewer
5. **Click** "Continue" to proceed to assignment preview

**Step 2: Review and Adjust Assignments**

1. **Assignment Preview Dialog** opens showing:
   - Proposed assignments for each product
   - Match scores indicating expertise alignment
   - Workload distribution across reviewers
2. **Review match scores**:
   - ⭐⭐⭐⭐⭐ (90-100%): Perfect match
   - ⭐⭐⭐⭐ (70-89%): Excellent match
   - ⭐⭐⭐ (50-69%): Good match
   - ⭐⭐ (30-49%): Fair match
   - ⭐ (0-29%): Limited match
3. **Manual adjustments** (optional):
   - Click "Reassign" on any product
   - Select different reviewer from dropdown
   - View expertise match and workload impact
4. **Bulk actions** (optional):
   - Select multiple products with checkboxes
   - Use "Auto-Balance" to optimize distribution
   - Use "Rerun Algorithm" to start over
5. **Check warnings**:
   - System alerts for unbalanced workload
   - Products with low match scores
   - Reviewers over average capacity
6. **Finalize**:
   - Click "Confirm & Start Round" to save and activate
   - Click "Cancel" to discard and return
   - Click "Save as Draft" to save without activating

### Monitoring Round Progress

**View Round Details**:
1. Navigate to Review Rounds page
2. Click on round name to view details
3. View two tabs:
   - **Current Assignments**: Active assignments and status
   - **Assignment History**: Complete audit trail

**Current Assignments Tab**:
- Shows all active assignments for the round
- Displays reviewer name and assigned products
- Links to individual product pages
- Shows completion status

**Assignment History Tab**:
- Chronological log of all assignment changes
- Filter by:
  - Change type (initial, reassign, remove)
  - Reviewer
  - Admin who made change
  - Date range
- Shows:
  - Timestamp of change
  - Action taken
  - Product affected
  - Previous and new assignee
  - Admin who made change
  - Reason (if provided)

### Best Practices for Review Rounds

**Planning**:
- Create rounds with clear scope and timeline
- Allow 2-4 weeks for thorough reviews
- Group related products in same round
- Schedule rounds to avoid reviewer overlap

**Reviewer Selection**:
- Check current workload before selecting
- Ensure expertise coverage for all product categories
- Include mix of experienced and newer reviewers
- Avoid assigning >30 products to single reviewer

**Assignment Review**:
- Prioritize high match scores (>70%)
- Manually reassign products with low scores
- Balance workload (use auto-balance tool)
- Document reasons for manual changes

**Monitoring**:
- Check progress weekly
- Send reminders 3-5 days before deadline
- Review completion rates across reviewers
- Analyze assignment history for insights

---

## 2. Reviewer Management

### Viewing Reviewers

**Location**: `/admin/users` or Review Assignment page

**Information Displayed**:
- Name and email
- Current workload (active assignments)
- Expertise areas (top 3 shown)
- Total expertise preferences count

### Managing Reviewer Preferences

Reviewers manage their own preferences, but admins can:
1. View reviewer expertise coverage
2. Encourage reviewers to update preferences
3. Export preference data for analysis
4. Review expertise gaps in team

**Encouraging Preference Updates**:
- Send reminders to reviewers without preferences
- Share preference templates for common roles
- Provide guidance on priority levels
- Review and validate preference accuracy

### Assigning Reviewer Role

**Location**: `/admin/users`

1. Find user in user list
2. Click "Assign Role" or "Manage Roles"
3. Select "Reviewer" role
4. Save changes
5. User can now set preferences and receive assignments

### Monitoring Reviewer Activity

**Workload Metrics**:
- Active assignments count
- Completion rate
- Average time to complete
- Overdue reviews

**Expertise Coverage**:
- Categories with coverage
- Companies with expertise
- Products with specific knowledge
- Priority distribution

---

## 3. Product Review Management

### Review Dashboard

**Location**: `/review`

**Features**:
- Filter products by status, category, company
- Export to CSV or Excel
- View summary statistics
- Track revision history
- Monitor data quality

### Individual Product Review

**Location**: `/review/:id`

**Actions Available**:
- View complete product data
- Edit product information
- Update review status
- Add reviewer notes
- Track changes history
- Submit updates

### Product Review Workflow

1. **Identify Products for Review**:
   - Use Review Dashboard filters
   - Check products without recent review
   - Focus on new products or updates

2. **Assign to Reviewers**:
   - Use review rounds for bulk assignment
   - Or manually assign specific products
   - Set priority and deadline

3. **Monitor Progress**:
   - Check Review Dashboard regularly
   - Follow up on overdue reviews
   - Review submitted changes

4. **Approve Changes**:
   - Review submitted updates
   - Verify information accuracy
   - Approve or request revisions
   - Publish approved changes

---

## 4. User Role Management

### Available Roles

- **Admin**: Full system access, can manage all features
- **Reviewer**: Can review products, manage own preferences
- **Company**: Can view and suggest updates to own products
- **User**: Basic access, can view public data

### Assigning Roles

**Location**: `/admin/users`

1. Navigate to Users page
2. Find user in list
3. Click "Assign Role" or role dropdown
4. Select appropriate role
5. Save changes
6. User receives updated permissions immediately

### Role Permissions

**Admin**:
- Create and manage review rounds
- Assign reviews to any reviewer
- View and export all data
- Manage user roles
- Access all admin pages

**Reviewer**:
- Set and manage expertise preferences
- Complete assigned reviews
- View own assignments and history
- Access review dashboard (own reviews)

**Company**:
- View own company's products
- Suggest updates and corrections
- Upload logos and materials
- View analytics for own products

**User**:
- Browse public product database
- View product details
- Export public data
- Create account and set preferences

### Best Practices

- Use least privilege principle
- Regularly audit role assignments
- Remove inactive reviewer access
- Document role change reasons
- Review permissions quarterly

---

## 5. System Monitoring

### Key Metrics to Monitor

**Review System Health**:
- Pending assignments count
- Overdue reviews count
- Average completion time
- Reviewer workload distribution

**Data Quality**:
- Products with incomplete data
- Products needing review
- Products with outdated information
- Verification status

**User Activity**:
- Active reviewers count
- New registrations
- Login frequency
- Feature usage

### Accessing Logs

**Supabase Dashboard**:
- Edge function logs: Monitor email sends, API calls
- Database logs: Track queries and errors
- Auth logs: Monitor login attempts and security

**Assignment History**:
- View in Review Round Details page
- Track all assignment changes
- Analyze manual override patterns
- Export for reporting

### Performance Optimization

**Database**:
- Monitor query performance
- Check index usage
- Review RLS policy efficiency
- Optimize slow queries

**Edge Functions**:
- Monitor execution time
- Check error rates
- Review memory usage
- Optimize function code

**Frontend**:
- Monitor page load times
- Check bundle size
- Review API call efficiency
- Optimize component rendering

### Troubleshooting Common Issues

**Email Notifications Not Sending**:
1. Check RESEND_API_KEY configured
2. Verify domain verified in Resend
3. Review edge function logs
4. Test with single email first

**Assignment Algorithm Issues**:
1. Verify reviewers have preferences set
2. Check expertise matches product categories
3. Review workload distribution
4. Check for database constraint errors

**Performance Issues**:
1. Review browser console for errors
2. Check network tab for slow requests
3. Monitor Supabase dashboard metrics
4. Optimize queries if needed

**Data Inconsistencies**:
1. Run database integrity checks
2. Review RLS policy logic
3. Check for orphaned records
4. Verify foreign key constraints

---

## Emergency Procedures

### Critical Issues

**Database Down**:
1. Check Supabase status page
2. Verify project status in dashboard
3. Contact Supabase support if needed
4. Notify users of downtime

**Security Breach**:
1. Immediately rotate all API keys
2. Review access logs for suspicious activity
3. Reset affected user passwords
4. Document incident details
5. Report to security team

**Data Loss**:
1. Check Supabase backups
2. Restore from most recent backup
3. Document lost data extent
4. Notify affected users
5. Review backup procedures

---

## Support and Resources

### Documentation Links

- [Reviewer Assignment Guide](./REVIEWER_ASSIGNMENT_GUIDE.md)
- [Reviewer Guide](./REVIEWER_GUIDE.md)
- [Review Guide](./review/GUIDE.md)
- [Product Documentation](./review/README.md)

### Contact Information

- **Email**: info@dlinrt.eu
- **GitHub**: Open an issue for bugs or features
- **Documentation**: Full documentation in `/docs` folder

### Admin Resources

- Supabase Dashboard: Manage database and services
- Resend Dashboard: Monitor email delivery
- GitHub Repository: Review code and documentation
- Analytics Dashboard: View usage statistics

---

## Best Practices Summary

### Daily Tasks
- Monitor pending assignments
- Check for overdue reviews
- Review new user registrations
- Respond to support requests

### Weekly Tasks
- Analyze completion rates
- Review assignment history
- Check data quality metrics
- Update documentation as needed

### Monthly Tasks
- Audit user roles
- Review system performance
- Analyze reviewer productivity
- Plan upcoming review rounds

### Quarterly Tasks
- Comprehensive security review
- Database optimization
- Feature usage analysis
- Strategic planning session

---

*Last Updated: 2025-11-04*
*Version: 2.0*
