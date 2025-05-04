
import { ProductDetails } from "@/types/productDetails";

export const LIMBUS_PRODUCTS: ProductDetails[] = [
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    companyUrl: "https://limbus.ai/",
    productUrl: "https://limbus.ai/",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    features: ["Automated OAR contouring", "Fast processing", "Deep learning algorithms"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/Limbus-ai.png",
    website: "https://limbus.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Breast", "Pelvis"],
    modality: ["CT", "MRI", "CBCT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Cloud-based", "DICOM compatibility"],
    supportedStructures: [
      "Head & Neck-CT: Body, Bone_Hyoid, Bone_Mandible, BrachialPlex_L, BrachialPlex_R, BrachialPlexs, Brain, Brainstem, Cavity_Oral, Cerebellum, Clavicle_L, Clavicle_R, Cochlea_L, Cochlea_R, Cornea_L, Cornea_R, Esophagus, Eye_L, Eye_L, Eyes, Glnd_Lacrimal_L, Glnd_Lacrimal_R, Glnd_Submand_L, Glnd_Submand_R, Glnd_Thyroid, Hippocampus_L, Hippocampus_R, InternalAuditoryCanal_L, InternalAuditoryCanal_R, Larynx, Lens_L, Lens_R, Lips, Lobe_Temporal_L, Lobe_Temporal_R, Musc_Constrict, Musc_Sclmast_L, Musc_Sclmast_R, OpticChiasm, OpticNrv_L, OpticNrv_R, Optics, Parotid_L, Parotid_R, Pituitary, Retina_L, Retina_R, Skin, SpinalCanal, SpinalCord, LN_Neck_L, LN_Neck_R, LN_Neck_IA, LN_Neck_IA6, LN_Neck_IB_L, LN_Neck_IB_R, LN_Neck_II_L, LN_Neck_II_R, LN_Neck_III_L, LN_Neck_III_R, LN_Neck_IV_L, LN_Neck_IV_R, LN_Neck_V_L, LN_Neck_V_R, LN_Neck_VI, LN_Neck_VIIA_L, LN_Neck_VIIA_R, LN_Neck_VIIB_L, LN_Neck_VIIB_R, LN_Neck_VIIAB_L, LN_Neck_VIIAB_R, LN_Neck_234_L, LN_Neck_234_R, LN_Neck_2347AB_L, LN_Neck_2347AB_R",
      "Thorax-CT: A_Aorta, A_Aorta_Base, A_Aorta_I, A_Celiac, A_LAD, A_Mesenteric_S, A_Pulmonary, Atrium_L, Atrium_R, Body, Bowel_Bag, Bowel_Bag_Superior, Bowel, Bowel_Superior, BrachialPlex_R, BrachialPlexs, Breasts, Breast_L, Breast_R, Breast_Implant_L, Breast_Implant_R, Bronchus, Carina, Chestwall, Chestwall_L, Chestwall_R, CW2cm_L, CW2cm_R, Clavicle_L, Clavicle_R, Duodenum, Esophagus, Gallbladder, Glnd_Thyroid, GreatVes, Heart, Heart+A_Pulm, Humerus_L, Humerus_R, Kidney_L, Kidney_R, Kidneys, Liver, Lung_L, Lung_R, Lungs, Musc_PecMinor_L, Musc_PecMinor_R, Pancreas, Pericardium, Pericardium+A_Pulm, Ribs, Ribs_L, Ribs_R, Skin, SpinalCanal, SpinalCord, Spleen, Sternum, Stomach, Trachea, V_Venacava_I, V_Venacava_S, VBs, VB_C1, VB_C2, VB_C3, VB_C4, VB_C5, VB_C6, VB_C7, VB_L1, VB_L2, VB_L3, VB_L4, VB_L5, VB_T01, VB_T02, VB_T03, VB_T04, VB_T05, VB_T06, VB_T07, VB_T08, VB_T09, VB_T10, VB_T11, VB_T12, Ventricle_L, Ventricle_R, LN_Ax_L1_L, LN_Ax_L1_R, LN_Ax_L2_L, LN_Ax_L2_R, LN_Ax_L3_L, LN_Ax_L3_R, LN_Ax_Sclav_L, LN_Ax_Sclav_R, LN_IMN_L, LN_IMN_R, LN_IMN_L_Expand, LN_IMN_R_Expand, LN_Sclav_L, LN_Sclav_R, ESTRO_LN_Ax_IP_L, ESTRO_LN_Ax_IP_R, ESTRO_LN_Ax_L1_L, ESTRO_LN_Ax_L1_R, ESTRO_LN_Ax_L2_L, ESTRO_LN_Ax_L2_R, ESTRO_LN_Ax_L2+IP_Fill_L, ESTRO_LN_Ax_L2+IP_Fill_R, ESTRO_LN_Ax_L3_L, ESTRO_LN_Ax_L3_R, ESTRO_LN_IMN_L, ESTRO_LN_IMN_R, ESTRO_LN_IMN_L_Expand, ESTRO_LN_IMN_R_Expand, ESTRO_LN_Sclav_L, ESTRO_LN_Sclav_R",
      "Pelvis-CT: Body, Bladder, Bone_Ilium_L, Bone_Ilium_R, Bone_Ilium, Bone_Ischium_L, Bone_Ischium_R, Bone_Pelvic, BoneMarrow_Pelvic, Bowel, Bowel_Extend, Bowel_Full, Bowel_Upper, Bowel_Bag, Bowel_Bag_Extend, Bowel_Bag_Full, Bowel_Bag_Upper, Canal_Anal, CaudaEquina, Colon_Sigmoid, Femur_Head_L, Femur_Head_R, Femur_Heads, Mesorectum, PenileBulb, PubicSymphys, Rectum, Sacrum, Skin, Uterus+Cervix, Vagina, LN_Inguinal_L, LN_Inguinal_R, LN_Pelvics, PelvisVessels, Prostate, Prostate+SeminalVes, ProstateBed, SeminalVes",
      "Pelvis-CBCT: Bladder, Femur_Head_L, Femur_Head_R, Prostate, Rectum, SeminalVes, LN_Pelvics",
      "Pelvis-MRI T2: Bladder, Femur_Head_L, Femur_Head_R, PenileBulb, PubicSymphys, Prostate, Rectum, Sacrum, SeminalVes",
      "CNS-T1: Brainstem, Cornea_L, Cornea_R, Eye_L, Eye_R, Hippocampus_L, Hippocampus_R, Optics, Retina_L, Retina_R",
      "Gyne HDR-CT: Bladder, Bowel, Canal_Anal, Colon_Sigmoid, Rectum, Urethra, Cylinder",
      "Gyne HDR-MR: Bladder, Bowel, Canal_Anal, Colon_Sigmoid, Rectum, Urethra",
      ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT", "MRI","CBCT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "Cloud API"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automatic upload",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to assist in the delineation of organs at risk."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 20,
      payingCustomers: "Multiple clinical sites globally",
      researchUsers: "Research institutions worldwide"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of contours"]
    },
    version: "3.0",
    releaseDate: "2023-06-15",
    lastUpdated: "2024-03-10",
    lastRevised: "2025-05-04"
  }
];
