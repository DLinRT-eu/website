
import { ProductDetails } from "@/types/productDetails";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "varian-velocity",
    name: "Velocity",
    company: "Varian",
    category: "Registration",
    description: "Advanced multimodality image registration software that enables clinicians to combine images from different imaging modalities for treatment planning and response assessment.",
    features: [
      "Deformable registration",
      "Multi-modality fusion",
      "Contour propagation",
      "Treatment response assessment"
    ],
    certification: "FDA Cleared",
    logoUrl: "/logos/varian.png",
    companyUrl: "https://www.varian.com/",
    productUrl: "https://www.varian.com/products/radiosurgery/treatment-planning/velocity",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "PET", "CBCT"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Deformable registration for accurate image fusion",
      "Multi-modality support for comprehensive treatment planning",
      "Adaptive planning workflow integration",
      "Contour propagation between image sets",
      "Treatment response tracking"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM images", "RT structures"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Propagated contours"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Eclipse TPS", "ARIA OIS"],
      deployment: ["On-premise workstation", "Server-based"],
      triggerForAnalysis: "Manual initiation",
      processingTime: "Varies by registration complexity, typically <60 seconds"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in image review, registration and fusion of medical images from multiple modalities for treatment planning and assessment in radiation therapy."
    },
    market: {
      onMarketSince: "2013",
      distributionChannels: ["Direct sales"],
      countriesPresent: 60,
      payingCustomers: "1000+",
      researchUsers: "200+"
    },
    pricing: {
      model: ["Perpetual license", "Subscription option"],
      basedOn: ["Functionality tier", "Support level"]
    },
    clinicalEvidence: "Multiple studies demonstrating accuracy of deformable registration for various anatomical sites",
    lastVerified: "2025-05-01",
    lastUpdated: "2025-04-10",
    lastRevised: "2025-05-05"
  },
  {
    id: "mirada-registration-workspace",
    name: "Registration Workspace",
    company: "Mirada Medical",
    category: "Registration",
    description: "AI-enhanced multimodality image registration solution that provides automated and manual tools for precise alignment of CT, MR, PET, and SPECT images in radiation oncology.",
    features: [
      "Deep learning registration",
      "Multi-modality fusion",
      "Zero-click automation",
      "Quality assurance tools"
    ],
    certification: "CE Mark",
    logoUrl: "/logos/mirada-medical.png",
    companyUrl: "https://mirada-medical.com/",
    productUrl: "https://mirada-medical.com/solutions/radiation-oncology/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "PET", "SPECT", "CBCT"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "AI-powered automatic registration algorithms",
      "Rigid and deformable registration support",
      "Visual quality assessment tools",
      "Comprehensive multi-modality compatibility",
      "Integration with treatment planning systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Multi-modality images"],
      inputFormat: ["DICOM"],
      output: ["Registered image sets", "Registration matrices"],
      outputFormat: ["DICOM", "Proprietary"]
    },
    technology: {
      integration: ["Major TPS vendors", "PACS systems"],
      deployment: ["On-premise", "Server-based"],
      triggerForAnalysis: "Automated workflow or manual",
      processingTime: "<30 seconds for most registrations"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use by trained medical professionals for the registration, fusion and review of medical images for treatment planning in radiation therapy."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales", "Vendor partnerships"],
      countriesPresent: 40,
      payingCustomers: "500+",
      researchUsers: "150+"
    },
    pricing: {
      model: ["Perpetual license", "Subscription available"],
      basedOn: ["Clinical volume", "Facility size"]
    },
    clinicalEvidence: "Published validation studies demonstrating accuracy in head and neck, thoracic, and abdominal registration applications",
    lastVerified: "2025-04-15",
    lastUpdated: "2025-03-30",
    lastRevised: "2025-05-05"
  },
  {
    id: "elekta-monaco-registration",
    name: "Monaco Registration Suite",
    company: "Elekta",
    category: "Registration",
    description: "Advanced image registration module within the Monaco treatment planning system that provides robust tools for multimodality image alignment and fusion for radiotherapy planning.",
    features: [
      "Automatic registration",
      "Deformable algorithms",
      "Seamless TPS integration",
      "Verification tools"
    ],
    certification: "CE Mark",
    logoUrl: "/logos/Elekta.png",
    companyUrl: "https://www.elekta.com/",
    productUrl: "https://www.elekta.com/radiation-oncology/treatment-planning-software/monaco/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT", "MRI", "PET", "CBCT"],
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Integrated registration within treatment planning workflow",
      "Multiple algorithm options for different anatomical sites",
      "Quick rigid and deformable registration",
      "Quality metric visualization",
      "Support for adaptive replanning workflows"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Primary planning images", "Secondary imaging"],
      inputFormat: ["DICOM"],
      output: ["Registered images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Monaco TPS", "Mosaiq OIS"],
      deployment: ["On-premise"],
      triggerForAnalysis: "User-initiated within planning workflow",
      processingTime: "<45 seconds per registration"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in the alignment of multimodality images for radiation therapy treatment planning."
    },
    market: {
      onMarketSince: "2016",
      distributionChannels: ["Direct sales", "Bundled with Monaco TPS"],
      countriesPresent: 50,
      payingCustomers: "800+",
      researchUsers: "100+"
    },
    pricing: {
      model: ["Bundled with Monaco TPS", "Module licensing"],
      basedOn: ["TPS configuration", "Support tier"]
    },
    clinicalEvidence: "Internal validation studies showing sub-millimeter accuracy for rigid registration across multiple anatomical sites",
    lastVerified: "2025-04-20",
    lastUpdated: "2025-01-15",
    lastRevised: "2025-05-05"
  }
];
