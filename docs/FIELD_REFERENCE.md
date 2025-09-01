# DLinRT.eu Field Reference Documentation

This document provides a comprehensive reference for all fields used in the DLinRT.eu database, including products, companies, initiatives, and news items. It serves as a nomenclature and data dictionary for contributors.

## Table of Contents

1. [Product/ProductDetails Fields](#productproductdetails-fields)
2. [Technical Specifications Deep Dive](#technical-specifications-deep-dive)
3. [Guidelines Compliance](#guidelines-compliance)
4. [Company Fields](#company-fields)
5. [Initiative Fields](#initiative-fields)
6. [News Item Fields](#news-item-fields)
7. [Controlled Vocabularies](#controlled-vocabularies)
8. [Data Types and Formats](#data-types-and-formats)

## Product/ProductDetails Fields

Products represent deep learning solutions available for radiotherapy applications.

### Basic Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier using format: `company-productname` (lowercase, hyphenated) |
| `name` | string | Yes | Full commercial name of the product |
| `company` | string | Yes | Name of the company that develops/sells the product |
| `description` | string | Yes | Brief description of what the product does and its main purpose |
| `website` | string | No | Official product webpage URL |
| `productUrl` | string | No | Alternative product URL (if different from website) |
| `companyUrl` | string | No | Company's main website URL |

### Categorization

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | Yes | Primary product category. See [Product Categories](#product-categories) |
| `secondaryCategories` | string[] | No | Additional categories the product belongs to |
| `subspeciality` | string | No | Medical subspecialty focus (e.g., "Radiation Oncology", "Medical Physics") |

### Features and Capabilities

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `features` | string[] | Yes | List of key product features and capabilities |
| `keyFeatures` | string[] | No | Alternative/additional key features (use either features or keyFeatures) |
| `suggestedUse` | string | No | Recommended use cases and applications |
| `useCases` | string[] | No | Array of specific use cases |

### Medical Specifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `anatomicalLocation` | string[] | No | Body regions/sites supported. See [Anatomical Locations](#anatomical-locations) |
| `modality` | string or string[] | No | Imaging modalities supported. See [Modalities](#modalities) |
| `diseaseTargeted` | string[] | No | Specific diseases or cancer types targeted |
| `supportedStructures` | string[] or Structure[] | No | Anatomical structures that can be contoured/analyzed |

### Guidelines Compliance

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `guidelines` | Guideline[] | No | Professional guidelines and standards followed by the product |

#### Guideline Object Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Name of the guideline (e.g., "AAPM TG-263") |
| `version` | string | No | Version or year of the guideline |
| `reference` | string | No | DOI or official reference link to the guideline |
| `url` | string | No | Direct URL to access the guideline |
| `compliance` | string | No | Level of compliance: "full", "partial", or "planned" |

#### Common Radiotherapy Guidelines

The following guidelines are commonly referenced in radiotherapy AI products:

**AAPM Task Group Reports:**
- **AAPM TG-263** (2018): Standardizing nomenclatures in radiation oncology
  - DOI: `https://doi.org/10.1002/mp.12909`
- **AAPM TG-275** (2022): Guidance on the use of artificial intelligence in medical physics
  - DOI: `https://doi.org/10.1002/mp.15419`
- **AAPM TG-132** (2013): Use of image registration and fusion algorithms in radiotherapy
  - DOI: `https://doi.org/10.1118/1.4816279`
- **AAPM TG-162** (2014): Software for planar image registration, fusion, and analysis
  - DOI: `https://doi.org/10.1118/1.4866223`

**ESTRO Guidelines:**
- **ESTRO Consensus Guideline on CT-based Auto-contouring** (2021)
  - DOI: `https://doi.org/10.1016/j.radonc.2021.09.019`

**ICRU Reports:**
- **ICRU Report 83** (2010): Prescribing, recording, and reporting photon-beam IMRT
  - DOI: `https://doi.org/10.1093/jicru/ndq001`
- **ICRU Report 91** (2017): Stereotactic treatments with small photon beams
  - DOI: `https://doi.org/10.1093/jicru/ndx008`

**Quality Assurance Guidelines:**
- **IEC 60601-2-1** (2020): Medical electrical equipment requirements for linear accelerators
  - DOI: `https://doi.org/10.3403/30258698`
- **NCS Report 22** (2015): Quality assurance and control for VMAT
  - DOI: `https://doi.org/10.25030/ncs-022`

### Technical Specifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `technicalSpecifications` | object | No | Technical details about input/output |
| `technicalSpecifications.population` | string | No | Target patient population |
| `technicalSpecifications.input` | string[] | No | Types of input data accepted. See [Input Types](#input-types) |
| `technicalSpecifications.inputFormat` | string[] | No | Supported input file formats. See [Input Formats](#input-formats) |
| `technicalSpecifications.output` | string[] | No | Types of output data generated. See [Output Types](#output-types) |
| `technicalSpecifications.outputFormat` | string[] | No | Supported output file formats. See [Output Formats](#output-formats) |

### Technology Integration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `technology` | object | No | Technology and integration details |
| `technology.integration` | string[] | No | Systems/platforms the product integrates with |
| `technology.deployment` | string[] | No | Deployment options (cloud, on-premise, hybrid) |
| `technology.triggerForAnalysis` | string | No | What triggers the analysis process |
| `technology.processingTime` | string | No | Expected processing time |
| `compatibleSystems` | string[] | No | Compatible treatment planning systems or PACS |

### Regulatory Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `certification` | string | No | Primary regulatory approval. See [Certifications](#certifications) |
| `regulatory` | object | No | Detailed regulatory information |
| `regulatory.ce` | object | No | CE marking details |
| `regulatory.ce.status` | string | No | CE approval status |
| `regulatory.ce.class` | string | No | Medical device class |
| `regulatory.ce.type` | string | No | Type of CE marking |
| `regulatory.fda` | string | No | FDA approval status |
| `regulatory.intendedUseStatement` | string | No | Official intended use statement |

### Market Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `market` | object | No | Market presence and availability |
| `market.onMarketSince` | string | No | When the product became commercially available |
| `market.distributionChannels` | string[] | No | How the product is distributed |

### Pricing Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pricing` | string or object | No | Pricing information |
| `pricing.model` | string[] | No | Pricing models (subscription, perpetual, etc.) |
| `pricing.basedOn` | string[] | No | What pricing is based on (per study, per user, etc.) |
| `price` | number | No | Specific price (if available) |

### Evidence and Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `evidence` | string[] or Evidence[] | No | Clinical evidence supporting the product |
| `clinicalEvidence` | string | No | Summary of clinical validation |
| `limitations` | string[] | No | Known limitations of the product |

### Version and Updates

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | No | Current software version |
| `releaseDate` | string | No | Release date (YYYY-MM-DD format) |
| `lastUpdated` | string | No | When product information was last updated |
| `lastVerified` | string | No | When product information was last verified |
| `lastRevised` | string | No | When product underwent major revision |
| `companyRevisionDate` | string | No | When the company last revised/updated the product information (YYYY-MM-DD format) |

### Contact and Support

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `supportEmail` | string | No | Support contact email |
| `contactEmail` | string | No | General contact email |
| `contactPhone` | string | No | Contact phone number |
| `trainingRequired` | boolean | No | Whether training is required to use the product |

### Additional Metadata

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `logoUrl` | string | No | Path to company/product logo |
| `githubUrl` | string | No | GitHub repository URL (if open source) |
| `userRating` | number | No | User rating score |
| `source` | string | No | Source of the information |

## Technical Specifications Deep Dive

The technical specifications section provides detailed information about a product's input requirements, output capabilities, and technical characteristics. This section is crucial for understanding how products integrate into clinical workflows.

### Field Structure

```typescript
technicalSpecifications: {
  population?: string;           // Target patient population
  input?: string[];             // Input data types
  inputFormat?: string[];       // Input file formats
  output?: string[];            // Output data types  
  outputFormat?: string[];      // Output file formats
}
```

### Input Types

Standardized input data types that products can accept:

#### Medical Images
- **CT** - Computed Tomography images
- **MRI** - Magnetic Resonance Imaging
- **CBCT** - Cone Beam CT images
- **PET** - Positron Emission Tomography
- **PET/CT** - Combined PET/CT studies
- **X-ray** - Conventional radiography
- **SPECT** - Single Photon Emission CT

#### Planning Data
- **Structure sets** - Contoured anatomical structures
- **Treatment plans** - Radiation therapy plans
- **Dose distributions** - Calculated dose maps
- **DVH data** - Dose-volume histogram data
- **Plan parameters** - Treatment planning parameters

#### Machine Data
- **Log files** - Machine operation logs
- **EPID images** - Electronic Portal Imaging Device images
- **Machine parameters** - Linac configuration data
- **QA measurements** - Quality assurance data

#### Multi-modal Data
- **Multi-contrast MR** - Multiple MRI sequences
- **4D imaging** - Time-resolved imaging data
- **Respiratory-gated** - Breathing motion data

### Input Formats

Standardized file formats for input data:

#### Standard Medical Formats
- **DICOM** - Standard medical imaging format
- **DICOM-RT** - Radiotherapy-specific DICOM
- **DICOM RT-STRUCT** - Structure set format
- **DICOM RT-PLAN** - Treatment plan format
- **DICOM RT-DOSE** - Dose distribution format

#### Vendor-Specific Formats
- **Pinnacle** - Philips Pinnacle format
- **Eclipse** - Varian Eclipse format
- **RayStation** - RaySearch format
- **Monaco** - Elekta Monaco format
- **iPlan** - BrainLAB format

#### Generic Formats
- **NIfTI** - Neuroimaging format
- **NRRD** - Nearly Raw Raster Data
- **MetaImage** - ITK MetaImage format
- **Analyze** - Mayo Analyze format

### Output Types

Standardized output data types that products generate:

#### Segmentation Outputs
- **Structure sets** - Contoured organs/targets
- **Organ contours** - Individual organ delineations
- **Target volumes** - Treatment target definitions
- **Masks** - Binary segmentation masks

#### Planning Outputs  
- **Treatment plans** - Optimized therapy plans
- **Dose distributions** - Calculated dose maps
- **DVH curves** - Dose-volume histograms
- **Plan quality metrics** - Plan evaluation metrics

#### Image Outputs
- **Enhanced images** - Processed/improved images
- **Synthetic images** - Generated synthetic data
- **Registered images** - Spatially aligned images
- **Fused images** - Combined multi-modal images

#### Analysis Outputs
- **Reports** - Structured analysis reports
- **Metrics** - Quantitative measurements
- **Predictions** - Outcome predictions
- **Quality assessments** - QA analysis results

#### Alerts and Notifications
- **Alerts** - System notifications
- **Warnings** - Clinical warnings
- **Status updates** - Processing status

### Output Formats

Standardized file formats for output data:

#### Medical Standard Formats
- **DICOM-RT** - Standard RT format
- **DICOM RT-STRUCT** - Structure sets
- **DICOM RT-PLAN** - Treatment plans
- **DICOM RT-DOSE** - Dose distributions

#### Document Formats
- **PDF** - Portable document format
- **HTML** - Web-based reports
- **XML** - Structured data format
- **JSON** - JavaScript Object Notation

#### Data Exchange Formats
- **CSV** - Comma-separated values
- **Excel** - Microsoft Excel format
- **Text files** - Plain text output
- **Database export** - Structured database format

#### Visualization Formats
- **Images (PNG/JPEG)** - Static visualizations
- **Interactive plots** - Web-based charts
- **3D models** - Three-dimensional visualizations

### Category-Specific Examples

#### Auto-Contouring Products
```typescript
technicalSpecifications: {
  population: "Adult patients",
  input: ["CT", "MRI", "CBCT"],
  inputFormat: ["DICOM"],
  output: ["Structure sets", "Organ contours"],
  outputFormat: ["DICOM-RT", "DICOM RT-STRUCT"]
}
```

#### Image Synthesis Products
```typescript
technicalSpecifications: {
  population: "Adult patients undergoing RT planning",
  input: ["MRI", "Multi-contrast MR"],
  inputFormat: ["DICOM"],
  output: ["Synthetic CT", "Enhanced images"],
  outputFormat: ["DICOM"]
}
```

#### Treatment Planning Products
```typescript
technicalSpecifications: {
  population: "Cancer patients",
  input: ["CT", "Structure sets", "Dose constraints"],
  inputFormat: ["DICOM", "DICOM-RT"],
  output: ["Treatment plans", "Dose distributions", "DVH curves"],
  outputFormat: ["DICOM RT-PLAN", "DICOM RT-DOSE"]
}
```

#### Performance Monitor Products
```typescript
technicalSpecifications: {
  population: "N/A - Equipment monitoring",
  input: ["Log files", "EPID images", "Machine parameters"],
  inputFormat: ["Vendor-specific", "DICOM"],
  output: ["Reports", "Alerts", "Quality assessments"],
  outputFormat: ["PDF", "HTML", "Real-time alerts"]
}
```

### Usage Guidelines

#### When to Use Different Input Types
- **CT**: Primary imaging for most RT applications
- **MRI**: Soft tissue visualization, MR-only workflows
- **CBCT**: Image-guided radiation therapy, positioning verification
- **PET/CT**: Metabolic imaging for treatment planning
- **Multi-modal**: When fusion of different imaging types is required

#### Format Selection Guidelines
- **DICOM**: Standard for medical imaging interchange
- **DICOM-RT**: Required for RT-specific data (structures, plans, dose)
- **Vendor-specific**: When tight integration with specific TPS is needed
- **Generic formats**: For research applications or custom workflows

#### Quality Considerations
- Always specify the most restrictive format requirements
- Include both primary and fallback format options when possible
- Specify version requirements for vendor-specific formats
- Document any preprocessing requirements

### Validation Rules

#### Input/Output Consistency
- Input and output types should be logically consistent
- Format specifications should match the data types
- Processing capabilities should align with input/output specifications

#### Category-Specific Requirements
- **Auto-contouring**: Must specify anatomical input and structure output
- **Image synthesis**: Must specify source and target imaging modalities
- **Treatment planning**: Must include planning-specific inputs and outputs
- **Performance monitoring**: Should focus on QA and system data

## Guidelines Compliance

The guidelines field allows products to specify which professional standards, protocols, and best practices they follow. This is crucial for establishing credibility and helping users understand the scientific basis of the product.

### Usage Guidelines

#### When to Include Guidelines
- **Auto-contouring products**: Should reference AAPM TG-263 for nomenclature and ESTRO consensus guidelines
- **AI-based products**: Should reference AAPM TG-275 for AI guidance
- **Registration products**: Should reference AAPM TG-132 and TG-162 for registration standards
- **Treatment planning products**: Should reference ICRU reports and IAEA standards
- **Performance monitoring**: Should reference IEC standards and quality assurance protocols

#### Compliance Levels
- **full**: Product fully implements all recommendations from the guideline
- **partial**: Product implements some but not all recommendations
- **planned**: Compliance is planned for future versions

#### Reference Field Best Practices
- Always use DOI links when available (preferred format)
- For guidelines without DOIs, use official publication URLs
- Include version numbers or publication years for clarity
- Verify that links are accessible and current

### Example Usage

```typescript
guidelines: [
  {
    name: "AAPM TG-263",
    version: "2018",
    reference: "https://doi.org/10.1002/mp.12909",
    url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
    compliance: "full"
  },
  {
    name: "AAPM TG-275",
    version: "2022",
    reference: "https://doi.org/10.1002/mp.15419",
    url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
    compliance: "partial"
  }
]
```

## Company Fields

Companies represent organizations that develop or distribute deep learning products for radiotherapy.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique company identifier (lowercase, hyphenated) |
| `name` | string | Yes | Official company name |
| `description` | string | Yes | Brief description of the company and its focus |
| `website` | string | No | Company's main website URL |
| `productIds` | string[] | Yes | Array of product IDs associated with this company |
| `category` | string | No | Company category/classification |

## Initiative Fields

Initiatives represent research projects, challenges, datasets, and model repositories related to radiotherapy AI.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique initiative identifier |
| `name` | string | Yes | Full name of the initiative |
| `category` | string | Yes | Type of initiative. See [Initiative Categories](#initiative-categories) |
| `description` | string | Yes | Detailed description of the initiative's purpose and scope |
| `website` | string | Yes | Official initiative website or main page |
| `organization` | string | Yes | Organization or institution leading the initiative |
| `startDate` | string | No | Start date (YYYY-MM-DD format) |
| `endDate` | string | No | End date for completed initiatives (YYYY-MM-DD format) |
| `status` | string | Yes | Current status. Values: "Active", "Completed", "Upcoming" |
| `tags` | string[] | Yes | Relevant tags describing the initiative |
| `logoUrl` | string | No | Path to initiative logo |
| `features` | string[] | No | Key features or characteristics of the initiative |
| `dataAccess` | string | No | Information about how to access data or participate |
| `resultsUrl` | string | No | URL to results, leaderboard, or outcomes |
| `participationInfo` | string | No | Information about how to participate or get involved |
| `relatedPublications` | Publication[] | No | Array of related academic publications |

### Publication Object Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Publication title |
| `url` | string | Yes | DOI or URL to the publication |
| `authors` | string | Yes | Author names |
| `year` | string | Yes | Publication year |

## News Item Fields

News items represent updates, announcements, and developments in the radiotherapy AI field.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique news item identifier |
| `date` | string | Yes | Publication date (human-readable format) |
| `title` | string | Yes | News article title |
| `summary` | string | Yes | Brief summary of the news item |
| `content` | string | No | Full article content in Markdown format |

## Controlled Vocabularies

### Product Categories

Primary categories for deep learning products:

- **Auto-Contouring**: Automatic segmentation and contouring tools
- **Image Synthesis**: Synthetic image generation (e.g., MR-to-CT synthesis)
- **Registration**: Image registration and alignment tools
- **Treatment Planning**: Treatment planning optimization and automation
- **Clinical Prediction**: Outcome prediction and risk assessment tools
- **Reconstruction**: Image reconstruction and processing
- **Image Enhancement**: Image quality improvement and denoising
- **Performance Monitor**: Quality assurance and monitoring tools

### Initiative Categories

Types of research initiatives:

- **Grand Challenge**: Competitive challenges and benchmarks
- **Open Dataset**: Publicly available datasets
- **Research Project**: Funded research projects and consortiums
- **Model Zoo**: Collections of pre-trained models

### Anatomical Locations

Standardized anatomical regions:

- **Whole body**: Full-body applications
- **Agnostic**: Site-independent applications
- **Abdomen**: Abdominal region
- **Body**: General body applications
- **Brain**: Brain and neurological applications
- **Breast**: Breast cancer applications
- **Head & Neck**: Head and neck region (use ampersand, not "and")
- **Pelvis**: Pelvic region
- **Male Pelvis**: Male-specific pelvic applications
- **Female Pelvis**: Female-specific pelvic applications
- **Thorax**: Thoracic/chest region

### Modalities

Supported imaging modalities:

- **CT**: Computed Tomography
- **MRI**: Magnetic Resonance Imaging
- **CBCT**: Cone Beam CT
- **PET**: Positron Emission Tomography
- **PET/CT**: Combined PET/CT imaging
- **X-ray**: Conventional radiography

### Certifications

Regulatory approvals and certifications:

- **CE**: CE marking (European Conformity)
- **FDA**: U.S. Food and Drug Administration approval
- **CE & FDA**: Both CE and FDA approved
- **CE exempt**: Exempt from CE marking requirements
- **MDR exempt**: Exempt from Medical Device Regulation
- **NMPA**: China National Medical Products Administration

## Data Types and Formats

### String Formats

- **Dates**: Use ISO format YYYY-MM-DD for machine-readable dates
- **URLs**: Include full URLs with protocol (https://)
- **IDs**: Use lowercase with hyphens (kebab-case)
- **Versions**: Use semantic versioning (e.g., "2.1.0")

### Array Fields

Most array fields should contain strings. Use consistent terminology and avoid duplicates.

### Object Fields

Complex objects like `technicalSpecifications`, `regulatory`, `market`, and `technology` allow structured data storage for detailed information.

### Boolean Fields

Use `true`/`false` for boolean values like `trainingRequired`.

## Validation Rules

1. **Required Fields**: All fields marked as required must be provided
2. **Controlled Vocabularies**: Use exact spelling and capitalization for standardized terms
3. **Date Formats**: Use YYYY-MM-DD for dates that need to be parsed
4. **URL Validation**: Ensure URLs are valid and accessible
5. **Array Consistency**: Maintain consistent terminology within arrays
6. **ID Uniqueness**: All IDs must be unique within their category
7. **Guidelines References**: Prefer DOI links over direct URLs when available
8. **Technical Specifications Consistency**: Input/output types and formats must be logically consistent
9. **Category-Specific Requirements**: Each product category has specific field requirements

## Cross-References

This field reference is used by:

- [Product Review Guide](./review/GUIDE.md) - For product validation and review
- [Contributing Guidelines](../CONTRIBUTING.md) - For contributors adding new data
- [Example Templates](./examples/) - Showing proper field usage
- [Guidelines Reference](../src/data/guidelines-reference.ts) - Common guideline DOI references

## Need Help?

If you have questions about specific fields or need clarification on data formats:

1. Check the example files in `src/data/products/examples/`
2. Review existing products for reference patterns
3. Consult the guidelines reference file for common DOI links
4. Open a GitHub issue for guidance
5. Contact the maintenance team through the support page

---

*This documentation is maintained alongside the codebase. When adding new fields or changing data structures, please update this reference accordingly.*
