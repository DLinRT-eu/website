
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const EVERFORTUNE_PRODUCTS: ProductDetails[] = [
  {
    id: "everfortune-rt-suite",
    name: "RT Suite",
    company: "Ever Fortune AI",
    companyUrl: "https://www.everfortuneai.com.tw/en/",
    productUrl: "https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/",
    description: "Comprehensive AI-powered solution for radiation therapy planning, including auto-segmentation and treatment optimization.",
    features: ["Auto-contouring", "Treatment planning support", "AI optimization"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/ever-fortune.png",
    website: "https://www.everfortuneai.com.tw/en/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
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
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 8,
      payingCustomers: "Multiple clinical sites in Asia",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Module selection"]
    },
    version: "2.0",
    releaseDate: "2023-07-15",
    lastUpdated: "2024-03-10",
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerves",
      "Brain: Eyes",
      "Brain: Lens",
      "Brain: Pituitary",
      "Head & Neck: Parotid Glands",
      "Head & Neck: Submandibular Glands",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Spinal Cord",
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
    lastRevised: "2000-01-01"
  }
];
