import { ProductDetails } from "@/types/productDetails";

export const MEDLEVER_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "medlever-workflow-management",
    name: "Radiation Oncology Work Management",
    company: "MedLever, Inc.",
    companyUrl: "https://medlever.com/",
    productUrl: "https://medlever.com/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/platform/medlever.ts",
    description: "AI-powered workflow orchestration platform built from the ground up with data integrity and workflow alignment at its core. Unifies clinical and financial pathways to coordinate simulation, planning, treatment, and QA across all roles and modalities while eliminating fragmented workflows.",
    features: [
      "Workflow orchestration across all modalities",
      "Documentation automation",
      "Interoperability across disparate systems",
      "Real-time analytics & visibility"
    ],
    category: "Platform",
    certification: "FDA",
    logoUrl: "/logos/medlever.jpg",
    website: "https://medlever.com/",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI", "PET", "Multi-modality"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Workflow orchestration: Coordinate simulation, planning, treatment, and QA across all roles and modalities with unified task management",
      "Documentation automation: Streamline reporting, reduce clicks, and eliminate redundant data entry across the entire care pathway",
      "AI workflow optimization: AI acts as a true partner to spot workflow gaps, ensure timely task completion, and improve accuracy",
      "Patient safety enhancement: Ensure treatment verifications and QA happen on time with workflow tracking and automated alerts"
    ],
    technicalSpecifications: {
      population: "Cancer patients receiving radiation therapy",
      input: ["Clinical data", "Treatment plans", "Scheduling data", "Financial data", "QA metrics", "Staff assignments"],
      inputFormat: ["DICOM", "HL7", "FHIR", "System APIs"],
      output: ["Workflow schedules", "Documentation reports", "Analytics dashboards", "Billing data", "QA reports"],
      outputFormat: ["DICOM-RT", "HL7 messages", "PDF reports", "API responses", "Dashboard analytics"]
    },
    technology: {
      integration: [
        "ARIA (Varian)",
        "MOSAIQ (Elekta)",
        "Epic EMR",
        "Oncology Information Systems (OIS)",
        "Electronic Medical Records (EMR)",
        "Billing systems",
        "QA systems"
      ],
      deployment: ["Cloud-based", "On-premise"],      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Real-time workflow management"
    },
    regulatory: {
      fda: {
        status: "Approved",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "Workflow orchestration and documentation automation for radiation oncology departments"
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales"]
    },
    version: "1.0",
    releaseDate: "2024-01-01",
    lastUpdated: "2025-11-14",
    lastRevised: "2025-11-14",
    companyRevisionDate: "2025-11-02",
    source: "Company provided information",
    clinicalEvidence: "FDA 510(k) cleared Class II medical device for workflow orchestration and documentation automation in radiation oncology. Platform designed to unify clinical and financial pathways, coordinate simulation, planning, treatment, and QA across all roles and modalities while ensuring data integrity and workflow alignment."
  }
];
