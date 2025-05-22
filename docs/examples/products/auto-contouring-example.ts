
import { ProductDetails } from '@/types/productDetails';

export const autoContouringExample: ProductDetails = {
  id: "example-contour",
  name: "Example Auto-Contouring",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Auto-Contouring",
  description: "An example auto-contouring product for testing and documentation.",
  url: "https://example.com/products/contour",
  contactEmail: "info@example.com",
  contactPhone: "+1 555-123-4567",
  logoUrl: "/placeholder.svg", // Add logoUrl
  
  modality: ["CT", "MRI"],
  anatomy: ["Head & Neck", "Brain", "Thorax", "Abdomen", "Pelvis"],
  
  features: [
    "Deep learning based auto-segmentation",
    "Multi-modal support (CT, MR)",
    "Batch processing",
    "Manual editing tools",
    "DICOM RT-STRUCT export"
  ],
  
  technicalSpecs: {
    inputFormat: ["DICOM"],
    outputFormat: ["DICOM RT-STRUCT"],
    integrations: ["Any DICOM compatible TPS"],
    processingTime: "~1-2 minutes per structure set",
    accuracy: "85-95% DSC for most structures"
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: true,
    regulatoryClass: "Class II medical device",
    approvalDate: "2023-01-15"
  },
  
  marketInfo: {
    releaseDate: "2022-05-01",
    countries: ["USA", "EU", "Canada", "Australia"],
    installBase: "50+ institutions worldwide"
  },
  
  pricingInfo: {
    pricingModel: "Subscription-based",
    priceRange: "$20,000-$40,000/year",
    trialAvailability: "30-day free trial available"
  },
  
  supportedStructures: [
    {
      name: "Brainstem",
      type: "OAR",
      accuracy: "92% DSC",
      validationDataset: "Internal validation on 150 cases"
    },
    {
      name: "Parotid (L/R)",
      type: "OAR",
      accuracy: "89% DSC",
      validationDataset: "Public dataset + internal validation"
    },
    {
      name: "Lungs (L/R)",
      type: "OAR",
      accuracy: "95% DSC",
      validationDataset: "Internal validation on 200 cases"
    },
    {
      name: "GTV Primary",
      type: "GTV",
      accuracy: "82% DSC",
      validationDataset: "Internal validation on clinical cases"
    }
  ],
  
  evidence: [
    {
      type: "Clinical Validation",
      description: "Multi-center validation study with 5 institutions",
      link: "https://example.com/validation"
    },
    {
      type: "Peer-Reviewed Publication",
      description: "Published in Medical Physics journal",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Performance may vary for unusual anatomy",
    "Not validated for pediatric patients",
    "Requires contralateral structures for some segmentations"
  ],
  
  lastUpdated: "2023-06-10",
  lastRevised: "2023-06-10",
  lastVerified: "2023-06-10"
};

export default autoContouringExample;
