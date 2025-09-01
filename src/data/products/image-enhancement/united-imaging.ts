
import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-ucs-ai",
    name: "uCS-AI",
    company: "United Imaging",
    category: "Image Enhancement",
    description: "AI-powered CBCT enhancement solution that improves image quality and reduces artifacts for radiotherapy applications.",
    features: ["Deep learning enhancement", "CBCT specific", "Artifact reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/radiationtherapy",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/united-imaging.ts",
    anatomicalLocation: ["Whole body"],
    modality: ["CBCT"],
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
      
      
      
    },
    pricing: {
      model: ["System integration", "Subscription available"],
      basedOn: ["Treatment system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical evaluations showing improved target visualization and reduced contouring variability compared to conventional CBCT",
    lastVerified: "2024-10-15",
    lastUpdated: "2024-12-20",
    lastRevised: "2025-05-05"

  }
];
