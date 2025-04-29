
import { ProductDetails } from "@/types/productDetails";

export const SYNAPTIQ_PRODUCTS: ProductDetails[] = [
  {
    id: "synaptiq-mediq-rt",
    name: "Mediq RT",
    company: "Synaptiq",
    companyUrl: "https://synaptiq.io/",
    productUrl: "https://synaptiq.io/product/",
    description: "AI-powered solution for radiation therapy planning with advanced auto-contouring capabilities for multiple anatomical sites.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/synaptiq.png",
    website: "https://synaptiq.io/product/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
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
      countriesPresent: 8,
      payingCustomers: "Multiple clinical sites in Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.0",
    releaseDate: "2023-08-20",
    lastUpdated: "2024-03-05"
  }
];
