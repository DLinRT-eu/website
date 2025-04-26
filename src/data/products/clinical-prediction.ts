
import { ProductDetails } from "@/types/productDetails";

export const CLINICAL_PREDICTION_PRODUCTS: ProductDetails[] = [
  {
    id: "clinical-predict",
    name: "ClinicalPredict Pro",
    company: "AIHealth Analytics",
    description: "Advanced clinical outcome prediction system for radiotherapy treatment.",
    features: ["Survival prediction", "Toxicity assessment", "Treatment response modeling"],
    category: "Clinical Prediction",
    certification: "FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Whole Body"],
    modality: "CT",
    subspeciality: "Clinical Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Outcome prediction", "Risk stratification", "Comparative effectiveness"],
    technicalSpecifications: {
      population: "Adult patients with solid tumors",
      input: ["Clinical data", "Treatment parameters", "Imaging features"],
      inputFormat: ["HL7", "CSV", "DICOM"],
      output: ["Survival curves", "Risk scores", "Treatment comparisons"],
      outputFormat: ["PDF reports", "CSV data"]
    },
    technology: {
      integration: ["EMR integration", "Research database integration"],
      deployment: ["Cloud-based", "Web application"],
      triggerForAnalysis: "User initiated query",
      processingTime: "Under 60 seconds for most analyses"
    },
    regulatory: {
      ce: {
        status: "In process",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use as a decision support tool to assist clinicians in evaluating potential treatment options."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Institutional partnerships"],
      countriesPresent: 5,
      payingCustomers: "Over 25",
      researchUsers: "Over 40 institutions"
    },
    pricing: {
      model: ["Subscription", "Site license"],
      basedOn: ["Institution size", "Patient volume"]
    },
    version: "2.2",
    releaseDate: "2023-12-05",
    lastUpdated: "2024-04-18"
  }
];
