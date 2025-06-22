
import { ProductDetails } from '@/types/productDetails';

export const treatmentPlanningExample: ProductDetails = {
  id: "example-planning",
  name: "Example AI Planning",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Treatment Planning",
  description: "An example AI treatment planning product for testing and documentation.",
  url: "https://example.com/products/planning",
  contactEmail: "info@example.com",
  contractPhone: "+1 555-123-4567",
  logoUrl: "/placeholder.svg",
  
  modality: ["LINAC", "VMAT", "IMRT"],
  anatomy: ["Head & Neck", "Prostate", "Breast", "Lung"],
  
  features: [
    "Automated plan generation",
    "Knowledge-based planning",
    "Multi-criteria optimization",
    "Fallback strategy recommendation",
    "Plan quality assessment"
  ],
  
  technicalSpecifications: {
    population: "Cancer patients",
    input: ["CT", "Structure sets", "Dose constraints"],
    inputFormat: ["DICOM", "DICOM-RT"],
    output: ["Treatment plans", "Dose distributions", "DVH curves"],
    outputFormat: ["DICOM RT-PLAN", "DICOM RT-DOSE"]
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: true,
    regulatoryClass: "Class II medical device",
    approvalDate: "2023-04-10"
  },
  
  marketInfo: {
    releaseDate: "2022-11-01",
    countries: ["USA", "EU", "Canada", "Australia", "Japan", "Brazil"],
    installBase: "40+ cancer centers worldwide"
  },
  
  pricingInfo: {
    pricingModel: "Site license with plan-based component",
    priceRange: "$60,000-$100,000/year + per-plan fee",
    trialAvailability: "3-month pilot program available"
  },
  
  evidence: [
    {
      type: "Multi-center Study",
      description: "Comparison with manual planning across 8 institutions",
      link: "https://example.com/planning-study"
    },
    {
      type: "Efficiency Analysis",
      description: "Time savings of 75% compared to manual planning",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Requires high-quality contours to function optimally",
    "Limited support for specialized techniques (TBI, SRS)",
    "May require manual refinement for complex cases"
  ],
  
  lastUpdated: "2023-06-05",
  lastRevised: "2023-06-05",
  lastVerified: "2023-06-05"
};

export default treatmentPlanningExample;
