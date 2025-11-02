
import { ProductDetails } from "@/types/productDetails";
import { LIMBUS_ALL_STRUCTURES } from "./limbus-structures";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/limbus.ts",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Cloud-based", "DICOM compatibility"],
    supportedStructures: LIMBUS_ALL_STRUCTURES,
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "AAPM TG-275",
        version: "2022", 
        reference: "https://doi.org/10.1002/mp.15419",
        url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
        compliance: "full"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745",
        notifiedBody: "TÜV SÜD (Notified Body 0123)"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],

},
    version: "3.0",
    releaseDate: "2023-06-15",
    lastUpdated: "2024-03-10",
    lastRevised: "2025-09-01"
  }
];
