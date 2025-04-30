
import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-ucs-ai",
    name: "United Imaging uCS-AI",
    company: "United Imaging",
    category: "Image Enhancement",
    description: "AI-powered CBCT enhancement solution that improves image quality and reduces artifacts for radiotherapy applications.",
    features: ["Deep learning enhancement", "CBCT specific", "Artifact reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/radiationtherapy",
    anatomicalLocation: ["Whole body"],
    modality: "CBCT",
    diseaseTargeted: ["Cancer"],
    releaseDate: "2021-11-01",
    version: "1.2",
    keyFeatures: [
      "Deep learning-based CBCT enhancement",
      "Advanced scatter correction",
      "Metal artifact reduction",
      "Improved soft tissue contrast",
      "Streamlined integration with radiotherapy systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CBCT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uRT radiotherapy systems", "Third-party TPS"],
      deployment: ["On-system", "Server option"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<20 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing cone-beam CT images to improve image quality and reduce artifacts to support radiotherapy planning and verification."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with uRT systems", "Standalone option"],
      countriesPresent: 20,
      payingCustomers: "90+",
      researchUsers: "25+"
    },
    pricing: {
      model: ["System integration", "Subscription available"],
      basedOn: ["Treatment system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical evaluations showing improved target visualization and reduced contouring variability compared to conventional CBCT",
    lastVerified: "2024-10-15",
    lastRevised: "2024-12-20"
  },
  {
    id: "united-uvision-ai",
    name: "United Imaging uVision AI",
    company: "United Imaging",
    category: "Image Enhancement",
    description: "AI-driven image enhancement platform that improves quality and diagnostic value of medical images across modalities.",
    features: ["Deep learning enhancement", "Multi-modality", "Workflow integration"],
    certification: "CE Mark",
    logoUrl: "/placeholder.svg",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/digital-solutions",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "PET"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Neurological disorders"],
    releaseDate: "2022-01-15",
    version: "1.0",
    keyFeatures: [
      "Multi-modality image enhancement",
      "Adaptive noise reduction",
      "Detail and contrast enhancement",
      "Seamless PACS integration",
      "Customizable processing pipelines"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uCloud platform", "Third-party PACS"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Rule-based or manual selection",
      processingTime: "<15 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Pending",
      intendedUseStatement: "Intended for enhancing medical images to improve quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated solution"],
      countriesPresent: 15,
      payingCustomers: "70+",
      researchUsers: "35+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual study volume", "Enterprise license"]
    },
    clinicalEvidence: "Early clinical evaluations showing improved reading efficiency and diagnostic confidence across multiple imaging applications",
    lastVerified: "2024-09-20",
    lastRevised: "2024-12-05"
  }
];
