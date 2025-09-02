
import { ProductDetails } from "@/types/productDetails";

export const CANON_PRODUCTS: ProductDetails[] = [
  {
    id: "canon-aice-ct",
    name: "AiCE CT",
    company: "Canon Medical Systems",
    category: "Reconstruction",
    description: "Advanced intelligent Clear-IQ Engine for CT using deep learning reconstruction to reduce dose and improve image quality.",
    features: ["Deep learning reconstruction", "Low-dose imaging", "CT modality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/canon.jpg", 
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/computed-tomography/aice",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Trauma"],
    releaseDate: "2021-04-15",
    version: "2.0",
    keyFeatures: [
      "Deep Convolutional Neural Network reconstruction",
      "Up to 82% dose reduction potential",
      "Ultra-high resolution capabilities",
      "Enhanced low-contrast detectability",
      "Reduced image noise while preserving natural texture"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT projection data"],
      inputFormat: ["Canon proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Aquilion CT scanners", "Vitrea advanced visualization"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "<40 seconds for standard dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in CT image reconstruction to enhance image quality and/or reduce radiation dose while maintaining diagnostic confidence."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in new CT systems", "Upgrade for compatible systems"],
      
      
      
    },
    pricing: {
      model: ["System integration", "Subscription options"],
      basedOn: ["Scanner model", "Enterprise licensing"]
    },
    clinicalEvidence: "Multiple clinical studies demonstrating excellent image quality at ultra-low-dose settings across various clinical applications",
    evidence: [
      {
        type: "Product Information",
        description: "Official Canon AiCE Deep Learning Reconstruction product page with technical specifications and clinical benefits",
        link: "https://global.medical.canon/products/computed-tomography/aice_dlr"
      }
    ],
    lastUpdated: "2025-01-15",
    lastRevised: "2025-08-26",
    source: "Automatically retrieved"

  },
  {
    id: "canon-aice-mr",
    name: "AiCE MR",
    company: "Canon Medical Systems",
    category: "Reconstruction",
    description: "Deep learning reconstruction for MRI that accelerates scanning while improving image clarity and detail.",
    features: ["Deep learning reconstruction", "Accelerated MRI", "Enhanced SNR"],
    certification: "CE Mark",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/magnetic-resonance/aice",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Abdominal pathologies"],
    releaseDate: "2022-02-01",
    version: "1.5",
    keyFeatures: [
      "Deep learning-based MR reconstruction",
      "Up to 50% reduction in scan time",
      "Enhanced signal-to-noise ratio",
      "Improved spatial resolution",
      "Compatible with multiple pulse sequences"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Undersampled MR k-space data"],
      inputFormat: ["Canon proprietary format"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Vantage MRI systems", "Vitrea advanced visualization"],
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
      intendedUseStatement: "Intended for use in MR image reconstruction to accelerate acquisition and/or enhance image quality while maintaining diagnostic confidence."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Integrated in new MR systems", "Upgrade option"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "System integration"],
      basedOn: ["MR system model", "Enterprise license"]
    },
    clinicalEvidence: "Growing body of clinical evidence showing comparable diagnostic performance with significantly reduced scan times",
    lastUpdated: "2025-01-10",
    lastRevised: "2025-05-05",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/canon.ts"
    
  },
  {
    id: "canon-piqe",
    name: "PIQE (Precise IQ Engine)",
    company: "Canon Medical Systems",
    category: "Reconstruction", 
    description: "Canon Medical's high resolution Deep Learning Reconstruction for MRI. PIQE increases matrix size, removes noise, and delivers sharp anatomical images to take MR imaging to the next level.",
    features: ["Deep learning reconstruction", "High resolution MRI", "Noise reduction", "Enhanced image quality"],
    certification: "CE Mark",
    logoUrl: "/logos/canon.jpg",
    companyUrl: "https://global.medical.canon/",
    productUrl: "https://global.medical.canon/products/magnetic-resonance/piqe",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/canon.ts",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Abdominal pathologies"],
    releaseDate: "2023-01-15",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based high resolution reconstruction",
      "Increased matrix size for enhanced detail",
      "Advanced noise reduction algorithms", 
      "Sharp anatomical image delivery",
      "Compatible with Vantage MRI systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["MR k-space data"],
      inputFormat: ["Canon proprietary format"],
      output: ["High resolution MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Vantage MRI systems", "Vitrea advanced visualization"],
      deployment: ["On-scanner solution"],
      triggerForAnalysis: "Automatic during reconstruction",
      processingTime: "Near real-time processing"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa", 
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in MR image reconstruction to enhance spatial resolution and image quality while maintaining diagnostic confidence."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Integrated in new MR systems", "Upgrade option for compatible systems"],
      
      
      
    },
    pricing: {
      model: ["System integration", "One-time purchase"],
      basedOn: ["MR system model", "Enterprise licensing"]
    },
    clinicalEvidence: "Clinical studies demonstrating significantly improved spatial resolution and image sharpness for enhanced diagnostic capabilities",
    lastUpdated: "2025-01-15", 
    lastRevised: "2025-01-15",
    source: "Automatically retrieved"
  }
];
