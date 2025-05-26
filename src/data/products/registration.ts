
import { ProductDetails } from "@/types/productDetails";
import { PYMEDIX_PRODUCTS } from "./registration/pymedix";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "mirada-rtx",
    name: "RTx",
    company: "Mirada Medical",
    companyUrl: "https://mirada-medical.com",
    productUrl: "https://mirada-medical.com/rtx/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/registration.ts",
    description: "Advanced image registration and fusion platform for radiation therapy with automated registration algorithms.",
    features: ["Automated registration", "Multi-modality fusion", "Deformable registration", "Quality assurance tools"],
    category: "Registration",
    certification: "CE & FDA",
    logoUrl: "/logos/mirada-medical.png",
    website: "https://mirada-medical.com/rtx/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI", "PET", "SPECT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Automated rigid and deformable registration",
      "Multi-modality image fusion",
      "Advanced visualization tools",
      "Quality metrics and validation",
      "Seamless workflow integration"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT", "MRI", "PET", "SPECT"],
      inputFormat: ["DICOM"],
      output: ["Registered image sets", "Deformation vector fields"],
      outputFormat: ["DICOM", "DICOM-RT"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "PACS", "Image viewers"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "Minutes per registration"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For registration and fusion of medical images in radiation therapy planning."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 25,
      payingCustomers: "50+",
      researchUsers: "25+"
    },
    pricing: {
      model: ["Subscription", "Perpetual license"],
      basedOn: ["Annual license", "Number of workstations"]
    },
    version: "4.2",
    releaseDate: "2023-06-01",
    lastUpdated: "2024-02-01",
    lastRevised: "2025-05-10",
    source: "Company provided information"
  },
  ...PYMEDIX_PRODUCTS
];
