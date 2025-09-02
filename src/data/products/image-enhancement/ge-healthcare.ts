
import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-dlip-ct",
    name: "Deep Learning Image Processing for CT",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "AI-powered CT image enhancement technology that improves image quality and reduces noise in standard and low-dose examinations.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/computed-tomography",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-enhancement/ge-healthcare.ts",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Pulmonary disorders"],
    releaseDate: "2021-09-15",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based image enhancement",
      "Works with images from any CT scanner",
      "Reduces image noise while preserving natural texture",
      "Enhances lesion conspicuity",
      "Improves low-contrast detectability"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Edison Platform", "AW Workstations"],
      deployment: ["On-premise server", "Edge device"],
      triggerForAnalysis: "Automatic or manual trigger",
      processingTime: "<8 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing CT images to improve image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Edison Marketplace"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Volume-based"],
      basedOn: ["Annual volume", "Enterprise license"]
    },
    clinicalEvidence: "Multiple clinical evaluations demonstrating improved diagnostic confidence and reduced interpretation time",
    lastUpdated: "2025-01-20",
    lastRevised: "2025-09-01"
  },
  {
    id: "ge-air-recon-dl-enhancement",
    name: "AIR Recon DL Enhancement Mode",
    company: "GE Healthcare",
    category: "Image Enhancement",
    description: "MR image enhancement solution using deep learning to improve signal-to-noise ratio and image sharpness in existing MR images.",
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncological diseases"],
    releaseDate: "2021-11-10",
    version: "1.5",
    keyFeatures: [
      "Deep learning MR image enhancement",
      "Improved signal-to-noise ratio without blurring",
      "Enhanced spatial resolution",
      "Compatible with all contrast weightings",
      "Can process previously acquired examinations"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Edison Platform", "AW Workstations"],
      deployment: ["On-premise", "Cloud option"],
      triggerForAnalysis: "Manual selection or rule-based",
      processingTime: "<10 seconds per series"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in enhancing MR image quality through noise reduction and detail enhancement to support clinical interpretation."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Edison Marketplace"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "One-time purchase"],
      basedOn: ["Annual volume", "Enterprise deployment"]
    },
    clinicalEvidence: "Reader studies showing improved diagnostic confidence and lesion conspicuity compared to standard MR images",
    lastUpdated: "2025-01-10",
    lastRevised: "2025-09-01"

  }
];
