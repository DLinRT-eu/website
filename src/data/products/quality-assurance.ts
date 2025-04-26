
import { ProductDetails } from "@/types/productDetails";

export const QUALITY_ASSURANCE_PRODUCTS: ProductDetails[] = [
  {
    id: "qa-master",
    name: "QA Master",
    company: "QualityTech",
    description: "Comprehensive quality assurance platform for radiotherapy treatments.",
    features: ["Plan verification", "Output analysis", "Documentation"],
    category: "Quality Assurance",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Whole Body"],
    modality: "CBCT",
    subspeciality: "Quality Assurance",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated QA reporting", "Plan verification", "Machine QA"],
    technicalSpecifications: {
      population: "All radiation therapy plans",
      input: ["Treatment plans", "QA measurements", "Machine logs"],
      inputFormat: ["DICOM-RT", "CSV", "XML"],
      output: ["QA reports", "Comparison analytics", "Pass/fail metrics"],
      outputFormat: ["PDF", "HTML", "CSV"]
    },
    technology: {
      integration: ["TPS integration", "R&V system integration", "EPID integration"],
      deployment: ["On-premises", "Standalone workstation"],
      triggerForAnalysis: "Pre-scheduled or manual",
      processingTime: "1-2 minutes per plan"
    },
    regulatory: {
      ce: {
        status: "In process",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For verification of radiotherapy treatment plans and quality assurance of treatment delivery systems."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Service partnerships"],
      countriesPresent: 12,
      payingCustomers: "Over 60",
      researchUsers: "Over 10 institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Number of machines", "Maintenance level"]
    },
    version: "2.8",
    releaseDate: "2023-08-10",
    lastUpdated: "2024-04-05"
  }
];
