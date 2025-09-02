
import { ProductDetails } from "@/types/productDetails";

export const ALGOMEDICA_PRODUCTS: ProductDetails[] = [
  {
    id: "algomedica-pixelshine",
    name: "PixelShine",
    company: "AlgoMedica",
    category: "Image Enhancement",
    certification: "FDA Cleared",
    description:
      "Deep-learning CT denoising that enhances image quality and supports low-radiation protocols; vendor-agnostic across CT scanners.",
    features: [
      "Deep learning CT denoising",
      "Vendor-agnostic (works with images from any CT scanner)",
      "Supports low-dose acquisition protocols",
      "Preserves edges and natural image texture",
      "Compatible with FBP and Iterative Reconstruction (IR)"
    ],
    logoUrl: "/logos/algomedica.png",
    companyUrl: "https://www.algomedica.com/",
    productUrl: "https://www.algomedica.com/low-radation-ct-scans-algomedica",
    githubUrl:
      "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/algomedica.ts",
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
      fda: "510(k) Cleared (K161625)",
      intendedUseStatement:
        "Intended for use in de-noising CT datasets to improve image quality at reduced radiation dose to support clinical interpretation."
    },
    lastUpdated: "2025-09-01",
    lastRevised: "2025-09-01"
  }
];
