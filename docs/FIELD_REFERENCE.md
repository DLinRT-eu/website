
# DLinRT.eu Field Reference Documentation

This document provides a comprehensive reference for all fields used in the DLinRT.eu database, including products, companies, initiatives, and news items. It serves as a nomenclature and data dictionary for contributors.

## Table of Contents

1. [Product/ProductDetails Fields](#productproductdetails-fields)
2. [Company Fields](#company-fields)
3. [Initiative Fields](#initiative-fields)
4. [News Item Fields](#news-item-fields)
5. [Controlled Vocabularies](#controlled-vocabularies)
6. [Data Types and Formats](#data-types-and-formats)

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

### Technical Specifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `technicalSpecifications` | object | No | Technical details about input/output |
| `technicalSpecifications.population` | string | No | Target patient population |
| `technicalSpecifications.input` | string[] | No | Types of input data accepted |
| `technicalSpecifications.inputFormat` | string[] | No | Supported input file formats |
| `technicalSpecifications.output` | string[] | No | Types of output data generated |
| `technicalSpecifications.outputFormat` | string[] | No | Supported output file formats |

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
| `market.countriesPresent` | number | No | Number of countries where available |
| `market.payingCustomers` | string | No | Information about paying customer base |
| `market.researchUsers` | string | No | Information about research user base |

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

## Cross-References

This field reference is used by:

- [Product Review Guide](./review/GUIDE.md) - For product validation and review
- [Contributing Guidelines](../CONTRIBUTING.md) - For contributors adding new data
- [Example Templates](./examples/) - Showing proper field usage

## Need Help?

If you have questions about specific fields or need clarification on data formats:

1. Check the example files in `src/data/products/examples/`
2. Review existing products for reference patterns
3. Open a GitHub issue for guidance
4. Contact the maintenance team through the support page

---

*This documentation is maintained alongside the codebase. When adding new fields or changing data structures, please update this reference accordingly.*
