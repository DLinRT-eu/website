
import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
    name: "Treatment Planning",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/raysearch-planning.ts",
    description: "Advanced treatment planning system with AI-enhanced optimization algorithms (i.e. deep learning dose prediction followed by dose mimicking) for radiation therapy planning across different treatment techniques (i.e. Proton Pencil Beam Scanning, SMLC, VMAT).",
    features: ["AI-enhanced optimization", "Multi-criteria optimization", "Advanced planning"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Breast", "Pelvis", "Male Pelvis" ],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Auto-planning with deep learning driven dose prediction", "Customizable post-processing to match your protocols, clinical goals, and machines", "Models validated against common radiotherapy protocols"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT", "Structure sets", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["RT plan", "RT dose"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Linac integration", "Imaging systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Treatment planning workflow",
      processingTime: "Minutes to hours depending on complexity"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For radiation therapy treatment planning and dose calculation."
    },
    market: {
      onMarketSince: "2009",
      distributionChannels: ["Direct sales"]
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2025-05-01",
    lastRevised: "2025-08-26",
    source: "Automatically retrieved and revised"
  }
];
