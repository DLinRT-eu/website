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
      "Interoperability: Bridge data across disparate systems like ARIA, MOSAIQ, and Epic for a unified view of operations",
      "Real-time analytics & visibility: Deliver performance insights for administrators, physicists, and clinicians to spot workflow gaps",
      "Data integrity foundation: Built with data integrity and workflow alignment at the center to prevent fragmented outputs",
      "Clinical and financial pathway unification: Seamless flow of documentation, data points, and tasks across clinical and billing workflows",
      "AI workflow optimization: AI acts as a true partner to spot workflow gaps, ensure timely task completion, and improve accuracy",
      "Missed charge prevention: Automated billing checks ensure simulations, contour reviews, and treatment verifications are properly documented",
      "Compliance management: Address rising compliance demands with consistent documentation and automated verification workflows",
      "Labor shortage mitigation: Intelligent automation reduces burden on staff while maintaining quality and safety standards",
      "Cost management: Reduce rising operational costs through workflow efficiency and revenue cycle optimization",
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
        "QA systems",
        "Workflow optimization AI",
        "Predictive analytics",
        "Documentation automation AI",
        "Billing gap detection"
      ]
    },
    regulatory: {
      ce: {
        status: "Not specified"
      },
      fda: {
        status: "Approved",
        class: "Class II",
        type: "510(k)"
      },
      intendedUseStatement: "Workflow orchestration and documentation automation for radiation oncology departments"
    },
    market: {
      onMarketSince: "Information not specified",
      distributionChannels: ["Direct sales"]
    },
    version: "Information not specified",
    lastUpdated: "2025-11-02",
    lastRevised: "2025-11-02",
    companyRevisionDate: "2025-11-02",
    releaseDate: "Information not specified"
  }
];
