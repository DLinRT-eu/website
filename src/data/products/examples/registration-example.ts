
import { ProductDetails } from '@/types/productDetails';

export const registrationExample: ProductDetails = {
  id: "example-registration",
  name: "Example AI Registration",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Registration",
  description: "An example image registration product for testing and documentation.",
  url: "https://example.com/products/registration",
  contactEmail: "info@example.com",
  contactPhone: "+1 555-123-4567",
  logoUrl: "/placeholder.svg",
  
  modality: ["CT", "MRI", "PET", "CBCT"],
  anatomy: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
  
  features: [
    "Deformable image registration",
    "Multi-modality support",
    "Deep learning-based registration algorithm",
    "Auto-propagation of contours",
    "Registration quality metrics"
  ],
  
  guidelines: [
    {
      name: "AAPM TG-132",
      version: "2013",
      reference: "https://doi.org/10.1118/1.4816279",
      url: "https://www.aapm.org/pubs/reports/RPT_132.pdf",
      compliance: "full"
    },
    {
      name: "AAPM TG-162",
      version: "2014",
      reference: "https://doi.org/10.1118/1.4866223",
      url: "https://www.aapm.org/pubs/reports/RPT_162.pdf",
      compliance: "full"
    },
    {
      name: "AAPM TG-275",
      version: "2022",
      reference: "https://doi.org/10.1002/mp.15419",
      url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
      compliance: "partial"
    }
  ],
  
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT", "MRI", "PET", "CBCT"],
    inputFormat: ["DICOM", "DICOM RT-STRUCT"],
    output: ["Registered images", "Fused images"],
    outputFormat: ["DICOM", "DICOM-RT"]
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: true,
    regulatoryClass: "Class II medical device",
    approvalDate: "2023-01-10"
  },
  
  marketInfo: {
    releaseDate: "2022-06-15",
    countries: ["USA", "EU", "UK", "Canada", "Australia", "Japan", "China"],
    installBase: "200+ installations worldwide"
  },
  
  pricingInfo: {
    pricingModel: "Perpetual license with annual maintenance",
    priceRange: "$40,000-$70,000 + $8,000-$15,000/year maintenance",
    trialAvailability: "45-day evaluation license available"
  },
  
  evidence: [
    {
      type: "Validation Study",
      description: "Comparison with manual registration by experts",
      link: "https://example.com/validation"
    },
    {
      type: "Clinical Impact Study",
      description: "Time savings and accuracy improvements in clinical workflow",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Reduced accuracy for significant anatomical changes",
    "Performance depends on image quality",
    "May require manual adjustment for complex cases"
  ],
  
  lastUpdated: "2023-05-15",
  lastRevised: "2023-05-15"
};

export default registrationExample;
