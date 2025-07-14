import { ProductDetails } from "@/types/productDetails";

export const MD_ANDERSON_PRODUCTS: ProductDetails[] = [
  {
    id: "rpa-radiation-planning-assistant",
    name: "Radiation Planning Assistant (RPA)",
    company: "MD Anderson Cancer Center",
    companyUrl: "https://www.mdanderson.org/",
    productUrl: "https://rpa.mdanderson.org/",
    githubUrl: "https://github.com/DLinRT-eu/website/blob/main/src/data/products/treatment-planning/md-anderson.ts",
    description: "The Radiation Planning Assistant offers a suite of fully automated contouring and radiotherapy planning tools for various anatomical sites including cervix, breast, head and neck, and brain.",
    features: ["Automated contouring", "Radiotherapy planning", "Multi-anatomical site support", "FDA approved"],
    category: "Treatment Planning",
    certification: "FDA",
    logoUrl: "/logos/md-anderson.png",
    website: "https://rpa.mdanderson.org/",
    anatomicalLocation: ["Cervix", "Post-Mastectomy Breast", "Head and Neck", "Whole Brain"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Cervix Cancer", "Breast Cancer", "Head and Neck Cancer", "Brain Cancer"],
    keyFeatures: [
      "Fully automated contouring tools",
      "Comprehensive radiotherapy planning suite",
      "Multi-anatomical site coverage",
      "Clinical validation and FDA approval",
      "Integration with treatment planning systems"
    ],
    technicalSpecifications: {
      population: "Adult cancer patients",
      input: ["CT images", "Structure sets"],
      inputFormat: ["DICOM", "DICOM-RT"],
      output: ["Contoured structures", "Treatment plans"],
      outputFormat: ["DICOM-RT"]
    },
    technology: {
      integration: ["Treatment Planning Systems", "Hospital workflows"],
      deployment: ["On-premises", "Cloud-based"],
      triggerForAnalysis: "Within radiation therapy planning workflow",
      processingTime: "Minutes per case"
    },
    regulatory: {
      ce: {
        status: "Not specified",
        class: "Not specified",
        type: "Medical Device"
      },
      fda: "Approved",
      intendedUseStatement: "For use in radiation therapy planning to assist in automated contouring and treatment plan creation for cervix, breast, head and neck, and brain cancer cases."
    },
    market: {
      onMarketSince: "2020",
      distributionChannels: ["Academic partnerships", "Direct licensing"],
      countriesPresent: 5,
      payingCustomers: "Cancer centers and academic institutions",
      researchUsers: "Research institutions and clinical partners"
    },
    pricing: {
      model: ["Academic licensing", "Commercial licensing"],
      basedOn: ["Institution type", "Usage volume"]
    },
    version: "Latest",
    releaseDate: "2020-01-01",
    lastUpdated: "2024-12-01",
    lastVerified: "2025-01-14",
    lastRevised: "2025-01-14",
    source: "MD Anderson Cancer Center official website",
    evidence: [
      {
        type: "Clinical Study",
        description: "Primary research publication demonstrating clinical efficacy",
        link: "https://doi.org/10.1200/GO.22.00431"
      },
      {
        type: "Publications Database",
        description: "Complete collection of RPA research publications",
        link: "https://rpa.mdanderson.org/publications"
      }
    ]
  }
];