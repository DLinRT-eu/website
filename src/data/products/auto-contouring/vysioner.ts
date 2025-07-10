
import { ProductDetails } from "@/types/productDetails";

export const VYSIONER_PRODUCTS: ProductDetails[] = [
  {
    id: "vysioner-vbrain",
    name: "Vbrain",
    company: "Vysioner",
    companyUrl: "https://www.vysioneer.com/",
    productUrl: "https://www.vysioneer.com/solutions/vbrain",
    description: "AI-powered solution specialized in brain tumor auto-segmentation for radiation therapy planning.",
    features: ["Brain tumor segmentation", "Fast processing", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/vysioner.png",
    website: "https://www.vysioneer.com/solutions/vbrain",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Tumors", "Metastases"],
    keyFeatures: ["AI-powered brain tumor segmentation", "Fast processing", "Multiple tumor support"],
    supportedStructures: [
      // OARs
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerves",
      "Brain: Eyes",
      "Brain: Cochlea",
      "Brain: Hippocampus",
      
      // Target structures - GTV
      "Brain: GTV (Gross Tumor Volume)",
      
      // Target structures - Elective
      "Brain: CTV (Clinical Target Volume)",
      
      // Special case - metastases
      "Brain: Brain Metastases"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of brain tumors in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-10-05",
    lastUpdated: "2024-03-10",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised",
    // Add evidence and limitations
    evidence: [
      "10.1016/j.ijrobp.2022.04.007",
      "10.1016/j.prro.2021.12.002",
      "10.1016/j.radonc.2020.09.026"
    ],
    limitations: [
      "Limited to brain tumor segmentation only",
      "Performance varies with MRI sequence quality",
      "Requires T1 post-contrast for optimal performance",
      "Reduced accuracy for tumors smaller than 0.5cm"
    ]
  }
];
