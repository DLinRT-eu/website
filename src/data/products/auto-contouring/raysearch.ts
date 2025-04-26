import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation",
    name: "RayStation Deep Learning Segmentation",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/solutions/raystation/deep-learning-segmentation",
    description: "Advanced treatment planning system with machine learning-based auto-segmentation for rapid and consistent contouring.",
    features: ["Deep learning segmentation", "Integrated planning", "Atlas-based backup"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.raysearchlabs.com/wp-content/themes/raysearch/assets/images/logo.svg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT, MR, PET",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Machine learning algorithms", "Multi-atlas fallback", "TPS integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds to minutes per structure"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Over 800 clinics worldwide",
      researchUsers: "Multiple academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2024-03-15"
  }
];
