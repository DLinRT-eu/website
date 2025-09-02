
import { ProductDetails } from "@/types/productDetails";

export const GE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-truefidelity-pro",
    name: "TrueFidelity Pro",
    company: "GE Healthcare",
    category: "Reconstruction",
    description: "Deep learning-based CT image reconstruction technology that improves image quality while reducing radiation dose.",
    features: ["AI-powered", "Low-dose CT", "Deep learning reconstruction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/computed-tomography/revolution/truefidelity",
    anatomicalLocation: ["Whole body"],
    modality: "CT",
    diseaseTargeted: ["Cancer", "Cardiovascular disease", "Traumatic injuries"],
    releaseDate: "2021-10-01",
    version: "2.1",
    keyFeatures: [
      "Deep learning-based image reconstruction",
      "Up to 82% dose reduction potential",
      "Improved low-contrast detectability",
      "Enhanced spatial resolution",
      "Reduced image noise and artifacts"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CT projection data"],
      inputFormat: ["GE proprietary format"],
      output: ["Reconstructed CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Revolution CT scanners", "Revolution Apex platform"],
      deployment: ["On-scanner", "Edge computing"],
      triggerForAnalysis: "Automatic post-acquisition",
      processingTime: "<60 seconds for standard dataset"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in CT image reconstruction to enhance image quality and/or reduce radiation dose compared to conventional reconstruction techniques."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Integrated in new CT systems"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "Software subscription"],
      basedOn: ["Scanner type", "Volume license"]
    },
    clinicalEvidence: "Multiple clinical studies showing diagnostic equivalence at up to 82% lower dose compared to conventional techniques",
    lastUpdated: "2025-02-10",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/ge-healthcare.ts"
  },
  {
    id: "ge-air-recon-dl",
    name: "GE AIR Recon DL",
    company: "GE Healthcare",
    category: "Reconstruction",
    description: "Deep learning MR image reconstruction technology that improves signal-to-noise ratio and reduces scan times.",
    features: ["Deep learning-based", "Faster scanning", "MRI modality"],
    certification: "FDA Cleared",
    logoUrl: "/logos/ge_healthcare.png",
    companyUrl: "https://www.gehealthcare.com",
    productUrl: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl",
    anatomicalLocation: ["Whole body"],
    modality: "MRI",
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Abdominal pathologies"],
    releaseDate: "2020-08-15",
    version: "3.0",
    keyFeatures: [
      "Deep learning-based MR image reconstruction",
      "Up to 50% reduction in scan time",
      "Up to 30% improvement in signal-to-noise ratio",
      "Compatible with 2D and 3D acquisitions",
      "Works with all contrasts and orientations"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw MR k-space data"],
      inputFormat: ["GE proprietary format"],
      output: ["Reconstructed MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["SIGNA MR systems", "Edison Platform"],
      deployment: ["On-scanner reconstruction"],
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
      intendedUseStatement: "Intended for use in MR image reconstruction to enhance signal-to-noise ratio and/or reduce scan time while maintaining diagnostic image quality."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Integrated in new MR systems", "Upgrade for compatible systems"],
      
      
      
    },
    pricing: {
      model: ["One-time purchase", "Subscription available"],
      basedOn: ["MR system model", "Enterprise license options"]
    },
    clinicalEvidence: "Over 30 peer-reviewed publications demonstrating improved image quality and/or reduced scan times across various clinical applications",
    lastUpdated: "2025-01-15",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/reconstruction/ge-healthcare.ts"
  }
];
