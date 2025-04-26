
import { ProductDetails } from "@/types/productDetails";

export const WISDOM_TECH_PRODUCTS: ProductDetails[] = [
  {
    id: "wisdom-deep-contour",
    name: "Deep Contour",
    company: "Wisdom Tech",
    companyUrl: "http://www.wisdom-tech.online/",
    productUrl: "http://www.wisdom-tech.online/view-16.html",
    description: "Chinese-developed AI solution for automatic contour segmentation in radiation therapy planning.",
    features: ["Deep learning segmentation", "Multiple anatomical sites", "Integrated workflow"],
    category: "Auto-Contouring",
    certification: "NMPA",
    logoUrl: "public/logos/wisdom-tech.png",
    website: "http://www.wisdom-tech.online/view-16.html",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not available"
      },
      fda: "Not available",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],
      countriesPresent: 1,
      payingCustomers: "Multiple clinical sites in China",
      researchUsers: "Research institutions in China"
    },
    pricing: {
      model: ["Perpetual license"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "2.0",
    releaseDate: "2023-04-10",
    lastUpdated: "2023-12-15"
  }
];
