
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-ai-workspace-plus",
    name: "Workspace+",
    company: "MVision AI",
    companyUrl: "https://mvision.ai/",
    productUrl: "https://mvision.ai/workspace/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/platform/mvision.ts",
    description: "Enterprise-grade AI integration platform that unifies multiple AI applications and imaging tools within clinical workflows. Seamlessly integrates with hospital PACS, treatment planning systems, and oncology information systems to deliver unified access, cloud-native scalability, robust security, and workflow automation for radiation oncology departments.",
    features: [
      "Unified AI application access",
      "PACS and TPS integration",
      "Cloud-native architecture",
      "Workflow automation",
      "GDPR and HIPAA compliance"
    ],
    category: "Platform",
    certification: "CE",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/workspace/",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI", "CBCT", "PET"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Unified access to multiple AI applications and imaging tools",
      "Seamless integration with hospital PACS and treatment planning systems",
      "Integration with oncology information systems",
      "Cloud-native scalability with enterprise-grade performance",
      "Robust security architecture with GDPR and HIPAA compliance",
      "Workflow automation to accelerate planning processes",
      "Standardized quality assurance across radiation therapy workflows",
      "Single-vendor platform for streamlined deployment and implementation",
      "Centralized management of multiple AI models and applications"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["Medical images", "Clinical data", "Treatment plans", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RT", "HL7"],
      output: ["Processed images", "AI-generated contours", "Treatment plans", "Quality metrics"],
      outputFormat: ["DICOM", "DICOM-RT", "PDF reports"]
    },
    technology: {
      integration: ["PACS", "Treatment Planning Systems", "Oncology Information Systems", "Hospital IT infrastructure"],
      deployment: ["Cloud-based", "Hybrid cloud"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Real-time to minutes depending on application"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "Class IIb",
        type: "MDR",
        regulation: "MDR 2017/745"
      },
      fda: "Under review",
      intendedUseStatement: "Enterprise integration platform for deploying and managing multiple AI-powered medical imaging applications and tools within radiation oncology clinical workflows. Designed to unify access to AI applications, automate workflows, and ensure compliance with healthcare data security standards while integrating with existing hospital information systems. CE marked on October 21, 2025."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Enterprise partnerships"]
    },
    version: "1.0",
    releaseDate: "2025-10-21",
    lastUpdated: "2025-11-02",
    lastRevised: "2025-11-02",
    source: "Company provided information",
    clinicalEvidence: "CE Mark approval demonstrates conformity with European Medical Device Regulation (MDR 2017/745). Platform designed for clinical use across Europe and other MDR-recognized markets with established security and compliance frameworks for healthcare data management."
  }
];
