
import { ProductDetails } from "@/types/productDetails";

export const RAYSEARCH_TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "raysearch-raystation-deep-learning",
    name: "RayStation Deep Learning Planning",
    company: "RaySearch Laboratories",
    companyUrl: "https://www.raysearchlabs.com/",
    productUrl: "https://www.raysearchlabs.com/solutions/raystation/machine-learning-in-raystation/",
    description: "The RayStation deep learning planning module brings cutting-edge technologies directly into the clinical workflow, offering a substantial boost in efficiency and consistency in patient care through automatic creation of clinical treatment plans.",
    features: ["Deep learning planning", "Automatic plan generation", "Integrated planning", "Clinical workflow integration"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "https://www.raysearchlabs.com/wp-content/themes/raysearch/assets/images/logo.svg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT, MR",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Automatic plan generation", "Dose prediction", "Plan quality estimation"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT scans", "MRI", "Structure sets", "Clinical goals"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Treatment plans", "Dose distributions"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Minutes per plan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales"],
      countriesPresent: 30,
      payingCustomers: "Over 500 clinics worldwide",
      researchUsers: "Multiple academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "2.0",
    releaseDate: "2023-12-15",
    lastUpdated: "2024-04-01"
  }
];
