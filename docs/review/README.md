# DLinRT.eu Product Documentation

## Quick Start

1. **Reviewing Products**
   - Open product in web interface
   - Click "Review" button
   - Follow guided checklist
   - Submit changes

2. **Adding Products**
   - Use example template from your category
   - Fill in required fields
   - Add secondary categories if applicable
   - Add company logo
   - Submit through interface

See [GUIDE.md](./GUIDE.md) for detailed instructions.

## Review Status

See [STATUS.md](./STATUS.md) for current review progress.

## Product Structure

### Multi-Category Support

Products can belong to multiple categories using the `secondaryCategories` field:

```typescript
const product: ProductDetails = {
  category: 'Auto-Contouring',        // Primary category
  secondaryCategories: [               // Additional categories
    'Treatment Planning',
    'Performance Monitor'
  ],
  // ... other fields
};
```

This allows products with multiple functionalities to be discovered through different category filters.

### Versioning Support

Products support multiple versions through:
- Separate entries for major versions
- `version` field for semantic versioning
- `releaseDate` field for version tracking
- Historical data preservation

## Structure Classification

When reviewing auto-contouring products, pay special attention to structure classification:

- **OARs**: Organs at risk (default classification if not GTV or Elective)
- **GTV**: Gross tumor volumes (identified by GTV, lesion keywords)
- **Elective**: Clinical target volumes, planning target volumes, lymph nodes

### Laterality Handling

Structures with laterality patterns (L/R, R/L) are counted as two distinct structures:
- "Eyes (L/R)" counts as 2 structures
- "Parotid (L)" and "Parotid (R)" each count as 1 structure

This counting is handled by the `hasLateralityPattern` function in `structureClassification.ts`.

## Hidden Administrative Pages

Advanced functionality is available through hidden pages:

- **Review Dashboard** (`/review`) - Product review management interface
- **Timeline Visualization** (`/timeline`) - Interactive data analysis and trends
- **Individual Product Review** (`/review/:id`) - Detailed product verification
- **Review Rounds** (`/admin/review-rounds`) - Create and manage review rounds with balanced assignments
- **Round Details** (`/admin/review-rounds/:roundId`) - View assignments and audit history
- **Enhanced Assignment** (`/admin/review-assignment`) - Advanced reviewer assignment interface

These pages are accessible but not included in main navigation to maintain clean user experience.

## Reviewer Assignment System

DLinRT.eu uses an enhanced reviewer assignment system with:
- **Multi-dimensional preferences** - Categories, companies, and products
- **Intelligent workload balancing** - Automatic distribution with max ±1 variance
- **Manual assignment override** - Full preview and control before finalizing
- **Complete assignment history** - Audit trail of all changes with reasons
- **Email notifications** - Automatic alerts with assignment details and deadlines

For detailed information:
- **Admins**: See [Reviewer Assignment Guide](../REVIEWER_ASSIGNMENT_GUIDE.md)
- **Reviewers**: See [Reviewer Guide](../REVIEWER_GUIDE.md)

## Need Help?

- Reference examples in `src/data/products/examples/`
- Open an issue on GitHub
- Join community discussions
- Use admin pages for advanced review features
