
import { ProductDetails } from "@/types/productDetails";
import { MVISION_ALL_STRUCTURES } from "./mvision-structures";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-contouring",
    name: "Contour+",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://www.mvision.ai/ai-contouring/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/mvision.ts",
    description: "AI-powered auto-contouring solution for radiation therapy planning with deep learning algorithms for accurate organ at risk delineation.",
    features: ["Deep learning algorithms", "Multi-organ contouring", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://www.mvision.ai/ai-contouring/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    supportedStructures: MVISION_ALL_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based"],
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
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 25,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.0",
    releaseDate: "2023-09-10",
    lastUpdated: "2024-02-15",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
