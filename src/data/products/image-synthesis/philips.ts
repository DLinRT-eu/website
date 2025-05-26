
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-smartspeed-iq",
    name: "SmartSpeed + IQ",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/product/HC781043/smartspeed-dti-sense",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/philips.ts",
    description: "Advanced MR imaging solution with AI-enhanced image reconstruction and synthesis capabilities for improved image quality and reduced scan times.",
    features: ["AI-enhanced reconstruction", "Accelerated imaging", "Image quality enhancement"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.com/healthcare/product/HC781043/smartspeed-dti-sense",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    subspeciality: "Radiology",
    diseaseTargeted: ["Multiple conditions"],
    keyFeatures: ["AI-enhanced reconstruction", "Faster scanning", "Improved image quality"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["MRI data"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Native MR scanner integration"],
      deployment: ["On-scanner"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Real-time"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For AI-enhanced MR image reconstruction and synthesis."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales"],
      countriesPresent: 60,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Scanner model", "Features included"]
    },
    version: "3.0",
    releaseDate: "2023-08-01",
    lastUpdated: "2024-01-10",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
