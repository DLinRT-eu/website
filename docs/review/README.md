
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
   - Add company logo
   - Submit through interface

See [GUIDE.md](./GUIDE.md) for detailed instructions.

## Review Status

See [STATUS.md](./STATUS.md) for current review progress.

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

## Need Help?

- Reference examples in `src/data/products/examples/`
- Open an issue on GitHub
- Join community discussions
