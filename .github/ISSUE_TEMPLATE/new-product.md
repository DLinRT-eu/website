---
name: New Product
about: Add a new product to the database
title: 'New Product: [PRODUCT_NAME]'
labels: new-product, needs-review
assignees: ''

---

## Product Information
<!-- Provide basic product information. See examples in src/data/products/examples/ -->

### Required Fields
- Product Name: 
- Company Name: 
- Category: <!-- Choose from: Auto-Contouring, Image Enhancement, Image Synthesis, Registration, Treatment Planning, Reconstruction, Performance Monitor -->
- Modalities: <!-- e.g., ["CT", "MRI", "PET"] -->

### Basic Information
- Description: <!-- Brief product description -->
- Features: <!-- List key features -->
- Anatomical Locations: <!-- e.g., ["Brain", "Head & Neck", "Thorax", etc.] -->
- Disease Targets: <!-- Types of diseases/conditions targeted -->
- Key Features: <!-- List unique selling points -->

### Technical Details
<details>
<summary>Technical Specifications</summary>

```typescript
technicalSpecifications: {
  population: "", // e.g., "Adult patients" or "Adult and pediatric"
  input: [], // Input types, e.g., ["CT", "MRI"]
  inputFormat: [], // e.g., ["DICOM"]
  output: [], // e.g., ["Structure sets", "Enhanced images"]
  outputFormat: [] // e.g., ["DICOM", "DICOM-RT"]
}
```
</details>

<details>
<summary>Technology Implementation</summary>

```typescript
technology: {
  integration: [], // e.g., ["TPS integration", "PACS integration"]
  deployment: [], // e.g., ["Cloud-based", "On-premises"]
  triggerForAnalysis: "", // e.g., "Manual or automated"
  processingTime: "" // e.g., "Minutes per case"
}
```
</details>

### Regulatory Information
<details>
<summary>Regulatory Status</summary>

```typescript
regulatory: {
  ce: {
    status: "", // e.g., "Certified", "Under review"
    class: "", // e.g., "IIa", "IIb"
    type: "Medical Device"
  },
  fda: "", // e.g., "510(k) cleared", "Under review"
  intendedUseStatement: "" // Brief statement of intended use
}
```
</details>

### Market Information
<details>
<summary>Market Details</summary>

```typescript
market: {
  onMarketSince: "", // Year product entered market
  distributionChannels: [], // e.g., ["Direct sales", "Partnerships"]
  countriesPresent: 0, // Number of countries where product is available
  payingCustomers: "", // e.g., "Over 60 clinics"
  researchUsers: "" // e.g., "Multiple research institutions"
}
```
</details>

### Additional Information
<details>
<summary>Product-Specific Details</summary>

<!-- For Auto-Contouring Products -->
**Supported Structures:**
```typescript
supportedStructures: [
  // Format: "Region: Structure"
  // Examples:
  "Brain: Brainstem",
  "Brain: Eyes (L/R)", // Use (L/R) for bilateral structures
  "Head & Neck: Larynx",
  "Thorax: Heart",
  "Pelvis: Bladder"
]
```

<!-- For Image Enhancement Products -->
**Enhancement Capabilities:**
```typescript
keyFeatures: [
  // Examples:
  "Deep learning-based enhancement",
  "Noise reduction",
  "Detail preservation",
  "Multi-modality support"
]
```

<!-- For Registration Products -->
**Registration Methods:**
```typescript
features: [
  // Examples:
  "Rigid registration",
  "Deformable registration",
  "Multi-modality support",
  "Real-time visualization"
]
```
</details>

### URLs and Resources
- Company Website:
- Product Page:
- Logo File: <!-- Attach company logo -->
- Documentation Links:

### Additional Notes
<!-- Any other relevant information -->

### Checklist
- [ ] All required fields completed
- [ ] Technical specifications verified
- [ ] Regulatory information confirmed
- [ ] Company logo attached
- [ ] Product details reviewed for accuracy
- [ ] Category-specific information provided
- [ ] URLs verified and accessible
