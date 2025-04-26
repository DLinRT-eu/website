import { ProductDetails } from "@/types/productDetails";

export const CARINA_PRODUCTS: ProductDetails[] = [
  {
    id: "carina-intcontour",
    name: "INTContour",
    company: "Carina AI",
    companyUrl: "https://carina.ai/",
    productUrl: "https://carina.ai/products/intcontour",
    description: "Advanced auto-contouring solution leveraging deep learning for precise and efficient organ delineation in radiation therapy planning.",
    features: ["Deep learning algorithms", "Fast processing", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "public/logos/carina.jpg",
    website: "https://carina.ai/products/intcontour",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Cloud platform", "Rapid processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic",
      processingTime: "3-5 minutes per case"
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
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 10,
      payingCustomers: "Multiple clinical sites in Europe",
      researchUsers: "Academic institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.1",
    releaseDate: "2023-08-10",
    lastUpdated: "2024-03-05"
  }
];
