
import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [
  {
    id: "mr-box-synthetic",
    name: "MR-Box",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu",
    productUrl: "https://www.therapanacea.eu/our-products/mrbox/",
    description: "Advanced MR simulation solution that enables synthetic CT generation from MR images for radiation therapy planning.",
    features: ["MR-only simulation", "Synthetic CT generation", "Clinical workflow integration"],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/mrbox/",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Synthetic CT generation", "MR-based planning", "Multi-contrast imaging"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic within workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Not available",
      intendedUseStatement: "For generating synthetic CT datasets from MR images for radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      countriesPresent: 20,
      payingCustomers: "Major hospitals and cancer centers in Europe",
      researchUsers: "Academic medical centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size", "Service level"]
    },
    version: "2.0",
    releaseDate: "2023-04-25",
    lastUpdated: "2024-02-28"
  },
  {
    id: "therapanacea-adaptbox",
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/adaptbox/",
    description: "AI-powered software that provides one-click augmented CBCT images with organs-at-risk delineations for improved and more efficient adaptive radiotherapy workflow",
    features: [
      "CBCT auto-contouring",
      "Fast processing",
      "Adaptive radiotherapy support",
      "Male pelvis specialization",
      "CBCT image synthesis"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/adaptbox/",
    anatomicalLocation: ["Pelvis"],
    modality: "CBCT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "CBCT-based contouring",
      "Clinical workflow integration",
      "Rapid processing for adaptive RT",
      "CBCT image enhancement"
    ],
    technicalSpecifications: {
      population: "Adult male patients",
      input: ["CBCT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 2 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Not available",
      intendedUseStatement: "For automatic segmentation of male pelvic structures in CBCT images for adaptive radiation therapy planning."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 8,
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "1.0",
    releaseDate: "2023-09-01",
    lastUpdated: "2024-04-26"
  }
];
