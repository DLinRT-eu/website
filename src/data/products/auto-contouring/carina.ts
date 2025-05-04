
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
      "Head & Neck: Mandible, Left Brachial Plexus, Right Brachial Plexus, Brain, Brainstem, Oval Cavity, Left Cochlea, Right Cochlea, Left Eye, Right Eye, Left Lacrimal Gland, Right Lacrimal Gland, Left Submandibular Gland, Right Submandibular Gland, Left Inner Ear, Right Inner Ear, Left Temporomandibular Joint, Right Temporomandibular Joint, Left Lens, Right Lens, Left Temporal Lobe, Right Temporal Lobe, Left Middle Ear, Right Middle Ear, Optic Chiasm, Left Optic Nerve, Right Optic Nerve, Left Parotid, Right Parotid",
      "Thorax: Pharynx, Pituitary, Proximal Bronchial Tree, Esophagus, Heart, Left Lung, Right Lung, Spinal Canal, Spinal Cord, Trachea",
      "Abdomen: Aorta, Lumbar Spine, Left Adrenal Gland, Thoracic Spine, Right Adrenal Gland, Esophagus, Gallbladder, Left Kidney, Right Kidney, Pancreas, Portal Vein, Spleen, Splenic Vein, Stomach, Inferior Vena Cava",
      "Male Pelvis: Bladder, Bone Marrow, Left Femoral Head, Bowel Bag, Right Femoral Head, Sigmoid Colon, Pencile Bulb",
      "Female Pelvis: Bladder, Bone Marrow, Bowel Bag, Sigmoid Colon, Small Bowel, Cauda Equina, Duodenum, Left Femoral Head, Right Femoral Head, Pelvic Lymph Node Group, Uterus, Rectum"
    ],
    lastRevised: "2025-05-04"
  }
];
