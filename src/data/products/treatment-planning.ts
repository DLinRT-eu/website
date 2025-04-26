
import { ProductDetails } from "@/types/productDetails";

export const TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
  {
    id: "dose-optimizer",
    name: "DoseOptimizer AI",
    company: "MedAI Systems",
    description: "Intelligent dose optimization platform for treatment planning.",
    features: ["Automated planning", "Dose prediction", "Plan comparison"],
    category: "Treatment Planning",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Brain", "Spine"],
    modality: "MRI",
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Brain Tumors", "Spine Metastases"],
    keyFeatures: ["Automated planning", "Multi-criteria optimization", "Template-based planning"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT images", "Structure sets", "Dose constraints"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Optimized treatment plans", "DVH analysis"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "User initiated or scheduled",
      processingTime: "3-5 minutes for standard case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For use as an aid in developing and evaluating radiation therapy treatment plans."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "OEM partnerships"],
      countriesPresent: 10,
      payingCustomers: "Over 30",
      researchUsers: "Over 15 institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-plan"],
      basedOn: ["Annual license", "Number of plans"]
    },
    version: "1.8",
    releaseDate: "2023-09-20",
    lastUpdated: "2024-04-10"
  }
];
