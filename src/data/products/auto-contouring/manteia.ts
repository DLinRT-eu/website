
import { ProductDetails } from "@/types/productDetails";

export const MANTEIA_PRODUCTS: ProductDetails[] = [
  {
    id: "manteia-accucontour",
    name: "AccuContour",
    company: "Manteia",
    companyUrl: "https://www.manteiatech.com/",
    productUrl: "https://www.manteiatech.com/accucontour",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/auto-contouring/manteia.ts",
    description: "AI solution for rapid and accurate auto-contouring in radiation therapy planning.",
    features: ["Deep learning algorithms", "Multiple anatomical sites", "Rapid processing"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/logos/manteia.png",
    website: "https://www.manteiatech.com/",
    anatomicalLocation: ["Brain","Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["AI-powered segmentation", "Fast processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Manual or automated",
      processingTime: "2-3 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "For assistance in the delineation of organs at risk in radiation therapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinical sites in North America/Europe",
      researchUsers: "Research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "2.1",
    releaseDate: "2024-03-15",
    lastUpdated: "2024-04-25",
    supportedStructures: [
      // Brain Structures - OARs
      "Brain: Brainstem",
      "Brain: Optic Chiasm",
      "Brain: Optic Nerve (L/R)",
      "Brain: Eye (L/R)",
      "Brain: Lens (L/R)",
      "Brain: Pituitary",
      "Brain: Cochlea (L/R)",
      
      // Head & Neck Structures - OARs
      "Head & Neck: Parotid (L/R)",
      "Head & Neck: Submandibular Gland (L/R)",
      "Head & Neck: Oral Cavity",
      "Head & Neck: Larynx",
      "Head & Neck: Pharyngeal Constrictor",
      "Head & Neck: Spinal Cord",
      "Head & Neck: Thyroid",
      "Head & Neck: Mandible",
      "Head & Neck: Cervical Vertebrae (C1-C7)",
      
      // Target structures - GTV
      "Head & Neck: GTV Primary",
      "Head & Neck: GTV Nodal",
      
      // Target structures - Elective
      "Head & Neck: CTV High Risk",
      "Head & Neck: CTV Low Risk",
      "Head & Neck: PTV",
      
      // Thorax Structures - OARs
      "Thorax: Heart",
      "Thorax: Lung (L/R)",
      "Thorax: Esophagus",
      "Thorax: Trachea",
      "Thorax: Brachial Plexus (L/R)",
      "Thorax: Aorta",
      
      // Abdomen Structures - OARs
      "Abdomen: Liver",
      "Abdomen: Kidney (L/R)",
      "Abdomen: Stomach",
      "Abdomen: Pancreas",
      "Abdomen: Spleen",
      "Abdomen: Duodenum",
      "Abdomen: Small Bowel",
      
      // Pelvis Structures - OARs
      "Pelvis: Bladder",
      "Pelvis: Rectum",
      "Pelvis: Femoral Head (L/R)",
      "Pelvis: Bowel Bag",
      "Pelvis: Prostate",
      "Pelvis: Seminal Vesicles",
      "Pelvis: Sacrum",
      "Pelvis: Iliac Crest (L/R)"
    ],
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised",
    // Adding new fields
    evidence: [
      "10.1016/j.ijrobp.2023.07.035",
      "10.1088/1361-6560/ac619a",
      "10.1016/j.radonc.2022.01.034"
    ],
    limitations: [
      "Limited performance on contrast-enhanced CT scans",
      "Reduced accuracy for post-surgical anatomy",
      "Lower performance for pediatric patients",
      "Requires manual verification and editing in complex anatomical regions"
    ]
  }
];
