
import { ProductDetails } from "@/types/productDetails";

export const PTW_PRODUCTS: ProductDetails[] = [
  {
    id: "ptw-aqualis",
    name: "AQualiS",
    company: "PTW",
    companyUrl: "https://www.ptwdosimetry.com",
    productUrl: "https://www.ptwdosimetry.com/en/products/aiqualis",
    description: "Automated quality assurance software for radiotherapy performance monitoring and patient treatment verification.",
    features: [
      "Automated QA", 
      "Comprehensive workflow", 
      "Real-time monitoring", 
      "Treatment verification"
    ],
    category: "Performance Monitor",
    certification: "CE Mark",
    logoUrl: "/logos/ptw.jpg",
    website: "https://www.ptwdosimetry.com/en/products/aiqualis",
    anatomicalLocation: ["Multiple"],
    modality: ["LINAC", "MRI-LINAC"],
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
    lastRevised: "2023-12-10"
  }
];
