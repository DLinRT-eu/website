
# DLinRT.eu Documentation Quick Links

## Review Process Documentation

| Document | Purpose | Key Sections |
|----------|----------|--------------|
| [Review Guide](./docs/review/GUIDE.md) | Central hub for all review documentation | • Multi-Category Products  • Product Versioning  • Review Workflow |
| [Review Status](./docs/review/STATUS.md) | Track review progress | • Status Legend  • Product Status  • Review Priority |
| [Product Documentation](./docs/review/README.md) | Product data management | • Multi-Category Support  • Versioning Support  • Hidden Admin Pages |
| [Manufacturer Templates](./MANUFACTURER_TEMPLATES.md) | Communication templates | • Verification Request  • Follow-up  • Update Confirmation |

## Common Tasks

1. **Reviewing Products**
   - Follow the [Product Review Guide](./docs/review/GUIDE.md)
   - Use the in-site review interface at `/review`
   - Reference [Example Templates](./src/data/products/examples)

2. **Creating Multi-Category Products**
   - Use primary `category` for main functionality
   - Add `secondaryCategories` for additional features
   - Follow field documentation in [Review Guide](./docs/review/GUIDE.md)
   - Submit through the product interface

3. **Managing Product Versions**
   - Create separate entries for major versions
   - Use consistent ID patterns (`product-v1`, `product-v2`)
   - Track with `version` and `releaseDate` fields
   - Reference versioning guide in [Review Guide](./docs/review/GUIDE.md)

4. **Contacting Manufacturers**
   - Use [Manufacturer Templates](./MANUFACTURER_TEMPLATES.md)
   - Submit through the in-site forms
   - Track in the product dashboard

5. **Using Hidden Admin Pages**
   - **Review Dashboard**: `/review` - Product review management
   - **Timeline Analysis**: `/timeline` - Data visualization and trends
   - **Individual Reviews**: `/review/:id` - Detailed product verification

6. **Legacy Documentation**
   - [Manual Update Guide](./docs/review/README.md)
   - Update [Review Status](./docs/review/STATUS.md)

## Documentation Updates

Last Updated: 2025-05-27

**Recent Changes:**
- Added multi-category product support documentation
- Documented hidden administrative pages
- Updated versioning guidelines
- Clarified product structure capabilities

For any documentation improvements or issues, please:

1. Open an issue in the repository
2. Reference specific documents
3. Suggest concrete improvements
4. Tag relevant team members
