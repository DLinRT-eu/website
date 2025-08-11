
import { ProductDetails } from "@/types/productDetails";

export const ELEKTA_PRODUCTS: ProductDetails[] = [
  {
    id: "elekta-iris",
    name: "IRIS",
    company: "Elekta",
    category: "Reconstruction",
    description: "AI-powered CBCT reconstruction solution that improves image quality for radiation therapy planning and adaptive radiotherapy using deep learning techniques.",
    features: ["Deep learning reconstruction", "CBCT imaging", "Radiotherapy"],
    certification: "CE Mark",
    logoUrl: "/logos/Elekta.png",
    companyUrl: "https://www.elekta.com/",
    productUrl: "https://www.elekta.com/radiation-oncology/treatment-solutions/imaging/",
    anatomicalLocation: ["Pelvis"],
    modality: ["CBCT"],
    diseaseTargeted: ["Cancer"],
    releaseDate: "2022-06-01",
    version: "2.0",
    keyFeatures: [
      "AI-powered CBCT reconstruction",
      "Improved soft tissue contrast",
      "Enhanced tumor and organ-at-risk visualization",
      "Deep learning noise reduction algorithms",
      "Seamless integration with Elekta linacs"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CBCT projection data"],
      inputFormat: ["Elekta proprietary format"],
      output: ["Enhanced CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Elekta Linacs", "Monaco TPS", "MOSAIQ Oncology Information System"],
      deployment: ["On-premise"],
      triggerForAnalysis: "Automatic after CBCT acquisition",
      processingTime: "<30 seconds per volume"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing CBCT medical images to improve quality through AI-based reconstruction to support radiotherapy treatment planning and verification."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated with Elekta systems", "Software upgrade"],
      countriesPresent: 40,
      payingCustomers: "300+",
      researchUsers: "50+"
    },
    pricing: {
      model: ["Subscription", "System integrated license"],
      basedOn: ["Treatment system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical studies showing improved target delineation accuracy and reduced inter-observer variability with Iris-enhanced CBCT images",
    lastVerified: "2025-05-10",
    lastUpdated: "2025-02-10",
    lastRevised: "2025-05-05",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/elekta.ts"

  }
];
