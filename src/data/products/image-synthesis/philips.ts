
import { ProductDetails } from "@/types/productDetails";

export const PHILIPS_PRODUCTS: ProductDetails[] = [
  {
    id: "philips-mrcat-brain",
    name: "MRCAT Brain",
    company: "Philips",
    category: "Image Synthesis",
    description: "AI-powered MR-only simulation solution that generates synthetic CT images from MR scans for radiation therapy planning of brain tumors, avoiding the need for a separate CT scan and improving workflow efficiency.",
    logoUrl: "/logos/philips.png",
    features: [
      "MR-only planning",
      "Synthetic CT generation",
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    certification: "CE Mark, FDA Cleared",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    version: "1.0",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    website: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    regulatory: {
      ce: { status: "Approved", class: "IIa" },
      fda: "510(k) Cleared"
    },
    releaseDate: "2020-01-20",
    lastUpdated: "2024-01-25",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  },
  {
    id: "philips-mrcat-pelvis",
    name: "MRCAT Pelvis",
    company: "Philips",
    category: "Image Synthesis",
    description: "AI-based MR-only simulation platform that generates synthetic CT images from MR scans for radiation therapy planning of pelvic cancers, streamlining the radiation therapy planning process with deep learning technology.",
    logoUrl: "/logos/philips.png",
    features: [
      "MR-only planning",
      "Synthetic CT generation",
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    certification: "CE Mark, FDA Cleared",
    anatomicalLocation: ["Pelvis"],
    modality: ["MRI"],
    version: "2.0",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    website: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    regulatory: {
      ce: { status: "Approved", class: "IIa" },
      fda: "510(k) Cleared"
    },
    releaseDate: "2019-05-21",
    lastUpdated: "2024-01-25",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  },
  {
    id: "philips-mrcat-head-and-neck",
    name: "MRCAT Head and Neck",
    company: "Philips",
    category: "Image Synthesis",
    description: "AI-powered MR-only simulation solution with deep learning technology that generates synthetic CT images from MR scans for radiation therapy planning of head and neck cancers, enabling simplified workflows and improved soft tissue visualization.",
    logoUrl: "/logos/philips.png",
    features: [
      "MR-only planning",
      "Synthetic CT generation", 
      "Deep learning algorithms",
      "Automatic CT conversion",
      "Integrated workflow"
    ],
    certification: "CE Mark, FDA Cleared",
    anatomicalLocation: ["Head", "Neck"],
    modality: ["MRI"],
    version: "1.5",
    companyUrl: "https://www.philips.com/",
    productUrl: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    website: "https://www.philips.com/a-w/about/news/archive/standard/news/press/2020/20200929-philips-advances-oncology-solutions.html",
    regulatory: {
      ce: { status: "Approved", class: "IIa" },
      fda: "510(k) Cleared"
    },
    releaseDate: "2022-10-20",
    lastUpdated: "2024-01-25",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
