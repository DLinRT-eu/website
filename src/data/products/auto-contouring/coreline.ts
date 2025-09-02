import { ProductDetails } from "@/types/productDetails";
import { standardizeProduct } from "@/utils/productDataUtils";

// Define the standardized product data first
const rawProduct: ProductDetails = {
  id: "coreline-aview-rt-acs",
  name: "Aview RT ACS",
  company: "Coreline Soft Co",
  companyUrl: "https://www.corelinesoft.com/en/",
  productUrl: "https://www.corelinesoft.com/en/solutions/rt-acs",
  githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/coreline.ts",
  description: "AI-powered automatic contouring server for radiation therapy planning, providing rapid and accurate organ segmentation using deep learning algorithms.",
  features: [
    "Deep learning auto-segmentation", 
    "Multiple anatomical sites", 
    "Clinical workflow integration",
    "Rapid processing",
    "TPS integration"
  ],
  category: "Auto-Contouring",
  certification: "CE & FDA",
  logoUrl: "/logos/coreline.jpg",
  website: "https://www.corelinesoft.com/en/solutions/rt-acs",
  anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
  modality: ["CT"],
  subspeciality: "Radiation Oncology",
  diseaseTargeted: ["Multiple Cancer Types"],
  keyFeatures: [
    "Deep learning segmentation", 
    "Fast processing", 
    "Clinical workflow integration", 
    "Multi-organ support", 
    "Quality assurance tools"
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RT"]
  },
  technology: {
    integration: ["TPS integration", "PACS integration"],
    deployment: ["On-premises"],
    triggerForAnalysis: "Manual or automated",
    processingTime: "Minutes per patient"
  },
  regulatory: {
    ce: {
      status: "Certified",
      class: "IIa",
      type: "Medical Device"
    },
    fda: "510(k) cleared",
    intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
  },
  market: {
    onMarketSince: "2019",
    distributionChannels: ["Direct sales", "Distribution partners"]
  },
  pricing: {
    model: ["Perpetual license", "Subscription"],
    basedOn: ["Institution size", "Module selection"]
  },
  version: "3.0",
  releaseDate: "2023-04-20",
  lastUpdated: "2024-01-15",
  lastRevised: "2025-05-13",
  supportedStructures: [
    "Brain: Brain",
    "Brain: Pituitary",
    "Brain: Brain stem",
    "Brain: Submandibular gland",
    "Brain: Eye",
    "Head & Neck: Spinal cord",
    "Head & Neck: Inner ear",
    "Head & Neck: Thyroid",
    "Head & Neck: Larynx",
    "Head & Neck: Lymph node level 1a",
    "Head & Neck: Lens",
    "Head & Neck: Lymph node level 1b",
    "Head & Neck: Mandible",
    "Head & Neck: Lymph node level 2",
    "Head & Neck: Optic chiasm",
    "Head & Neck: Lymph node level 3",
    "Head & Neck: Optic nerve",
    "Head & Neck: Lymph node level 4a",
    "Head & Neck: Oral cavity",
    "Head & Neck: Lymph node level 4b",
    "Head & Neck: Parotid gland",
    "Head & Neck: Lymph node level 5",
    "Thorax: nodes Level 2",
    "Thorax: Esophagus",
    "Thorax: Axillary lymph nodes Level 3",
    "Thorax: Spinal cord",
    "Thorax: Supraclavicular Lymph node",
    "Thorax: Lung",
    "Abdomen: Liver",
    "Abdomen: Kidney",
    "Abdomen: Stomach",
    "Abdomen: Spleen",
    "Abdomen: Duodenum",
    "Pelvis: Anorectum",
    "Pelvis: Cauda equina",
    "Pelvis: Bowel bag",
    "Pelvis: Femur",
    "Pelvis: Bladder",
    "Pelvis: Seminal vesicle",
    "Pelvis: Cervix",
    "Pelvis: Penile bulb",
    "Pelvis: Spinal cord",
    "Pelvis: Prostate"
  ],
  source: "automatically retrieved and revised",
};

// Apply all the standardization functions
export const CORELINE_PRODUCTS: ProductDetails[] = [
  standardizeProduct(rawProduct)
];
