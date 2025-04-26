
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
    logoUrl: "public/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/medical-imaging/ai-rad-companion",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MR"],
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
    id: "directorgans",
    name: "DirectORGANS",
    company: "DirectORGANS",
    companyUrl: "https://www.siemens-healthineers.com/radiotherapy/software-solutions/autocontouring",
    productUrl: "https://www.siemens-healthineers.com/radiotherapy/ct-for-rt/somatom-go-sim",
    description: "Specialized AI solution focused exclusively on automatic organ segmentation for radiation therapy planning.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "public/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/radiotherapy/ct-for-rt/somatom-go-sim",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
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
