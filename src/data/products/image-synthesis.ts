
import { ProductDetails } from "@/types/productDetails";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  {
    id: "synth-image",
    name: "SynthImage AI",
    company: "DeepMedical",
    description: "Advanced medical image synthesis platform for radiotherapy planning.",
    features: ["CT to MRI synthesis", "Artifact reduction", "Resolution enhancement"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    anatomicalLocation: ["Brain", "Pelvis"],
    modality: "CT/MRI",
    subspeciality: "Medical Imaging",
    diseaseTargeted: ["Brain Tumors", "Prostate Cancer"],
    keyFeatures: ["MRI synthesis from CT", "Super-resolution", "Metal artifact reduction"],
    technicalSpecifications: {
      population: "All patients",
      input: ["CT images", "MRI images (when available)"],
      inputFormat: ["DICOM"],
      output: ["Synthetic MRI", "Enhanced images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS integration", "TPS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "2-3 minutes per volume"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in generating synthetic images to aid in radiotherapy planning where actual images may be unavailable or of poor quality."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "OEM partnerships"],
      countriesPresent: 18,
      payingCustomers: "Over 40",
      researchUsers: "Over 25 institutions"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of cases"]
    },
    version: "3.0",
    releaseDate: "2024-02-15",
    lastUpdated: "2024-04-22"
  },
  {
    id: "philips-mrcat",
    name: "MRCAT",
    company: "Philips Healthcare",
    description: "MR-only simulation solution that generates CT-like density information from MR images for radiation therapy planning.",
    features: ["MR-only workflow", "Synthetic CT generation", "Radiation therapy planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.philips.com/healthcare/education-resources/publications/fieldstrength/mr-only-simulation-radiation-oncology",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Synthetic CT from MR", "Elimination of CT scans", "Reduced registration errors"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic after MR acquisition",
      processingTime: "Minutes per scan"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For generating synthetic CT images from MR for use in radiation therapy planning."
    },
    market: {
      onMarketSince: "2016",
      distributionChannels: ["Direct sales"],
      countriesPresent: 40,
      payingCustomers: "Major medical centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size"]
    },
    version: "3.5",
    releaseDate: "2023-05-15",
    lastUpdated: "2024-02-10"
  },
  {
    id: "siemens-syngo-ct",
    name: "syngo.via RT Image Suite",
    company: "Siemens Healthineers",
    description: "Advanced imaging solution for radiation therapy planning including synthetic CT generation from MR data.",
    features: ["Synthetic CT generation", "Multimodality image registration", "Treatment planning"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.siemens-healthineers.com/en-us/magnetic-resonance-imaging/options-and-upgrades/clinical-applications/syngo-mr-rt-planning",
    anatomicalLocation: ["Brain", "Pelvis", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: ["MR-based synthetic CT", "Integrated workflow", "Automated processing"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "syngo.via platform integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within syngo.via workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For creating synthetic CT datasets from MR images to be used in radiation therapy planning."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales"],
      countriesPresent: 35,
      payingCustomers: "Major healthcare institutions",
      researchUsers: "Research centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Module selection", "Institution size"]
    },
    version: "VB60",
    releaseDate: "2023-09-20",
    lastUpdated: "2024-03-15"
  },
  {
    id: "spectronic-mriplus",
    name: "MRIplanner",
    company: "Spectronic Medical",
    description: "AI-based software solution that converts standard MR images to synthetic CT for MR-only radiotherapy planning.",
    features: ["MR-only workflow", "Machine-learning based", "Fast processing"],
    category: "Image Synthesis",
    certification: "CE",
    logoUrl: "/placeholder.svg",
    website: "https://spectronicmedical.com/",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Deep learning algorithms", "Clinical workflow integration", "High anatomical accuracy"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["Standard T1/T2 MRI"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis: "Automatic or manual",
      processingTime: "Minutes per patient"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "Under review",
      intendedUseStatement: "For generating synthetic CT from MRI for radiation therapy planning."
    },
    market: {
      onMarketSince: "2017",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 15,
      payingCustomers: "Multiple clinics in Europe",
      researchUsers: "Research institutions internationally"
    },
    pricing: {
      model: ["Subscription", "Pay-per-use"],
      basedOn: ["Annual license", "Number of patients"]
    },
    version: "3.2",
    releaseDate: "2023-07-10",
    lastUpdated: "2024-01-25"
  },
  {
    id: "mr-box-synthetic",
    name: "MR-Box",
    company: "GE Healthcare",
    description: "Advanced MR simulation solution that enables synthetic CT generation from MR images for radiation therapy planning.",
    features: ["MR-only simulation", "Synthetic CT generation", "Clinical workflow integration"],
    category: "Image Synthesis",
    certification: "CE & FDA",
    logoUrl: "/placeholder.svg",
    website: "https://www.gehealthcare.com/products/magnetic-resonance-imaging/mr-applications/mr-radiation-oncology",
    anatomicalLocation: ["Pelvis", "Brain", "Head & Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Prostate Cancer", "Brain Tumors", "Head and Neck Cancer"],
    keyFeatures: ["Synthetic CT generation", "MR-based planning", "Multi-contrast imaging"],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI images"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["TPS integration", "PACS integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Automatic within workflow",
      processingTime: "Minutes per dataset"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For generating synthetic CT datasets from MR images for radiation therapy planning."
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales"],
      countriesPresent: 30,
      payingCustomers: "Major hospitals and cancer centers",
      researchUsers: "Academic medical centers globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size", "Service level"]
    },
    version: "2.0",
    releaseDate: "2023-04-25",
    lastUpdated: "2024-02-28"
  }
];
