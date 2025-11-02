
import { ProductDetails } from "@/types/productDetails";

export const HURA_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "hura-dvtarget",
    name: "DV.TARGET",
    company: "Hura Imaging",
    companyUrl: "https://huraimaging.com",
    productUrl: "http://www.huraimaging.com/dvtarget/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/hura-imaging.ts",
    description: "AI-powered auto-contouring solution for radiotherapy planning with advanced deep learning segmentation.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/huraimaging.png",
    website: "http://www.huraimaging.com/dvtarget/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI"],
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Fully automated organ and target volume segmentation",
      "Adaptive algorithms for challenging cases",
      "Seamless integration with treatment planning systems",
      "Rapid processing with high accuracy",
      "User-friendly interface with manual correction tools"
    ],
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Eyes (L/R)",
      "Brain: Lens (L/R)",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L/R)",
      "Brain: Pituitary",
      
      "Head & Neck: Larynx",
      "Head & Neck: Mandible",
      "Head & Neck: Parotids (L/R)",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Submandibular Glands (L/R)",
      
      "Thorax: Esophagus",
      "Thorax: Heart",
      "Thorax: Lungs (L/R)",
      "Thorax: Spinal Cord",
      
      "Breast: Breast (L/R)",
      "Breast: Heart",
      "Breast: Lungs (L/R)",
      
      "Pelvis: Bladder",
      "Pelvis: Femoral Heads (L/R)",
      "Pelvis: Prostate",
      "Pelvis: Rectum"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["PACS", "Treatment Planning Systems"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated workflow",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "To assist healthcare professionals in the delineation of organs at risk and target volumes for radiotherapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "2.5",
    releaseDate: "2023-05-20",
    lastUpdated: "2024-01-15",
    lastRevised: "2025-09-01"
  }
];
