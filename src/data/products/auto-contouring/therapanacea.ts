
import { ProductDetails } from "@/types/productDetails";

export const THERAPANACEA_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-annotate",
    name: "Annotate",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/solutions/",
    description: "AI-powered auto-contouring solution for radiation oncology that delivers accurate, consistent and fast delineation of organs at risk.",
    features: ["Precise contouring", "Fast processing", "Customizable workflows"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    website: "https://www.therapanacea.eu/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "Quality assurance tools"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Quality metrics"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 3 minutes per case"
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
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-04-01"
  }
];
