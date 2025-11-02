
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-auto-contouring",
    name: "Auto Contouring",
    company: "Philips",
    companyUrl: "https://www.philips.com/healthcare",
    productUrl: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/philips.ts",
    description: "Integrated auto-segmentation solution within the Pinnacle treatment planning system using model-based and atlas-based algorithms.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/philips.png",
    website: "https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application",
    anatomicalLocation: ["Pelvis"],
    modality: ["MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Multi-atlas based algorithms", "Model-based segmentation", "Seamless TPS integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI"],
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

},
    version: "9.2",
    releaseDate: "2022-10-10",
    lastUpdated: "2023-11-20",
    supportedStructures: [
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      "Pelvis: Penile Bulb",
      "Pelvis: Urethra"
    ],
    lastRevised: "2025-09-01",
    source: "automatically retrieved and verified"
  }
];
