
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const DIRECTORGANS_PRODUCTS: ProductDetails[] = [
  {
    id: "directorgans",
    name: "DirectORGANS",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/nl-be/infrastructure-it/artificial-intelligence/ai-campaign/organs-rt",
    description: "Specialized AI solution focused exclusively on automatic organ segmentation for radiation therapy planning.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/nl-be/infrastructure-it/artificial-intelligence/ai-campaign/organs-rt",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
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
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 10,
      payingCustomers: "Clinical sites in Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.0",
    releaseDate: "2023-05-25",
    lastUpdated: "2024-02-10",
    supportedStructures: [
      "Head & Neck: Brainstem",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
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
      "Pelvis: Rectum",
      "Pelvis: Femoral Heads"
    ],
    lastRevised: "2000-01-01"
  }
];
