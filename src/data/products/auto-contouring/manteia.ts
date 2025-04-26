
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-accucontour",
    name: "AccuContour",
    company: "Manteia",
    companyUrl: "https://manteia.ca/",
    productUrl: "https://manteia.ca/#products",
    description: "Canadian-developed AI solution for rapid and accurate auto-contouring in radiation therapy planning.",
    features: ["Deep learning algorithms", "Multiple anatomical sites", "Rapid processing"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "https://manteia.ca/wp-content/uploads/2022/01/manteia-logo.png",
    website: "https://manteia.ca/#products",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
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
      processingTime: "2-3 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For assistance in the delineation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 8,
      payingCustomers: "Multiple clinical sites in North America",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "1.5",
    releaseDate: "2023-06-20",
    lastUpdated: "2024-02-10"
  }
];
