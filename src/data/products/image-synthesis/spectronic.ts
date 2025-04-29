
import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mriplus",
    name: "MRIplanner",
    company: "Spectronic Medical",
    companyUrl: "https://spectronicmedical.com",
    productUrl: "https://spectronicmedical.com/mriplanner",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning.",
    features: ["MR-only workflow", "Machine-learning based", "Fast processing"],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/spectronic medical.jpg",
    website: "https://spectronicmedical.com/mriplanner",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "High anatomical accuracy"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard T1/T2 MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For generating synthetic CT from MRI for radiation therapy planning."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinics in Europe",
      researchUsers: "Research institutions internationally"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.2",
    releaseDate: "2023-07-10",
    lastUpdated: "2024-01-25"
  }
];
