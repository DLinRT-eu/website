# Regulatory Fields Reference

This document describes the detailed regulatory certification fields available in the product data structure.

## Overview

The regulatory information has been expanded to include detailed certification information for both CE marking and FDA clearance/approval, supporting both legacy string formats and new structured object formats.

## CE Marking Fields

### `regulatory.ce` (object)

- **`status`** (string, required): Current CE marking status
  - Values: "CE Marked", "Pending", "Not available", "MDR exempt"
  
- **`class`** (string, optional): Medical device classification
  - Values: "Class I", "Class IIa", "Class IIb", "Class III"
  
- **`type`** (string, optional): Regulatory framework
  - Values: "MDD", "MDR", "IVDR"
  - MDD: Medical Device Directive (legacy)
  - MDR: Medical Device Regulation (current)
  - IVDR: In Vitro Diagnostic Regulation
  
- **`notifiedBody`** (string, optional): Notified body information
  - Format: "Name (Notified Body XXXX)"
  - Example: "BSI (Notified Body 0086)"
  
- **`certificateNumber`** (string, optional): CE certificate number
  - Format varies by notified body
  
- **`regulation`** (string, optional): Specific regulation reference
  - Examples: "MDD 93/42/EEC", "MDR 2017/745"

### Example CE Structure

```typescript
ce: {
  status: "CE Marked",
  class: "Class IIa",
  type: "MDR",
  notifiedBody: "BSI (Notified Body 0086)",
  certificateNumber: "CE12345",
  regulation: "MDR 2017/745"
}
```

## FDA Fields

### `regulatory.fda` (object | string)

The FDA field supports both legacy string format and new structured object format for backward compatibility.

#### Object Format (Recommended)

- **`status`** (string, required): FDA regulatory status
  - Values: "510(k) Cleared", "PMA Approved", "De Novo Granted", "Under review", "Not available"
  
- **`class`** (string, optional): FDA device classification
  - Values: "Class I", "Class II", "Class III"
  
- **`clearanceNumber`** (string, optional): FDA clearance/approval number
  - 510(k): K-number (e.g., "K161625")
  - PMA: P-number (e.g., "P123456")
  - De Novo: DEN-number (e.g., "DEN123456")
  
- **`regulationNumber`** (string, optional): CFR regulation number
  - Format: "21 CFR XXX.XXXX"
  - Example: "21 CFR 892.2050"
  
- **`productCode`** (string, optional): FDA product code
  - 3-letter code assigned by FDA
  - Example: "LLZ"
  
- **`type`** (string, optional): Submission type
  - Values: "510(k)", "PMA", "De Novo"

#### String Format (Legacy)

For backward compatibility, the FDA field can still be a string containing all information:

```typescript
fda: "510(k) Cleared (K161625); Class II; Regulation Number: 21 CFR 892.2050; Product Code: LLZ"
```

### Example FDA Structure

```typescript
fda: {
  status: "510(k) Cleared",
  class: "Class II",
  clearanceNumber: "K161625",
  regulationNumber: "21 CFR 892.2050",
  productCode: "LLZ",
  type: "510(k)"
}
```

## Other Regulatory Fields

### `regulatory.intendedUseStatement` (string)

The FDA-required intended use statement describing the device's purpose and target population.

## Migration Guide

### From Legacy to New Format

Old format:
```typescript
regulatory: {
  ce: {
    status: "Certified",
    class: "IIa"
  },
  fda: "510(k) cleared"
}
```

New format:
```typescript
regulatory: {
  ce: {
    status: "CE Marked",
    class: "Class IIa",
    type: "MDR",
    regulation: "MDR 2017/745"
  },
  fda: {
    status: "510(k) Cleared",
    class: "Class II",
    type: "510(k)"
  }
}
```

## Utility Functions

The `regulatoryUtils.ts` file provides helper functions:

- `parseFDAInfo()`: Parses FDA information from string or object
- `parseCEInfo()`: Parses CE information from object
- `formatFDAInfo()`: Formats FDA information for display
- `formatCEInfo()`: Formats CE information for display
- `getStandardizedCertificationTags()`: Extracts certification tags

## Display Implementation

The regulatory information is displayed in the product details with:

- Certification badges (CE, FDA, etc.)
- Detailed breakdown of certification information
- Class, clearance numbers, and regulation references
- Backward compatibility with existing string formats

## Validation

Products should include:

1. At least one regulatory certification (CE or FDA)
2. Appropriate class designation for medical devices
3. Clearance/certificate numbers when available
4. Intended use statement for medical devices
5. Proper regulation references (MDD/MDR for CE, CFR for FDA)