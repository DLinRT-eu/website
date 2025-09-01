
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_SMARTDOSE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-smartdose-ct-enhancement",
    name: "SmartDose CT Enhancement",
    company: "Philips",
    category: "Image Enhancement",
    description: "AI-driven solution for enhancing low-dose CT images to achieve diagnostic quality comparable to standard dose acquisitions.",
    features: ["Deep learning enhancement", "CT specific", "Dose reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/solutions/computed-tomography",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/philips-smartdose.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Pulmonary disease", "Cardiovascular disorders"],
    releaseDate: "2022-01-15",
    version: "1.5",
    keyFeatures: [
      "Deep learning-based CT image enhancement",
      "Specialized for ultra-low-dose CT images",
      "Reduces image noise while preserving details",
      "Improves contrast-to-noise ratio",
      "Compatible with existing PACS systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["IntelliSpace Portal", "Philips CT Viewers"],
      deployment: ["On-premise server", "Cloud option"],
      triggerForAnalysis: "Automatic or on-demand",
      processingTime: "<10 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing low-dose CT images to reduce noise and improve diagnostic confidence without altering the underlying anatomical information."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated solution"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Per CT system license"],
      basedOn: ["Annual volume", "Enterprise deployment"]
    },
    clinicalEvidence: "Clinical studies showing diagnostic equivalence between enhanced low-dose images and standard-dose acquisitions",
    lastVerified: "2024-11-10",
    lastUpdated: "2025-01-05",
    lastRevised: "2025-05-05"
  }
];
