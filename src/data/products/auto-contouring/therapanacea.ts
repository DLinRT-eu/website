
import { ProductDetails } from "@/types/productDetails";

// Structure data retrieved on 2024-04-29
export const THERAPANACEA_PRODUCTS: ProductDetails[] = [
  {
    id: "therapanacea-annotate",
    name: "Annotate",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/annotate/",
    description: "AI-powered auto-contouring solution for radiation oncology that delivers accurate, consistent and fast delineation of organs at risk.",
    features: ["Precise contouring", "Fast processing", "Customizable workflows"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/annotate/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "Quality assurance tools"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Quality metrics"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 3 minutes per case"
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
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 12,
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.5",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-04-01",
    supportedStructures: [
      // Head & Neck Model
      "Head & Neck: Brachial Plexus (L)",
      "Head & Neck: Brachial Plexus (R)",
      "Head & Neck: Brainstem",
      "Head & Neck: Cerebellum",
      "Head & Neck: Chiasma",
      "Head & Neck: Cochlea (L)",
      "Head & Neck: Cochlea (R)",
      "Head & Neck: Encephalon",
      "Head & Neck: Esophagus",
      "Head & Neck: Eye (L)",
      "Head & Neck: Eye (R)",
      "Head & Neck: Eye Lens (L)",
      "Head & Neck: Eye Lens (R)",
      "Head & Neck: Glottic Larynx",
      "Head & Neck: Hypophyse",
      "Head & Neck: Lacrimal gland (L)",
      "Head & Neck: Lacrimal gland (R)",
      "Head & Neck: Larynx",
      "Head & Neck: Lips",
      "Head & Neck: Mandible",
      "Head & Neck: Medullar canal",
      "Head & Neck: Mouth",
      "Head & Neck: Optical nerve (L)",
      "Head & Neck: Optical nerve (R)",
      "Head & Neck: Parotid (L)",
      "Head & Neck: Parotid (R)",
      "Head & Neck: Pharyngeal constrictor muscle",
      "Head & Neck: Sub mandible (L)",
      "Head & Neck: Sub mandible (R)",
      "Head & Neck: Supraglottic Larynx",
      "Head & Neck: Thyroid",
      "Head & Neck: Temporomandibular joints (L)",
      "Head & Neck: Temporomandibular joints (R)",
      "Head & Neck: Trachea",
      
      // Lymph Nodes
      "Lymph Nodes: Cervical IA",
      "Lymph Nodes: Cervical IB (L)",
      "Lymph Nodes: Cervical IB (R)",
      "Lymph Nodes: Cervical II (L)",
      "Lymph Nodes: Cervical II (R)",
      "Lymph Nodes: Cervical III (L)",
      "Lymph Nodes: Cervical III (R)",
      "Lymph Nodes: Cervical IVA (L)",
      "Lymph Nodes: Cervical IVA (R)",
      "Lymph Nodes: Cervical IVB (L)",
      "Lymph Nodes: Cervical IVB (R)",
      "Lymph Nodes: Cervical V (L)",
      "Lymph Nodes: Cervical V (R)",
      "Lymph Nodes: Cervical VIA",
      "Lymph Nodes: Cervical VIB",
      "Lymph Nodes: Cervical VIIA (L)",
      "Lymph Nodes: Cervical VIIA (R)",
      "Lymph Nodes: Cervical VIIB (L)",
      "Lymph Nodes: Cervical VIIB (R)",
      
      // Female Thorax / Breast Model
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Breast (L)",
      "Thorax: Breast (R)",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      
      // Male Thorax (Added basic structures)
      "Thorax: Heart",
      "Thorax: Lungs (L)",
      "Thorax: Lungs (R)",
      "Thorax: Esophagus",
      "Thorax: Spinal Cord",
      
      // Heart Sub-Structures (Added common heart substructures)
      "Heart: Left Ventricle",
      "Heart: Right Ventricle",
      "Heart: Left Atrium",
      "Heart: Right Atrium",
      
      // SBRT Lung (Added common structures for SBRT)
      "SBRT: Lung Tumor",
      "SBRT: Proximal Bronchial Tree",
      "SBRT: Great Vessels",
      
      // Pelvis Male (Common male pelvis structures)
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)",
      
      // Pelvis Female (Common female pelvis structures)
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Uterus",
      "Pelvis: Ovaries (L)",
      "Pelvis: Ovaries (R)",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)"
    ]
  },
  {
    id: "therapanacea-adaptbox",
    name: "AdaptBox",
    company: "Therapanacea",
    companyUrl: "https://www.therapanacea.eu/",
    productUrl: "https://www.therapanacea.eu/our-products/adaptbox/",
    description: "AI-powered software that provides one-click augmented CBCT images with organs-at-risk delineations for improved and more efficient adaptive radiotherapy workflow",
    features: [
      "CBCT auto-contouring",
      "Fast processing",
      "Adaptive radiotherapy support",
      "Male pelvis specialization",
      "CBCT image synthesis"
    ],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/logos/therapanacea.png",
    website: "https://www.therapanacea.eu/our-products/adaptbox/",
    anatomicalLocation: ["Pelvis"],
    modality: "CBCT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer"],
    keyFeatures: [
      "CBCT-based contouring",
      "Clinical workflow integration",
      "Rapid processing for adaptive RT",
      "CBCT image enhancement"
    ],
    technicalSpecifications: {
      population: "Adult male patients",
      input: ["CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Under 2 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Not available",
      intendedUseStatement: "For automatic segmentation of male pelvic structures in CBCT images for adaptive radiation therapy planning."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 8,
      payingCustomers: "Multiple centers in Europe",
      researchUsers: "Several research institutions"
    },
    pricing: {
      model: ["Subscription"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "1.0",
    releaseDate: "2023-09-01",
    lastUpdated: "2024-04-26",
    supportedStructures: [
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Femoral Head (L)",
      "Pelvis: Femoral Head (R)"
    ]
  }
];
