
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const CORELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "coreline-aview-rt-acs",
    name: "Aview RT ACS",
    company: "Coreline Soft Co",
    companyUrl: "https://www.corelinesoft.com/",
    productUrl: "https://www.corelinesoft.com/product/acs/",
    description: "AI-powered auto-contouring system for radiation therapy planning, providing rapid and accurate organ segmentation.",
    features: ["Deep learning based", "Automated contouring", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/coreline.jpg",
    website: "https://www.corelinesoft.com/product/acs/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning segmentation", "Fast processing", "Clinical workflow integration"],
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
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Institution size", "Module selection"]
    },
    version: "3.0",
    releaseDate: "2023-04-20",
    lastUpdated: "2024-01-15",
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Hippocampus (L)",
      "Brain: Hippocampus (R)",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L)",
      "Brain: Optic Nerve (R)",
      "Brain: Eyes (L)",
      "Brain: Eyes (R)",
      "Brain: Lens (L)",
      "Brain: Lens (R)",
      "Brain: Cochlea (L)",
      "Brain: Cochlea (R)",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Submandibular (L)",
      "Head & Neck: Submandibular (R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Spinal Cord",
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Spinal Cord",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L)",
      "Abdomen: Kidneys (R)",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Pelvis: Bladder",
      "Pelvis: Rectum", 
      "Pelvis: Sigmoid",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb"
    ],
    lastRevised: "2000-01-01"
  }
];
