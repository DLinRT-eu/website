
import { Initiative } from "@/types/initiative";

export const MODEL_ZOO_INITIATIVES: Initiative[] = [
  {
    id: "mhub-ai",
    name: "MHub.ai",
    category: "Model Zoo",
    description: "MHub.ai is an advanced hub for radiotherapy and medical imaging, offering curated models, tools, and resources for researchers and clinicians. It provides standardized AI models to accelerate algorithm development and validation in healthcare.",
    website: "https://mhub.ai/",
    organization: "Medical Imaging Research Community",
    status: "Active",
    tags: ["Medical Imaging", "AI Models", "Radiation Oncology", "Machine Learning", "Healthcare"],
    features: [
      "Curated medical imaging models",
      "Standardized formats",
      "Annotation tools",
      "Validation frameworks",
      "Collaborative research platform"
    ],
    dataAccess: "Open for research and academic purposes with registration",
    logoUrl: "/logos/mhub-ai.png"
  },
  {
    id: "monai-model-zoo",
    name: "MONAI Model Zoo",
    category: "Model Zoo",
    description: "A collection of medical imaging AI models that have been created using the MONAI framework. These models are ready for use in research and clinical applications in radiotherapy and medical imaging.",
    website: "https://monai.io/model-zoo.html",
    organization: "Project MONAI",
    status: "Active",
    tags: ["Medical Imaging", "Deep Learning", "AI Models", "Open Source", "PyTorch"],
    features: [
      "Pre-trained models for medical imaging",
      "Segmentation models",
      "Classification models",
      "Integration with MONAI framework",
      "PyTorch-based implementations"
    ],
    dataAccess: "Freely available for research and development",
    participationInfo: "Open to all researchers and developers"
  }
];

