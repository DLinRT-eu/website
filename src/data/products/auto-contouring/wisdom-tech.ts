
import { ProductDetails } from "@/types/productDetails";

export const WISDOM_TECH_PRODUCTS: ProductDetails[] = [
  {
    id: "wisdom-deep-contour",
    name: "DeepContour",
    company: "Wisdom Tech",
    companyUrl: "http://www.wisdom-tech.online/",
    productUrl: "http://www.wisdom-tech.online/view-16.html",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/wisdom-tech.ts",
    description: "AI solution for automatic contour segmentation in radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "NMPA",
    logoUrl: "/logos/wisdom-tech.png",
    website: "http://www.wisdom-tech.online/view-16.html",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    supportedStructures: [
      // Brain
      "Brain: Brainstem",
      "Brain: Optic Nerve (L)",
      "Brain: Optic Nerve (R)",
      "Brain: Optic Chiasm",
      "Brain: Eye (L)",
      "Brain: Eye (R)",
      "Brain: Lens (L)",
      "Brain: Lens (R)",
      "Brain: Hippocampus (L)",
      "Brain: Hippocampus (R)",
      "Brain: Pituitary",
      
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
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not available"
      },
      fda: "Not available",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],

},
    version: "2.0",
    releaseDate: "2023-04-10",
    lastUpdated: "2023-12-15",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved"
  }
];
