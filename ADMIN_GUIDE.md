# Admin Guide - DLinRT.eu

## Overview

This guide provides comprehensive instructions for administrators to manage the DLinRT.eu platform effectively. As an admin, you have elevated permissions to manage users, assign reviews, monitor security, and maintain the quality of the product database.

## Table of Contents

1. [Accessing Admin Features](#accessing-admin-features)
2. [Admin Dashboard](#admin-dashboard)
3. [User Management](#user-management)
4. [Review Assignment](#review-assignment)
5. [Security Monitoring](#security-monitoring)
6. [Best Practices](#best-practices)
7. [Emergency Procedures](#emergency-procedures)

---

## Accessing Admin Features

### Admin Navigation

Once logged in with an admin account, you'll see additional navigation options:

1. **Admin Dropdown** (Header): Click your profile avatar → Access admin-specific pages
2. **Admin Dashboard**: `/admin` - Central hub for all administrative functions
3. **User Management**: `/admin/users` - Manage user roles and permissions
4. **Review Assignment**: `/admin/reviews` - Assign product reviews to reviewers
5. **Security Dashboard**: `/admin/security` - Monitor security events and threats

### Admin Accounts

Current super admin emails (automatically granted admin role upon signup):
- matteo.maspero@dlinrt.eu
- mustafa.kadhim@dlinrt.eu
- ana.barragan@dlinrt.eu
- paul.doolan@dlinrt.eu
- federico.mastroleo@dlinrt.eu
- viktor.rogowski@dlinrt.eu
- info@dlinrt.eu

---

## Admin Dashboard

**Location**: `/admin`

The admin dashboard provides a comprehensive overview of system activity:

### Key Metrics

- **Total Users**: Breakdown by role (admin, reviewer, company, no role)
- **Pending Requests**: Role requests awaiting your review
- **Active Reviews**: Current review status (pending, in progress, completed, overdue)
- **Security Events**: High/critical security events in the last 24 hours

### Quick Actions

- **Assign Reviews**: Quickly navigate to review assignment page
- **Manage Users**: Access user management interface
- **Security Dashboard**: View detailed security monitoring
- **Review Dashboard**: Access the product review interface

### Activity Feed

Monitor recent platform activity:
- Role requests submitted
- Review assignments made
- New user signups
- Security events logged

### Alerts Section

Immediate attention items:
- **Overdue Reviews**: Reviews past their deadline
- **Pending Role Requests**: Requests older than 24 hours
- **Pending Revisions**: Company-submitted revisions awaiting verification
- **Security Events**: Recent high/critical security incidents

---

## User Management

**Location**: `/admin/users`

### Viewing Users

The user management page displays:
- Full name and email
- Institution affiliation
- Current roles
- Actions available

### Granting Roles

1. Click **"Add Role"** button next to a user
2. Select role from dropdown:
   - **Admin**: Full system access, can manage all users and reviews
   - **Reviewer**: Can access reviewer dashboard and assigned reviews
   - **Company**: Can submit product revisions for their company
3. Click **"Grant Role"**

### Revoking Roles

- Click the **X icon** next to any role badge
- Confirm the revocation
- User loses access to role-specific features immediately

### Role Request Management

**Pending Requests Section** (top of page):

1. **View Request**: Shows requester details, desired role, and justification
2. **Review Request**: Click "Review" button
3. **Decision Options**:
   - **Approve**: Grants the requested role immediately
   - **Reject**: Denies the request (user can resubmit later)
   - **Cancel**: Close dialog without action

### Best Practices for Role Management

- **Verify Identity**: Confirm the user's identity before granting admin/reviewer roles
- **Company Verification**: For company roles, verify the user actually represents the company
  - Check company email domain
  - Request supporting documentation if needed
- **Document Decisions**: Use reviewer feedback field to note why requests were approved/rejected
- **Regular Audits**: Periodically review user roles to ensure they're still appropriate

---

## Review Assignment

**Location**: `/admin/reviews`

### Assigning Reviews

1. **Select Product**: Choose product requiring review from the list
2. **Select Reviewer**: Assign to a user with reviewer or admin role
3. **Set Priority**: Choose priority level (high, medium, low)
4. **Set Deadline**: Assign a reasonable deadline based on review complexity
5. **Add Notes** (optional): Provide context or special instructions

### Review Status Tracking

- **Pending**: Review assigned but not started
- **In Progress**: Reviewer has begun work
- **Completed**: Review finished and submitted
- **Overdue**: Past deadline without completion

### Managing Review Workload

- **Balance Load**: Distribute reviews evenly among reviewers
- **Consider Expertise**: Match products to reviewers with relevant domain knowledge
- **Monitor Deadlines**: Check dashboard for overdue reviews
- **Reassign When Needed**: If a reviewer is overloaded or unavailable

### Bulk Assignment (Future Feature)

- Select multiple products
- Assign all to one reviewer
- Set consistent deadlines across batch

---

## Security Monitoring

**Location**: `/admin/security`

### Security Dashboard Overview

Monitor system security with real-time metrics:

- **Events (24h)**: Total security events in last 24 hours
- **Critical Events**: Severe security incidents requiring immediate attention
- **MFA Enrollment**: Percentage of users with multi-factor authentication enabled
- **High Priority Events**: Important security events from last 7 days

### Event Types

Common security events:
- **Failed Login Attempts**: Multiple failed password attempts
- **Account Lockout**: User locked out due to failed attempts
- **Suspicious Activity**: Unusual access patterns detected
- **MFA Failures**: Failed two-factor authentication attempts
- **Password Reset Requests**: User-initiated password changes

### Severity Levels

- **Critical** (Red): Immediate action required (e.g., potential breach)
- **High** (Orange): Important, address within hours
- **Medium** (Yellow): Notable, review within 24 hours
- **Low** (Gray): Informational, no immediate action needed

### Responding to Security Events

1. **Critical Events**:
   - Investigate immediately
   - Lock affected accounts if necessary
   - Contact security team
   - Document incident

2. **High/Medium Events**:
   - Review event details
   - Determine if legitimate or suspicious
   - Take appropriate action (warn user, require password reset, etc.)
   - Monitor for patterns

3. **Low Events**:
   - Regular monitoring
   - Look for emerging patterns
   - No immediate action typically required

### Enabling Leaked Password Protection

**IMPORTANT**: Go to Supabase Auth settings and enable "Leaked Password Protection" to prevent users from using compromised passwords.

---

## Best Practices

### General Administration

1. **Regular Monitoring**: Check admin dashboard daily
2. **Timely Responses**: Review role requests within 24 hours
3. **Clear Communication**: Document decisions and provide feedback
4. **Security First**: Prioritize security events and MFA enrollment

### User Role Management

- **Principle of Least Privilege**: Grant minimum necessary permissions
- **Regular Audits**: Review roles quarterly
- **Document Changes**: Keep track of role grants/revocations
- **Verify Company Reps**: Thoroughly vet company representative requests

### Review Assignment

- **Fair Distribution**: Balance workload across reviewers
- **Realistic Deadlines**: Allow adequate time for thorough reviews
- **Follow Up**: Check in on overdue reviews
- **Quality Over Speed**: Prioritize review quality

### Security

- **Enable MFA**: Require MFA for all admin accounts
- **Strong Passwords**: Enforce strong password requirements
- **Monitor Activity**: Regularly check security dashboard
- **Incident Response**: Have a plan for security incidents

---

## Emergency Procedures

### Compromised Account

1. **Immediate Action**:
   - Revoke all roles from compromised account
   - Force password reset
   - Review account activity logs

2. **Investigation**:
   - Check security events for suspicious activity
   - Determine scope of compromise
   - Identify affected data/systems

3. **Recovery**:
   - User must verify identity before role restoration
   - Require MFA enrollment
   - Monitor account closely post-recovery

### Security Breach

1. **Contain**: Lock affected accounts immediately
2. **Assess**: Determine breach scope and impact
3. **Notify**: Alert all admins and affected users
4. **Document**: Record all details and actions taken
5. **Remediate**: Fix vulnerability and restore security
6. **Review**: Post-incident analysis and prevention planning

### Database Issues

1. **Contact Technical Team**: Email info@dlinrt.eu
2. **Document Issue**: Detailed description of problem
3. **Avoid Changes**: Don't make database modifications unless instructed
4. **Monitor**: Check status updates from technical team

### Missing Admin Access

If you're supposed to be an admin but lack access:

1. **Check Email**: Verify you're using the correct email address listed above
2. **Sign Up**: If not registered, create an account with your admin email
3. **Wait**: Admin role is automatically granted on signup for listed emails
4. **Contact Support**: If still no access, email info@dlinrt.eu

---

## Password Reset for Administrators

If you need to reset your password:

1. Go to https://dlinrt.eu/reset-password
2. Enter your admin email address
3. Check your email for the reset link (check spam folder if not found)
4. Click the link - you'll be redirected to the password update page
5. Wait for the page to verify your reset link (~2 seconds)
6. Enter your new password (must meet security requirements)
7. Click "Update Password"
8. You'll be redirected to the login page
9. Log in with your new password

### Password Requirements

- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*)

### Troubleshooting Password Reset

- **"Auth session missing!" error** → Request a new reset link
- **Link is expired** → Request a new reset link (links expire after 1 hour)
- **Email doesn't arrive** → Check spam folder, wait 5 minutes, try again
- **"Invalid reset link" message** → Link may have been used already, request a new one
- **Still having issues** → Contact technical support at info@dlinrt.eu

---

## Troubleshooting

### Can't Access Admin Pages

- Verify you're logged in
- Check you have admin role (see profile dropdown)
- Clear browser cache and cookies
- Try different browser

### Role Request Not Showing

- Refresh the page
- Check request status (may already be processed)
- Verify request was submitted successfully

### Review Assignment Fails

- Ensure target user has reviewer or admin role
- Check all required fields are filled
- Verify product ID exists
- Check for conflicting assignments

---

## Support

For technical issues or questions:

- **Email**: info@dlinrt.eu
- **Documentation**: Review relevant documentation files
- **Team Consultation**: Discuss with other admins

---

## Additional Resources

- [Contributing Guide](CONTRIBUTING.md) - General contribution guidelines
- [Security Policy](SECURITY.md) - Security guidelines and reporting
- [Field Reference](docs/FIELD_REFERENCE.md) - Product data field documentation
- [Review Guide](docs/review/GUIDE.md) - Product review process

---

*Last Updated: January 2025*
*Document Version: 1.0*
