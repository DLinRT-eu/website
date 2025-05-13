
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
    lastUpdated: "2024-02-28",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
