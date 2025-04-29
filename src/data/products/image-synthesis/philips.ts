
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-head-neck",
    name: "MRCAT Head and Neck",
    company: "Philips",
    companyUrl: "https://www.usa.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF439/mrcat-head-and-neck-hcnmrf439-mr-rt-clinical-application",
    description: "MR-only simulation solution that generates CT-like density information from MR images for radiation therapy planning in the head and neck region.",
    features: ["MR-only workflow", "Synthetic CT generation", "Radiation therapy planning", "Head and Neck specific"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare",
    anatomicalLocation: ["Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer"],
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
      intendedUseStatement: "For generating synthetic CT images from MR for use in head and neck radiation therapy planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size"]
    },
    version: "1.0",
    releaseDate: "2022-06-15",
    lastUpdated: "2024-02-10"
  },
  {
    id: "philips-mrcat-brain",
    name: "MRCAT Brain",
    company: "Philips",
    companyUrl: "https://www.usa.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF320/mrcat-brain-mr-rt-clinical-application",
    description: "MR-only simulation solution that generates CT-like density information from MR images for radiation therapy planning in the brain region.",
    features: ["MR-only workflow", "Synthetic CT generation", "Radiation therapy planning", "Brain specific"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "https://github.com/matteomaspero/dlinrt-products/public/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Tumors"],
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
      intendedUseStatement: "For generating synthetic CT images from MR for use in brain radiation therapy planning."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size"]
    },
    version: "2.0",
    releaseDate: "2020-03-10",
    lastUpdated: "2024-02-10"
  },
  {
    id: "philips-mrcat-pelvis",
    name: "MRCAT Pelvis",
    company: "Philips",
    companyUrl: "https://www.usa.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application",
    description: "MR-only simulation solution that generates CT-like density information from MR images for radiation therapy planning in the pelvic region.",
    features: ["MR-only workflow", "Synthetic CT generation", "Radiation therapy planning", "Pelvis specific"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "https://github.com/matteomaspero/dlinrt-products/public/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare",
    anatomicalLocation: ["Pelvis"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Gynecological Cancer"],
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
      intendedUseStatement: "For generating synthetic CT images from MR for use in pelvic radiation therapy planning."
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
    releaseDate: "2016-05-15",
    lastUpdated: "2024-02-10"
  }
];
