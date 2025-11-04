export type ChangelogCategory = 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security';

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string; // YYYY-MM-DD format
  category: ChangelogCategory;
  title: string;
  description: string;
  details?: string; // Optional detailed markdown
  links?: {
    text: string;
    url: string;
  }[];
  author?: string;
}

export const changelogData: ChangelogEntry[] = [
  {
    id: 'changelog-001',
    version: '2.0.0',
    date: '2025-11-04',
    category: 'feature',
    title: 'Enhanced Reviewer Assignment System',
    description: 'Comprehensive reviewer assignment system with multi-dimensional preferences, intelligent workload balancing, and complete audit trail.',
    details: `
### Key Features
- **Multi-dimensional preferences**: Categories, companies, and products
- **Intelligent assignment algorithm**: Weighted scoring with expertise matching
- **Workload balancing**: Maximum ±1 product variance across reviewers
- **Assignment preview**: Full review and manual override capabilities
- **Assignment history**: Complete audit trail of all changes
- **Email notifications**: Automatic alerts to reviewers with assignment details

### Components Added
- Reviewer Selection Dialog
- Assignment Preview Dialog
- Review Round Details page with history tracking
- Preference management with import/export
    `,
    links: [
      { text: 'Reviewer Assignment Guide', url: '/docs/REVIEWER_ASSIGNMENT_GUIDE.md' },
      { text: 'Admin Guide', url: '/docs/ADMIN_GUIDE.md' },
      { text: 'Reviewer Guide', url: '/docs/REVIEWER_GUIDE.md' },
    ],
  },
  {
    id: 'changelog-002',
    version: '2.0.0',
    date: '2025-11-04',
    category: 'feature',
    title: 'Assignment History & Audit Trail',
    description: 'Complete tracking of all assignment changes with timestamps, reasons, and admin attribution.',
    details: `
### Tracking Capabilities
- Initial assignments logged automatically
- Reassignments tracked with previous assignee
- Removal events documented
- Admin attribution for all changes
- Optional reason field for manual changes

### Use Cases
- Audit and compliance
- Process improvement analysis
- Conflict resolution
- Historical review
    `,
    links: [
      { text: 'View Assignment History', url: '/admin/review-rounds' },
    ],
  },
  {
    id: 'changelog-003',
    version: '2.0.0',
    date: '2025-11-04',
    category: 'feature',
    title: 'Email Notifications for Reviewers',
    description: 'Automatic email notifications when reviewers are assigned products, including assignment details and deadlines.',
    details: `
### Email Features
- Personalized greeting with reviewer name
- Round details with description and deadline
- List of assigned products with companies
- Direct link to review dashboard
- Deadline reminder and urgency indicator
- Professional HTML formatting with branding

### Technical Implementation
- Resend API integration
- Edge function deployment
- Batch processing for efficiency
- Error logging and monitoring
    `,
    links: [
      { text: 'Email Setup Guide', url: '/docs/REVIEWER_ASSIGNMENT_GUIDE.md#5-email-notifications' },
    ],
  },
  {
    id: 'changelog-004',
    version: '2.0.0',
    date: '2025-11-04',
    category: 'improvement',
    title: 'Reviewer Preferences Enhancement',
    description: 'Enhanced preference management with bulk actions, import/export, and clear all functionality.',
    details: `
### New Capabilities
- **Bulk Actions**: Select all products from a company with one click
- **Import/Export**: Share preference templates across team
- **Clear All**: Reset preferences with confirmation dialog
- **Priority System**: 1-10 scale for nuanced expertise levels
- **Notes Field**: Add context to product preferences

### User Experience
- Three-tabbed interface (Categories, Companies, Products)
- Real-time search and filtering
- Visual priority indicators
- Preference statistics dashboard
    `,
    links: [
      { text: 'Preference Guide', url: '/docs/REVIEWER_GUIDE.md#2-setting-up-your-preferences' },
    ],
  },
  {
    id: 'changelog-005',
    version: '2.0.0',
    date: '2025-11-04',
    category: 'documentation',
    title: 'Comprehensive Documentation Overhaul',
    description: 'Complete rewrite and expansion of documentation covering all new features and workflows.',
    details: `
### New Documentation
- **Admin Guide**: Complete guide for administrative functions
- **Reviewer Guide**: Comprehensive guide for reviewers
- **Reviewer Assignment Guide**: Detailed technical documentation
- **Updated README**: Enhanced with new features and admin pages

### Documentation Features
- Step-by-step workflows
- Best practices and guidelines
- Troubleshooting sections
- Technical reference
- Common questions and answers
    `,
    links: [
      { text: 'Admin Guide', url: '/docs/ADMIN_GUIDE.md' },
      { text: 'Reviewer Guide', url: '/docs/REVIEWER_GUIDE.md' },
      { text: 'Assignment Guide', url: '/docs/REVIEWER_ASSIGNMENT_GUIDE.md' },
    ],
  },
  {
    id: 'changelog-006',
    version: '1.5.0',
    date: '2025-05-27',
    category: 'feature',
    title: 'Multi-Category Product Support',
    description: 'Products can now belong to multiple categories using the secondaryCategories field.',
    details: `
### Implementation
- Primary category for main functionality
- Secondary categories for additional features
- Enhanced product discovery across categories
- Updated filtering and search

### Use Cases
- Treatment planning systems with auto-contouring
- Platforms with multiple integrated modules
- Products spanning multiple clinical workflows
    `,
  },
  {
    id: 'changelog-007',
    version: '1.5.0',
    date: '2025-05-27',
    category: 'feature',
    title: 'Product Versioning Support',
    description: 'Added comprehensive version tracking for products with separate entries for major versions.',
    details: `
### Versioning Features
- Separate entries for major versions
- Version and releaseDate fields
- Consistent ID patterns (product-v1, product-v2)
- Historical data preservation
- Version comparison capabilities
    `,
  },
  {
    id: 'changelog-008',
    version: '1.4.0',
    date: '2025-01-15',
    category: 'feature',
    title: 'Initial Reviewer Expertise System',
    description: 'First implementation of reviewer expertise tracking by product category.',
    details: `
### Initial Features
- Category-based expertise
- Priority levels (1-10 scale)
- Basic assignment algorithm
- Reviewer dashboard
    `,
  },
  {
    id: 'changelog-009',
    version: '1.3.0',
    date: '2024-12-10',
    category: 'feature',
    title: 'Review Dashboard',
    description: 'Administrative interface for product review management and status tracking.',
    details: `
### Dashboard Features
- Product filtering by status, category, company
- Export to CSV and Excel
- Summary statistics
- Revision tracking
- Data quality monitoring
    `,
  },
  {
    id: 'changelog-010',
    version: '1.2.0',
    date: '2024-11-20',
    category: 'feature',
    title: 'Timeline Visualization',
    description: 'Interactive timeline showing product release dates and trends over time.',
    details: `
### Visualization Features
- Chronological product timeline
- Category filtering
- Company grouping
- Release trend analysis
- Interactive tooltips
    `,
  },
];

export const getChangelogByVersion = (version: string): ChangelogEntry[] => {
  return changelogData.filter(entry => entry.version === version);
};

export const getChangelogByCategory = (category: ChangelogCategory): ChangelogEntry[] => {
  return changelogData.filter(entry => entry.category === category);
};

export const getLatestChanges = (limit: number = 5): ChangelogEntry[] => {
  return changelogData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAllVersions = (): string[] => {
  return [...new Set(changelogData.map(entry => entry.version))]
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
};

export const getCategoryLabel = (category: ChangelogCategory): string => {
  const labels: Record<ChangelogCategory, string> = {
    feature: 'New Feature',
    improvement: 'Improvement',
    bugfix: 'Bug Fix',
    documentation: 'Documentation',
    security: 'Security',
  };
  return labels[category];
};

export const getCategoryColor = (category: ChangelogCategory): string => {
  const colors: Record<ChangelogCategory, string> = {
    feature: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    improvement: 'bg-green-500/10 text-green-700 border-green-500/20',
    bugfix: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    documentation: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    security: 'bg-red-500/10 text-red-700 border-red-500/20',
  };
  return colors[category];
};
