
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-dose-plus",
    name: "Dose+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/dose/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/treatment-planning/mvision.ts",
    description: "Dose+ is an AI-based treatment planning solution that automates VMAT and IMRT radiotherapy plans creation, reducing planning time from hours to minutes while ensuring high quality and consistency.",
    features: ["Automated VMAT/IMRT planning", "Clinical objectives optimization", "Fast plan creation", "Plan quality consistency"],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/dose/",
    anatomicalLocation: ["Male Pelvis", "Prostate"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Fully automated treatment planning",
      "VMAT and IMRT plan creation",
      "Reduced planning time from hours to minutes",
      "Consistent plan quality",
      "Seamless TPS integration"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Clinical goals"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Treatment plans", "Dose distributions"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Varian", "Elekta"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Minutes per plan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: {
        status: "510(k) Cleared",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "For use in radiation therapy treatment planning to assist in creating VMAT and IMRT plans."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "2.0",
    releaseDate: "2023-01-15",
    lastUpdated: "2024-02-10",
    lastRevised: "2025-09-10",
    source: "Automatically retrieved and revised",
    clinicalEvidence: "Validated in multiple clinical sites with demonstrated time savings and plan quality comparable to expert planners"
  }
];
