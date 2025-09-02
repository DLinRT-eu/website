
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_INTELLISPACE_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-intellispace-ai-enhancement",
    name: "IntelliSpace AI Image Enhancement",
    company: "Philips",
    category: "Image Enhancement",
    description: "AI-powered image enhancement solution that reduces noise and improves clarity in medical images across modalities.",
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/solutions/diagnostic-informatics",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/philips-intellispace.ts",
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
      
      
      
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Number of studies", "Enterprise license"]
    },
    clinicalEvidence: "Multiple studies showing improved reader confidence and reduced reading time for enhanced images",
    lastUpdated: "2025-01-15",
    lastRevised: "2025-09-01"
  }
];
