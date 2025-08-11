
import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-synchrony-image",
    name: "Synchrony Image Enhancement",
    company: "Accuray",
    category: "Image Enhancement",
    description: "AI-enhanced imaging solution that improves image quality and motion management for radiotherapy guidance.",
    features: ["Deep learning enhancement", "Motion management", "Radiotherapy guidance"],
    certification: "FDA Cleared",
    logoUrl: "/logos/accuray.png",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/treatment-delivery/synchrony/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/accuray.ts",
    anatomicalLocation: ["Thorax", "Abdomen", "Pelvis"],
    modality: ["CBCT", "X-ray"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2021-07-15",
    version: "1.5",
    keyFeatures: [
      "AI-powered image enhancement for radiotherapy guidance",
      "Real-time motion tracking improvement",
      "Enhanced soft tissue contrast",
      "Reduced imaging artifacts",
      "Integrated with motion management system"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Real-time imaging data"],
      inputFormat: ["Proprietary", "DICOM"],
      output: ["Enhanced treatment guidance images"],
      outputFormat: ["System-specific", "DICOM"]
    },
    technology: {
      integration: ["CyberKnife System", "Radixact Treatment Delivery System"],
      deployment: ["System-integrated"],
      triggerForAnalysis: "Real-time during treatment",
      processingTime: "<100 ms for real-time processing"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing radiotherapy guidance images to improve motion tracking and target localization during treatment delivery."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with Accuray systems"],
      countriesPresent: 30,
      payingCustomers: "200+",
      researchUsers: "30+"
    },
    pricing: {
      model: ["System upgrade", "Service contract"],
      basedOn: ["System type", "Support level"]
    },
    clinicalEvidence: "Clinical evaluations showing improved motion tracking accuracy and reduced treatment margins compared to standard imaging approaches",
    lastVerified: "2025-05-10",
    lastUpdated: "2024-12-15",
    lastRevised: "2025-05-05"
  }
];
