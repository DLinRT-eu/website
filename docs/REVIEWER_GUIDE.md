# DLinRT.eu Reviewer Guide

## Welcome to DLinRT.eu!

This guide will help you understand your role as a reviewer and how to use the platform effectively.

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Setting Up Your Preferences](#2-setting-up-your-preferences)
3. [Understanding Assignments](#3-understanding-assignments)
4. [Reviewing Products](#4-reviewing-products)
5. [Managing Your Workload](#5-managing-your-workload)
6. [Best Practices](#6-best-practices)

---

## 1. Getting Started

### What is a Reviewer?

As a reviewer in DLinRT.eu, you help maintain the accuracy and completeness of the deep learning radiotherapy product database. Your expertise ensures that healthcare professionals have reliable information for decision-making.

### Your Responsibilities

- **Review assigned products** thoroughly and accurately
- **Update product information** based on your expertise
- **Meet deadlines** for review rounds
- **Maintain expertise preferences** to ensure appropriate assignments
- **Communicate issues** when you encounter problems

### Accessing Your Dashboard

**Location**: Navigate to your profile or reviewer dashboard

**What You'll See**:
- Current assignments with deadlines
- Review status for each product
- Your expertise preferences
- Assignment history

---

## 2. Setting Up Your Preferences

### Why Preferences Matter

Your preferences help the system assign products that match your expertise, ensuring:
- You review products you're qualified to evaluate
- Your workload is balanced with other reviewers
- The review quality is maximized
- You spend time on areas where you add most value

### Accessing Preferences

**Location**: Profile Page → "Review Preferences" section

### The Three Dimensions of Expertise

#### 1. Task Categories

**Purpose**: Indicate your general expertise areas

**Available Categories**:
- **Auto-Contouring**: Automated organ and structure segmentation
- **Clinical Prediction**: Outcome prediction and risk models
- **Image Enhancement**: Image quality improvement techniques
- **Image Synthesis**: Synthetic image generation (e.g., MR to CT)
- **Performance Monitor**: QA and monitoring tools
- **Platform**: Comprehensive treatment planning platforms
- **Reconstruction**: 3D image reconstruction
- **Registration**: Image registration and fusion
- **Tracking**: Motion tracking and management
- **Treatment Planning**: Treatment planning systems and optimization

**How to Set**:
1. Click on category buttons to select/deselect
2. For each selected category, set priority (1-10)
3. Lower number = higher expertise

**Priority Guide**:
- **1-3 (Primary)**: Your main areas of expertise
  - You can review independently
  - You provide authoritative insights
  - You've published or worked extensively in this area
- **4-6 (Secondary)**: Areas you're familiar with
  - You can review with occasional consultation
  - You have practical experience
  - You understand the domain well
- **7-10 (Tertiary)**: Basic familiarity
  - Limited exposure
  - Can review if no primary experts available
  - Requires more research for thorough review

#### 2. Companies

**Purpose**: Indicate familiarity with specific vendors

**How to Set**:
1. Use search box to find companies
2. Click "Add" to include in your preferences
3. Set priority level (1-10)
4. Use 📦+ icon to bulk-add all company products

**When to Add a Company**:
- You've used their products clinically
- You've attended their training or conferences
- You're familiar with their development approach
- You've collaborated with the company
- You understand their product philosophy

**Example**:
```
Company: Varian
Priority: 2 (high expertise)
Reason: Used multiple Varian products clinically for 5+ years
Action: Click 📦+ to add all Varian products to Product preferences
```

#### 3. Products

**Purpose**: Indicate direct experience with specific products

**How to Set**:
1. Search by product name, company, or category
2. Use filters to narrow results
3. Click "Add" to include product
4. Set priority level (1-10)
5. Add notes about your experience (optional but recommended)

**Advanced Search Features**:
- Type to search across product names
- Filter by company
- Filter by category
- Real-time results as you type

**Example Product Preferences**:
```
Product: Limbus Contour
Priority: 1
Notes: "Used clinically for head-neck cases, 3 years experience"

Product: RayStation
Priority: 2
Notes: "Primary planning system at our institution"

Product: MVision Contours+
Priority: 5
Notes: "Evaluated during trial period"
```

### Import/Export Functionality

#### Exporting Preferences

**Why Export**:
- Backup before making major changes
- Share with colleagues at your institution
- Document your expertise profile

**How to Export**:
1. Click "Export" button at bottom of preferences page
2. JSON file downloads automatically
3. Filename: `reviewer-preferences-[date].json`

**What's Included**:
- All category preferences with priorities
- All company preferences with priorities
- All product preferences with priorities and notes
- Timestamp of export

#### Importing Preferences

**Why Import**:
- Restore from backup
- Use institutional template
- Onboard quickly with team preferences

**How to Import**:
1. Click "Import" button
2. Select previously exported JSON file
3. Review preview showing what will be imported
4. Existing preferences are kept (import only adds new items)
5. Click "Confirm Import"

**Important Notes**:
- Import does NOT overwrite existing preferences
- Only NEW items are added
- Useful for team templates while keeping individual customizations

### Clear All Preferences

**Purpose**: Reset all preferences and start fresh

**How to Use**:
1. Click "Clear All Preferences" button (red, bottom of page)
2. Review confirmation dialog showing counts
3. Click "Clear All Preferences" to confirm
4. All preferences deleted immediately

**⚠️ Warning**: This action cannot be undone. Export first as backup!

**When to Use**:
- Changing roles or focus areas completely
- Starting with team template
- Correcting major mistakes in preference setup

---

## 3. Understanding Assignments

### How You Receive Assignments

**Email Notification**:
When you're assigned products in a review round, you receive an email with:
- Round name and description
- Deadline date
- List of assigned products with companies
- Direct link to your review dashboard
- Number of products assigned

**Example Email**:
```
Subject: New Review Assignments - Q1 2025 Product Review

Hi Jane,

You have been assigned 8 products to review for the Q1 2025 Product Review round.

Deadline: February 15, 2025

Products assigned to you:
• Limbus Contour v2.0 (Limbus AI)
• MVision Contours+ (MVision AI)
• RayStation 12B (RaySearch)
...

[Go to Review Dashboard]
```

### Assignment Algorithm

**How Products Are Matched to You**:

The system uses intelligent matching based on:

1. **Product Expertise** (Highest Weight):
   - If you have the exact product in preferences → High priority
   - Priority 1 preference = 50 points

2. **Company Expertise** (Medium Weight):
   - If you know the company → Medium priority
   - Priority 1 preference = 20 points

3. **Category Expertise** (Base Weight):
   - If you know the category → Base priority
   - Priority 1 preference = 30 points

**Example Match**:
```
Product: "Limbus Contour" (Limbus AI, Auto-Contouring)

Your Preferences:
- Product "Limbus Contour": Priority 1 → 50 points
- Company "Limbus AI": Priority 2 → 18 points
- Category "Auto-Contouring": Priority 1 → 30 points
Total Score: 98 points (Excellent match!)

You're assigned this product because:
✓ You have direct product experience
✓ You know the company well
✓ You're an expert in auto-contouring
```

**Workload Balancing**:
- System distributes products evenly across reviewers
- Maximum difference: ±1 product between reviewers
- Considers your current pending reviews
- Protects you from overload

### Viewing Your Assignments

**Location**: Reviewer Dashboard or Profile Page

**Information Shown**:
- Product name and company
- Review status (Pending, In Progress, Completed)
- Deadline date
- Days remaining
- Priority level
- Link to product details

**Status Indicators**:
- 🟢 **Pending**: Not started yet
- 🟡 **In Progress**: You've opened and are working on it
- ✅ **Completed**: Review submitted
- 🔴 **Overdue**: Past deadline

---

## 4. Reviewing Products

### Starting a Review

1. **Navigate** to your assignments
2. **Click** on product name
3. **Review** existing product information
4. **Check** all fields for accuracy and completeness

### What to Review

**Essential Information**:
- Product name and version
- Company/manufacturer details
- Product category (primary and secondary)
- Description and key features
- Regulatory status (CE, FDA, etc.)
- Certifications and compliance

**Technical Details**:
- Supported modalities
- Anatomical structures/regions
- Integration capabilities
- System requirements
- Performance characteristics

**Market Information**:
- Release date
- Availability status
- Geographic markets
- Licensing model

**Evidence & Research**:
- Clinical publications
- Validation studies
- Performance metrics
- Real-world evidence

### Making Updates

**How to Edit**:
1. Click "Edit" or update fields directly
2. Make necessary corrections or additions
3. Add notes about changes made
4. Cite sources when adding new information
5. Save changes

**Best Practices**:
- **Verify information**: Use official sources when possible
- **Add citations**: Link to publications or company documentation
- **Be objective**: Avoid promotional language
- **Be complete**: Fill in all applicable fields
- **Be accurate**: Double-check technical specifications

### Submitting Your Review

1. **Review all changes** you've made
2. **Add reviewer notes** (optional but recommended):
   - What you verified
   - What you updated
   - Any concerns or questions
   - Sources consulted
3. **Set status** to "Completed"
4. **Submit** review
5. **Confirmation** shown

---

## 5. Managing Your Workload

### Understanding Your Capacity

**Recommended Workload**:
- **Light**: 1-5 products per round
- **Moderate**: 6-15 products per round
- **Heavy**: 16-25 products per round
- **Maximum**: 30 products per round (rare)

**Time Estimates**:
- Simple review (minor updates): 15-30 minutes
- Moderate review (several updates): 30-60 minutes
- Comprehensive review (major updates): 1-2 hours
- Complex product (new entry): 2-4 hours

### Prioritizing Your Assignments

**By Deadline**:
1. Sort by deadline (nearest first)
2. Focus on products due within 3 days
3. Complete urgent assignments first

**By Expertise**:
1. Start with your highest expertise areas
2. Complete products you know well first
3. Research unfamiliar products last

**By Complexity**:
1. Quick wins: Products needing minor updates
2. Moderate: Products with several gaps
3. Complex: Products requiring extensive research

### When You're Overloaded

**Immediate Actions**:
1. **Contact admin** via info@dlinrt.eu
2. **Explain situation**: Current workload, capacity constraints
3. **Request adjustment**: Specific products to reassign
4. **Propose solution**: Alternative timeline or reduced assignments

**Preventive Measures**:
- **Update preferences regularly**: Reflect actual availability
- **Set realistic priorities**: Don't overstate expertise
- **Communicate early**: As soon as you see potential issues
- **Plan ahead**: Review assignments when received

### Taking Breaks

**Extended Absence**:
If you'll be unavailable for extended period:
1. Notify admin team before departure
2. Complete pending reviews or request reassignment
3. Update preferences to reflect availability
4. Set status to "Unavailable" if feature exists

**Returning from Break**:
1. Review any assignments made during absence
2. Request deadline extensions if needed
3. Update preferences if expertise has changed
4. Resume normal review activities

---

## 6. Best Practices

### Setting Preferences

**Do's**:
- ✅ Be honest about your expertise level
- ✅ Use the full 1-10 priority range
- ✅ Update preferences as you gain experience
- ✅ Add notes to product preferences
- ✅ Export preferences regularly as backup
- ✅ Use bulk actions for companies you know well

**Don'ts**:
- ❌ Set everything to Priority 1 (dilutes meaning)
- ❌ Add products you've never heard of
- ❌ Overstate your expertise level
- ❌ Forget to update after gaining new skills
- ❌ Clear preferences without exporting first

### Conducting Reviews

**Do's**:
- ✅ Verify information from official sources
- ✅ Add citations for new information
- ✅ Be thorough but objective
- ✅ Fill in missing fields when possible
- ✅ Add reviewer notes explaining changes
- ✅ Submit reviews on time

**Don'ts**:
- ❌ Copy marketing materials verbatim
- ❌ Add unverified information
- ❌ Make assumptions without evidence
- ❌ Leave reviews incomplete
- ❌ Miss deadlines without communication
- ❌ Make judgments about product quality (stay objective)

### Communication

**When to Contact Admin**:
- Workload is too high
- Need deadline extension
- Found critical error in product data
- Questions about product categorization
- Uncertain how to handle situation
- Concerns about assignment appropriateness

**How to Communicate**:
- **Email**: info@dlinrt.eu for non-urgent matters
- **Notes**: Add to review for product-specific questions
- **Early**: Don't wait until deadline to raise issues
- **Clear**: Provide specific details and context
- **Professional**: Maintain constructive tone

### Time Management

**Efficient Review Process**:
1. **Batch similar products**: Review all auto-contouring products together
2. **Set dedicated time**: Block calendar for review sessions
3. **Start with easy ones**: Build momentum with quick reviews
4. **Research efficiently**: Use saved sources and references
5. **Take breaks**: Quality decreases with fatigue

**Weekly Review Schedule Example**:
```
Monday: Review assignments, prioritize
Tuesday: Complete 2-3 high-priority reviews
Wednesday: Research complex products
Thursday: Complete 2-3 moderate reviews
Friday: Submit remaining reviews, update preferences
```

---

## Common Questions

### About Assignments

**Q: Why was I assigned this product?**
A: Check your preferences - you likely have expertise in the product, company, or category. The system matches based on your preference priorities.

**Q: Can I decline an assignment?**
A: Contact admin team if an assignment is inappropriate. Early communication allows reassignment.

**Q: How many products will I typically receive?**
A: Depends on your preferences, current workload, and available reviewers. Usually 5-20 products per round.

### About Preferences

**Q: How often should I update my preferences?**
A: Review quarterly or whenever your expertise significantly changes.

**Q: What if I set my priorities wrong?**
A: You can update them anytime. Changes apply to future assignments, not current ones.

**Q: Can I remove preferences?**
A: Yes, individually or use "Clear All Preferences" to start over.

### About Reviews

**Q: What if I don't have time to complete a review?**
A: Contact admin immediately to request reassignment or deadline extension.

**Q: Can I review products not assigned to me?**
A: Focus on assigned products first. Contact admin if you want to contribute to others.

**Q: What if I find incorrect information?**
A: Correct it in your review and note the change. Add citations for verification.

---

## Getting Help

### Support Resources

- **Email**: info@dlinrt.eu
- **Documentation**: Review this guide and other docs in `/docs`
- **Admin Team**: Reach out for questions or concerns
- **Reviewer Community**: Connect with other reviewers (if available)

### Reporting Issues

**Technical Issues**:
- Can't access dashboard
- Can't submit review
- System errors or bugs

**Content Issues**:
- Missing product information
- Conflicting data sources
- Categorization questions

**Assignment Issues**:
- Wrong expertise match
- Workload concerns
- Deadline conflicts

---

## Thank You!

Your expertise and dedication help maintain the quality of the DLinRT.eu database. Healthcare professionals rely on accurate information for critical decisions, and your reviews make that possible.

**Key Takeaways**:
- Set honest, detailed preferences
- Review thoroughly and objectively
- Communicate early about issues
- Meet deadlines or request extensions
- Update preferences as you grow

Welcome to the reviewer community!

---

*Last Updated: 2025-11-04*
*Version: 1.0*
