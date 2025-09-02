
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_LEARNING_PRODUCTS: ProductDetails[] = [
 {
  id: "manteia-acculearning",
  name: "AccuLearning",
  company: "Manteia",
  productUrl: "https://www.manteiatech.com/acculearning",
  githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/manteia-acculearning.ts",
  description: "Localized deep learning platform for clinics to build/train custom AI models for radiation therapy using institutional data.",
  category: "Model Training",
  certification: "For research use. Clinical deployment requires separate validation",
  logoUrl: "/logos/manteia.png",
  website: "https://www.manteiamedical.com/acculearning",
  anatomicalLocation: ["All Sites"],
  modality: ["CT","MRI","CBCT"],
  subspeciality: "Radiation Oncology AI",
  keyFeatures: [
    "Drag-and-drop model builder",
    "Auto-annotation pre-processing",
    "Domain adaptation for scanner differences",
    "Model performance dashboards",
    "One-click deployment to AccuContour/MOZI"
  ],
  technicalSpecifications: {
    population: "Institutional data",
    input: ["CT", "MRI", "Structure sets", "Dose matrices"],
    inputFormat: ["DICOM", "DICOM-RT"],
    output: ["Custom AI models"],
    outputFormat: ["DICOM", "DICOM-RT"] // Fixed output format
  },
  technology: {
    integration: ["AccuContour", "MOZI", "PACS"],
    deployment: ["On-premises GPU clusters", "Hybrid cloud"],
    triggerForAnalysis: "Model training request", // Added missing required property
    processingTime: "1-4 hours depending on dataset size" // Added missing required property
  },
  regulatory: {
    ce: {
      status: "Certified",
      class: "I",
      type: "Software Development Environment"
    },
    intendedUseStatement: "For research use; clinical deployment requires separate validation."
  },
  market: {
    onMarketSince: "2017",
    distributionChannels: ["Direct sales", "OEM partnerships"], // Added proper format
    
    
    
  },
  pricing: {
    model: ["Annual license", "Compute-hour credits"],
    basedOn: ["GPU utilization", "Model instances"]
  },
  useCases: [
    "Clinic-specific OAR models (e.g., post-op anatomy)",
    "Rare tumor target delineation",
    "Adaptive replanning triggers",
    "Dose prediction networks"
  ],
  supportedStructures: [
    "Customizable: Define new OARs/targets",
    "Base templates: Brainstem, Parotid (L/R), etc.",
    "Rare structures: Brachytherapy applicators",
    "Institutional variants: LN levels"
  ],
  version: "N/D",
  releaseDate: "2017-01-01",
  lastRevised: "2025-08-11",
  lastUpdated: "2025-08-11",
  source: "Automatically retrieved and revised"
}
];
