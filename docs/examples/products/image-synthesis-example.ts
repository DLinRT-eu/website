
import { ProductDetails } from '@/types/productDetails';

export const imageSynthesisExample: ProductDetails = {
  id: "example-synthesis",
  name: "Example Synthetic Imaging",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Image Synthesis",
  description: "An example image synthesis product for testing and documentation.",
  url: "https://example.com/products/synthesis",
  contactEmail: "info@example.com",
  contactPhone: "+1 555-123-4567",
  logoUrl: "/placeholder.svg", // Add logoUrl
  
  modality: ["MRI", "CT"],
  anatomy: ["Brain", "Pelvis", "Whole Body"],
  
  features: [
    "MR-to-CT synthesis",
    "Multi-contrast MR synthesis",
    "AI-powered image translation",
    "Consistent HU values in synthetic CT",
    "Processing time under 2 minutes"
  ],
  
  technicalSpecs: {
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM"],
    integrations: ["Major TPS systems", "PACS"],
    processingTime: "1-2 minutes per volume",
    accuracy: "Mean absolute HU error < 40 units"
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: false,
    regulatoryClass: "Class II medical device (EU)",
    approvalDate: "2023-02-20"
  },
  
  marketInfo: {
    releaseDate: "2022-08-15",
    countries: ["EU", "UK", "Canada", "Australia", "Japan"],
    installBase: "20+ institutions"
  },
  
  pricingInfo: {
    pricingModel: "Per-site license with annual fee",
    priceRange: "$30,000-$45,000/year",
    trialAvailability: "Evaluation available for qualified institutions"
  },
  
  evidence: [
    {
      type: "Technical Validation",
      description: "Validation against real CT scans from 100 patients",
      link: "https://example.com/validation"
    },
    {
      type: "Dosimetric Study",
      description: "Treatment planning comparison study",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Reduced accuracy with metal implants",
    "Requires specific MRI sequences for optimal results",
    "Not validated for stereotactic applications"
  ],
  
  lastUpdated: "2023-05-28",
  lastRevised: "2023-05-28",
  lastVerified: "2023-05-28"
};

export default imageSynthesisExample;
