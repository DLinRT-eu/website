
import { ProductDetails } from "@/types/productDetails";

export const PTW_PRODUCTS: ProductDetails[] = [
  {
    id: "ptw-aqualis",
    name: "AIQUALIS",
    company: "PTW",
    companyUrl: "https://www.ptwdosimetry.com",
    productUrl: "https://www.ptwdosimetry.com/en/products/aiqualis",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/ptw.ts",
    description: "Monitor your AI contouring quality in clinical practice",
    features: [
      "Automated QA", 
      "Comprehensive workflow", 
      "Real-time monitoring", 
      "Treatment verification"
    ],
    category: "Performance Monitor",
    certification: "MDR exempt",
    logoUrl: "/logos/ptw.jpg",
    website: "https://www.ptwdosimetry.com/en/products/aiqualis",
    anatomicalLocation: ["Multiple"],
    modality: ["RT Struct"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Multi-vendor compatibility",
      "Automated data acquisition",
      "Comprehensive analysis",
      "Clear reporting",
      "Decision support"
    ],
    technicalSpecifications: {
      population: "All patients",
      input: ["Treatment logs", "Machine QA data", "Patient QA measurements"],
      inputFormat: ["DICOM", "Custom formats"],
      output: ["QA reports", "Performance trend analysis"],
      outputFormat: ["PDF", "CSV", "DICOM"]
    },
    technology: {
      integration: ["TPS integration", "R&V integration", "LINAC connectivity"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per analysis"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For quality assurance and performance monitoring of radiotherapy treatments and equipment."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 30,
      payingCustomers: "Hospitals and radiotherapy centers worldwide",
      researchUsers: "Research institutions internationally"
    },
    pricing: {
      model: ["Perpetual license", "Support contract"],
      basedOn: ["Number of treatment machines", "Features"]
    },
    version: "2.4",
    releaseDate: "2023-06-01",
    lastUpdated: "2024-02-15",
    lastRevised: "2025-05-06",
    source: "Automatically retrieved and revised by company"
  }
];
