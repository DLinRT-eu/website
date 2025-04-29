
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-syngo-ct",
    name: "syngo.via RT Image Suite",
    company: "Siemens Healthineers",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct",
    description: "Advanced imaging solution for radiation therapy planning including synthetic CT generation from MR data.",
    features: ["Synthetic CT generation", "Multimodality image registration", "Treatment planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/siemens.png",
    website: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct",
    anatomicalLocation: ["Brain", "Pelvis", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["MR-based synthetic CT", "Integrated workflow", "Automated processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "syngo.via platform integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within syngo.via workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For creating synthetic CT datasets from MR images to be used in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 35,
      payingCustomers: "Major healthcare institutions",
      researchUsers: "Research centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "VB60",
    releaseDate: "2023-09-20",
    lastUpdated: "2024-03-15",
    lastRevised: "2000-01-01"
  }
];
