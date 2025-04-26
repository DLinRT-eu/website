
import { ProductDetails } from "@/types/productDetails";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "register-master",
    name: "RegisterMaster AI",
    company: "MedicalVision",
    description: "High-precision multimodal image registration for treatment planning and adaptation.",
    features: ["Deformable registration", "Multi-modality fusion", "Real-time processing"],
    category: "Registration",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Brain", "Spine", "Whole Body"],
    modality: "MRI",
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Brain Tumors", "Metastases"],
    keyFeatures: ["Deformable registration", "Multi-modality support", "Anatomical landmark detection"],
    technicalSpecifications: {
      population: "All patients",
      input: ["CT", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Deformation vector fields"],
      outputFormat: ["DICOM", "NIfTI"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "Standalone workstation"],
      deployment: ["On-premises", "Virtual machine"],
      triggerForAnalysis: "User initiated or automatic workflow",
      processingTime: "30-90 seconds per registration"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Pending approval",
      intendedUseStatement: "For use in registering medical images to support treatment planning."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales"],
      countriesPresent: 15,
      payingCustomers: "Over 50",
      researchUsers: "Over 20 institutions"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Number of workstations", "Annual maintenance"]
    },
    version: "2.5",
    releaseDate: "2023-11-10",
    lastUpdated: "2024-04-20"
  }
];
