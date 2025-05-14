
import { ProductDetails } from "@/types/productDetails";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  {
    id: "registration-product-1",
    name: "Image Registration Suite",
    company: "Imaging Solutions",
    description: "Advanced image registration tool for radiation therapy planning that aligns CT, MRI, and PET images for accurate treatment targeting.",
    features: ["Multi-modality registration", "Deformable registration", "Fast processing time"],
    category: "Registration",
    certification: "CE Mark",
    logoUrl: "/logos/placeholder.svg",
    anatomicalLocation: ["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis"],
    modality: ["CT", "MRI", "PET"],
    releaseDate: "2023-01-15",
    version: "2.1",
    keyFeatures: [
      "Automatic rigid and deformable registration",
      "Multi-modality support",
      "Integration with treatment planning systems",
      "Validation tools for registration accuracy"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["CT", "MRI", "PET-CT"],
      inputFormat: ["DICOM"],
      output: ["Registered images", "Transformation matrices"],
      outputFormat: ["DICOM", "DICOM-RT"]
    },
    technology: {
      integration: ["Treatment planning systems", "PACS"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Manual",
      processingTime: "30-60 seconds"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIa",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For use in radiation therapy planning to register and align multi-modality images."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Direct sales", "Distributors"],
      countriesPresent: 15,
      payingCustomers: "50+",
      researchUsers: "10+"
    },
    pricing: {
      model: ["Perpetual license", "Subscription"],
      basedOn: ["Per installation", "Per user"]
    },
    clinicalEvidence: "Validated in multi-center studies with accuracy of 97% compared to manual registration",
    lastVerified: "2024-03-01",
    lastRevised: "2024-01-15"
  }
];
