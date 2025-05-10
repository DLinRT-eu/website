
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
      "Head & Neck: Brain",
      "Head & Neck: Brainstem",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Submandibular (L)",
      "Head & Neck: Submandibular (R)",
      "Head & Neck: Mandible",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Breast: Breast (L)",
      "Breast: Breast (R)",
      "Breast: Lung (L)",
      "Breast: Lung (R)",
      "Breast: Heart",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L)",
      "Abdomen: Kidneys (R)",
      "Abdomen: Stomach",
      "Abdomen: Spleen",
      "Abdomen: Duodenum",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Prostate",
      "Pelvis: Uterus"
    ],
    lastRevised: "2000-01-01",
    source: "automatically retrieved"
  }
];
