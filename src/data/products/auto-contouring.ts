
import { ProductDetails } from "@/types/productDetails";

export const AUTO_CONTOURING_PRODUCTS: ProductDetails[] = [
  {
    id: "contour-ai-pro",
    name: "ContourAI Pro",
    company: "RadTech Solutions",
    description: "Advanced AI-powered auto-contouring solution for precise radiotherapy planning.",
    features: ["Multi-organ contouring", "Real-time adaptation", "Quality assurance"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Chest", "Abdomen"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Lung Cancer", "Breast Cancer", "Liver Cancer"],
    keyFeatures: ["Deep learning segmentation", "Multi-atlas contouring", "Structure propagation"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans", "Previous contours"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Structure sets", "Contour statistics"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic on image import",
      processingTime: "Under 2 minutes for standard case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use as an aid in contouring anatomical structures in radiotherapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 25,
      payingCustomers: "Over 100",
      researchUsers: "Over 30 institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of cases"]
    },
    version: "3.2",
    releaseDate: "2024-01-15",
    lastUpdated: "2024-04-15"
  }
];
