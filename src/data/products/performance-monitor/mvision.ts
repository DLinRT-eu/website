
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PERFORMANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-verify",
    name: "Verify",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://mvision.ai/verify/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/mvision.ts",
    description: "Contour comparison tool for visualizing user and AI-generated contours",
    features: [
      "Contour comparison", 
      "Visualization tools", 
      "AI contour analysis", 
      "Clinical workflow integration"
    ],
    category: "Performance Monitor",
    certification: "MDR exempt",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/verify/",
    anatomicalLocation: ["Multiple"],
    modality: "RT Struct",
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Contour visualization",
      "AI vs manual comparison",
      "Interactive analysis tools",
      "Clinical decision support",
      "Workflow integration"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients with contoured structures",
      input: ["AI contours", "Manual contours", "Structure sets"],
      inputFormat: ["DICOM-RT", "RT Structure Sets"],
      output: ["Comparison reports", "Visualization data"],
      outputFormat: ["PDF", "Interactive dashboard"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "LINAC connectivity"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic after treatment delivery",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For comparison and visualization of user-generated and AI-generated contours in radiotherapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Number of machines", "Number of patients"]
    },
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2024-03-01",
    lastRevised: "2025-07-12",
    source: "Automatically retrieved"
  }
];
