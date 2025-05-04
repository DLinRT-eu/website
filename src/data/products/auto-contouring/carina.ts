
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const CARINA_PRODUCTS: ProductDetails[] = [
  {
    id: "carina-intcontour",
    name: "INTContour",
    company: "Carina AI",
    companyUrl: "https://www.carinaai.com/",
    productUrl: "https://www.carinaai.com/intcontour.html",
    description: "Fully Customizable AI-Powered OAR & Target Segmentation with Automatic Quality Assurance",
    features: ["Deep learning algorithms", "Fast processing", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/carina.jpg",
    website: "https://www.carinaai.com/intcontour.html",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Male Pelvis", "Female Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Cloud platform", "Rapid processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI", "PET/CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic",
      processingTime: "3-5 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 10,
      payingCustomers: "Multiple clinical sites in Europe",
      researchUsers: "Academic institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.1",
    releaseDate: "2023-08-10",
    lastUpdated: "2024-03-05",
    supportedStructures: [
      "Head & Neck: Brainstem",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Mandible",
      "Head & Neck: Submandibular Glands",
      "Head & Neck: Larynx",
      "Head & Neck: Thyroid",
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      "Abdomen: Liver",
      "Abdomen: Kidneys (L)",
      "Abdomen: Kidneys (R)",
      "Abdomen: Stomach",
      "Abdomen: Bowel",
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Heads"
    ],
    lastRevised: "2000-01-01"
  }
];
