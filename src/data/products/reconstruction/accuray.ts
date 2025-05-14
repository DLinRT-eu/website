
import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-clearrt",
    name: "ClearRT",
    company: "Accuray",
    category: "Reconstruction",
    description: "Advanced imaging solution that provides enhanced imaging quality for the Radixact System with helical fan-beam CT (FBCTᵀᴹ) for improved soft-tissue visualization during treatment delivery.",
    features: [
      "Enhanced soft-tissue visualization",
      "Fan-beam CT reconstruction",
      "Integrated treatment delivery",
      "Precise patient positioning"
    ],
    certification: "FDA Cleared",
    logoUrl: "/logos/accuray.png",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/treatment-delivery/clearrt/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "High-fidelity imaging for precise tumor visualization",
      "Helical fan-beam CT technology",
      "Seamless integration with Radixact System",
      "Real-time adaptive treatment capabilities",
      "Improved soft-tissue contrast"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw detector data"],
      inputFormat: ["Proprietary"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Radixact Treatment Delivery System"],
      deployment: ["System-integrated"],
      triggerForAnalysis: "Pre-treatment and during delivery",
      processingTime: "<15 seconds for reconstruction"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for providing enhanced imaging quality for the Radixact System with helical fan-beam CT for improved soft-tissue visualization during treatment delivery."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Integrated with Radixact System"],
      countriesPresent: 35,
      payingCustomers: "250+",
      researchUsers: "50+"
    },
    pricing: {
      model: ["System upgrade", "New system inclusion"],
      basedOn: ["Hardware configuration", "Service contract"]
    },
    clinicalEvidence: "Clinical studies demonstrating improved target visualization and reduced treatment margins compared to standard megavoltage CT imaging",
    lastVerified: "2025-05-05",
    lastUpdated: "2024-12-10",
    lastRevised: "2025-05-05",
    source: "Automatically retrieved"
    
  }
];
