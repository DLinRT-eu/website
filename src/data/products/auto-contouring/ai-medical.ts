
import { ProductDetails } from "@/types/productDetails";

export const AI_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "ai-medical-jazz",
    name: "Jazz",
    company: "AI Medical",
    companyUrl: "https://www.ai-medical.ch/",
    productUrl: "https://www.ai-medical.ch/jazz",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/ai-medical.ts",
    description: "Long-terms lesion tracking and reporting.",
    features: ["Deep learning contours", "Fast processing", "Multiple anatomical sites", "Lesion tracking"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/ai-medical.png",
    website: "https://www.ai-medical.ch/jazz",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "AI-powered contouring", 
      "Workflow integration", 
      "Multiple anatomical sites", 
      "Lesion tracking - mark once, remember forever"
    ],
    supportedStructures: [
      "Brain: Lesions"
    ],
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
    lastUpdated: "2024-04-29",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract",
    lastRevised: "2025-05-04",
    source: "Automatically retrieved and revised",
    lastVerified: "2024-05-12"
  }
];
