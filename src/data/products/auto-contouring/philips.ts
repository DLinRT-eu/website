import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-pinnacle",
    name: "Pinnacle Auto-Segmentation",
    company: "Philips Healthcare",
    description: "Integrated auto-segmentation solution within the Pinnacle treatment planning system using model-based and atlas-based algorithms.",
    features: ["Integrated in TPS", "Multiple segmentation methods", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.philips.com/healthcare/solutions/radiation-oncology/radiation-treatment-planning",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Multi-atlas based algorithms", "Model-based segmentation", "Seamless TPS integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Variable based on structures"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"],
      countriesPresent: 70,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size", "Modules purchased"]
    },
    version: "9.2",
    releaseDate: "2022-10-10",
    lastUpdated: "2023-11-20"
  }
];
