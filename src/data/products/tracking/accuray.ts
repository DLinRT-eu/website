import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-synchrony",
    name: "Synchrony",
    company: "Accuray",
    category: "Tracking",
    description: "Accuray has provided a solution called Synchrony, that allows tumor motion to be corrected during radiation therapy delivery. This real-time motion synchronization enables precise treatment delivery that helps clinicians to reduce treatment margins, minimize dose to normal tissue and improve patients' quality of life.",
    features: [
      "Real-time motion synchronization",
      "Patient-specific AI model building",
      "Automatic model relearning",
      "Motion validity monitoring"
    ],
    certification: "FDA Cleared",
    logoUrl: "/logos/accuray.png",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/software/synchrony/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/tracking/accuray.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["X-ray", "Real-time imaging"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Patient-specific AI model that builds and optimizes for individual patients",
      "Real-time motion synchronization during radiation therapy delivery",
      "Automatic validity monitoring of AI model throughout treatment",
      "Autonomous relearning and improvement during treatment without user interaction",
      "Enables reduced treatment margins and minimized dose to normal tissue",
      "Improves patients' quality of life through precise treatment delivery"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Real-time imaging data", "Motion tracking data", "Patient anatomy data"],
      inputFormat: ["Proprietary", "DICOM"],
      output: ["Motion-corrected treatment delivery", "Real-time tracking data"],
      outputFormat: ["System-specific", "Treatment delivery commands"]
    },
    technology: {
      integration: ["CyberKnife System", "Radixact Treatment Delivery System"],
      deployment: ["System-integrated"],
      triggerForAnalysis: "Real-time during treatment delivery",
      processingTime: "Real-time processing with <100ms latency"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for real-time motion tracking and synchronization during radiation therapy delivery to correct tumor motion and enable precise treatment delivery."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Integrated with Accuray systems"],
      
      
      
    },
    pricing: {
      model: ["System integration", "Service contract"],
      basedOn: ["System type", "Support level", "Training requirements"]
    },
    clinicalEvidence: "Synchrony is unique and takes data from an individual patient, builds a patient's specific model, which is optimized for that patient. Clinical studies demonstrate significant reduction in treatment margins and improved dose distribution to normal tissue.",
    lastUpdated: "2024-12-15",
    lastRevised: "2025-05-05"
  }
];