# DLinRT.eu Product Guide

This guide covers all aspects of working with products on DLinRT.eu, including reviewing existing products and adding new ones.

## Table of Contents

1. [Reviewing Products](#reviewing-products)
2. [Adding New Products](#adding-new-products)
3. [Product Categories](#product-categories)
4. [Field Requirements](#field-requirements)
5. [Example Templates](#example-templates)

## Reviewing Products

1. **Start Review**
   - Open product page
   - Click "Review" button
   - Follow guided checklist

2. **Check Information**
   - Basic details (name, company, website)
   - Features and capabilities
   - Integrations and certifications
   - Category-specific fields

3. **Submit Changes**
   - Document verification sources
   - Submit through interface
   - Changes create PR automatically

## Adding New Products

1. **Choose Category**
   - Auto-Contouring
   - Image Synthesis
   - Registration
   - Treatment Planning
   - Performance Monitor

2. **Create Product File**
   ```typescript
   // src/data/products/[category]/[company]-[product].ts
   const product: Product = {
     id: 'company-productname',
     name: 'Product Name',
     company: {
       name: 'Company Name',
       website: 'https://company.com'
     },
     website: 'https://company.com/product',
     category: 'Auto-Contouring',
     features: ['Feature 1', 'Feature 2'],
     certifications: { ce: true, fda: false },
     // Category-specific fields...
   };
   ```

3. **Add Logo**
   - Save to `public/logos/`
   - PNG/SVG format
   - 200x200px minimum
   - Filename: `company.png`

4. **Test & Submit**
   - Run locally: `bun run dev`
   - Verify display
   - Submit through interface

## Product Categories

Each category has specific field requirements:

### Auto-Contouring
- supportedStructures (OAR/GTV/Elective)
- anatomicalLocations
- integrations

### Image Synthesis
- supportedModalities
- anatomicalLocations
- integrations

### Registration
- supportedModalities
- anatomicalLocations
- integrations

### Treatment Planning
- supportedModalities
- anatomicalLocations
- integrations

### Performance Monitor
- supportedModalities
- integrations

## Field Requirements

### Required for All Products
- `id`: Unique identifier
- `name`: Full product name
- `company`: Company details
- `website`: Product webpage
- `category`: Product category
- `features`: Key features
- `certifications`: Regulatory status
- `intendedUse`: Usage description
- `version`: Current version
- `lastUpdated`: Last verified date

## Example Templates

See example implementations in `src/data/products/examples/`:
- auto-contouring-example.ts
- image-synthesis-example.ts
- registration-example.ts
- treatment-planning-example.ts
- performance-monitor-example.ts

## Need Help?

- Check example templates
- Open GitHub issue
- Join discussions
