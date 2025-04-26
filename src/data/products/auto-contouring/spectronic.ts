import { ProductDetails } from "@/types/productDetails";

export const SPECTRONIC_PRODUCTS: ProductDetails[] = [
  {
    id: "spectronic-mri-planner",
    name: "MRI Planner",
    company: "Spectronic Medical",
    companyUrl: "http://medical.spectronic.se/",
    productUrl: "http://medical.spectronic.se/page-2/page6/index.html",
    description: "MRI-only workflow solution with integrated auto-segmentation capabilities for radiation therapy planning.",
    features: ["MRI-based contouring", "Synthetic CT generation", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "public/logos/spectronic medical.jpg",
    website: "http://medical.spectronic.se/",
    anatomicalLocation: ["Head & Neck", "Pelvis", "Brain"],
    modality: ["MRI"],
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
  }
];
