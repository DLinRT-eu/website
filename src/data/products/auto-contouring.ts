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
  },
  {
    id: "atlas-contour",
    name: "Atlas Contour",
    company: "MedAI Innovations",
    description: "Multi-atlas based auto-contouring solution with deep learning enhancement for accurate organ delineation.",
    features: ["Atlas-based segmentation", "Deep learning enhancement", "Batch processing"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Head & Neck", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Prostate Cancer", "Cervical Cancer"],
    keyFeatures: ["Multi-atlas library", "Adaptive learning", "Quality metrics"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans", "RT structure sets"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Contours", "Quality reports"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["PACS integration", "ARIA integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or scheduled batch",
      processingTime: "3-5 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "Intended for automated organ-at-risk contouring in radiotherapy planning."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales"],
      countriesPresent: 15,
      payingCustomers: "Over 50",
      researchUsers: "20 institutions"
    },
    pricing: {
      model: ["Annual license", "Pay-per-use"],
      basedOn: ["Number of cases", "Department size"]
    },
    version: "2.1",
    releaseDate: "2024-02-01",
    lastUpdated: "2024-04-20"
  }
];
