
import { ProductDetails } from '@/types/productDetails';

export const autoContouringExample: ProductDetails = {
  id: "example-contouring",
  name: "Example AI Contouring",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Auto-Contouring",
  description: "An example auto-contouring product for testing and documentation.",
  url: "https://example.com/products/contouring",
  contactEmail: "info@example.com",
  contactPhone: "+1 555-123-4567",
  logoUrl: "/placeholder.svg",
  
  modality: ["CT", "MRI"],
  anatomy: ["Head & Neck", "Thorax", "Pelvis"],
  
  features: [
    "Automated organ at risk delineation",
    "Deep learning-based segmentation",
    "Multi-atlas approach with AI refinement",
    "Real-time quality metrics",
    "Batch processing capabilities"
  ],
  
  supportedStructures: [
    "Brain: Brainstem, Optic nerves, Optic chiasm",
    "Head & Neck: Parotid glands, Submandibular glands, Spinal cord",
    "Thorax: Heart, Lungs, Esophagus, Spinal cord",
    "Pelvis: Bladder, Rectum, Femoral heads"
  ],
  
  guidelines: [
    {
      name: "AAPM TG-263",
      version: "2018",
      reference: "https://doi.org/10.1002/mp.12909",
      url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
      compliance: "full"
    },
    {
      name: "AAPM TG-275",
      version: "2022",
      reference: "https://doi.org/10.1002/mp.15419",
      url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
      compliance: "partial"
    },
    {
      name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
      version: "2021",
      reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
      url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
      compliance: "full"
    }
  ],
  
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT", "MRI"],
    inputFormat: ["DICOM"],
    output: ["Structure sets", "Quality metrics"],
    outputFormat: ["DICOM-RT", "JSON"]
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: true,
    regulatoryClass: "Class II medical device",
    approvalDate: "2023-03-15"
  },
  
  marketInfo: {
    releaseDate: "2022-09-01",
    countries: ["USA", "EU", "UK", "Canada", "Australia", "Japan"],
    installBase: "50+ institutions worldwide"
  },
  
  pricingInfo: {
    pricingModel: "Annual subscription with per-patient pricing",
    priceRange: "$25,000-$40,000/year + $5-10/patient",
    trialAvailability: "30-day free trial available"
  },
  
  evidence: [
    {
      type: "Multi-center Validation Study",
      description: "Validation across 10 institutions with 500+ patients",
      link: "https://example.com/validation"
    },
    {
      type: "Dosimetric Impact Study",
      description: "Clinical impact on treatment planning workflows",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Requires high-quality imaging for optimal results",
    "Performance may vary with unusual anatomy",
    "Manual review recommended for critical structures"
  ],
  
  lastUpdated: "2023-04-20",
  lastRevised: "2023-04-20"
};

export default autoContouringExample;
