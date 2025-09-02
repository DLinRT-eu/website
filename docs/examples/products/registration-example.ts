
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
  
  keyFeatures: [
    "Deformable image registration",
    "Multi-modality support",
    "Deep learning-based registration algorithm",
    "Auto-propagation of contours",
    "Registration quality metrics"
  ],
  
  technicalSpecs: {
    inputFormat: ["DICOM", "DICOM RT-STRUCT"],
    outputFormat: ["Deformation vector fields", "Registered images", "DICOM RT-STRUCT"],
    integrations: ["Major TPS systems", "PACS", "Standalone software"],
    processingTime: "<60 seconds for rigid registration, <3 minutes for deformable",
    accuracy: "Mean TRE <2mm for anatomical landmarks"
  },
  
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT", "MRI", "PET", "CBCT"],
    inputFormat: ["DICOM", "LIGHT RT-STRUCT"],
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
