import { ProductDetails } from "@/types/productDetails";

export const HURA_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "hura-hurart",
    name: "HuraRT (DV.Target)",
    company: "Hura Imaging",
    companyUrl: "http://www.huraimaging.com/",
    productUrl: "http://www.huraimaging.com/dvtarget/",
    description: "AI-powered auto-contouring platform providing accurate and efficient organ segmentation for radiation therapy planning.",
    features: ["Deep learning contouring", "Multiple anatomical sites", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "https://github.com/matteomaspero/dlinrt-products/public/logos/huraimaging.png",
    website: "http://www.huraimaging.com",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Clinical workflow integration", "Multi-organ support"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
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
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 12,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-09-05",
    lastUpdated: "2024-02-15"
  }
];
