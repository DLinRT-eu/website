
import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mriplanner",
    name: "MRIplanner",
    company: "Spectronic Medical",
    companyUrl: "https://spectronicmedical.com",
    productUrl: "https://spectronicmedical.com/mriplanner",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/spectronic.ts",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning, with integrated auto-segmentation capabilities.",
    features: ["MR-only workflow", "Deep learning based", "Fast processing", "Synthetic CT generation", "Auto-segmentation"],
    category: "Image Synthesis",
    secondaryCategories: ["Auto-Contouring"],
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/spectronic-medical.jpg",
    website: "https://spectronicmedical.com/mriplanner",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "High anatomical accuracy", "Synthetic CT generation", "Auto-segmentation capabilities"],
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
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard T1/T2 MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT", "Structure sets"],
      outputFormat: ["DICOM", "DICOM-RT"]
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
      fda: "510(k) Cleared",
      intendedUseStatement: "For generating synthetic CT and structure sets from MRI for radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Distribution partners"],

},
    version: "3.2",
    releaseDate: "2023-07-10",
    lastUpdated: "2025-08-08",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved and revised"
  }
];
