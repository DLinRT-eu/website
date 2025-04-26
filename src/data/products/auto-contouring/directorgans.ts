
import { ProductDetails } from "@/types/productDetails";

export const DIRECTORGANS_PRODUCTS: ProductDetails[] = [
  {
    id: "directorgans",
    name: "DirectORGANS",
    company: "DirectORGANS",
    companyUrl: "https://www.directorgans.com/",
    productUrl: "https://www.directorgans.com/",
    description: "Specialized AI solution focused exclusively on automatic organ segmentation for radiation therapy planning.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "https://www.directorgans.com/wp-content/uploads/2022/01/directorgans-logo.png",
    website: "https://www.directorgans.com/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
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
    lastUpdated: "2024-02-10"
  }
];
