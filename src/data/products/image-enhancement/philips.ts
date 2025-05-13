
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-intellispace-ai-enhancement",
    name: "IntelliSpace AI Image Enhancement",
    company: "Philips",
    category: "Image Enhancement",
    description: "AI-powered image enhancement solution that reduces noise and improves clarity in medical images across modalities.",
    features: ["Deep learning-based", "Multi-modality", "Noise reduction"],
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/solutions/diagnostic-informatics",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "X-ray"],
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Neurological disorders"],
    releaseDate: "2022-04-01",
    version: "2.1",
    keyFeatures: [
      "Deep learning noise reduction",
      "Multi-modality support (CT, MRI, X-ray)",
      "Improves visibility of subtle details",
      "Preserves natural image texture",
      "Retrospective processing of existing images"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced DICOM images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["IntelliSpace Portal", "Enterprise Imaging Systems"],
      deployment: ["Server-based", "Cloud option"],
      triggerForAnalysis: "Manual or automatic workflow",
      processingTime: "<15 seconds per image series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing diagnostic images through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Enterprise imaging solution", "Standalone module"],
      countriesPresent: 40,
      payingCustomers: "450+",
      researchUsers: "75+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Number of studies", "Enterprise license"]
    },
    clinicalEvidence: "Multiple studies showing improved reader confidence and reduced reading time for enhanced images",
    lastVerified: "2024-12-01",
    lastUpdated: "2025-01-15",
    lastRevised: "2025-05-05"

  },
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
      countriesPresent: 35,
      payingCustomers: "300+",
      researchUsers: "50+"
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
