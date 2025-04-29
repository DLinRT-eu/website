
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-ai-rad-companion",
    name: "AI-Rad Companion",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/medical-imaging/ai-rad-companion",
    description: "AI-powered clinical decision support system that includes auto-segmentation capabilities for radiation therapy planning.",
    features: ["Multi-organ segmentation", "Decision support", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/medical-imaging/ai-rad-companion",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Clinical decision support", "Integration with Siemens ecosystem"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Clinical findings"],
      outputFormat: ["DICOM-RT", "Structured reports"]
    },
    technology: {
      integration: ["Native integration with Siemens systems", "PACS integration"],
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
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs and clinical decision support."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      countriesPresent: 70,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Module selection", "Usage volume"]
    },
    version: "3.2",
    releaseDate: "2023-09-15",
    lastUpdated: "2024-02-28",
    supportedStructures: [
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Spinal Cord",
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Esophagus",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L)",
      "Abdomen: Kidneys (R)",
      "Abdomen: Spleen",
      "Pelvis: Bladder",
      "Pelvis: Femoral Heads (L)",
      "Pelvis: Femoral Heads (R)"
    ],
    lastRevised: "2000-01-01"
  }
];
