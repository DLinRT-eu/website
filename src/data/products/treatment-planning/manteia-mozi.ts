
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-mozi",
    name: "MOZI TPS",
    company: "Manteia",
    companyUrl: "https://www.manteiatech.com/",
    productUrl: "https://www.manteiatech.com/mozi",
    description: "AI-driven automated treatment planning system for rapid generation of clinical-grade VMAT, IMRT and SBRT plans with protocol-aware optimization.",
    features: [
      "Multi-criteria dose optimization",
      "Auto-adaptation to planning protocols",
      "Cross-TPS compatibility",
      "DVH prediction engine",
      "Priority-driven constraint balancing",
      "Protocol-driven optimization (RTOG/NRG/ESTRO)",
      "Auto-normalization to clinical objectives",
      "Adaptive learning from user preferences"
    ],
    category: "Treatment Planning",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiatech.com/mozi",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis", "Breast"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Protocol-driven optimization (RTOG/NRG/ESTRO)",
      "Auto-normalization to clinical objectives",
      "Adaptive learning from user preferences",
      "Multi-center plan benchmarking",
      "Real-time dose calculation"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "Structure sets", "Clinical protocols"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Optimized treatment plans", "Dose matrices"],
      outputFormat: ["DICOM-RT", "PDF reports"]
    },
    technology: {
      integration: ["RayStation", "Eclipse", "Monaco", "Pinnacle"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automated planning request",
      processingTime: "8-12 minutes per plan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "For automated generation and optimization of radiation therapy treatment plans in accordance with clinical protocols."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["OEM partnerships", "Direct enterprise sales"],
      countriesPresent: 23,
      payingCustomers: "Major cancer networks in EU and North America",
      researchUsers: "TOP-10 cancer research centers"
    },
    pricing: {
      model: ["Per-plan license", "Site subscription"],
      basedOn: ["Beam complexity", "Plan revision cycles"]
    },
    version: "3.2",
    releaseDate: "2024-03-01",
    lastUpdated: "2025-04-15",
    lastVerified: "2024-04-28",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised",
    clinicalEvidence: "Validated in 12-center study showing 89% clinical acceptability rate and 73% reduction in planning time (Int J Radiat Oncol Biol Phys 2023)"
  }
];
