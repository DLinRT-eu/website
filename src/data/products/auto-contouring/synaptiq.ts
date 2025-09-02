
import { ProductDetails } from "@/types/productDetails";

export const SYNAPTIQ_PRODUCTS: ProductDetails[] = [
  {
    id: "synaptiq-mediq-rt",
    name: "Mediq RT",
    company: "Synaptiq",
    companyUrl: "https://synaptiq.io/",
    productUrl: "https://synaptiq.io/product/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/synaptiq.ts",
    description: "AI-powered solution for radiation therapy planning with advanced auto-contouring capabilities for multiple anatomical sites.",
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/synaptiq.png",
    website: "https://synaptiq.io/product/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    supportedStructures: [
      // Head & Neck
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Optic Nerve (L)",
      "Head & Neck: Optic Nerve (R)",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Eye (L)",
      "Head & Neck: Eye (R)",
      "Head & Neck: Lens (L)",
      "Head & Neck: Lens (R)",
      "Head & Neck: Parotid Gland (L)",
      "Head & Neck: Parotid Gland (R)",
      "Head & Neck: Submandibular Gland (L)",
      "Head & Neck: Submandibular Gland (R)",
      "Head & Neck: Mandible",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Pharynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Cochlea (L)",
      "Head & Neck: Cochlea (R)",
      
      // Thorax
      "Thorax: Heart",
      "Thorax: Lung (L)",
      "Thorax: Lung (R)",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Thorax: Brachial Plexus (L)",
      "Thorax: Brachial Plexus (R)",
      "Thorax: Great Vessels",
      "Thorax: Trachea",
      "Thorax: Aorta",
      "Thorax: Pulmonary Vessels",
      
      // Abdomen
      "Abdomen: Liver",
      "Abdomen: Kidney (L)",
      "Abdomen: Kidney (R)",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Pancreas",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Large Bowel",
      "Abdomen: Spinal Cord",
      "Abdomen: Adrenal Gland (L)",
      "Abdomen: Adrenal Gland (R)",
      
      // Pelvis
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Bowel Bag",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Uterus",
      "Pelvis: Ovary (L)",
      "Pelvis: Ovary (R)",
      "Pelvis: Cervix",
      "Pelvis: Vagina"
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
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Under review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.0",
    releaseDate: "2023-08-20",
    lastUpdated: "2024-03-05",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved"
  }
];
