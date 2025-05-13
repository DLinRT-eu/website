
import { ProductDetails } from "@/types/productDetails";

export const MIRADA_PRODUCTS: ProductDetails[] = [
  {
    id: "mirada-dlc",
    name: "DLC Expert",
    company: "Mirada Medical",
    companyUrl: "https://mirada-medical.com/radiation-oncology/",
    productUrl: "https://mirada-medical.com/product/mirada-dlcexpert-ai-autocontouring/",
    description: "Deep learning-based auto-contouring software for radiation oncology providing consistent and rapid contouring of normal tissues.",
    features: ["Multi-structure contouring", "Consistent results", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mirada-medical.png",
    website: "https://mirada-medical.com/product/mirada-dlcexpert-ai-autocontouring/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Batch processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Contour reports"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "Workflow manager"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Not available anymore"],
      countriesPresent: 30,
      payingCustomers: "Multiple clinics worldwide",
      researchUsers: "Research centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Institution size", "Volume"]
    },
    version: "2.2",
    releaseDate: "2023-05-20",
    lastUpdated: "2024-01-15",
    lastRevised: "2025-05-01",
    source: "automatically retrieved"
  }
];
