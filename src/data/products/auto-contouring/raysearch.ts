
import { ProductDetails } from "@/types/productDetails";
import { RAYSTATION_SUPPORTED_STRUCTURES } from "./raysearch-structures";

export const RAYSEARCH_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation",
    name: "RayStation Deep Learning Segmentation",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/media/publications/deep-learning-segmentation-model-catalogue/",
    description: "Advanced treatment planning system with machine learning-based auto-segmentation for rapid and consistent contouring.",
    features: ["Deep learning segmentation", "Integrated planning", "Atlas-based backup"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/raystation.jpg",
    website: "https://www.raysearchlabs.com/machine-learning-in-raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Machine learning algorithms", "Multi-atlas fallback", "TPS integration"],
    supportedStructures: RAYSTATION_SUPPORTED_STRUCTURES,
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds to minutes per structure"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510k cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Over 800 clinics worldwide",
      researchUsers: "Multiple academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2025-05-01",
    lastRevised: "2025-05-13",
    source: "automatically retrieved and verified",
    lastVerified: "2025-05-12",
    clinicalEvidence: "Clinical studies demonstrating improved contouring accuracy and efficiency.",
    evidence: ["10.1016/j.radonc.2016.10.009", "10.1016/j.radonc.2015.07.041", "10.1016/j.radonc.2018.03.011", "10.1016/j.radonc.2014.12.004", "10.1016/j.ijrobp.2008.05.040", "10.1016/j.ijrobp.2010.11.002", "10.1016/j.radonc.2009.09.008", "10.1016/j.prro.2013.07.011", "10.1016/j.radonc.2013.10.018", "10.1016/j.ijrobp.2020.06.019", "10.1016/j.ijrobp.2023.08.019", "10.1016/S0360-3016(02)02854-8", "10.1016/j.radonc.2017.12.013"]
  }
];
