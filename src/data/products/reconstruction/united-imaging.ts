
import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PRODUCTS: ProductDetails[] = [
  {
    id: "united-uai-vision-recon",
    name: "uAIFI",
    company: "United Imaging",
    category: "Reconstruction",
    description: "Deep learning-based CT reconstruction technology that reduces radiation dose while enhancing image quality.",
    features: ["AI-powered", "Low-dose CT", "Deep learning reconstruction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/ct",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2022-03-15",
    version: "2.0",
    keyFeatures: [
      "Deep neural network reconstruction",
      "Ultra-low dose imaging capabilities",
      "Reduced image noise",
      "Enhanced structural detail",
      "Improved contrast resolution"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uCT scanners", "uCloud platform"],
      deployment: ["On-scanner", "Cloud option available"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "FDA Cleared",
      intendedUseStatement: "Intended for use in CT image reconstruction to reduce radiation dose and improve image quality compared to conventional reconstruction techniques."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated in CT systems"],
      countriesPresent: 25,
      payingCustomers: "200+",
      researchUsers: "40+"
    },
    pricing: {
      model: ["System integration", "Subscription options"],
      basedOn: ["Scanner model", "Usage volume"]
    },
    clinicalEvidence: "Emerging clinical evidence showing significant dose reduction with maintained diagnostic accuracy",
    lastVerified: "2024-09-20",
    lastRevised: "2025-05-10",
    source: "Automatically retrieved"

  },
  {
    id: "united-uaifi-umr",
    name: "uAIFI on uMR",
    company: "United Imaging",
    category: "Reconstruction",
    description: "Deep learning-based MRI reconstruction that reduces acquisition time increasing image quality.",
    features: ["AI-powered", "Deep learning reconstruction"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://eu.united-imaging.com/en/product-service/products/mr/uaifi-technology",
    anatomicalLocation: ["Whole body"],
    modality: "MR",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2020-05-05",
    version: "2.0",
    keyFeatures: [
      "Deep neural network reconstruction",
      "Reduced image noise",
      "Enhanced structural detail",
      "Improved contrast resolution"
    ],
    technicalSpecifications: {
      population: "Adult",
      input: ["Raw MRI data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed MRI"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uMR scanners", "uCloud platform"],
      deployment: ["On-scanner"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds per dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "FDA Cleared",
      intendedUseStatement: "Intended for use in MRI image reconstruction to reduce acquisition time or increase image quality."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Integrated in MRI systems"],
      countriesPresent: 25,
      payingCustomers: "200+",
      researchUsers: "40+"
    },
    pricing: {
      model: ["System integration", "Subscription options"],
      basedOn: ["Scanner model", "Usage volume"]
    },
    clinicalEvidence: "Emerging clinical evidence showing increase image quality",
    lastVerified: "2025-07-30",
    lastRevised: "2025-07-30",
    source: "Automatically retrieved and verified"

  },
  {
    id: "united-hd-tof",
    name: "HD TOF 2.0",
    company: "United Imaging",
    category: "Reconstruction",
    description: "AI-powered PET reconstruction technology that enhances time-of-flight imaging for improved resolution and quantitation.",
    features: ["Deep learning reconstruction", "Enhanced TOF", "PET modality"],
    certification: "CE Mark",
    logoUrl: "/logos/unitedimaging.png",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://www.united-imaging.com/en/products/molecular-imaging",
    anatomicalLocation: ["Whole body"],
    modality: "PET",
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiac diseases"],
    releaseDate: "2021-09-10",
    version: "2.0",
    keyFeatures: [
      "Deep learning-enhanced TOF reconstruction",
      "Ultra-high definition PET images",
      "Improved small lesion detectability",
      "Enhanced quantitative accuracy",
      "Reduced scan times or injected dose"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw PET sinogram data"],
      inputFormat: ["United Imaging proprietary format"],
      output: ["Reconstructed PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["uMI PET/CT systems", "uPMR PET/MR systems"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "FDA Cleared",
      intendedUseStatement: "Intended for use in PET image reconstruction to enhance image quality and/or reduce acquisition time or injected dose."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in new PET systems", "Upgrade option"],
      countriesPresent: 20,
      payingCustomers: "150+",
      researchUsers: "35+"
    },
    pricing: {
      model: ["System integration", "One-time purchase"],
      basedOn: ["PET system model", "Enterprise license"]
    },
    clinicalEvidence: "Clinical studies demonstrating improved lesion detection rates and quantitative accuracy compared to conventional reconstruction techniques",
    lastVerified: "2024-10-15",
    lastUpdated: "2024-12-20",
    lastRevised: "2025-05-05",
    source: "Automatically retrieved"

  }
];
