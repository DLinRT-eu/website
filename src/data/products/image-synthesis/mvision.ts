
import { ProductDetails } from "@/types/productDetails";

export const MVISION_IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-image-plus",
    name: "Image+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/image/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/mvision.ts",
    description: "Generate synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in treatment planning and offline adaptive workflows. Clinically evaluated models for brain, pelvis, CBCT, and virtual non-contrast imaging.",
    features: [
      "Synthetic CT generation from MRI",
      "CBCT to synthetic CT conversion",
      "Virtual non-contrast (VNC) imaging",
      "Multiple anatomical sites",
      "Clinically evaluated models"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/image/",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: ["MRI", "CBCT", "CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Generate synthetic CT from MRI, CBCT, or contrast-enhanced CT",
      "Support photon dose calculation in treatment planning",
      "Offline adaptive workflow support",
      "Clinically evaluated models for brain (MR T1) and pelvis (MR T2)",
      "CBCT conversion for adaptive radiotherapy",
      "Virtual non-contrast (VNC) imaging from contrast-enhanced CT"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI", "CBCT", "Contrast-enhanced CT"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated workflow",
      processingTime: "Minutes per volume"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIa",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: "Under review",
      intendedUseStatement: "For generating synthetic CT images from MRI, CBCT, or contrast-enhanced CT scans to support photon dose calculation in radiation therapy treatment planning and offline adaptive workflows."
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
    clinicalEvidence: "Clinically evaluated models validated for brain (MR T1), pelvis (MR T2), CBCT, and virtual non-contrast applications across multiple photon-based planning scenarios"
  }
];
