
import { ProductDetails } from "@/types/productDetails";

export const PTW_PRODUCTS: ProductDetails[] = [
  {
    id: "ptw-aqualis",
    name: "AIQUALIS",
    company: "PTW",
    companyUrl: "https://www.ptwdosimetry.com",
    productUrl: "https://www.ptwdosimetry.com/en/products/aiqualis",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/ptw.ts",
    description: "AI contouring quality monitoring solution for clinical practice",
    features: [
      "AI contour monitoring", 
      "Quality assessment", 
      "Clinical integration", 
      "Performance tracking"
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
      "AI contour quality monitoring",
      "Clinical practice integration",
      "Performance analytics",
      "Quality metrics tracking",
      "Workflow optimization"
    ],
    technicalSpecifications: {
      population: "Radiotherapy patients with AI-generated contours",
      input: ["AI contours", "Manual contours", "Treatment data"],
      inputFormat: ["DICOM-RT", "RT Structure Sets"],
      output: ["Quality reports", "Performance metrics"],
      outputFormat: ["PDF", "CSV", "Dashboard"]
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
      intendedUseStatement: "For monitoring and quality assessment of AI-generated contours in clinical radiotherapy practice."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      
      
      
    },
    pricing: {
      model: ["Perpetual license", "Support contract"],
      basedOn: ["Number of treatment machines", "Features"]
    },
    version: "2.4",
    releaseDate: "2023-06-01",
    lastUpdated: "2024-02-15",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved and revised by company"
  }
];
