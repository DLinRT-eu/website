
import { ProductDetails } from "@/types/productDetails";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "pymedix-registration",
    name: "PyMedix Registration",
    company: "PyMedix",
    description: "Advanced medical image registration solution that provides automated alignment of multi-modality images with high precision and efficiency for radiotherapy treatment planning.",
    features: ["Multi-modality registration", "Deformable registration", "GPU acceleration", "Fully automated workflow"],
    category: "Registration",
    certification: "CE Mark",
    logoUrl: "/logos/placeholder.svg",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis", "Whole Body"],
    modality: ["CT", "MRI", "PET", "CBCT"],
    releaseDate: "2023-06-01",
    version: "2.0",
    companyUrl: "https://pymedix.com/",
    productUrl: "https://pymedix.com/products/registration",
    subspeciality: "Radiation Oncology",
    keyFeatures: [
      "Fully automated rigid and deformable registration",
      "Advanced multi-modality support",
      "Deep learning-based registration algorithms",
      "Seamless DICOM integration",
      "Real-time visual verification tools"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["CT", "MRI", "PET-CT", "CBCT"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Transformation matrices", "Deformation vector fields"],
      outputFormat: ["DICOM", "DICOM-RT"]
    },
    technology: {
      integration: ["Treatment planning systems", "PACS", "Oncology information systems"],
      deployment: ["On-premises", "Cloud-based", "Hybrid"],
      triggerForAnalysis: "Automated with manual override capability",
      processingTime: "Under 30 seconds for rigid, 1-2 minutes for deformable registration"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to register and align multi-modality medical images to support treatment planning and adaptive therapy workflows."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Value-added resellers", "OEM partnerships"],
      countriesPresent: 25,
      payingCustomers: "100+",
      researchUsers: "30+"
    },
    pricing: {
      model: ["Perpetual license", "Subscription", "Pay-per-use"],
      basedOn: ["Per installation", "Per clinical site", "Annual volume"]
    },
    clinicalEvidence: "Validated in multi-center clinical studies demonstrating 99% accuracy with sub-millimeter precision and 40% reduction in registration time compared to manual methods",
    lastVerified: "2024-05-01",
    lastRevised: "2024-05-01",
    source: "https://pymedix.com"
  }
];
