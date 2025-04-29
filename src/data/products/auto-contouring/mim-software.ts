
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const MIM_SOFTWARE_PRODUCTS: ProductDetails[] = [
  {
    id: "mim-contour-protegeai",
    name: "Contour ProtégéAI+",
    company: "MIM Software",
    companyUrl: "https://www.mimsoftware.com/",
    productUrl: "https://www.mimsoftware.com/radiation-oncology/contour-protegeai-plus",
    description: "Advanced AI-based auto-segmentation solution integrated within the MIM Software ecosystem for radiation oncology.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/mimsoftware.svg",
    website: "https://www.mimsoftware.com/radiation-oncology",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-based segmentation", "Integration with MIM platform", "Multiple modality support"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
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
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "7.1",
    releaseDate: "2023-10-15",
    lastUpdated: "2024-03-20",
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L)",
      "Brain: Optic Nerve (R)",
      "Brain: Eyes (L)",
      "Brain: Eyes (R)",
      "Brain: Lens (L)",
      "Brain: Lens (R)",
      "Brain: Cochlea (L)",
      "Brain: Cochlea (R)",
      "Brain: Hippocampus (L)",
      "Brain: Hippocampus (R)",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Submandibular (L)",
      "Head & Neck: Submandibular (R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Brachial Plexus (L)",
      "Head & Neck: Brachial Plexus (R)",
      "Thorax: Heart",
      "Thorax: Heart - Atrium (L)",
      "Thorax: Heart - Atrium (R)",
      "Thorax: Heart - Ventricle (L)",
      "Thorax: Heart - Ventricle (R)",
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
      "Abdomen: Pancreas",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Sigmoid",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb",
      "Pelvis: Uterus",
      "Pelvis: Ovaries (L)",
      "Pelvis: Ovaries (R)",
      "Pelvis: Vagina"
    ]
  }
];
