
import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mri-planner",
    name: "MRI Planner",
    company: "Spectronic Medical",
    companyUrl: "https://spectronicmedical.com/",
    productUrl: "https://spectronicmedical.com/mri-planner/",
    description: "MRI-only workflow solution with integrated auto-segmentation capabilities for radiation therapy planning.",
    features: ["MRI-based contouring", "Synthetic CT generation", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "public/logos/spectronic medical.jpg",
    website: "https://spectronicmedical.com/mri-planner/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Brain"],
    modality: "MR",
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
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinical sites in Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Perpetual license"],
      basedOn: ["Annual license", "Site license"]
    },
    version: "2.5",
    releaseDate: "2023-07-10",
    lastUpdated: "2024-01-20"
  },
  {
    id: "spectronic-mriplus",
    name: "MRIplus",
    company: "Spectronic Medical",
    companyUrl: "https://spectronicmedical.com/",
    productUrl: "https://spectronicmedical.com/",
    description: "Specialized solution for MRI-only radiotherapy planning with integrated auto-segmentation.",
    features: ["MRI-based segmentation", "Synthetic CT generation", "Streamlined workflow"],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "public/logos/spectronic medical.jpg",
    website: "https://spectronicmedical.com/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Brain"],
    modality: "MR",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types", "Prostate Cancer", "Brain Tumors"],
    keyFeatures: ["MRI-based planning", "Synthetic CT generation", "Dose calculation"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT", "Structure sets"],
      outputFormat: ["DICOM", "DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For MRI-only radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 12,
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Perpetual license"],
      basedOn: ["Annual license", "Site license"]
    },
    version: "3.0",
    releaseDate: "2023-03-15",
    lastUpdated: "2023-12-10"
  }
];
