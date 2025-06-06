
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const CARINA_PRODUCTS: ProductDetails[] = [
  {
    id: "carina-intcontour",
    name: "INTContour",
    company: "Carina AI",
    companyUrl: "https://www.carinaai.com/",
    productUrl: "https://www.carinaai.com/intcontour.html",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/carina.ts",
    description: "Fully Customizable AI-Powered OAR & Target Segmentation with Automatic Quality Assurance",
    features: ["Deep learning algorithms", "Fast processing", "Multiple anatomical sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/carina.jpg",
    website: "https://www.carinaai.com/intcontour.html",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Male Pelvis", "Female Pelvis"],
    modality: ["CT", "MRI", "PET/CT"],
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
      fda: "FDA",
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
      model: ["-"],
      basedOn: ["-"]
    },
    version: "2.1",
    releaseDate: "2023-08-10",
    lastUpdated: "2024-03-05",
    supportedStructures: [
"Head & Neck: Mandible",
"Head & Neck: Left Brachial Plexus",
"Head & Neck: Right Brachial Plexus",
"Head & Neck: Brain",
"Head & Neck: Brainstem",
"Head & Neck: Oval Cavity",
"Head & Neck: Left Cochlea",
"Head & Neck: Right Cochlea",
"Head & Neck: Left Eye",
"Head & Neck: Right Eye",
"Head & Neck: Left Lacrimal Gland",
"Head & Neck: Right Lacrimal Gland",
"Head & Neck: Left Submandibular Gland",
"Head & Neck: Right Submandibular Gland",
"Head & Neck: Left Inner Ear",
"Head & Neck: Right Inner Ear",
"Head & Neck: Left Temporomandibular Joint",
"Head & Neck: Right Temporomandibular Joint",
"Head & Neck: Left Lens",
"Head & Neck: Right Lens",
"Head & Neck: Left Temporal Lobe",
"Head & Neck: Right Temporal Lobe",
"Head & Neck: Left Middle Ear",
"Head & Neck: Right Middle Ear",
"Head & Neck: Optic Chiasm",
"Head & Neck: Left Optic Nerve",
"Head & Neck: Right Optic Nerve",
"Head & Neck: Left Parotid",
"Head & Neck: Right Parotid",
"Thorax: Pharynx",
"Thorax: Pituitary",
"Thorax: Proximal Bronchial Tree",
"Thorax: Esophagus",
"Thorax: Heart",
"Thorax: Left Lung",
"Thorax: Right Lung",
"Thorax: Spinal Canal",
"Thorax: Spinal Cord",
"Thorax: Trachea",
"Abdomen: Aorta",
"Abdomen: Lumbar Spine",
"Abdomen: Left Adrenal Gland",
"Abdomen: Thoracic Spine",
"Abdomen: Right Adrenal Gland",
"Abdomen: Esophagus",
"Abdomen: Gallbladder",
"Abdomen: Left Kidney",
"Abdomen: Right Kidney",
"Abdomen: Pancreas",
"Abdomen: Portal Vein",
"Abdomen: Spleen",
"Abdomen: Splenic Vein",
"Abdomen: Stomach",
"Abdomen: Inferior Vena Cava",
"Male Pelvis: Bladder",
"Male Pelvis: Bone Marrow",
"Male Pelvis: Left Femoral Head",
"Male Pelvis: Bowel Bag",
"Male Pelvis: Right Femoral Head",
"Male Pelvis: Sigmoid Colon",
"Male Pelvis: Pencile Bulb",
"Female Pelvis: Bladder",
"Female Pelvis: Bone Marrow",
"Female Pelvis: Bowel Bag",
"Female Pelvis: Sigmoid Colon",
"Female Pelvis: Small Bowel",
"Female Pelvis: Cauda Equina",
"Female Pelvis: Duodenum",
"Female Pelvis: Left Femoral Head",
"Female Pelvis: Right Femoral Head",
"Female Pelvis: Pelvic Lymph Node Group",
"Female Pelvis: Uterus",
"Female Pelvis: Rectum"
    ],
    lastRevised: "2025-05-04",
    source: "automatically retrieved and revised",
    lastVerified: "2025-05-12",
    clinicalEvidence: "Publication in Medical Physics Journal 2023, ESTRO 2022 abstract"
  }
];
