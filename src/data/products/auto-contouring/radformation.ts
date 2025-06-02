
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
    features: ["Cloud-based processing", "Multi-organ contouring", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/radformation.svg",
    website: "https://www.radformation.com/autocontour/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Cloud-based processing", "Fast turnaround", "Clinical workflow integration"],
    supportedStructures: [
      // Head & Neck - CT structures aligned with Limbus format
      "Head & Neck-CT: Brain",
      "Head & Neck-CT: Brainstem",
      "Head & Neck-CT: Spinal Cord",
      "Head & Neck-CT: OpticNrv_L",
      "Head & Neck-CT: OpticNrv_R",
      "Head & Neck-CT: OpticChiasm",
      "Head & Neck-CT: Eye_L",
      "Head & Neck-CT: Eye_R",
      "Head & Neck-CT: Lens_L",
      "Head & Neck-CT: Lens_R",
      "Head & Neck-CT: Parotid_L",
      "Head & Neck-CT: Parotid_R",
      "Head & Neck-CT: Glnd_Submand_L",
      "Head & Neck-CT: Glnd_Submand_R",
      "Head & Neck-CT: Bone_Mandible",
      "Head & Neck-CT: Cavity_Oral",
      "Head & Neck-CT: Larynx",
      "Head & Neck-CT: Glnd_Thyroid",
      "Head & Neck-CT: Cochlea_L",
      "Head & Neck-CT: Cochlea_R",
      
      // Thorax - CT structures aligned with Limbus format
      "Thorax-CT: Heart",
      "Thorax-CT: Lung_L",
      "Thorax-CT: Lung_R", 
      "Thorax-CT: Esophagus",
      "Thorax-CT: SpinalCord",
      "Thorax-CT: BrachialPlex_L",
      "Thorax-CT: BrachialPlex_R",
      "Thorax-CT: GreatVes",
      "Thorax-CT: Trachea",
      "Thorax-CT: A_Aorta",
      "Thorax-CT: A_Pulmonary",
      
      // Abdomen - CT structures aligned with Limbus format
      "Thorax-CT: Liver",
      "Thorax-CT: Kidney_L",
      "Thorax-CT: Kidney_R",
      "Thorax-CT: Spleen",
      "Thorax-CT: Stomach",
      "Thorax-CT: Pancreas",
      "Thorax-CT: Duodenum",
      "Thorax-CT: Bowel",
      "Thorax-CT: SpinalCord",
      
      // Pelvis - CT structures aligned with Limbus format
      "Pelvis-CT: Bladder",
      "Pelvis-CT: Rectum",
      "Pelvis-CT: Femur_Head_L",
      "Pelvis-CT: Femur_Head_R",
      "Pelvis-CT: Bowel_Bag",
      "Pelvis-CT: Prostate",
      "Pelvis-CT: SeminalVes",
      "Pelvis-CT: PenileBulb",
      "Pelvis-CT: Uterus+Cervix",
      "Pelvis-CT: Vagina"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
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
      countriesPresent: 30,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
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
