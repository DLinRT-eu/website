
import { ProductDetails } from "@/types/productDetails";

export const SIEMENS_PRODUCTS: ProductDetails[] = [
  {
    id: "siemens-admire",
    name: "ADMIRE",
    company: "Siemens Healthineers",
    category: "Reconstruction",
    description: "Advanced Modeled Iterative Reconstruction with deep learning enhancements for CT image quality improvement and dose reduction.",
    features: ["AI-enhanced", "Low-dose CT", "Iterative reconstruction"],
    certification: "CE Mark",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/computed-tomography/technologies/admire",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/siemens.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2021-05-01",
    version: "3.5",
    keyFeatures: [
      "AI-enhanced iterative reconstruction",
      "Up to 60% dose reduction",
      "Reduced image noise while preserving texture",
      "Enhanced low-contrast detectability",
      "Metal artifact reduction capabilities"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT data"],
      inputFormat: ["Siemens proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["SOMATOM CT scanners", "syngo.via platform"],
      deployment: ["On-scanner", "Integrated solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "<45 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in CT image reconstruction to reduce radiation dose and/or improve image quality compared to conventional filtered back projection techniques."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in new CT systems", "Upgrade package"],
      countriesPresent: 60,
      payingCustomers: "850+",
      researchUsers: "90+"
    },
    pricing: {
      model: ["System integration", "Subscription options"],
      basedOn: ["Scanner model", "Usage volume"]
    },
    clinicalEvidence: "Multiple clinical studies showing diagnostic equivalence at significantly reduced radiation dose across multiple organ systems",
    lastVerified: "2024-10-15",
    lastRevised: "2025-05-10",
    source: "Automatically retrieved"

  },
  {
    id: "siemens-deep-resolve",
    name: "Deep Resolve",
    company: "Siemens Healthineers",
    category: "Reconstruction",
    description: "AI-powered MRI reconstruction technology that uses deep neural networks to accelerate scan times and enhance image quality.",
    features: ["Deep learning-based", "Accelerated MRI", "SNR improvement"],
    certification: "CE Mark",
    logoUrl: "/logos/siemens.png",
    companyUrl: "https://www.siemens-healthineers.com",
    productUrl: "https://www.siemens-healthineers.com/magnetic-resonance-imaging/technologies-and-innovations/deep-resolve",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncological diseases"],
    releaseDate: "2020-11-15",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based MR reconstruction",
      "Up to 60% faster scan times",
      "Enhanced signal-to-noise ratio",
      "Sharp image resolution even with accelerated protocols",
      "Compatible with multiple contrasts and sequences"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Undersampled MR k-space data"],
      inputFormat: ["Siemens proprietary format"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["MAGNETOM MR scanners", "syngo software platform"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Near real-time"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in MR image reconstruction to accelerate acquisition and/or enhance image quality while maintaining diagnostic performance."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in new MR systems", "Upgrade for compatible systems"],
      countriesPresent: 55,
      payingCustomers: "750+",
      researchUsers: "110+"
    },
    pricing: {
      model: ["One-time purchase", "System integration"],
      basedOn: ["MR system model", "Site license"]
    },
    clinicalEvidence: "Extensive published research demonstrating improved workflow efficiency and maintained diagnostic confidence with accelerated protocols",
    lastVerified: "2024-12-10",
    lastRevised: "2025-05-01",
    source: "Automatically retrieved"

  }
];
