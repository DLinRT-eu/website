
import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_ADAPTBOX_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-adaptbox",
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/adaptbox/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/therapanacea-adaptbox.ts",
    description: "AI-powered software that provides one-click augmented CBCT images with organs-at-risk delineations for improved and more efficient adaptive radiotherapy workflow",
    features: [
      "CBCT auto-contouring",
      "Fast processing",
      "Adaptive radiotherapy support",
      "Male pelvis specialization",
      "CBCT image synthesis"
    ],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE & FDA",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/adaptbox/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "CBCT-based contouring",
      "Dose calculation on augmented CBCT",
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
      fda: "510(k) Cleared",
      intendedUseStatement: "For automatic segmentation of male pelvic structures in CBCT images for adaptive radiation therapy planning."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: "Not available",
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "1.0",
    releaseDate: "2023-09-01",
    lastUpdated: "2024-04-26",
    lastRevised: "2025-05-12",
    source: "automatically retrieved and verified",
    lastVerified: "2025-08-01"
  }
];
