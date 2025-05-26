
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PERFORMANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-performance",
    name: "MVision AI Performance Monitor",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://www.mvision.ai/performance-monitoring/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/mvision.ts",
    description: "AI-powered performance monitoring solution for radiation therapy systems, providing real-time quality assurance and performance analytics.",
    features: ["Real-time monitoring", "Performance analytics", "Quality assurance"],
    category: "Performance Monitor",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://www.mvision.ai/performance-monitoring/",
    anatomicalLocation: ["System-wide"],
    modality: ["RT systems"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Quality Assurance"],
    keyFeatures: ["Real-time system monitoring", "Performance trend analysis", "Automated reporting"],
    technicalSpecifications: {
      population: "Healthcare systems",
      input: ["System performance data"],
      inputFormat: ["Various formats"],
      output: ["Performance reports", "Alerts"],
      outputFormat: ["PDF", "Digital dashboards"]
    },
    technology: {
      integration: ["RT system integration", "Hospital IT systems"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Continuous monitoring",
      processingTime: "Real-time"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "I",
        type: "Software"
      },
      fda: "Under review",
      intendedUseStatement: "For monitoring and analyzing performance of radiation therapy systems."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales"],
      countriesPresent: 15,
      payingCustomers: "Multiple healthcare systems",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Number of systems monitored"]
    },
    version: "2.0",
    releaseDate: "2023-06-01",
    lastUpdated: "2024-02-10",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
