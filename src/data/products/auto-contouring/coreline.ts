
import { ProductDetails } from "@/types/productDetails";

export const CORELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "coreline-aview-rt-acs",
    name: "Aview RT ACS",
    company: "Coreline Soft Co",
    companyUrl: "https://www.corelinesoft.com/",
    productUrl: "https://www.corelinesoft.com/product/acs/",
    description: "AI-powered auto-contouring system for radiation therapy planning, providing rapid and accurate organ segmentation.",
    features: ["Deep learning based", "Automated contouring", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.corelinesoft.com/wp-content/uploads/2021/08/coreline-logo.png",
    website: "https://www.corelinesoft.com/product/acs/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning segmentation", "Fast processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per patient"
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
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Institution size", "Module selection"]
    },
    version: "3.0",
    releaseDate: "2023-04-20",
    lastUpdated: "2024-01-15"
  }
];
