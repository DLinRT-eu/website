
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mri-planner",
    name: "MRIplanner",
    company: "Spectronic Medical",
    companyUrl: "https://spectronicmedical.com/",
    productUrl: "https://spectronicmedical.com/mriplanner",
    description: "MRI-only workflow solution with integrated auto-segmentation capabilities for radiation therapy planning.",
    features: ["MRI-based contouring", "Synthetic CT generation", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/spectronic-medical.jpg", // Corrected logo path with hyphen instead of space
    website: "https://spectronicmedical.com/mriplanner",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Brain"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types", "Prostate Cancer", "Brain Tumors"],
    keyFeatures: ["MRI-based contouring", "Synthetic CT generation", "Streamlined workflow"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Synthetic CT"],
      outputFormat: ["DICOM-RT", "DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For MRI-only radiation therapy planning with automatic segmentation capabilities."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinical sites in Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Perpetual license"],
      basedOn: ["Annual license", "Site license"]
    },
    version: "3.2",
    releaseDate: "2023-07-10",
    lastUpdated: "2024-01-25",
    supportedStructures: [
      "Brain: Brain",
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerves",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Submandibular (L)",
      "Head & Neck: Submandibular (R)",
      "Head & Neck: Mandible",
      "Pelvis: Bladder",
      "Pelvis: Rectum", 
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Penile Bulb"
    ],
    lastRevised: "2000-01-01"
  }
];
