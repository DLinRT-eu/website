
import { ProductDetails } from "@/types/productDetails";
import { LIMBUS_ALL_STRUCTURES } from "./limbus-structures";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/limbus.ts",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    features: ["Automated OAR contouring", "Fast processing", "Deep learning algorithms"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Cloud-based", "DICOM compatibility"],
    supportedStructures: LIMBUS_ALL_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of contours"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    lastUpdated: "2024-03-10",
    lastRevised: "2025-05-04"
  }
];
