import { ProductDetails } from "@/types/productDetails";

export const HURA_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "hura-lung-app",
    name: "Lung App",
    company: "Hura Imaging",
    companyUrl: "https://huraimaging.com",
    productUrl: "https://huraimaging.com/lung-app",
    description: "Automated pulmonary nodules detection and quantification software.",
    features: ["AI Detection", "Automatic segmentation", "Nodule quantification"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/huraimaging.png",
    website: "https://huraimaging.com/lung-app",
    anatomicalLocation: ["Thorax"],
    modality: ["CT"], // Fixed: changed from string to array
    diseaseTargeted: ["Lung Cancer", "Pulmonary Nodules"],
    keyFeatures: [
      "Automated detection and contouring of pulmonary nodules",
      "Volumetric analysis and tracking",
      "Lung-RADS reports generation",
      "Integration with existing PACS systems"
    ],
    supportedStructures: [
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Pulmonary Nodules"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Reports"],
      outputFormat: ["DICOM-RT", "PDF"]
    },
    technology: {
      integration: ["PACS", "RIS"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic",
      processingTime: "Seconds"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "To assist radiologists in the detection and quantification of pulmonary nodules."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 15,
      payingCustomers: "50+",
      researchUsers: "10+"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license"]
    },
    version: "3.0",
    releaseDate: "2023-01-15",
    lastUpdated: "2024-02-22",
    lastRevised: "2025-05-04"
  }
];
