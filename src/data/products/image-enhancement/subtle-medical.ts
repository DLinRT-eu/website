
import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-medical-clarity",
    name: "Clarity IQ",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered platform that enhances medical image quality while reducing scan time and contrast dose requirements.",
    features: ["AI enhancement", "Dose reduction", "Speed improvement"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/clarity-iq/",
    anatomicalLocation: ["Whole body"],
    modality: ["MRI", "CT", "PET"],
    diseaseTargeted: ["Various conditions", "Oncology", "Neurological disorders"],
    releaseDate: "2019-09-01",
    version: "3.0",
    keyFeatures: [
      "AI-powered image enhancement reducing noise while preserving detail",
      "Up to 4x faster MRI scanning with maintained image quality",
      "Contrast dose reduction capabilities for safer imaging",
      "Real-time processing during image acquisition",
      "Seamless integration with existing imaging workflows"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Medical images during acquisition"],
      inputFormat: ["DICOM"],
      output: ["Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Scanner integration", "PACS compatibility"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Real-time during scan acquisition",
      processingTime: "Real-time (seconds)"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for enhancing medical images to improve quality through noise reduction and detail preservation during image acquisition."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "OEM partnerships"],
      countriesPresent: 25,
      payingCustomers: "150+",
      researchUsers: "40+"
    },
    pricing: {
      model: ["Subscription", "Per-scan pricing"],
      basedOn: ["Scanner type", "Usage volume"]
    },
    clinicalEvidence: "Multiple peer-reviewed studies demonstrating equivalent diagnostic quality with reduced scan time and contrast dose",
    lastVerified: "2025-05-10",
    lastUpdated: "2024-12-10",
    lastRevised: "2025-05-05"
  }
];
