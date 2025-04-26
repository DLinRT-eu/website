
import { ProductDetails } from "@/types/productDetails";

export const MIM_SOFTWARE_PRODUCTS: ProductDetails[] = [
  {
    id: "mim-contour-protegeai",
    name: "Contour ProtégéAI+",
    company: "MIM Software",
    companyUrl: "https://www.mimsoftware.com/",
    productUrl: "https://www.mimsoftware.com/radiation-oncology",
    description: "Advanced AI-based auto-segmentation solution integrated within the MIM Software ecosystem for radiation oncology.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.mimsoftware.com/wp-content/uploads/2021/05/mim-software-logo.png",
    website: "https://www.mimsoftware.com/radiation-oncology",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Brain"],
    modality: "CT, MR",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-based segmentation", "Integration with MIM platform", "Multiple modality support"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MR"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native integration with MIM Software", "TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "7.1",
    releaseDate: "2023-10-15",
    lastUpdated: "2024-03-20"
  }
];
