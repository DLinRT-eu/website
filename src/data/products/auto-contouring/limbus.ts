import { ProductDetails } from "@/types/productDetails";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    features: ["Automated OAR contouring", "Fast processing", "Deep learning algorithms"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/dlinrt-products/public/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: "CT, MRI, CBCT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Cloud-based", "DICOM compatibility"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI","CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of contours"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    lastUpdated: "2024-03-10"
  }
];
