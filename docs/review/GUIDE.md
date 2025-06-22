
# DLinRT.eu Product Guide

This guide covers all aspects of working with products on DLinRT.eu, including reviewing existing products and adding new ones.

## Table of Contents

1. [Field Reference](#field-reference)
2. [Reviewing Products](#reviewing-products)
3. [Adding New Products](#adding-new-products)
4. [Product Categories](#product-categories)
5. [Multi-Category Products](#multi-category-products)
6. [Product Versioning](#product-versioning)
7. [Field Requirements](#field-requirements)
8. [Example Templates](#example-templates)

## Field Reference

📋 **For detailed information about all available fields and their meanings, see the [Field Reference Documentation](../FIELD_REFERENCE.md)**.

This comprehensive reference covers:
- All product, company, initiative, and news fields
- Controlled vocabularies and standardized terms
- Data types and formatting requirements
- Validation rules and best practices

## Reviewing Products

1. **Start Review**
   - Open product page
   - Click "Review" button
   - Follow guided checklist

2. **Check Information**
   - Basic details (name, company, website)
   - Features and capabilities
   - Primary and secondary categories
   - Integrations and certifications
   - Category-specific fields
   - **Use the [Field Reference](../FIELD_REFERENCE.md) to understand each field's purpose**

3. **Submit Changes**
   - Document verification sources
   - Submit through interface
   - Changes create PR automatically

## Adding New Products

1. **Choose Primary Category**
   - Auto-Contouring
   - Image Synthesis
   - Registration
   - Treatment Planning
   - Performance Monitor

2. **Consider Secondary Categories**
   - Products can span multiple categories
   - Use `secondaryCategories` array for additional classifications
   - Example: Auto-contouring product with treatment planning features

3. **Create Product File**
   ```typescript
   // src/data/products/[category]/[company]-[product].ts
   const product: ProductDetails = {
     id: 'company-productname',
     name: 'Product Name',
     company: 'Company Name',
     website: 'https://company.com/product',
     category: 'Auto-Contouring',
     secondaryCategories: ['Treatment Planning'], // Optional multi-category support
     features: ['Feature 1', 'Feature 2'],
     version: '2.1.0',
     releaseDate: '2023-06-15',
     certification: 'CE Mark',
     // Category-specific fields...
   };
   ```

4. **Add Logo**
   - Save to `public/logos/`
   - PNG/SVG format
   - 200x200px minimum
   - Filename: `company.png`

5. **Test & Submit**
   - Run locally: `bun run dev`
   - Verify display
   - Submit through interface

## Product Categories

Each category has specific field requirements. **See the [Field Reference](../FIELD_REFERENCE.md) for complete details on category-specific fields.**

### Auto-Contouring
- `supportedStructures` (OAR/GTV/Elective classification)
- `anatomicalLocation` (treatment sites)
- `modality` (imaging modalities)

### Image Synthesis
- `modality` (input/output modalities)
- `anatomicalLocation` (supported anatomy)
- Technology integration details

### Registration
- `modality` (supported image types)
- `anatomicalLocation` (registration sites)
- Integration specifications

### Treatment Planning
- `modality` (planning modalities)
- `anatomicalLocation` (planning sites)
- Planning system integrations

### Performance Monitor
- `modality` (monitored modalities)
- Quality assurance capabilities

## Multi-Category Products

Products can belong to multiple categories using the `secondaryCategories` field:

```typescript
const multiCategoryProduct: ProductDetails = {
  id: 'example-multi',
  name: 'Multi-Purpose AI Suite',
  category: 'Auto-Contouring',           // Primary category
  secondaryCategories: [                 // Additional categories
    'Treatment Planning',
    'Performance Monitor'
  ],
  // ... other fields
};
```

**Benefits:**
- Products appear in filters for all relevant categories
- Better discoverability for users
- Accurate representation of product capabilities

**Usage Guidelines:**
- Use primary category for main functionality
- Add secondary categories for significant additional features
- Avoid over-categorization

## Product Versioning

Multiple versions of products can be tracked:

### Approach 1: Separate Entries
```typescript
// Version 1.0
const productV1: ProductDetails = {
  id: 'company-product-v1',
  name: 'Product Name',
  version: '1.0.0',
  releaseDate: '2022-01-15',
  // ... version 1 specifications
};

// Version 2.0
const productV2: ProductDetails = {
  id: 'company-product-v2',
  name: 'Product Name',
  version: '2.0.0',
  releaseDate: '2023-06-15',
  // ... version 2 specifications
};
```

### Approach 2: Current Version Only
```typescript
const currentProduct: ProductDetails = {
  id: 'company-product',
  name: 'Product Name',
  version: '2.1.0',
  releaseDate: '2023-06-15',
  // ... current version specifications
};
```

**Guidelines:**
- Use separate entries for major version differences
- Track evolution through `version` and `releaseDate` fields
- Include version history in evidence/documentation
- Maintain regulatory approval dates per version

## Field Requirements

### Essential Reading
📖 **Before adding products, review the [Field Reference Documentation](../FIELD_REFERENCE.md)** for:
- Complete field descriptions and purposes
- Required vs optional fields
- Controlled vocabularies and standardized terms
- Data validation rules

### Quick Reference for Required Fields
- `id`: Unique identifier (use consistent patterns for versions)
- `name`: Full product name
- `company`: Company name
- `website`: Product webpage
- `category`: Primary category
- `features`: Key features array
- `certification`: Regulatory status
- `version`: Current version
- `releaseDate`: Release date (YYYY-MM-DD format)
- `lastUpdated`: Last verified date

## Example Templates

See example implementations in `src/data/products/examples/`:
- auto-contouring-example.ts
- image-synthesis-example.ts
- registration-example.ts
- treatment-planning-example.ts
- performance-monitor-example.ts

All examples include:
- Multi-category support examples
- Versioning best practices
- Complete field documentation

## Need Help?

- **Check the [Field Reference Documentation](../FIELD_REFERENCE.md)** for field meanings and requirements
- Check example templates
- Open GitHub issue
- Join discussions
- Review hidden admin pages at `/review` and `/timeline`
