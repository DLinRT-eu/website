
import { ProductDetails } from "@/types/productDetails";

export const GE_HEALTHCARE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-auto-segmentation",
    name: "Auto Segmentation",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/products/advanced-visualization/advantage-workstation/auto-segmentation",
    description: "Integrated auto-segmentation solution within the GE Healthcare ecosystem, providing efficient and accurate organ delineation for radiation therapy planning.",
    features: ["Integrated workflow", "Multiple anatomical sites", "Advanced algorithms"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "https://www.gehealthcare.com/-/jssmedia/images/global/brand/ge-healthcare-logo.jpg",
    website: "https://www.gehealthcare.com/products/advanced-visualization/advantage-workstation/auto-segmentation",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Integrated platform", "Workflow efficiency", "Multiple anatomical sites"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native integration with GE systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within clinical workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 60,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "4.0",
    releaseDate: "2023-03-10",
    lastUpdated: "2024-01-20"
  }
];
