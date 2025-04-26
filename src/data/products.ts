export const SAMPLE_PRODUCTS = [
  {
    id: "carebot-ai",
    name: "ContourAI Pro",
    company: "RadTech Solutions",
    description: "Advanced auto-contouring system using deep learning for precise organ-at-risk delineation in radiotherapy planning.",
    features: ["Auto-Contouring", "Deep Learning", "Real-time"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    subspeciality: "Chest",
    modality: "X-ray",
    diseaseTargeted: [
      "Atelectasis",
      "Consolidation",
      "Cardiomegaly",
      "Pleural effusion",
      "Pneumothorax",
      "Pulmonary lesion",
      "Subcutaneous emphysema"
    ],
    keyFeatures: [
      "Radiologic abnormal finding detection",
      "Textual report generation",
      "Worklist prioritisation"
    ],
    technicalSpecifications: {
      population: "Patients aged 18 years or older",
      input: ["Chest X-ray PA (posterior-anterior view)", "Chest X-ray AP (anterior-posterior view)"],
      inputFormat: ["DICOM"],
      output: ["Localization (bounding-boxes, report)", "Abnormality score", "Worklist order", "Multi-language radiology report"],
      outputFormat: ["DICOM GSPS", "DICOM SR", "DICOM DOC", "DICOM SC"]
    },
    technology: {
      integration: [
        "Integration in standard reading environment (PACS)",
        "Integration via AI marketplace",
        "Stand-alone webbased"
      ],
      deployment: [
        "Locally on dedicated hardware",
        "Locally virtualized (virtual machine, docker)",
        "Cloud-based"
      ],
      triggerForAnalysis: "Automatically, right after the image acquisition",
      processingTime: "10 - 60 seconds"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "MDR"
      },
      fda: "No or not yet",
      intendedUseStatement: "Carebot AI CXR is a medical device that employs artificial intelligence, specifically machine learning and computer vision algorithms, to detect abnormalities in chest X-ray images..."
    },
    market: {
      onMarketSince: "03-2024",
      countriesPresent: 10,
      payingCustomers: "100+",
    },
    pricing: {
      model: ["Pay-per-use", "Subscription"],
      basedOn: ["Number of users", "Number of installations", "Number of analyses"]
    },
    lastUpdated: "2024-04-15"
  },
  {
    name: "SynthImage RT",
    company: "MedTech Innovations",
    description: "Deep learning-powered image synthesis platform for generating synthetic CT images from MRI scans.",
    features: ["Image Synthesis", "Deep Learning", "MRI-to-CT"],
    category: "Image Synthesis",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Brain", "Pelvis"],
    releaseDate: "2023-11-20",
    version: "2.5.0",
    price: 9800,
    website: "https://medtechinnovations.example.com/synthimage",
    supportEmail: "help@medtech.example.com",
    trainingRequired: true,
    compatibleSystems: ["ProSoma", "MIM", "Eclipse"],
    userRating: 4.5,
    lastUpdated: "2024-09-15"
  },
  {
    name: "RegAlign Pro",
    company: "HealthAI Solutions",
    description: "Intelligent image registration system for precise alignment of multi-modal imaging in radiation therapy.",
    features: ["Image Registration", "Multi-Modal", "Automated"],
    category: "Image Registration",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Thorax", "Abdomen"],
    releaseDate: "2024-01-10",
    version: "1.8.3",
    price: 7500,
    website: "https://healthai.example.com/regalign",
    supportEmail: "tech@healthai.example.com",
    trainingRequired: false,
    compatibleSystems: ["MIM", "Velocity", "Pinnacle"],
    userRating: 4.2,
    lastUpdated: "2024-08-20"
  },
  {
    name: "PlanMaster AI",
    company: "MedTech Innovations",
    description: "Advanced treatment planning system with AI-driven optimization for precise radiotherapy planning.",
    features: ["Treatment Planning", "AI Optimization", "Dose Calculation"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Breast", "Prostate"],
    releaseDate: "2023-07-05",
    version: "4.0.2",
    price: 18500,
    website: "https://medtechinnovations.example.com/planmaster",
    supportEmail: "planning@medtech.example.com",
    trainingRequired: true,
    compatibleSystems: ["ARIA", "Mosaiq", "Eclipse"],
    userRating: 4.8,
    lastUpdated: "2024-09-30"
  },
  {
    name: "QAIntelligence",
    company: "HealthAI Solutions",
    description: "Comprehensive quality assurance platform featuring automated plan verification and deep learning-based error detection.",
    features: ["Quality Assurance", "Plan Verification", "Analytics"],
    category: "Quality Assurance",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["All Sites"],
    releaseDate: "2024-02-28",
    version: "2.1.5",
    price: 8900,
    website: "https://healthai.example.com/qaintelligence",
    supportEmail: "qa@healthai.example.com",
    trainingRequired: false,
    compatibleSystems: ["ARIA", "Mosaiq", "RayStation"],
    userRating: 4.3,
    lastUpdated: "2024-08-15"
  },
  {
    name: "PredictCare RT",
    company: "AI Medical Systems",
    description: "Clinical prediction system using deep learning to forecast treatment outcomes and optimize patient care pathways.",
    features: ["Clinical Prediction", "Outcome Analysis", "Risk Assessment"],
    category: "Clinical Prediction",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["All Sites"],
    releaseDate: "2023-09-12",
    version: "1.5.0",
    price: 11200,
    website: "https://aimedical.example.com/predictcare",
    supportEmail: "predict@aimedical.example.com",
    trainingRequired: true,
    compatibleSystems: ["ARIA", "Mosaiq", "Oncology Information Systems"],
    userRating: 4.6,
    lastUpdated: "2024-07-22"
  }
];
