
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_MOZI_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-mozi",
    name: "MOZI",
    company: "Manteia",
    companyUrl: "https://www.manteiatech.com/",
    productUrl: "https://www.manteiatech.com/mozi",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/manteia-mozi.ts",
    description: "AI-powered treatment planning assistant that optimizes radiation therapy plans using machine learning algorithms for improved plan quality and efficiency.",
    features: ["AI-powered optimization", "Plan quality assessment", "Workflow integration"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiatech.com/mozi",
    anatomicalLocation: ["All sites"],
    modality: ["RT planning"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-driven plan optimization", "Quality metrics", "Automated planning"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Treatment plans", "CT images", "Structure sets"],
      inputFormat: ["DICOM-RT"],
      output: ["Optimized plans", "Quality reports"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Plan submission",
      processingTime: "Minutes per plan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For assisting in radiation therapy treatment planning optimization."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Cloud platform"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of plans"]
    },
    version: "3.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2024-04-15",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
