
import { ProductDetails } from "@/types/productDetails";

export const GE_HEALTHCARE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-auto-segmentation",
    name: "Auto Segmentation",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/products/advanced-visualization/advanced-visualization/auto-segmentation",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/ge-healthcare.ts",
    description: "Integrated auto-segmentation solution within the GE Healthcare ecosystem, providing efficient and accurate organ delineation for radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/products/advanced-visualization/advanced-visualization/auto-segmentation",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Integrated platform", "Workflow efficiency", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native integration with GE systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"]
    },
    version: "4.0",
    releaseDate: "2023-03-10",
    lastUpdated: "2024-01-20",
    lastRevised: "2025-09-01",
    source: "automatically retrieved"
  }
];
