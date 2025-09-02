
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const MIM_SOFTWARE_PRODUCTS: ProductDetails[] = [
  {
    id: "mim-contour-protegeai",
    name: "Contour ProtégéAI+",
    company: "MIM Software",
    companyUrl: "https://www.mimsoftware.com/",
    productUrl: "https://www.mimsoftware.com/radiation-oncology/contour-protegeai-plus",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/mim-software.ts",
    description: "Advanced AI-based auto-segmentation solution integrated within the MIM Software ecosystem for radiation oncology.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mimsoftware.svg",
    website: "https://www.mimsoftware.com/radiation-oncology",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-based segmentation", "Integration with MIM platform", "Multiple modality support"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native integration with MIM Software", "TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
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
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      
      
      
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "7.1",
    releaseDate: "2023-10-15",
    lastUpdated: "2024-03-20",
    lastRevised: "2025-09-01",
    source: "Company",
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L/R)",
      "Brain: Eyes (L/R)",
      "Brain: Lens (L/R)",
      "Brain: Cochlea (L/R)",
      "Brain: Hippocampus (L/R)",
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Submandibular (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Brachial Plexus (L/R)",
      "Thorax: Heart",
      "Thorax: Heart - Atrium (L/R)",
      "Thorax: Heart - Ventricle (L/R)",
      "Thorax: Lungs (L/R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Spinal Cord",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L/R)",
      "Abdomen: Spleen",
      "Abdomen: Stomach",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      "Abdomen: Pancreas",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Sigmoid",
      "Pelvis: Femoral Head (L/R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Uterus",
      "Pelvis: Ovaries (L/R)",
      "Pelvis: Vagina"
    ]
  }
];
