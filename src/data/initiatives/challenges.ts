
import { Initiative } from "@/types/initiative";

export const CHALLENGE_INITIATIVES: Initiative[] = [
  {
    id: "hecktor",
    name: "HECKTOR Challenge",
    category: "Grand Challenge",
    description: "HEad and neCK TumOR segmentation challenge focuses on the automatic segmentation of head and neck tumors in PET/CT images.",
    website: "https://www.aicrowd.com/challenges/hecktor",
    organization: "University Hospital of Zürich",
    startDate: "2020-01-01",
    status: "Active",
    tags: ["Head and Neck Cancer", "PET/CT", "Segmentation", "Multi-Modal"],
    features: ["3D PET/CT datasets", "Ground truth segmentations", "Standardized evaluation metrics"],
    dataAccess: "Available after registration",
    resultsUrl: "https://www.aicrowd.com/challenges/hecktor/leaderboards",
    participationInfo: "Open to academic and commercial participants worldwide",
    relatedPublications: [
      {
        title: "Overview of the HECKTOR Challenge at MICCAI 2020",
        url: "https://doi.org/10.1007/978-3-030-67194-5_45",
        authors: "V. Andrearczyk et al.",
        year: "2020"
      }
    ]
  },
  {
    id: "synthrad-2023",
    name: "SynthRAD 2023",
    category: "Grand Challenge",
    description: "Challenge on MR-to-CT synthesis for radiotherapy planning, focused on generating synthetic CT images from MRI for radiation therapy planning.",
    website: "https://synthrad2023.grand-challenge.org/",
    organization: "MICCAI Society",
    startDate: "2023-01-15",
    endDate: "2023-09-30",
    status: "Completed",
    tags: ["MRI", "CT", "Synthetic CT", "Image Synthesis", "Radiation Therapy"],
    features: ["Multi-institutional dataset", "Various anatomical sites", "Standardized evaluation framework"],
    dataAccess: "Available after registration",
    resultsUrl: "https://synthrad2023.grand-challenge.org/evaluation/results/",
    participationInfo: "Open to academic and commercial participants worldwide"
  },
  {
    id: "synthrad-2025",
    name: "SynthRAD 2025",
    category: "Grand Challenge",
    description: "Upcoming challenge on advanced MR-to-CT synthesis for radiotherapy planning, building on the success of SynthRAD 2023.",
    website: "https://synthrad.grand-challenge.org/",
    organization: "MICCAI Society",
    startDate: "2025-01-01",
    status: "Upcoming",
    tags: ["MRI", "CT", "Synthetic CT", "Image Synthesis", "Radiation Therapy"],
    features: ["Enhanced dataset", "Multiple anatomical regions", "Advanced evaluation metrics"],
    participationInfo: "Registration will open in late 2024"
  },
  {
    id: "autoplanheadneck",
    name: "AutoPlan Head & Neck",
    category: "Grand Challenge",
    description: "Automatic treatment planning challenge for head and neck cancer, focusing on generating high-quality treatment plans automatically.",
    website: "https://www.auto-planning-challenge.org/",
    organization: "University Medical Center Groningen",
    startDate: "2022-03-01",
    endDate: "2022-12-15",
    status: "Completed",
    tags: ["Head and Neck Cancer", "Treatment Planning", "Optimization", "Dose Prediction"],
    features: ["Clinical CT datasets", "Structure sets", "Evaluation based on clinical metrics"],
    dataAccess: "Available for research purposes",
    resultsUrl: "https://www.auto-planning-challenge.org/results",
    participationInfo: "Was open to academic and commercial participants"
  },
  {
    id: "structseg",
    name: "StructSeg Challenge",
    category: "Grand Challenge",
    description: "Automatic structure segmentation challenge focusing on organs at risk and target delineation in radiotherapy.",
    website: "https://structseg2019.grand-challenge.org/",
    organization: "Chinese Academy of Medical Sciences",
    startDate: "2019-06-01",
    endDate: "2019-10-30",
    status: "Completed",
    tags: ["Segmentation", "Organs at Risk", "Target Volumes", "Thoracic CT", "Head and Neck CT"],
    features: ["Thoracic CT datasets", "Head and neck CT datasets", "Expert annotations"],
    dataAccess: "Available upon request",
    resultsUrl: "https://structseg2019.grand-challenge.org/evaluation/results/",
    participationInfo: "Was open to all participants"
  },
  {
    id: "aapm-thoracic",
    name: "AAPM Thoracic Auto-Segmentation Challenge",
    category: "Grand Challenge",
    description: "Challenge for automatic segmentation of organs at risk in thoracic CT for radiotherapy planning.",
    website: "https://www.aapm.org/GrandChallenge/",
    organization: "American Association of Physicists in Medicine",
    startDate: "2017-01-01",
    endDate: "2017-07-30",
    status: "Completed",
    tags: ["Thoracic CT", "Auto-Segmentation", "Organs at Risk", "Radiation Therapy"],
    features: ["Thoracic CT scans", "Expert contours", "Standardized evaluation metrics"],
    dataAccess: "Available for research purposes",
    resultsUrl: "https://www.aapm.org/GrandChallenge/results/",
    participationInfo: "Was open to all participants"
  }
];
