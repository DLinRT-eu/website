
import { ProductDetails } from "@/types/productDetails";

export const ELEKTA_PRODUCTS: ProductDetails[] = [
  {
    id: "elekta-monaco-hd",
    name: "Elekta Monaco HD",
    company: "Elekta",
    category: "Image Enhancement",
    description: "AI-enhanced image processing solution for radiotherapy planning that improves image quality and enhances soft tissue visualization.",
    features: ["Deep learning enhancement", "Radiotherapy planning", "Multi-modality"],
    certification: "CE Mark",
    logoUrl: "/placeholder.svg",
    companyUrl: "https://www.elekta.com/",
    productUrl: "https://www.elekta.com/treatment-planning/monaco/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "CBCT"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2022-03-01",
    version: "6.0",
    keyFeatures: [
      "AI-powered image enhancement for radiotherapy planning",
      "Improved soft tissue contrast",
      "Enhanced tumor and organ-at-risk visualization",
      "Denoising technology for clearer images",
      "Seamless integration with Monaco TPS"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced DICOM images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Monaco TPS", "MOSAIQ Oncology Information System"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Automatic or manual within TPS workflow",
      processingTime: "<15 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing medical images to improve quality through noise reduction and detail enhancement to support radiotherapy treatment planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated with Monaco TPS", "Software upgrade"],
      countriesPresent: 35,
      payingCustomers: "250+",
      researchUsers: "40+"
    },
    pricing: {
      model: ["Subscription", "TPS integrated license"],
      basedOn: ["Treatment planning stations", "Enterprise license"]
    },
    clinicalEvidence: "Clinical studies showing improved organ-at-risk delineation accuracy and reduced inter-observer variability with enhanced images",
    lastVerified: "2024-11-10",
    lastRevised: "2025-01-15"
  }
];
