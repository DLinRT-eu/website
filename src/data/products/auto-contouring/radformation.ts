
import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-econtour",
    name: "EZContour",
    company: "Radformation",
    companyUrl: "https://radformation.com/",
    productUrl: "https://radformation.com/ezcontour",
    description: "AI-driven contouring solution for radiation therapy planning, offering automated segmentation of organs at risk.",
    features: ["AI segmentation", "Multiple anatomical sites", "TPS integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://radformation.com/ezcontour",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered contouring", "Treatment planning integration", "Fast processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
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
      fdaSubmissionNumber: "K213392",
      fdaLink: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K213392",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 12,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.0",
    releaseDate: "2023-11-01",
    lastUpdated: "2024-03-12",
    lastRevised: "2000-01-01"
  }
];
