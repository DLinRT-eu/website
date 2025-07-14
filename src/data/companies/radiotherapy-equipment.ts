
import { CompanyDetails } from "@/types/company";

export const RADIOTHERAPY_EQUIPMENT_COMPANIES: CompanyDetails[] = [
  {
    "id": "elekta",
    "name": "Elekta",
    "description": "Provider of precision radiation medicine solutions with AI-enhanced imaging.",
    "website": "https://www.elekta.com/",
    "productIds": [
      "elekta-iris"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/Elekta.png"
  },
  {
    "id": "accuray",
    "name": "Accuray",
    "description": "Developer of radiotherapy systems with AI-enhanced imaging capabilities.",
    "website": "https://www.accuray.com/",
    "productIds": [
      "accuray-clearrt", 
      "accuray-synchrony-image"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/accuray.png"
  },
  {
    "id": "sun-nuclear",
    "name": "Sun Nuclear",
    "description": "Provider of radiation therapy quality assurance and AI-powered treatment planning solutions.",
    "website": "https://oncospace.com/",
    "productIds": [
      "oncospace-predictive-planning"
    ],
    "category": "Radiotherapy Equipment",
    "logoUrl": "/logos/sun-nuclear.png"
  }
];
