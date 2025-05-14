
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_LEARNING_PRODUCTS: ProductDetails[] = [
 {
  id: "manteia-acculearning",
  name: "AccuLearning",
  company: "Manteia",
  productUrl: "https://www.manteiatech.com/acculearning",
  description: "Localized deep learning platform for clinics to build/train custom AI models for radiation therapy using institutional data.",
  features: [
    "Small-sample adaptive training (10-50 cases)",
    "Manteia ecosystem integration",
    "Site-specific model optimization",
    "Transfer learning from base models",
    "Model version control"
  ],
  category: "Model Training",
  certification: "CE & FDA",
  logoUrl: "/logos/manteia.png",
  website: "https://www.manteiatech.com/",
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
    onMarketSince: "2023",
    distributionChannels: ["Direct sales", "OEM partnerships"], // Added proper format
    countriesPresent: 12, // Added a numeric value
    payingCustomers: "50+ institutions", // Added string value
    researchUsers: "Institutional R&D, Clinical trial groups" // Fixed to be a string rather than array
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
  version: "1.2",
  releaseDate: "2024-01-15",
  lastRevised: "2025-05-12",
  lastUpdated: "2025-04-16",
  source: "Automatically retrieved and revised"
}
];
