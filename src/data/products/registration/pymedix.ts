
import { ProductDetails } from "@/types/productDetails";

export const PYMEDIX_PRODUCTS: ProductDetails[] = [
  {
    id: "pymedix-registration",
    name: "Autofuse",
    company: "PyMedix",
    companyUrl: "https://pymedix.com/",
    productUrl: "https://pymedix.com/autofuse__trashed/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration/pymedix.ts",
    description: "Advanced medical imaging registration solution with AI-powered alignment algorithms for multi-modal image fusion in radiotherapy planning.",
    features: ["Multi-modal registration", "AI-powered alignment", "Real-time processing", "Clinical workflow integration"],
    category: "Registration",
    certification: "CE",
    logoUrl: "/logos/pymedix.png",
    website: "https://pymedix.com//",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automated multi-modal image registration",
      "AI-enhanced alignment accuracy",
      "Real-time deformation analysis",
      "Seamless TPS integration",
      "Quality assurance metrics"
    ],
    guidelines: [
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Fused images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated workflow",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automated registration of medical images in radiation therapy planning workflows."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Perpetual license"],
      basedOn: ["Annual license", "Number of workstations"]
    },
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2024-01-20",
    lastRevised: "2025-08-26",
    source: "Company provided information"
  }
];
