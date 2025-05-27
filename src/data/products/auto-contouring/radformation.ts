
import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-autocontour",
    name: "AutoContour",
    company: "RadFormation",
    companyUrl: "https://www.radformation.com/",
    productUrl: "https://www.radformation.com/autocontour/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/radformation.ts",
    description: "Cloud-based auto-contouring solution providing fast and accurate organ at risk delineation for radiation therapy planning.",
    features: ["Cloud-based processing", "Multi-organ contouring", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://www.radformation.com/autocontour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Cloud-based processing", "Fast turnaround", "Clinical workflow integration"],
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
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual upload or automated",
      processingTime: "Minutes per case"
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
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Cloud platform"],
      countriesPresent: 30,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Per-contour pricing"]
    },
    version: "4.0",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-03-20",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
