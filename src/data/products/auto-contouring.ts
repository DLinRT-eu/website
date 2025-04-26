
import { ProductDetails } from "@/types/productDetails";

export const AUTO_CONTOURING_PRODUCTS: ProductDetails[] = [
  {
    id: "contour-ai-pro",
    name: "ContourAI Pro",
    company: "RadTech Solutions",
    description: "Advanced AI-powered auto-contouring solution for precise radiotherapy planning.",
    features: ["Multi-organ contouring", "Real-time adaptation", "Quality assurance"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Chest", "Abdomen"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Lung Cancer", "Breast Cancer", "Liver Cancer"],
    keyFeatures: ["Deep learning segmentation", "Multi-atlas contouring", "Structure propagation"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans", "Previous contours"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Structure sets", "Contour statistics"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic on image import",
      processingTime: "Under 2 minutes for standard case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use as an aid in contouring anatomical structures in radiotherapy planning."
    },
    market: {
      onMarketSince: "2021",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 25,
      payingCustomers: "Over 100",
      researchUsers: "Over 30 institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of cases"]
    },
    version: "3.2",
    releaseDate: "2024-01-15",
    lastUpdated: "2024-04-15"
  },
  {
    id: "atlas-contour",
    name: "Atlas Contour",
    company: "MedAI Innovations",
    description: "Multi-atlas based auto-contouring solution with deep learning enhancement for accurate organ delineation.",
    features: ["Atlas-based segmentation", "Deep learning enhancement", "Batch processing"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Head & Neck", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Prostate Cancer", "Cervical Cancer"],
    keyFeatures: ["Multi-atlas library", "Adaptive learning", "Quality metrics"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans", "RT structure sets"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Contours", "Quality reports"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["PACS integration", "ARIA integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Manual or scheduled batch",
      processingTime: "3-5 minutes per case"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "Intended for automated organ-at-risk contouring in radiotherapy planning."
    },
    market: {
      onMarketSince: "2023",
      distributionChannels: ["Direct sales"],
      countriesPresent: 15,
      payingCustomers: "Over 50",
      researchUsers: "20 institutions"
    },
    pricing: {
      model: ["Annual license", "Pay-per-use"],
      basedOn: ["Number of cases", "Department size"]
    },
    version: "2.1",
    releaseDate: "2024-02-01",
    lastUpdated: "2024-04-20"
  },
  {
    id: "limbus-contour",
    name: "Limbus Contour",
    company: "Limbus AI",
    description: "AI-powered auto-contouring software for fast and accurate target volume delineation in radiation therapy planning.",
    features: ["Automated OAR contouring", "Fast processing", "Deep learning algorithms"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.limbus.ai/limbus-contour",
    anatomicalLocation: ["Head & Neck", "Thorax", "Pelvis", "Brain"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Automated contouring", "Cloud-based", "DICOM compatibility"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
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
    lastUpdated: "2024-03-10"
  },
  {
    id: "mvision-autosegment",
    name: "MVision AutoSegment",
    company: "MVision AI",
    description: "Cloud-based auto-segmentation tool for radiation therapy planning that utilizes deep learning algorithms.",
    features: ["Cloud-based segmentation", "AI algorithms", "Multiple cancer sites"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    website: "https://www.mvision.ai/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Lung Cancer", "Prostate Cancer", "Breast Cancer"],
    keyFeatures: ["Deep learning segmentation", "Cloud-based platform", "Multi-vendor integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based"],
      triggerForAnalysis: "Manual or automated upload",
      processingTime: "5-10 minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For automatic segmentation of organs at risk and target volumes in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "Over 60 clinics",
      researchUsers: "Multiple research institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "4.0",
    releaseDate: "2023-09-10",
    lastUpdated: "2024-02-28"
  },
  {
    id: "mirada-dln",
    name: "DLCExpert",
    company: "Mirada Medical",
    description: "Deep learning-based auto-contouring software for radiation oncology providing consistent and rapid contouring of normal tissues.",
    features: ["Multi-structure contouring", "Consistent results", "Workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://mirada-medical.com/solutions/radiation-oncology/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Batch processing", "Clinical workflow integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Contour reports"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration", "Workflow manager"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
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
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "OEM partnerships"],
      countriesPresent: 30,
      payingCustomers: "Multiple clinics worldwide",
      researchUsers: "Research centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Institution size", "Volume"]
    },
    version: "2.2",
    releaseDate: "2023-05-20",
    lastUpdated: "2024-01-15"
  },
  {
    id: "raysearch-raystation",
    name: "RayStation",
    company: "RaySearch Laboratories",
    description: "Advanced treatment planning system with machine learning-based auto-segmentation for rapid and consistent contouring.",
    features: ["Deep learning segmentation", "Integrated planning", "Atlas-based backup"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.raysearchlabs.com/raystation/",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT, MR, PET",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Machine learning algorithms", "Multi-atlas fallback", "TPS integration"],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
      input: ["CT scans", "MRI", "PET"],
      inputFormat: ["DICOM"],
      output: ["Structure sets", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Seconds to minutes per structure"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Over 800 clinics worldwide",
      researchUsers: "Multiple academic institutions"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "12.0",
    releaseDate: "2023-12-01",
    lastUpdated: "2024-03-15"
  },
  {
    id: "therapixel-autocontour",
    name: "TherapAnalytics AutoContour",
    company: "Therapanacea",
    description: "AI-powered auto-contouring solution for radiation oncology that delivers accurate, consistent and fast delineation of organs at risk.",
    features: ["Precise contouring", "Fast processing", "Customizable workflows"],
    category: "Auto-Contouring",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    website: "https://www.therapanacea.eu/",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "Quality assurance tools"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
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
    lastUpdated: "2024-04-01"
  },
  {
    id: "philips-pinnacle",
    name: "Pinnacle Auto-Segmentation",
    company: "Philips Healthcare",
    description: "Integrated auto-segmentation solution within the Pinnacle treatment planning system using model-based and atlas-based algorithms.",
    features: ["Integrated in TPS", "Multiple segmentation methods", "Clinical workflow integration"],
    category: "Auto-Contouring",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.philips.com/healthcare/solutions/radiation-oncology/radiation-treatment-planning",
    anatomicalLocation: ["Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: "CT",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["Multi-atlas based algorithms", "Model-based segmentation", "Seamless TPS integration"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["CT scans"],
      inputFormat: ["DICOM"],
      output: ["Structure sets"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Native TPS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Variable based on structures"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in treatment planning for radiation therapy."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales"],
      countriesPresent: 70,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size", "Modules purchased"]
    },
    version: "9.2",
    releaseDate: "2022-10-10",
    lastUpdated: "2023-11-20"
  }
];
