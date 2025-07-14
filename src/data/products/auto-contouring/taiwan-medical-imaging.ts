import { ProductDetails } from "@/types/productDetails";

const BRAIN_METASTASES_STRUCTURES = [
  {
    name: "Brain_GTV",
    type: "GTV" as const,
    description: "Gross Tumor Volume for brain metastases"
  },
  {
    name: "Brain_CTV",
    type: "GTV" as const,
    description: "Clinical Target Volume for brain metastases"
  },
  {
    name: "Brain_Stem",
    type: "OAR" as const,
    description: "Brain stem organ at risk"
  },
  {
    name: "Optic_Chiasm",
    type: "OAR" as const,
    description: "Optic chiasm organ at risk"
  },
  {
    name: "Optic_Nerve_L",
    type: "OAR" as const,
    description: "Left optic nerve"
  },
  {
    name: "Optic_Nerve_R",
    type: "OAR" as const,
    description: "Right optic nerve"
  },
  {
    name: "Hippocampus_L",
    type: "OAR" as const,
    description: "Left hippocampus"
  },
  {
    name: "Hippocampus_R",
    type: "OAR" as const,
    description: "Right hippocampus"
  },
  {
    name: "Cochlea_L",
    type: "OAR" as const,
    description: "Left cochlea"
  },
  {
    name: "Cochlea_R",
    type: "OAR" as const,
    description: "Right cochlea"
  }
];

export const TAIWAN_MEDICAL_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "taimedimg-deepmets",
    name: "TAIMedImg DeepMets",
    company: "Taiwan Medical Imaging Co.",
    companyUrl: "https://www.taimedimg.tw/",
    productUrl: "https://www.taimedimg.tw/en/samd/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/taiwan-medical-imaging.ts",
    description: "Intelligent assistant specialized in interpreting brain MRI images with advanced segmentation capabilities and longitudinal follow-up of GTV for brain metastases treatment planning.",
    features: [
      "AI-powered brain MRI interpretation",
      "Automated brain metastases segmentation", 
      "Longitudinal GTV tracking and follow-up",
      "Clinical decision support"
    ],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/Taiwan_MedImag.svg",
    website: "https://www.taimedimg.tw/en/samd/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Metastases"],
    keyFeatures: [
      "Brain-specific AI interpretation",
      "GTV longitudinal analysis",
      "Treatment response assessment",
      "Multi-timepoint comparison"
    ],
    supportedStructures: BRAIN_METASTASES_STRUCTURES,
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
        compliance: "partial"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients with brain metastases",
      input: ["MRI T1", "MRI T1+Gd", "MRI T2", "MRI FLAIR"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Longitudinal analysis reports", "Performance metrics"],
      outputFormat: ["DICOM-RT", "JSON", "PDF reports"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "RESTful API"],
      deployment: ["On-premise", "Cloud-based"],
      triggerForAnalysis: "Automatic on image import or manual trigger",
      processingTime: "2-5 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device Software"
      },
      intendedUseStatement: "For use in radiation therapy planning to assist in the segmentation and longitudinal monitoring of brain metastases on MRI images."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Regional partners"],
      countriesPresent: 8,
      payingCustomers: "Multiple medical centers in Asia-Pacific",
      researchUsers: "Research hospitals and academic institutions"
    },
    pricing: {
      model: ["Annual subscription", "Per-case licensing"],
      basedOn: ["Number of users", "Volume of cases processed"]
    },
    version: "1.2",
    releaseDate: "2024-08-01",
    lastUpdated: "2025-07-14",
    lastRevised: "2025-07-14",
    lastVerified: "2025-07-14",
    companyRevisionDate: "2025-07-14"
  }
];