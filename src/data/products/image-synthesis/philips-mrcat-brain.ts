
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_MRCAT_BRAIN_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-brain",
    name: "MRCAT Brain",
    company: "Philips",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/image-synthesis/philips-mrcat-brain.ts",
    description: "AI-powered MR-only simulation solution that generates synthetic CT images from MR scans for radiation therapy planning of brain tumors, avoiding the need for a separate CT scan and improving workflow efficiency.",
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
    website: "https://www.philips.ie/healthcare/product/HCNMRF320/mrcat-brain-mr-rt-clinical-application",
    anatomicalLocation: ["Brain"],
    modality: "MRI",
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Brain Cancer", "Brain Tumors"],
    keyFeatures: [
      "AI-powered MR-only simulation",
      "Synthetic CT generation from MR scans",
      "Deep learning algorithms for image conversion",
      "Eliminates need for separate CT scan",
      "Seamless workflow integration"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric patients",
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
      intendedUseStatement: "For generating synthetic CT images from MR scans for radiation therapy planning of brain tumors."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Partnerships"]
    },
    version: "1.0",
    releaseDate: "2020-01-20",
    lastUpdated: "2024-08-08",
    lastRevised: "2025-09-01",
    source: "Automatically retrieved and revised",
    clinicalEvidence: "Validated in clinical studies showing equivalent treatment planning accuracy compared to traditional CT-based planning"
  }
];
