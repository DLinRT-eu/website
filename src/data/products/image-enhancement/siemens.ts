
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
      countriesPresent: 45,
      payingCustomers: "350+",
      researchUsers: "60+"
    },
    pricing: {
      model: ["One-time purchase", "Subscription available"],
      basedOn: ["CT system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical studies demonstrating improved lesion detection and characterization compared to conventional dual-energy processing",
    lastVerified: "2024-12-05",
    lastUpdated: "2025-02-01",
    lastRevised: "2025-05-05"
  },
  {
    id: "siemens-clara-train-image",
    name: "Clara Train Image Processing",
    company: "Siemens Healthineers",
    category: "Image Enhancement",
    description: "AI-powered image enhancement platform that improves image quality across modalities using deep learning techniques.",
    features: ["Deep learning enhancement", "Multi-modality", "Customizable pipelines"],
    certification: "CE Mark",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/digital-health-solutions/digital-solutions-overview/clinical-decision-support/ai-pathway-companion/clara",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "X-ray"],
    diseaseTargeted: ["Multiple conditions"],
    releaseDate: "2021-07-15",
    version: "3.0",
    keyFeatures: [
      "Multi-modality image enhancement",
      "Customizable AI enhancement pipelines",
      "Noise reduction and detail enhancement",
      "Automated image quality optimization",
      "Compatible with existing PACS infrastructure"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["teamplay digital health platform", "syngo.via"],
      deployment: ["Cloud", "On-premise"],
      triggerForAnalysis: "Rule-based or manual trigger",
      processingTime: "Varies by modality, typically <15 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing medical images to improve quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Digital marketplace"],
      countriesPresent: 40,
      payingCustomers: "250+",
      researchUsers: "100+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual volume", "Enterprise deployment"]
    },
    clinicalEvidence: "Multiple clinical evaluations showing improved diagnostic confidence and time efficiency across various imaging applications",
    lastVerified: "2024-11-10",
    lastRevised: "2025-05-05",
    lastUpdated: "2025-01-15"
  }
];
