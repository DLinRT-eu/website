
import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-autocontour",
    name: "AutoContour",
    company: "RadFormation",
    companyUrl: "https://radformation.com/",
    productUrl: "https://radformation.com/products/autocontour/",
    description: "AI-driven auto-contouring solution focused on streamlining the radiation therapy planning workflow with accurate organ segmentation.",
    features: ["Deep learning algorithms", "Multiple anatomical sites", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://radformation.com/wp-content/uploads/2021/06/radformation-logo.png",
    website: "https://radformation.com/products/autocontour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Brain"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Clinical workflow integration", "Quality assurance tools"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Quality metrics"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
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
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 25,
      payingCustomers: "Multiple clinical sites in North America and Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.0",
    releaseDate: "2023-11-10",
    lastUpdated: "2024-03-15"
  }
];
