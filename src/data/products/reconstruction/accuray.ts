
import { ProductDetails } from "@/types/productDetails";

export const ACCURAY_PRODUCTS: ProductDetails[] = [
  {
    id: "accuray-clearrt",
    name: "Accuray ClearRT",
    company: "Accuray",
    category: "Reconstruction",
    description: "AI-powered CBCT reconstruction system that delivers enhanced image quality for precise target localization and adaptive radiotherapy.",
    features: ["Deep learning reconstruction", "CBCT imaging", "Radiotherapy"],
    certification: "FDA Cleared",
    logoUrl: "/placeholder.svg",
    companyUrl: "https://www.accuray.com/",
    productUrl: "https://www.accuray.com/treatment-delivery/clearrt/",
    anatomicalLocation: ["Whole body"],
    modality: "CBCT",
    diseaseTargeted: ["Cancer"],
    releaseDate: "2021-06-15",
    version: "1.2",
    keyFeatures: [
      "Deep learning-enhanced CBCT reconstruction",
      "High-fidelity soft tissue visualization",
      "Improved contrast resolution",
      "Advanced scatter correction",
      "Seamless integration with radiotherapy systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["Raw CBCT projection data"],
      inputFormat: ["Accuray proprietary format"],
      output: ["Reconstructed CBCT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Radixact Treatment Delivery System"],
      deployment: ["On-system solution"],
      triggerForAnalysis: "Automatic during acquisition",
      processingTime: "<60 seconds for full reconstruction"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "Intended for use in cone-beam CT image reconstruction to support target localization and adaptive radiotherapy decision-making."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Integrated with Radixact System", "Upgrade option"],
      countriesPresent: 30,
      payingCustomers: "180+",
      researchUsers: "25+"
    },
    pricing: {
      model: ["System integration", "Service contract"],
      basedOn: ["Treatment system model"]
    },
    clinicalEvidence: "Clinical data demonstrating improved target visualization and reduced contouring variability compared to conventional CBCT",
    lastVerified: "2024-09-10",
    lastRevised: "2024-11-15"
  }
];
