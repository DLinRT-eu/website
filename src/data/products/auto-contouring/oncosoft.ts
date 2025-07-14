import { ProductDetails } from "@/types/productDetails";

export const ONCOSOFT_PRODUCTS: ProductDetails[] = [
  {
    id: "oncosoft-oncostudio",
    name: "OncoStudio",
    company: "Oncosoft",
    companyUrl: "https://www.oncosoft.io/",
    productUrl: "https://www.oncosoft.io/products-eng",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/oncosoft.ts",
    description: "AI-powered auto-contouring solution proven in practice with over 4M contours in treatments for 80K patients, delivering fully automatic, fast, and consistent expert-level accuracy.",
    features: [
      "Fully automatic AI-driven contouring",
      "Fast processing (3 minutes average)",
      "Expert-level accuracy through peer review",
      "Multi-anatomical area support",
      "Consistent contour generation"
    ],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/oncosoft.png",
    website: "https://www.oncosoft.io/",
    anatomicalLocation: ["Brain", "Head & Neck", "Breast", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Fully automatic detection",
      "No additional user input required",
      "Local workstation processing",
      "Consistent expert-level contours",
      "Multi-anatomical coverage"
    ],
    supportedStructures: [
      // Brain CT - OARs
      {
        name: "Brain_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation on 80K+ patients"
      },
      {
        name: "Bone_Mandible",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Brainstem",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Cavity_Oral",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Cochlea_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Cochlea_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Eye_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Eye_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Glnd_Submand_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Glnd_Submand_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Hippocampus_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Hippocampus_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Joint_TM_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Joint_TM_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lens_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lens_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lobe_Temporal_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lobe_Temporal_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "OpticChiasm",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "OpticNrv_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "OpticNrv_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Parotid_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Parotid_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Pharynx",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Pituitary",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Skull",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "SpinalCord",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C1",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C2",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Brain",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Head & Neck CT - OARs
      {
        name: "Head_Neck_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Carotid_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Carotid_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "BrachialPlex_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "BrachialPlex_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Brachiocephalic_Trunk",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Clavicle_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Clavicle_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Esophagus",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Glnd_Thyroid",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Humerus_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Humerus_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Larynx",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_LUL",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_RUL",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Scapula_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Scapula_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Trachea",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Brachioceph_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Brachioceph_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C3",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C4",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C5",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C6",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_C7",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Head & Neck CTVs
      {
        name: "LN_Neck_IA",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IB_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IB_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_II_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_II_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_III_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_III_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IVA_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IVA_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IVB_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_IVB_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_VA_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_VA_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_VBC_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Neck_VBC_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Breast CT - OARs
      {
        name: "Breast_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Aorta",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Coronary_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_LAD",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Subclavian_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Subclavian_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Atrium_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Atrium_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Autochthon_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Autochthon_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bronchus_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bronchus_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Costal_Cartilages",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Heart",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_LLL",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_RLL",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Lung_RML",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib01_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib01_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib02_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib02_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib03_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib03_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib04_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib04_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib05_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib05_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib06_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib06_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib07_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib07_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib08_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib08_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib09_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib09_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib10_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib10_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib11_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib11_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib12_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rib12_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Sternum",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Pulmonary",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Venacava_S",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T01",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T02",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T03",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T04",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T05",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Ventricle_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Ventricle_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Breast CTVs
      {
        name: "Breast_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Breast_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L1_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L1_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L2_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L2_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L3_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Ax_L3_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_IMN_L",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_IMN_R",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Sclav_L_ESTRO",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Sclav_L_RTOG",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Sclav_R_ESTRO",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "LN_Sclav_R_RTOG",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Abdomen CT - OARs
      {
        name: "Abdomen_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bag_Bowel",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bowel_Large",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bowel_Small",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Colon",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Colon_Sigmoid",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Duodenum",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gallbladder",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Glnd_Adrenal_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Glnd_Adrenal_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Kidney_Cortex_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Kidney_Cortex_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Kidney_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Kidney_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Liver",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Pancreas",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Spleen",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Stomach",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Portal_And_Splenic",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Venacava_I",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T06",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T07",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T08",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T09",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T10",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T11",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_T12",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Male Pelvis CT - OARs
      {
        name: "Male_Pelvis_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Iliac_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "A_Iliac_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Anus",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Bladder",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "CaudaEquina",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Femur_Head_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Femur_Head_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Femur_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Femur_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Maximus_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Maximus_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Medius_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Medius_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Minimus_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Gluteus_Minimus_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Hip_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Hip_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Iliopsoas_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Iliopsoas_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Rectum",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "Sacrum",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Iliac_L",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "V_Iliac_R",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_L1",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_L2",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_L3",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_L4",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_L5",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },
      {
        name: "VB_S1",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Male Pelvis CTV
      {
        name: "Prostate",
        type: "GTV",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      },

      // Female Pelvis CT - OARs (same as Male Pelvis CT but for Female)
      {
        name: "Female_Pelvis_CT",
        type: "OAR",
        accuracy: "Expert-level",
        validationDataset: "Clinical validation"
      }
    ],
    guidelines: [
      {
        name: "AAPM TG-263",
        version: "2018",
        reference: "https://doi.org/10.1002/mp.12909",
        url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
        compliance: "full"
      },
      {
        name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
        version: "2021",
        reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
        url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
        compliance: "full"
      }
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Contours"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Local workstation", "API"],
      deployment: ["Local workstation", "Cloud-based"],
      triggerForAnalysis: "Automatic detection and processing",
      processingTime: "3 minutes average per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to automatically generate organ contours and clinical target volumes."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 20,
      payingCustomers: "4M+ contours for 80K+ patients",
      researchUsers: "Multiple clinical institutions globally"
    },
    pricing: {
      model: ["Subscription", "License-based"],
      basedOn: ["Annual subscription", "Per-case processing"]
    },
    version: "2024",
    releaseDate: "2024-01-01",
    lastUpdated: "2024-12-10",
    lastRevised: "2024-12-10",
    clinicalEvidence: "Proven in clinical practice with over 4M contours processed for 80K+ patients since 2022"
  }
];