
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-ai-rad-companion",
    name: "AI-Rad Companion",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/medical-imaging/ai-rad-companion",
    description: "AI-powered clinical decision support system that includes auto-segmentation capabilities for radiation therapy planning.",
    features: ["Multi-organ segmentation", "Decision support", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.siemens-healthineers.com/press-room/media/images/logo/logo_siemens_healthineers.png",
    website: "https://www.siemens-healthineers.com/medical-imaging/ai-rad-companion",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT, MR",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Clinical decision support", "Integration with Siemens ecosystem"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Clinical findings"],
      outputFormat: ["DICOM-RT", "Structured reports"]
    },
    technology: {
      integration: ["Native integration with Siemens systems", "PACS integration"],
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
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs and clinical decision support."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      countriesPresent: 70,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Module selection", "Usage volume"]
    },
    version: "3.2",
    releaseDate: "2023-09-15",
    lastUpdated: "2024-02-28"
  },
  {
    id: "siemens-syngo-ct",
    name: "syngo.CT",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com/",
    productUrl: "https://www.siemens-healthineers.com/computed-tomography/technologies-and-innovations/clinical-applications",
    description: "Advanced CT application suite including automated segmentation tools for radiation therapy planning.",
    features: ["Segmentation tools", "Integrated workflow", "Multimodality support"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.siemens-healthineers.com/press-room/media/images/logo/logo_siemens_healthineers.png",
    website: "https://www.siemens-healthineers.com/computed-tomography/technologies-and-innovations/clinical-applications",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["CT-based segmentation", "Workflow integration", "Multimodality support"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native integration with Siemens systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning and treatment."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales"],
      countriesPresent: 80,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "5.0",
    releaseDate: "2022-11-20",
    lastUpdated: "2023-10-15"
  }
];
