
import { CompanyDetails } from "@/types/company";

export const COMPANIES: CompanyDetails[] = [
  {
    id: "limbus-ai",
    name: "Limbus AI",
    description: "Specializing in AI-powered auto-contouring solutions for radiation therapy planning.",
    website: "https://www.limbus.ai",
    productIds: ["limbus-contour"]
  },
  {
    id: "mvision-ai",
    name: "MVision AI",
    description: "Pioneers in cloud-based auto-segmentation solutions for radiation therapy.",
    website: "https://www.mvision.ai",
    productIds: ["mvision-autosegment"]
  },
  {
    id: "mirada-medical",
    name: "Mirada Medical",
    description: "Leaders in medical imaging software solutions with focus on AI-powered contouring.",
    website: "https://mirada-medical.com",
    productIds: ["mirada-dlc"]
  },
  {
    id: "philips-healthcare",
    name: "Philips",
    description: "Global leader in health technology, offering comprehensive radiation oncology solutions.",
    website: "https://www.philips.com/healthcare",
    productIds: [
      "philips-auto-contouring",
      "philips-mrcat-head-neck",
      "philips-mrcat-brain",
      "philips-mrcat-pelvis"
    ]
  },
  {
    id: "siemens-healthineers",
    name: "Siemens Healthineers",
    description: "Pioneer in medical technology and digital health solutions.",
    website: "https://www.siemens-healthineers.com",
    productIds: ["siemens-syngo-ct"]
  },
  {
    id: "ge-healthcare",
    name: "GE Healthcare",
    description: "Leading provider of medical imaging and information technologies.",
    website: "https://www.gehealthcare.com",
    productIds: []
  },
  {
    id: "spectronic-medical",
    name: "Spectronic Medical",
    description: "Specialists in MRI-only radiotherapy planning solutions.",
    website: "https://spectronicmedical.com/",
    productIds: ["spectronic-mriplus"]
  },
  {
    id: "raysearch",
    name: "RaySearch Laboratories",
    description: "Developer of innovative software solutions for radiation therapy treatment planning.",
    website: "https://www.raysearchlabs.com",
    productIds: ["raysearch-raystation", "raysearch-raystation-deep-learning"]
  },
  {
    id: "therapanacea",
    name: "Therapanacea",
    description: "Innovators in AI solutions for radiation oncology and medical imaging.",
    website: "https://www.therapanacea.eu",
    productIds: ["therapanacea-annotate", "therapanacea-adaptbox", "mr-box-synthetic"]
  }
];
