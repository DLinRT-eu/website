
import { ProductDetails } from "@/types/productDetails";

export const ALGOMEDICA_PRODUCTS: ProductDetails[] = [
  {
    id: "algomedica-pixelshine",
    name: "PixelShine",
    company: "AlgoMedica",
    category: "Image Enhancement",
    certification: "FDA Cleared",
    releaseDate: "2016-09-19",
    description:
      "Deep-learning CT denoising that enhances image quality and supports low-radiation protocols; vendor-agnostic across CT scanners.",
    logoUrl: "/logos/algomedica.png",
    companyUrl: "https://algomedica.com/",
    productUrl: "https://algomedica.com/low-radation-ct-scans-algomedica",
    githubUrl:
      "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/algomedica.ts",
    contactEmail: "info@algomedica.com",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    keyFeatures: [
      "Noise reduction while maintaining diagnostic detail",
      "Improved SNR and low-contrast detectability",
      "Enables lower-dose CT protocols without compromising quality",
      "Seamless integration into existing workflows"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner console", "Imaging gateways"],
      deployment: ["On-premise", "Edge device", "Cloud (optional)"]
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDD",
        notifiedBody: "BSI (Notified Body 0086)",
        regulation: "MDD 93/42/EEC"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        clearanceNumber: "K161625",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        type: "510(k)"
      },
      intendedUseStatement:
        "Intended for use in de-noising CT datasets to improve image quality at reduced radiation dose to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019-05"
    },
    evidence: [
      {
        type: "Use cases and scientific publications",
        description: "Clinical case studies and scientific publications demonstrating PixelShine effectiveness",
        link: "https://algomedica.com/medical-imaging-resources#case-studies"      
      }
    ],
    lastUpdated: "2025-09-01",
    lastRevised: "2025-09-01"
  }
];
