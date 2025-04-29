
import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-annotate",
    name: "Annotate",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/annotate/",
    description: "AI-powered auto-contouring solution for radiation oncology that delivers accurate, consistent and fast delineation of organs at risk.",
    features: ["Precise contouring", "Fast processing", "Customizable workflows"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/annotate/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "Quality assurance tools"],
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
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 3 minutes per case"
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
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 12,
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-04-01"
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
      input: ["CBCT"],
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
