
import { ProductDetails } from "@/types/productDetails";

export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortune.ai/",
    productUrl: "https://www.everfortune.ai/products/",
    description: "Comprehensive AI-powered solution for radiation therapy planning, including auto-segmentation and treatment optimization.",
    features: ["Auto-contouring", "Treatment planning support", "AI optimization"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "https://www.everfortune.ai/wp-content/uploads/2022/05/everfortune-logo.png",
    website: "https://www.everfortune.ai/products/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning segmentation", "Treatment planning tools", "Workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
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
      intendedUseStatement: "For automatic segmentation and treatment planning assistance in radiation therapy."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 8,
      payingCustomers: "Multiple clinical sites in Asia",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Module selection"]
    },
    version: "2.0",
    releaseDate: "2023-07-15",
    lastUpdated: "2024-03-10"
  }
];
