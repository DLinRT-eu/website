
import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-mr",
    name: "SubtleMR",
    company: "Subtle Medical",
    category: "Image Enhancement",
    description: "AI-powered solution for enhancing MRI images, allowing for faster scan times while maintaining or improving image quality.",
    features: ["Deep learning enhancement", "MRI specific", "Scan time reduction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-mr/",
    anatomicalLocation: ["Brain", "Body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Cancer"],
    releaseDate: "2020-06-15",
    version: "2.3",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Enables 2-4x faster scanning",
      "Improves SNR and image sharpness",
      "Works with multiple contrasts",
      "Vendor-neutral compatibility"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<30 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing MR image quality of accelerated acquisitions to support clinical interpretation."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 30,
      payingCustomers: "200+",
      researchUsers: "50+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual scan volume", "Enterprise-wide options"]
    },
    clinicalEvidence: "Multiple peer-reviewed studies showing diagnostic equivalence between standard acquisition and accelerated protocols with SubtleMR enhancement",
    lastVerified: "2024-12-05",
    lastRevised: "2025-01-10"
  },
  {
    id: "subtle-pet",
    name: "SubtlePET",
    company: "Subtle Medical",
    category: "Image Enhancement",
    description: "AI-powered PET image enhancement technology that enables faster scan times or lower dose while maintaining diagnostic image quality.",
    features: ["Deep learning enhancement", "PET specific", "Dose reduction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-pet/",
    anatomicalLocation: ["Whole body"],
    modality: "PET",
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiovascular disease"],
    releaseDate: "2019-09-01",
    version: "3.0",
    keyFeatures: [
      "Deep learning-based PET enhancement",
      "Enables 4x faster scans or 75% dose reduction",
      "Improved signal-to-noise ratio",
      "Enhanced lesion detectability",
      "Compatible with all major PET/CT scanners"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM PET images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing PET image quality of low-dose or fast-acquisition scans to support clinical interpretation."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 35,
      payingCustomers: "250+",
      researchUsers: "60+"
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual scan volume", "Enterprise-wide options"]
    },
    clinicalEvidence: "Multiple peer-reviewed studies showing diagnostic equivalence between standard dose and low-dose/fast-scan protocols with SubtlePET enhancement",
    lastVerified: "2024-11-15",
    lastRevised: "2025-01-05"
  },
  {
    id: "subtle-gad",
    name: "SubtleGAD",
    company: "Subtle Medical",
    category: "Image Enhancement",
    description: "AI-powered solution that simulates full-dose gadolinium-enhanced MRI from zero- or low-dose contrast studies.",
    features: ["Deep learning enhancement", "MRI contrast", "Gadolinium reduction"],
    certification: "Research Use Only",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-gad/",
    anatomicalLocation: ["Brain", "Spine"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Cancer"],
    releaseDate: "2022-05-10",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based contrast enhancement",
      "Reduces or eliminates gadolinium administration",
      "Generates synthetic post-contrast images",
      "Reduces contrast-associated risks",
      "Designed for neurological applications"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["Pre-contrast MR images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic post-contrast images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Research platforms"],
      deployment: ["Cloud-based", "Research environments"],
      triggerForAnalysis: "Manual selection",
      processingTime: "<45 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Research Use Only",
        class: "N/A",
        type: "N/A"
      },
      fda: "Research Use Only",
      intendedUseStatement: "For research use only. Not for use in diagnostic procedures."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Research partnerships", "Early access program"],
      countriesPresent: 10,
      payingCustomers: "Research use only",
      researchUsers: "40+"
    },
    pricing: {
      model: ["Research license"],
      basedOn: ["Institution size", "Research scope"]
    },
    clinicalEvidence: "Early research studies showing promising correlation between synthetic and actual contrast-enhanced images in neurological applications",
    lastVerified: "2024-10-20",
    lastRevised: "2024-12-15"
  }
];
