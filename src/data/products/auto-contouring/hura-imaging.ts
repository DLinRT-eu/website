
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const HURA_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "hura-hurart",
    name: "HuraRT (DV.Target)",
    company: "Hura Imaging",
    companyUrl: "http://www.huraimaging.com/",
    productUrl: "http://www.huraimaging.com/dvtarget/",
    description: "AI-powered auto-contouring platform providing accurate and efficient organ segmentation for radiation therapy planning.",
    features: ["Deep learning contouring", "Multiple anatomical sites", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/huraimaging.png",
    website: "http://www.huraimaging.com",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Clinical workflow integration", "Multi-organ support"],
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
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 12,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-09-05",
    lastUpdated: "2024-02-15",
    supportedStructures: [
      "Head & Neck: Brachial Plexus",
      "Head & Neck: Brainstem",
      "Head & Neck: Constrictor Naris",
      "Head & Neck: Larynx",
      "Head & Neck: Eye L/R",
      "Head & Neck: Ear L/R",
      "Head & Neck: Hypophysis",
      "Head & Neck: Mandible",
      "Head & Neck: Optic Chiasm",
      "Head & Neck: Optic Nerve L/R",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Parotid L/R", 
      "Head & Neck: Sublingual Gland",
      "Head & Neck: Submandibular Gland L/R",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Temporal Lobe L/R",
      "Head & Neck: Temporomandibular Joint L/R",
      "Head & Neck: Thyroid",
      "Head & Neck: Trachea",
      "Thorax: Heart",
      "Thorax: Lungs L/R",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Spinal Cord",
      "Abdomen & Pelvis: Bladder",
      "Abdomen & Pelvis: Bowel bag",
      "Abdomen & Pelvis: Duodenum",
      "Abdomen & Pelvis: Gallbladder",
      "Abdomen & Pelvis: Femoral Heads L/R",
      "Abdomen & Pelvis: Femur L/R",
      "Abdomen & Pelvis: Kidney L/R",
      "Abdomen & Pelvis: Large Bowel",
      "Abdomen & Pelvis: Liver",
      "Abdomen & Pelvis: Pancreas",
      "Abdomen & Pelvis: Pelvic Bone",
      "Abdomen & Pelvis: Rectum",
      "Abdomen & Pelvis: Small Bowel",  
      "Abdomen & Pelvis: Spleen",
      "Abdomen & Pelvis: Spinal Cord",
      "Abdomen & Pelvis: Stomach"
    ],
    lastRevised: "2025-05-12",
    source: "automatically retrieved and revised"
    }
];
