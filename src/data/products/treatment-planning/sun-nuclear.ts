import { ProductDetails } from "@/types/productDetails";

export const SUN_NUCLEAR_PRODUCTS: ProductDetails[] = [
  {
    id: "oncospace-predictive-planning",
    name: "Oncospace Predictive Planning",
    company: "Sun Nuclear",
    companyUrl: "https://www.sunnuclear.com/",
    productUrl: "https://oncospace.com/",
    githubUrl: "https://github.com/DLinRT-eu/website/blob/main/src/data/products/treatment-planning/sun-nuclear.ts",
    description: "Cloud-based, AI-powered solution that uses machine learning models to derive achievable, best-practice dosimetric goals for plan optimization and evaluation in radiation therapy.",
    features: [
      "Machine learning-derived dosimetric goals",
      "Plan optimization guidance", 
      "Treatment plan evaluation",
      "Cloud-based platform",
      "Best-practice benchmarking",
      "Data-driven insights"
    ],
    category: "Treatment Planning",
    certification: "FDA 510(k)",
    logoUrl: "/logos/sun-nuclear.png",
    website: "https://oncospace.com/",
    anatomicalLocation: ["Head and Neck"],
    modality: ["Treatment Planning System Data"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer"],
    keyFeatures: [
      "Machine learning-derived dosimetric goals",
      "Plan optimization guidance", 
      "Treatment plan evaluation",
      "Cloud-based platform",
      "Best-practice benchmarking",
      "Data-driven insights"
    ],
    technicalSpecifications: {
      population: "Head and Neck cancer patients undergoing radiation therapy",
      input: ["DICOM-RT", "Treatment Planning Data", "Structure Sets", "Dose Distributions"],
      inputFormat: ["DICOM-RT", "Treatment Planning Data"],
      output: ["Dosimetric Parameters", "Optimization Goals", "Plan Quality Metrics"],
      outputFormat: ["Dosimetric Parameters", "Optimization Goals"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Treatment plan upload and analysis request",
      processingTime: "Real-time analysis"
    },
    regulatory: {
      fda: "510(k) Cleared (K222803)",
      ce: {
        status: "Unknown"
      },
      intendedUseStatement: "To provide dosimetric goals and optimization parameters for radiation therapy treatment planning using AI-powered analysis of clinical data."
    },
    market: {
      onMarketSince: "2021-09-15",
      distributionChannels: ["Direct Sales", "Cloud Platform"],
      countriesPresent: 1,
      payingCustomers: "Contact vendor",
      researchUsers: "Multiple academic centers"
    },
    pricing: {
      model: ["Contact vendor"],
      basedOn: ["Institution size", "Usage volume"]
    },
    version: "1.0",
    releaseDate: "2021-09-15",
    lastUpdated: "2025-07-14",
    lastVerified: "2025-07-14",
    lastRevised: "2025-07-14",
    source: "Automatically retrieved and verified",
    clinicalEvidence: "FDA 510(k) validation studies and retrospective analysis of clinical treatment plans",
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearance K222803 received February 2023",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K222803.pdf"
      },
      {
        type: "Clinical Launch",
        description: "Initial product launch September 2021",
        link: "https://oncospace.com/pr-2021-09-15/"
      },
      {
        type: "Feature Expansion", 
        description: "Head and Neck support added October 2022",
        link: "https://oncospace.com/pr-2022-10-04/"
      }
    ],
    limitations: [
      "Limited to Head and Neck anatomy",
      "Requires historical planning data for model training",
      "Cloud connectivity required"
    ]
  }
];