import { ProductDetails } from "@/types/productDetails";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-autosegment",
    name: "MVision AI",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://mvision.ai/guideline-based-segmentation/",
    description: "Cloud-based auto-segmentation tool for radiation therapy planning that utilizes deep learning algorithms.",
    features: ["Cloud-based segmentation", "AI algorithms", "Multiple cancer sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "public/logos/mvision-ai.png",
    website: "https://www.mvision.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Lung Cancer", "Prostate Cancer", "Breast Cancer"],
    keyFeatures: ["Deep learning segmentation", "Cloud-based platform", "Multi-vendor integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated upload",
      processingTime: "5-10 minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "Over 60 clinics",
      researchUsers: "Multiple research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "4.0",
    releaseDate: "2023-09-10",
    lastUpdated: "2024-02-28"
  }
];
