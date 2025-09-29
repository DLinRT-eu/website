
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-precise-image",
    name: "Precise Image",
    company: "Philips",
    category: "Reconstruction",
    description: "Advanced CT reconstruction technology that achieves high image quality at lower radiation doses.",
    features: ["Deep learning-based", "Low-dose imaging", "CT modality"],
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/technology/ct-smart-workflow",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiac conditions", "Neurological disorders"],
    releaseDate: "2022-02-01",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based reconstruction for low-dose imaging",
      "Up to 80% radiation dose reduction compared to standard reconstruction",
      "Processes both sparse-view and low-energy acquisitions",
      "Enhanced image clarity and reduced noise"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT data", "Sinogram data"],
      inputFormat: ["Proprietary Philips format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["IntelliSpace Portal", "Philips CT Scanners"],
      deployment: ["On-premise", "Cloud option available"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<30 seconds for standard scan"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in CT image reconstruction to provide diagnostic quality images with reduced radiation dose."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Integrated in new CT systems"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "Subscription available"],
      basedOn: ["Scanner model", "Usage volume"]
    },
    clinicalEvidence: "Multiple peer-reviewed studies showing non-inferiority to standard dose CT with up to 80% dose reduction",
    lastUpdated: "2025-01-15",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/philips.ts"

  },
  {
    id: "philips-smartspeed",
    name: "SmartSpeed",
    company: "Philips",
    category: "Reconstruction",
    description: "MRI acceleration technology using deep learning reconstruction algorithms to reduce scan times while maintaining image quality.",
    features: ["Deep learning-based", "Fast acquisition", "MRI modality"],
    certification: "CE Mark",
    logoUrl: "/logos/philips.png",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.philips.com/healthcare/education-resources/publications/fieldstrength/compressed-sense",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Multiple sclerosis", "Cancer", "Musculoskeletal disorders"],
    releaseDate: "2021-06-15",
    version: "3.2",
    keyFeatures: [
      "Up to 50% faster scanning times",
      "Deep learning reconstruction for undersampled data",
      "Compatible with all anatomical regions",
      "Works with all contrasts (T1, T2, FLAIR, etc.)",
      "Maintains spatial resolution and image contrast"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MRI k-space data"],
      inputFormat: ["Proprietary Philips format"],
      output: ["Reconstructed MRI images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Philips MRI systems", "IntelliSpace Portal"],
      deployment: ["Integrated in MRI scanner"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "Real-time"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in accelerated MRI acquisition and reconstruction to reduce scan times while maintaining diagnostic image quality."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated in Philips MRI systems", "Software upgrade"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "Subscription available"],
      basedOn: ["MRI system model", "Site license"]
    },
    clinicalEvidence: "Multiple clinical studies showing equivalent diagnostic quality with 30-50% reduced scan times across neurological, musculoskeletal, and body imaging",
    lastUpdated: "2025-07-30", 
    lastRevised: "2025-09-01",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/philips.ts"

  }
];
