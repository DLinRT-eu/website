
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_HEAD_NECK_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-head-and-neck",
    name: "MRCAT Head and Neck",
    company: "Philips",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/philips-mrcat-head-neck.ts",
    description: "AI-powered MR-only simulation solution with deep learning technology that generates synthetic CT images from MR scans for radiation therapy planning of head and neck cancers, enabling simplified workflows and improved soft tissue visualization.",
    features: [
      "MR-only planning",
      "Synthetic CT generation", 
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    category: "Image Synthesis",
    certification: "CE Mark, FDA Cleared",
    logoUrl: "/logos/philips.png",
    website: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    anatomicalLocation: ["Head", "Neck"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Head and Neck Cancer", "Nasopharyngeal Cancer", "Laryngeal Cancer"],
    keyFeatures: [
      "AI-powered MR-only simulation for head and neck",
      "Deep learning technology for image synthesis",
      "Simplified radiation therapy workflows",
      "Improved soft tissue visualization",
      "Reduced patient burden with single imaging session"
    ],
    technicalSpecifications: {
      population: "Adult patients",
      input: ["MRI scans"],
      inputFormat: ["DICOM"],
      output: ["Synthetic CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["Pinnacle TPS", "PACS systems"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Within treatment planning workflow",
      processingTime: "Minutes per volume"
    },
    regulatory: {
      ce: {
        status: "Approved",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) Cleared",
      intendedUseStatement: "For generating synthetic CT images from MR scans for radiation therapy planning of head and neck cancers."
    },
    market: {
      onMarketSince: "2022",
      distributionChannels: ["Direct sales", "Partnerships"],
      countriesPresent: 45,
      payingCustomers: "Cancer centers worldwide",
      researchUsers: "Academic institutions globally"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["Institution size", "Features included"]
    },
    version: "1.5",
    releaseDate: "2022-10-20",
    lastUpdated: "2024-01-25",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised",
    clinicalEvidence: "Clinical studies demonstrate comparable treatment planning accuracy to CT-based workflows for head and neck radiation therapy"
  }
];
