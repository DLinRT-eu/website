
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-dual-energy-optimizer",
    name: "Dual Energy Optimizer AI",
    company: "Siemens Healthineers",
    category: "Image Enhancement",
    description: "AI-powered solution for optimizing dual-energy CT images, enhancing material differentiation and tissue characterization.",
    features: ["Deep learning enhancement", "Dual-energy CT", "Material decomposition"],
    certification: "CE Mark",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/computed-tomography/technologies/dual-energy",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/siemens.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Vascular disease", "Renal calculi"],
    releaseDate: "2022-02-01",
    version: "2.0",
    keyFeatures: [
      "AI-based dual-energy image optimization",
      "Enhanced virtual non-contrast images",
      "Improved iodine maps",
      "Reduced beam hardening artifacts",
      "Advanced material decomposition"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Dual-energy CT datasets"],
      inputFormat: ["DICOM"],
      output: ["Enhanced dual-energy images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["syngo.via", "Siemens CT scanners"],
      deployment: ["On-premise workstation", "Server-based"],
      triggerForAnalysis: "Automatic post-processing",
      processingTime: "<20 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing dual-energy CT image quality and material discrimination to support clinical interpretation."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated in dual-energy CT workflow", "Software upgrade"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "Subscription available"],
      basedOn: ["CT system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical studies demonstrating improved lesion detection and characterization compared to conventional dual-energy processing",
    lastUpdated: "2025-02-01",
    lastRevised: "2025-05-05"
  }
];
