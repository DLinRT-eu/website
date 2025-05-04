
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
      "Head & Neck: Brain, Pituitary, Brain stem, Submandibular gland, Eye, Spinal cord, Inner ear, Thyroid, Larynx, Lymph node level 1a, Lens, Lymph node level 1b, Mandible, Lymph node level 2, Optic chiasm, Lymph node level 3, Optic nerve, Lymph node level 4a, Oral cavity, Lymph node level 4b, Parotid gland, Lymph node level 5",
      "Thorax: nodes Level 2, Esophagus, Axillary lymph nodes Level 3, Spinal cord, Supraclavicular Lymph node, Lung, Supraclavicular Lymph node",
      "Abdomen: Liver,  Liver, Kidney, Stomach, Spleen, Duodenum",
      "Pelvis: Anorectum, Cauda equina, Bowel bag, Femur, Bladder, Seminal vesicle, Cervix, Penile bulb, Spinal cord, Prostater"
    ],
    lastRevised: "2025-05-04"
  }
];
