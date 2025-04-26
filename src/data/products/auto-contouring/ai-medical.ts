import { ProductDetails } from "@/types/productDetails";

export const AI_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "ai-medical-jazz",
    name: "Jazz",
    company: "AI Medical",
    companyUrl: "https://www.aimedical.io/",
    productUrl: "https://www.aimedical.io/products",
    description: "AI-powered auto-contouring solution for radiation therapy planning with focus on enhanced accuracy and workflow efficiency.",
    features: ["Deep learning contours", "Fast processing", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/public/logos/ai-medical.png",
    website: "https://www.aimedical.io/products",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered contouring", "Workflow integration", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For assistance in the delineation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinical sites",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.0",
    releaseDate: "2023-05-15",
    lastUpdated: "2024-02-20"
  }
];
