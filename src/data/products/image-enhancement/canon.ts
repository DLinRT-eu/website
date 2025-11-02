
import { ProductDetails } from "@/types/productDetails";

export const CANON_PRODUCTS: ProductDetails[] = [
  {
    id: "canon-advanced-vis-ai",
    name: "Advanced Visualization with AI",
    company: "Canon Medical Systems",
    category: "Image Enhancement",
    description: "AI-powered image enhancement solution that improves clarity and detail in medical images across multiple modalities.",
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/healthcare-it/vitrea-advanced-visualization",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "PET"],
    diseaseTargeted: ["Oncological diseases", "Cardiovascular disorders", "Neurological conditions"],
    releaseDate: "2021-10-01",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based image enhancement",
      "Multi-modality support (CT, MRI, PET)",
      "Improved lesion conspicuity",
      "Noise reduction with detail preservation",
      "Seamless integration with Vitrea workflow"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Vitrea Advanced Visualization", "Canon imaging devices"],
      deployment: ["Server-based", "Cloud option"],
      triggerForAnalysis: "Rule-based or manual selection",
      processingTime: "<12 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing medical images to improve quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with Vitrea platform", "Standalone module"],

},
    clinicalEvidence: "Multiple reader studies showing improved diagnostic confidence and reduced reading time for enhanced images",
    lastUpdated: "2025-01-05",
    lastRevised: "2025-09-01"
  }
];
