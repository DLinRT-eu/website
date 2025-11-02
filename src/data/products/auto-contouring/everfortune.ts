
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/everfortune.ts",
    description: "Comprehensive AI-powered solution for radiation therapy planning, including auto-segmentation and treatment optimization.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/ever-fortune.png",
    website: "https://www.everfortuneai.com.tw/en/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning segmentation", "Treatment planning tools", "Workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation and treatment planning assistance in radiation therapy."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "2.0",
    releaseDate: "2023-07-15",
    lastUpdated: "2024-03-10",
    supportedStructures: [
      // Head & Neck - 17 structures according to website convention
      "Head & Neck: Brain",
      "Head & Neck: Brain Stem",
      "Head & Neck: Optic Nerve L",
      "Head & Neck: Optic Nerve R", 
      "Head & Neck: Spinal Chord",
      "Head & Neck: Esophagus",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      "Head & Neck: Parotid L",
      "Head & Neck: Parotid R",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Eye L",
      "Head & Neck: Eye R",
      "Head & Neck: Lens L",
      "Head & Neck: Lens R",
      "Head & Neck: Optic Chiasm",
      // Additional supported structures for other anatomical regions
      "Thorax: Heart",
      "Thorax: Lungs",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Abdomen: Liver",
      "Abdomen: Kidneys",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Small Bowel",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Heads",
      "Pelvis: Prostate",
      "Pelvis: Uterus"
    ],
    lastRevised: "2025-09-01",
    source: "automatically retrieved"
  }
];
