
import { ProductDetails } from "@/types/productDetails";

export const GE_HEALTHCARE_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-healthcare-irt",
    name: "Intelligent Radiation Therapy (iRT)",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/platform/ge-healthcare.ts",
    description: "Fully-interoperable radiation therapy collaboration system (RTCS) for patient workflow management - designed with clinicians for clinicians. AI-supported platform integrating GE Healthcare and third-party AI solutions for comprehensive oncology department management.",
    features: [
      "Analytics reporting for department efficiency",
      "Intelligent staff scheduler",
      "AI auto-segmentation integration",
      "Virtual reality patient education",
      "Vendor-neutral connectivity"
    ],
    category: "Platform",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Analytics reporting: Holistic view for department administrators to analyze efficiency, identify operational gaps, and document trends",
      "Intelligent staff scheduler: Resource management tool accounting for out-of-office schedules to optimize staffing and reduce treatment delays",
      "AI auto-segmentation: Integration with GE HealthCare MR Contour DL for MR imaging and third-party MVision Contour+ for CT imaging",
      "MIM Contour ProtégéAI+ integration: Seamless connection with established auto-segmentation solutions",
      "VERT virtual reality: Integration with Vertual Ltd's VR app for patient education and staff training through treatment simulation",
      "Vendor-neutral approach: Integrates with electronic medical records (EMR), oncology information systems (OIS)",
      "FHIR compliance: Supports Fast Healthcare Interoperability Resources standards",
      "Patient workflow management: Comprehensive coordination across entire radiation therapy process",
      "Treatment delay reduction: Intelligent resource allocation to minimize scheduling gaps"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric cancer patients",
      input: ["Medical images", "Clinical data", "Treatment schedules", "Staff availability", "Department metrics"],
      inputFormat: ["DICOM", "HL7", "FHIR"],
      output: ["Workflow schedules", "Analytics reports", "AI-generated contours", "Staff assignments"],
      outputFormat: ["DICOM-RT", "PDF reports", "HL7 messages", "Dashboard analytics"]
    },
    technology: {
      integration: [
        "Electronic Medical Records (EMR)",
        "Oncology Information Systems (OIS)",
        "GE HealthCare MR Contour DL",
        "MVision Contour+ (third-party)",
        "MIM Contour ProtégéAI+ (third-party)",
        "VERT virtual reality (Vertual Ltd)",
        "FHIR-compliant systems"
      ],
      deployment: ["On-premise", "Hybrid cloud"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Real-time workflow management and scheduling"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "IIb",
        type: "MDR"
      },
      fda: {
        status: "FDA Cleared",
        class: "II",
        type: "510(k)"
      },
      intendedUseStatement: "Radiation therapy collaboration system (RTCS) for comprehensive patient workflow management in oncology departments. Designed to integrate AI-supported auto-segmentation, intelligent resource scheduling, analytics reporting, and vendor-neutral connectivity with hospital information systems to optimize radiation therapy delivery, reduce treatment delays, and improve departmental efficiency."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Hospital partnerships", "Enterprise healthcare solutions"]
    },
    version: "1.0",
    releaseDate: "2025-09-25",
    lastUpdated: "2025-11-02",
    lastRevised: "2025-11-02",
    source: "Company website and public information",
    clinicalEvidence: "CE Mark and FDA clearance demonstrate conformity with regulatory requirements. Platform designed to integrate proven AI solutions including GE HealthCare's MR Contour DL and established third-party systems (MVision Contour+, MIM Contour ProtégéAI+) for clinical workflow optimization."
  }
];
