import { ProductDetails } from "@/types/productDetails";

export const DEEPMEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "synth-image",
    name: "SynthImage AI",
    company: "DeepMedical",
    companyUrl: "https://www.deepmedical.com",
    productUrl: "https://www.deepmedical.com/synthimage-ai",
    description: "Advanced medical image synthesis platform for radiotherapy planning.",
    features: ["CT to MRI synthesis", "Artifact reduction", "Resolution enhancement"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.deepmedical.com/synthimage-ai",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: "CT/MRI",
    subspeciality: "Medical Imaging",
    diseaseTargeted: ["Brain Tumors", "Prostate Cancer"],
    keyFeatures: ["MRI synthesis from CT", "Super-resolution", "Metal artifact reduction"],
    technicalSpecifications: {
      population: "All patients",
      input: ["CT images", "MRI images (when available)"],
      inputFormat: ["DICOM"],
      output: ["Synthetic MRI", "Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS integration", "TPS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "2-3 minutes per volume"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in generating synthetic images to aid in radiotherapy planning where actual images may be unavailable or of poor quality."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "OEM partnerships"],
      countriesPresent: 18,
      payingCustomers: "Over 40",
      researchUsers: "Over 25 institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of cases"]
    },
    version: "3.0",
    releaseDate: "2024-02-15",
    lastUpdated: "2024-04-22"
  }
];
