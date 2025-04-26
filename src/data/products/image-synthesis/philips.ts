import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat",
    name: "MRCAT",
    company: "Philips Healthcare",
    description: "MR-only simulation solution that generates CT-like density information from MR images for radiation therapy planning.",
    features: ["MR-only workflow", "Synthetic CT generation", "Radiation therapy planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.philips.com/healthcare/education-resources/publications/fieldstrength/mr-only-simulation-radiation-oncology",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Synthetic CT from MR", "Elimination of CT scans", "Reduced registration errors"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic after MR acquisition",
      processingTime: "Minutes per scan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For generating synthetic CT images from MR for use in radiation therapy planning."
    },
    market: {
      onMarketSince: "2016",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size"]
    },
    version: "3.5",
    releaseDate: "2023-05-15",
    lastUpdated: "2024-02-10"
  }
];
