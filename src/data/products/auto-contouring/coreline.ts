
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const CORELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "coreline-aview-rt-acs",
    name: "Aview RT ACS",
    company: "Coreline Soft Co",
    companyUrl: "https://www.corelinesoft.com/en/",
    productUrl: "https://www.corelinesoft.com/product/acs/",
    description: "Automatic Contouring Server or organs at risks for radiation treatment.",
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
      "Head & Neck: Brain",
"Head & Neck: Pituitary",
"Head & Neck: Brain stem",
"Head & Neck: Submandibular gland",
"Head & Neck: Eye",
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
"Thorax: Supraclavicular Lymph node",
"Abdomen: Liver",
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
    lastRevised: "2025-05-04"
  }
];
