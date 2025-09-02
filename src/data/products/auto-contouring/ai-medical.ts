
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
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "Under review",
        type: "510(k)"
      },
      intendedUseStatement: "For assistance in the delineation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.0",
    releaseDate: "2023-05-15",
    lastUpdated: "2024-04-29",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved and revised"
  }
];
