
import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-planning",
    name: "RayStation Treatment Planning",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/raysearch-planning.ts",
    description: "Advanced treatment planning system with AI-enhanced optimization algorithms for comprehensive radiation therapy planning across all treatment techniques.",
    features: ["AI-enhanced optimization", "Multi-criteria optimization", "Advanced planning"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Breast", "Pelvis", "Male Pelvis" ],
    modality: ["RT planning"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Multi-criteria optimization", "Adaptive planning", "Advanced dose calculation"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT", "Structure sets", "Prescriptions"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Treatment plans", "Dose distributions"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Linac integration", "Imaging systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Treatment planning workflow",
      processingTime: "Minutes to hours depending on complexity"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For radiation therapy treatment planning and dose calculation."
    },
    market: {
      onMarketSince: "2009",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Over 800 clinics worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2025-05-01",
    lastRevised: "2025-05-12",
    evidence: ["10.1016/j.radonc.2016.10.009", "10.1016/j.radonc.2015.07.041", "10.1016/j.radonc.2018.03.011", "10.1016/j.radonc.2014.12.004", "10.1016/j.ijrobp.2008.05.040", "10.1016/j.ijrobp.2010.11.002", "10.1016/j.radonc.2009.09.008", "10.1016/j.prro.2013.07.011", "10.1016/j.radonc.2013.10.018", "10.1016/j.ijrobp.2020.06.019", "10.1016/j.ijrobp.2023.08.019", "10.1016/S0360-3016(02)02854-8", "10.1016/j.radonc.2017.12.013"]
]
    source: "Automatically retrieved and revised"
  }
];
