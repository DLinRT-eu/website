
import { ProductDetails } from "@/types/productDetails";

export const MVISION_REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-adapt-plus",
    name: "Adapt+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/adapt/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/mvision.ts",
    description: "Enable automated contour propagation to support adaptive radiotherapy preparation. Align planning contours to new scans using clinically evaluated image registration methods to help maintain workflow efficiency and consistency. Supports rigid, conventional deformable, and deep learning deformable registration approaches.",
    features: [
      "Automated contour propagation",
      "Multiple registration methods",
      "Rigid registration",
      "Conventional deformable registration",
      "Deep learning deformable registration"
    ],
    category: "Registration",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/adapt/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automated contour propagation for adaptive radiotherapy",
      "Align planning contours to new scans",
      "Clinically evaluated image registration methods",
      "Support for CT, synthetic CT, and CBCT-of-the-day",
      "Rigid registration method",
      "Conventional deformable registration",
      "Deep learning deformable registration",
      "Flexible registration methods for different clinical scenarios",
      "Clinician review and approval workflow",
      "Maintains workflow efficiency and consistency"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Synthetic CT", "CBCT", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Registered images", "Propagated contours"],
      outputFormat: ["DICOM", "DICOM-RT"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated adaptive workflow",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: "Under review",
      intendedUseStatement: "For automated contour propagation using image registration to support adaptive radiotherapy preparation. Propagates contours between image sets (CT, synthetic CT, CBCT) to facilitate offline adaptive workflows while maintaining clinician control for review and approval."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "1.0",
    releaseDate: "2025-10-21",
    lastUpdated: "2025-11-02",
    lastRevised: "2025-11-02",
    source: "Company provided information",
    clinicalEvidence: "Clinically evaluated registration methods including rigid, conventional deformable, and deep learning deformable approaches. All propagated contours remain under full clinician control for review, editing, and approval before clinical use."
  }
];
