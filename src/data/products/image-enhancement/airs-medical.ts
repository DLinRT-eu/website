
import { ProductDetails } from "@/types/productDetails";

export const AIRS_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "airs-medical-nodule",
    name: "AI Solutions for Medical Imaging",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-powered medical imaging solutions that enhance image quality and provide automated analysis for improved diagnostic accuracy.",
    features: ["Deep learning enhancement", "Automated analysis", "Quality improvement"],
    certification: "CE Mark",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://www.airsmed.com/",
    productUrl: "https://www.airsmed.com/solutions/",
    anatomicalLocation: ["Chest", "Abdomen", "Brain"],
    modality: ["CT", "MRI", "X-ray"],
    diseaseTargeted: ["Lung nodules", "Cancer detection", "Various pathologies"],
    releaseDate: "2020-03-15",
    version: "2.0",
    keyFeatures: [
      "AI-powered image enhancement for better visualization",
      "Automated detection and analysis of abnormalities",
      "Quality assurance and standardization",
      "Integration with existing PACS systems",
      "Real-time processing capabilities"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Medical images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images", "Analysis reports"],
      outputFormat: ["DICOM", "PDF reports"]
    },
    technology: {
      integration: ["PACS integration", "Workstation compatibility"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic upon image availability",
      processingTime: "<30 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "Intended for enhancing medical images and providing computer-aided detection to support clinical diagnosis."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "100+",
      researchUsers: "25+"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual volume", "Feature set"]
    },
    clinicalEvidence: "Clinical studies showing improved detection rates and reduced false positives compared to unenhanced images",
    lastVerified: "2025-05-10",
    lastUpdated: "2024-11-20",
    lastRevised: "2025-05-05"
  }
];
