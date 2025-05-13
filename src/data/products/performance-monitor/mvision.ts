
import { ProductDetails } from "@/types/productDetails";

export const MVISION_PRODUCTS: ProductDetails[] = [
  {
    id: "mvision-verify",
    name: "MVision Verify",
    company: "MVision AI",
    companyUrl: "https://www.mvision.ai/",
    productUrl: "https://mvision.ai/verify/",
    description: "Advanced quality assurance platform for monitoring and analyzing radiotherapy treatment plan delivery accuracy.",
    features: [
      "Automated verification", 
      "Treatment monitoring", 
      "Performance analysis", 
      "Workflow integration"
    ],
    category: "Performance Monitor",
    certification: "MDR exempt",
    logoUrl: "/logos/mvision-ai.png",
    website: "https://mvision.ai/verify/",
    anatomicalLocation: ["Multiple"],
    modality: "LINAC",
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Cancer"],
    keyFeatures: [
      "Automated plan verification",
      "Dose delivery monitoring",
      "Comprehensive reporting",
      "EPID-based verification",
      "Integrated workflow"
    ],
    technicalSpecifications: {
      population: "All radiotherapy patients",
      input: ["Treatment plans", "Delivered dose data", "EPID measurements"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Verification reports", "Treatment analysis"],
      outputFormat: ["PDF", "DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "LINAC connectivity"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic after treatment delivery",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For verification and quality assurance of radiotherapy treatment delivery."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 10,
      payingCustomers: "Radiation oncology departments worldwide",
      researchUsers: "Medical physics research groups"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Number of machines", "Number of patients"]
    },
    version: "2.1",
    releaseDate: "2023-08-15",
    lastUpdated: "2024-03-01",
    lastRevised: "2025-05-05",
    source: "Automatically retrieved"
  }
];
