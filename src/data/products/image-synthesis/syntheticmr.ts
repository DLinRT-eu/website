
import { ProductDetails } from "@/types/productDetails";

export const SYNTHETICMR_PRODUCTS: ProductDetails[] = [
  {
    id: "syntheticmr-neuro",
    name: "SyMRI Neuro",
    company: "SyntheticMR",
    companyUrl: "https://syntheticmr.com/",
    productUrl: "https://syntheticmr.com/products/symri-neuro/",
    description: "AI-powered MR image synthesis solution that generates multiple contrasts from a single scan, enabling synthetic CT generation for radiation therapy planning in the brain.",
    features: [
      "MR image synthesis",
      "Multiple contrasts from single scan",
      "Synthetic CT generation",
      "Quantitative tissue mapping"
    ],
    category: "Image Synthesis",
    certification: "CE Mark",
    logoUrl: "/logos/syntheticMRI.png",
    website: "https://syntheticmr.com/products/symri-neuro/",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Neuroradiology",
    diseaseTargeted: ["Brain Tumors", "Multiple Sclerosis", "Neurodegenerative Disorders"],
    keyFeatures: [
      "AI-based synthetic contrast generation",
      "Synthetic CT capabilities",
      "Quantitative tissue mapping",
      "Reduced scan time",
      "Streamlined workflow"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["Single MRI sequence"],
      inputFormat: ["DICOM"],
      output: ["Multiple synthetic contrasts", "Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS integration", "Vendor-neutral platforms"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic after acquisition",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "For use in generating synthetic MR contrasts and quantitative tissue maps from a single MRI acquisition to support clinical diagnosis."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 25,
      payingCustomers: "Major hospitals and imaging centers globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.0",
    releaseDate: "2023-09-01",
    lastUpdated: "2024-03-15",
    lastRevised: "2023-12-10"
  }
];
