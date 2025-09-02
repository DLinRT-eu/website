
import { ProductDetails } from "@/types/productDetails";

export const RADFORMATION_PRODUCTS: ProductDetails[] = [
  {
    id: "radformation-autocontour",
    name: "AutoContour",
    company: "RadFormation",
    companyUrl: "https://www.radformation.com/",
    productUrl: "https://www.radformation.com/autocontour/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/radformation.ts",
    description: "Cloud-based auto-contouring solution providing fast and accurate organ at risk delineation for radiation therapy planning.",
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://www.radformation.com/autocontour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis", "Chest"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Cloud-based processing", "Fast turnaround", "Clinical workflow integration"],
    supportedStructures: [
      // Head & Neck
      "Head & Neck: A Carotid L",
      "Head & Neck: A Carotid R",
      "Head & Neck: A Brachiocephls",
      "Head & Neck: A Subclavian L",
      "Head & Neck: A Subclavian R",
      "Head & Neck: Bone Hyoid",
      "Head & Neck: Bone Teeth",
      "Head & Neck: Dental Artifact",
      "Head & Neck: Neck Lymph Nodes 24",
      "Head & Neck: Pharynx (Oropharynx)",
      "Head & Neck: V Brachiceph L",
      "Head & Neck: V Brachiceph R",
      "Head & Neck: V Jugular L",
      "Head & Neck: V Jugular R",

      // MR Models (Brain)
      "MR Models: Brain",
      "MR Models: Lens L",
      "MR Models: Lens R",
      "MR Models: SpinalCord Cerv",

      // Chest
      "Chest: Chest",
      "Chest: A Coronary R",
      "Chest: Atrium L",
      "Chest: Atrium R",
      "Chest: Axillary Lymph Nodes 16",
      "Chest: Breast Prone",
      "Chest: Clavicle L",
      "Chest: Clavicle R",
      "Chest: Heart Prone",
      "Chest: iNpEC ESTRO Lymph Nodes L",
      "Chest: iNpEC ESTRO Lymph Nodes R",
      "Chest: Myocardium",
      "Chest: Nipple Prone",
      "Chest: Rib 27",
      "Chest: Supraclavicular Lymph Nodes 6",
      "Chest: Ventricle L",
      "Chest: Ventricle R",

      // Abdomen
      "Abdomen: Abdomen",

      // Pelvis
      "Pelvis: Pelvis",
      "Pelvis: Foley Balloon",
      "Pelvis: HDR Bladder",
      "Pelvis: HDR Bowel",
      "Pelvis: HDR Rectum",
      "Pelvis: Iliac L",
      "Pelvis: Iliac R",
      "Pelvis: Iliac Int L",
      "Pelvis: Iliac Int R",
      "Pelvis: Pelvic F Lymph Nodes",
      "Pelvis: Presacral Lymph Nodes",
      "Pelvis: Musc Iliopsoas L",
      "Pelvis: Musc Iliopsoas R",
      "Pelvis: ProstateBed",
      "Pelvis: SacralPlex L",
      "Pelvis: SacralPlex R",

      // MR Models (Pelvis)
      "MR Models: A Pud Int L",
      "MR Models: A Pud Int R",
      "MR Models: Bladder",
      "MR Models: Bladder Trigone",
      "MR Models: Colon Sigmoid",
      "MR Models: External Pelvis",
      "MR Models: Femur L",
      "MR Models: Femur R",
      "MR Models: NVM L",
      "MR Models: NVM R",
      "MR Models: PenileBulb",
      "MR Models: Rectal Spacer",
      "MR Models: Rectum",
      "MR Models: Urethra"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual upload or automated",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For automatic segmentation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Cloud platform"],
      
      
      
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Per-contour pricing"]
    },
    version: "4.0",
    releaseDate: "2023-11-15",
    lastUpdated: "2024-03-20",
    lastRevised: "2025-05-04",
    source: "Automatically retrieved and revised"
  }
];
