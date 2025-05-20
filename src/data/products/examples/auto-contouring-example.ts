import { ProductDetails } from "@/types/productDetails";

/**
 * Example of an auto-contouring product.
 * Use this as a template for adding new auto-contouring products.
 * Note: This example is not exported in the main products index.
 */
export const EXAMPLE_AUTO_CONTOURING: ProductDetails = {
  // Required fields
  id: "example-auto-contour",                  // Unique identifier, lowercase with hyphens
  name: "Example Auto-Contouring",             // Product display name
  company: "Example Medical",                  // Company name (must exist in companies data)
  category: "Auto-Contouring",                 // Product category
  modality: ["CT", "MRI"],                    // Supported modalities

  // Basic information
  description: "AI-powered auto-contouring solution for radiotherapy planning.",
  features: [
    "AI-powered segmentation",
    "Multi-modality support",
    "Rapid contouring",
    "Clinical workflow integration"
  ],
  anatomicalLocation: ["Brain", "Head & Neck"], // Supported anatomical regions
  certification: "CE",                          // Regulatory certification

  // URLs and links
  website: "https://example.com/product",      // Product webpage
  companyUrl: "https://example.com",           // Company website
  productUrl: "https://example.com/product",   // Direct product page
  logoUrl: "/logos/example.png",               // Logo file in public/logos

  // Technical details
  supportedStructures: [                       // List of supported structures
    "Brain: Brain",                           // Format: "Region: Structure"
    "Brain: Brainstem",
    "Brain: Eyes (L/R)",                      // Use (L/R) for bilateral structures
    "Head & Neck: Larynx",
    "Head & Neck: Parotids (L/R)"
  ],
  technicalSpecifications: {
    population: "Adult patients",
    input: ["CT", "MRI"],
    inputFormat: ["DICOM"],
    output: ["Structure sets"],
    outputFormat: ["DICOM-RT"]
  },
  technology: {
    integration: ["PACS", "Treatment Planning Systems"],
    deployment: ["On-premises", "Cloud-based"],
    triggerForAnalysis: "Manual or automated workflow",
    processingTime: "Minutes per patient"
  },

  // Regulatory information
  regulatory: {
    ce: {
      status: "Certified",
      class: "IIa",
      type: "Medical Device"
    },
    fda: "Under review",
    intendedUseStatement: "To assist in the delineation of organs at risk and target volumes for radiotherapy planning."
  },

  // Market information
  market: {
    onMarketSince: "2023",
    distributionChannels: ["Direct sales"],
    countriesPresent: 5,
    payingCustomers: "10+",
    researchUsers: "5+"
  },

  // Version and dates
  version: "1.0",
  releaseDate: "2023-01-01",
  lastUpdated: "2023-12-31",      // When product info was last updated
  lastRevised: "2024-01-01"       // When product info was last reviewed
};
