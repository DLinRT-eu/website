
import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-autocontour",
    name: "AutoContour",
    company: "RadFormation",
    companyUrl: "https://www.radformation.com/",
    productUrl: "https://www.radformation.com/autocontour/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/radformation.ts",
    description: "Cloud-based auto-contouring solution providing fast and accurate organ at risk delineation for radiation therapy planning.",
    features: ["Cloud-based processing", "Multi-organ contouring", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://www.radformation.com/autocontour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Cloud-based processing", "Fast turnaround", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual upload or automated",
      processingTime: "Minutes per case"
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
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Cloud platform"],
      countriesPresent: 30,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Per-contour pricing"]
    },
    version: "4.0",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-03-20",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
