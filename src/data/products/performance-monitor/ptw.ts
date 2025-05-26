
import { ProductDetails } from "@/types/productDetails";

export const PTW_PRODUCTS: ProductDetails[] = [
  {
    id: "ptw-octavius-4d",
    name: "OCTAVIUS 4D",
    company: "PTW",
    companyUrl: "https://www.ptwdosimetry.com/",
    productUrl: "https://www.ptwdosimetry.com/products-solutions/products/octavius-4d/",
    githubUrl: "https://github.com/DLinRT-eu/website/tree/main/src/data/products/performance-monitor/ptw.ts",
    description: "Advanced 4D dosimetry system for comprehensive quality assurance of modern radiation therapy techniques including IMRT, VMAT, and stereotactic treatments.",
    features: ["4D dosimetry", "Real-time monitoring", "Comprehensive QA"],
    category: "Performance Monitor",
    certification: "CE & FDA",
    logoUrl: "/logos/ptw.jpg",
    website: "https://www.ptwdosimetry.com/products-solutions/products/octavius-4d/",
    anatomicalLocation: ["Treatment delivery systems"],
    modality: ["Linear accelerators"],
    subspeciality: "Medical Physics",
    diseaseTargeted: ["Quality Assurance"],
    keyFeatures: ["4D dose reconstruction", "Real-time beam monitoring", "Comprehensive treatment verification"],
    technicalSpecifications: {
      population: "Treatment systems",
      input: ["Dose measurements", "Treatment plans"],
      inputFormat: ["DICOM-RT", "Proprietary"],
      output: ["QA reports", "Dose distributions"],
      outputFormat: ["PDF", "DICOM"]
    },
    technology: {
      integration: ["TPS integration", "Linac integration"],
      deployment: ["On-premises"],
      triggerForAnalysis: "Pre-treatment and during delivery",
      processingTime: "Real-time to minutes"
    },
    regulatory: {
      ce: {
        status: "Certified",
        class: "IIb",
        type: "Medical Device"
      },
      fda: "510(k) cleared",
      intendedUseStatement: "For quality assurance and dosimetric verification of radiation therapy treatments."
    },
    market: {
      onMarketSince: "2015",
      distributionChannels: ["Direct sales", "Distribution partners"],
      countriesPresent: 60,
      payingCustomers: "Major cancer centers worldwide",
      researchUsers: "Academic medical physics programs"
    },
    pricing: {
      model: ["Perpetual license", "Service contract"],
      basedOn: ["System configuration", "Support level"]
    },
    version: "7.0",
    releaseDate: "2023-10-01",
    lastUpdated: "2024-03-15",
    lastRevised: "2025-05-12",
    source: "Automatically retrieved and revised"
  }
];
