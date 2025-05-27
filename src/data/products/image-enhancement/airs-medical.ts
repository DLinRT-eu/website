
import { ProductDetails } from "@/types/productDetails";

export const AIRS_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "airs-swiftmr",
    name: "Medical SwiftMR",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-powered MRI enhancement solution that improves image quality and resolution of accelerated or low-quality MR scans.",
    features: ["Deep learning enhancement", "MRI specific", "Resolution improvement"],
    certification: "CE Mark",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://airsmed.com/",
    productUrl: "https://airsmed.com/swiftmr/",
    anatomicalLocation: ["Brain", "Spine"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Spine pathologies"],
    releaseDate: "2021-05-15",
    version: "2.1",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Super-resolution technology",
      "Noise reduction while preserving detail",
      "Compatible with various pulse sequences",
      "Improves suboptimal acquisitions"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Vendor-neutral"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow or manual selection",
      processingTime: "<10 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing magnetic resonance images to improve image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 25,
      payingCustomers: "150+",
      researchUsers: "40+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual scan volume", "Pay-per-use option"]
    },
    clinicalEvidence: "Clinical studies showing improved diagnostic confidence and efficiency when interpreting enhanced images",
    lastVerified: "2024-12-01",
    lastUpdated: "2025-02-10",
    lastRevised: "2025-05-05"
  },
  {
    id: "airs-ct-clarity",
    name: "CT Clarity",
    company: "AIRS Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/airs-medical.ts",
    description: "AI-based CT image enhancement solution that improves image quality and reduces noise in standard and low-dose CT examinations.",
    features: ["Deep learning enhancement", "CT specific", "Noise reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/airs.jpg",
    companyUrl: "https://airsmed.com/",
    productUrl: "https://airsmed.com/ct-clarity/",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Pulmonary disorders", "Trauma"],
    releaseDate: "2022-03-10",
    version: "1.5",
    keyFeatures: [
      "Deep learning CT image enhancement",
      "Advanced noise reduction",
      "Detail preservation at low-dose settings",
      "Improved low-contrast detectability",
      "Vendor-neutral compatibility"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Cloud platform"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated or manual selection",
      processingTime: "<8 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Pending",
      intendedUseStatement: "Intended for enhancing computed tomography images to improve image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "80+",
      researchUsers: "30+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual scan volume", "Pay-per-use option"]
    },
    clinicalEvidence: "Early clinical evaluations showing improved image quality metrics and reader preference compared to standard CT images",
    lastVerified: "2024-11-15",
    lastUpdated: "2025-01-20",
    lastRevised: "2025-05-05"
  }
];
