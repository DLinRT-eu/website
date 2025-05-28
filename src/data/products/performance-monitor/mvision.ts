

import { ProductDetails } from "@/types/productDetails";

export const MVISION_PERFORMANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-verify",
    name: "Verify",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://mvision.ai/verify/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/mvision.ts",
    description: "AI-powered quality assurance and performance monitoring system for radiotherapy treatment verification and dose delivery monitoring.",
    features: [
      "Real-time dose monitoring",
      "Treatment plan verification", 
      "EPID-based dose verification",
      "Machine performance analytics",
      "Automated QA workflows"
    ],
    category: "Performance Monitor",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/verify/",
    anatomicalLocation: ["Multiple"],
    modality: ["LINAC", "EPID"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "AI-powered dose verification",
      "Real-time monitoring",
      "Automated reporting",
      "Multi-vendor compatibility",
      "Statistical process control"
    ],
    technicalSpecifications: {
      population: "All cancer patients",
      input: ["EPID images", "Treatment logs", "DICOM-RT plans"],
      inputFormat: ["DICOM", "Log files"],
      output: ["QA reports", "Dose verification results"],
      outputFormat: ["PDF", "DICOM", "CSV"]
    },
    technology: {
      integration: ["TPS integration", "LINAC connectivity", "R&V systems"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic during treatment",
      processingTime: "Real-time monitoring"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For quality assurance monitoring and dose verification in radiation therapy treatments."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 20,
      payingCustomers: "Radiotherapy centers globally",
      researchUsers: "Academic medical centers"
    },
    pricing: {
      model: ["Subscription", "Per-treatment"],
      basedOn: ["Annual license", "Usage volume"]
    },
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2024-02-15",
    lastRevised: "2025-05-28",
    source: "Automatically retrieved and revised"
  }
];

