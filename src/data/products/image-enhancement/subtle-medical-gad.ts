
import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_GAD_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-gad",
    name: "SubtleGAD",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/subtle-medical-gad.ts",
    description: "AI-powered solution that simulates full-dose gadolinium-enhanced MRI from zero- or low-dose contrast studies.",
    features: ["Deep learning enhancement", "MRI contrast", "Gadolinium reduction"],
    certification: "Research Use Only",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-gad/",
    anatomicalLocation: ["Brain", "Spine"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Cancer"],
    releaseDate: "2022-05-10",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based contrast enhancement",
      "Reduces or eliminates gadolinium administration",
      "Generates synthetic post-contrast images",
      "Reduces contrast-associated risks",
      "Designed for neurological applications"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["Pre-contrast MR images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic post-contrast images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Research platforms"],
      deployment: ["Cloud-based", "Research environments"],
      triggerForAnalysis: "Manual selection",
      processingTime: "<45 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Research Use Only",
        class: "N/A",
        type: "N/A"
      },
      fda: "Research Use Only",
      intendedUseStatement: "For research use only. Not for use in diagnostic procedures."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Research partnerships", "Early access program"],

},
    clinicalEvidence: "Early research studies showing promising correlation between synthetic and actual contrast-enhanced images in neurological applications",
    lastUpdated: "2024-12-15",
    lastRevised: "2025-09-01"
  }
];
