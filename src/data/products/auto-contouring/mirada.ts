import { ProductDetails } from "@/types/productDetails";

export const MIRADA_PRODUCTS: ProductDetails[] = [
  {
    id: "mirada-dln",
    name: "DLCExpert",
    company: "Mirada Medical",
    description: "Deep learning-based auto-contouring software for radiation oncology providing consistent and rapid contouring of normal tissues.",
    features: ["Multi-structure contouring", "Consistent results", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://mirada-medical.com/solutions/radiation-oncology/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Batch processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
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
      distributionChannels: ["Direct sales", "OEM partnerships"],
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
    lastUpdated: "2024-01-15"
  }
];
