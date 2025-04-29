
import { Initiative } from "@/types/initiative";

export const RESEARCH_PROJECT_INITIATIVES: Initiative[] = [
  {
    id: "panther",
    name: "PANTHER Project",
    category: "Research Project",
    description: "Precision-medicine Approach for Novel Tailored HEad and neck Radiotherapy, focusing on developing AI methods to personalize radiotherapy treatments.",
    website: "https://pantherfp7.eu/",
    organization: "European Commission (Horizon 2020)",
    startDate: "2019-01-01",
    endDate: "2023-12-31",
    status: "Completed",
    tags: ["Head and Neck Cancer", "Personalized Medicine", "Treatment Optimization", "AI in Radiotherapy"],
    features: [
      "Multi-institutional collaboration", 
      "Large patient cohorts", 
      "AI-based treatment planning", 
      "Outcome prediction models"
    ],
    participationInfo: "Consortium of European research institutions",
    relatedPublications: [
      {
        title: "PANTHER: Enhancing Precision Medicine in Radiotherapy",
        url: "https://pantherfp7.eu/publications",
        authors: "Various PANTHER Consortium Members",
        year: "2022"
      }
    ]
  },
  {
    id: "medirad",
    name: "MEDIRAD Project",
    category: "Research Project",
    description: "Implications of Medical Low Dose Radiation Exposure, focusing on enhancing the scientific bases and clinical practice of radiation protection in medicine.",
    website: "https://www.medirad-project.eu/",
    organization: "European Commission (EURATOM)",
    startDate: "2017-06-01",
    endDate: "2022-05-31",
    status: "Completed",
    tags: ["Radiation Protection", "Dosimetry", "Epidemiology", "Clinical Studies", "Low-dose Effects"],
    features: [
      "Multi-disciplinary approach", 
      "Development of new methodologies", 
      "Clinical studies",
      "Dose optimization strategies"
    ],
    participationInfo: "European consortium of 33 partners",
    relatedPublications: [
      {
        title: "MEDIRAD: a European project to enhance the scientific basis and practice of radiation protection in medicine",
        url: "https://doi.org/10.1259/bjr.20200165",
        authors: "E. Cardis et al.",
        year: "2020"
      }
    ]
  },
  {
    id: "artforce",
    name: "ARTFORCE",
    category: "Research Project",
    description: "Adaptive and innovative Radiation Treatment FOR improving Cancer treatment outcomE, focusing on individualized radiotherapy for cancer patients.",
    website: "https://www.artforce.org/",
    organization: "European Commission (FP7)",
    startDate: "2012-01-01",
    endDate: "2017-12-31",
    status: "Completed",
    tags: ["Personalized Radiotherapy", "Adaptive Radiotherapy", "Head and Neck Cancer", "Lung Cancer", "FDG-PET"],
    features: [
      "Clinical trials", 
      "Adaptive radiotherapy methods", 
      "PET-guided dose painting", 
      "Response prediction models"
    ],
    participationInfo: "European consortium of cancer centers",
    relatedPublications: [
      {
        title: "FDG-PET-based dose painting in non-small cell lung cancer: A randomized phase II trial",
        url: "https://doi.org/10.1016/j.radonc.2019.01.001",
        authors: "D. De Ruysscher et al.",
        year: "2019"
      }
    ]
  },
  {
    id: "requite",
    name: "REQUITE Project",
    category: "Research Project",
    description: "Validating predictive models and biomarkers of radiotherapy toxicity to reduce side effects and improve quality of life in cancer survivors.",
    website: "https://requite.eu/",
    organization: "European Commission (FP7)",
    startDate: "2013-10-01",
    endDate: "2018-09-30",
    status: "Completed",
    tags: ["Radiotherapy Toxicity", "Biomarkers", "Prediction Models", "Breast Cancer", "Prostate Cancer", "Lung Cancer"],
    features: [
      "Standardized data collection", 
      "Genetic analyses", 
      "Prediction models", 
      "Multi-center cohort"
    ],
    dataAccess: "Available for research purposes upon request",
    participationInfo: "Completed project with data available for collaboration",
    relatedPublications: [
      {
        title: "The REQUITE Project: Validating Predictive Models and Biomarkers of Radiotherapy Toxicity to Reduce Side-effects and Improve Quality of Life in Cancer Survivors",
        url: "https://doi.org/10.1016/j.ctrv.2017.09.001",
        authors: "C. Talbot et al.",
        year: "2017"
      }
    ]
  },
  {
    id: "adapt-radiation",
    name: "ADAPT Radiation Project",
    category: "Research Project",
    description: "Advanced personalized Decision-support for Adaptive Process optimization in radiation Therapy, developing AI methods for adaptive radiotherapy.",
    website: "https://adapt-radiation.eu/",
    organization: "European Commission (Horizon Europe)",
    startDate: "2022-01-01",
    status: "Active",
    tags: ["Adaptive Radiotherapy", "AI in Healthcare", "Decision Support", "Process Optimization"],
    features: [
      "AI-driven decision support", 
      "Adaptive workflow optimization", 
      "Multi-institutional data integration", 
      "Clinical validation"
    ],
    participationInfo: "European consortium with academic and industry partners"
  }
];
