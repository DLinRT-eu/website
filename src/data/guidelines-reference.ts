
/**
 * Common radiotherapy guidelines with DOI references
 * This file serves as a reference for populating the guidelines field in ProductDetails
 */

export interface GuidelineReference {
  name: string;
  version?: string;
  reference: string;
  url: string;
  description: string;
}

export const COMMON_RADIOTHERAPY_GUIDELINES: GuidelineReference[] = [
  // AAPM Task Group Reports
  {
    name: "AAPM TG-263",
    version: "2018",
    reference: "https://doi.org/10.1002/mp.12909",
    url: "https://www.aapm.org/pubs/reports/RPT_263.pdf",
    description: "Standardizing nomenclatures in radiation oncology"
  },
  {
    name: "AAPM TG-275",
    version: "2022",
    reference: "https://doi.org/10.1002/mp.15419",
    url: "https://www.aapm.org/pubs/reports/RPT_275.pdf",
    description: "Guidance on the use of artificial intelligence in medical physics"
  },
  {
    name: "AAPM TG-132",
    version: "2013",
    reference: "https://doi.org/10.1118/1.4816279",
    url: "https://www.aapm.org/pubs/reports/RPT_132.pdf",
    description: "Use of image registration and fusion algorithms and techniques in radiotherapy"
  },
  {
    name: "AAPM TG-162",
    version: "2014",
    reference: "https://doi.org/10.1118/1.4866223",
    url: "https://www.aapm.org/pubs/reports/RPT_162.pdf",
    description: "Software for planar image registration, fusion, and analysis"
  },
  
  // ESTRO Guidelines
  {
    name: "ESTRO-ACROP Guidelines",
    version: "2021",
    reference: "https://doi.org/10.1016/j.radonc.2021.01.001",
    url: "https://www.estro.org/about/governance-organisation/committees-activities/acrop",
    description: "Advisory Committee on Radiation Oncology Practice guidelines"
  },
  {
    name: "ESTRO Consensus Guideline on CT-based Auto-contouring",
    version: "2021",
    reference: "https://doi.org/10.1016/j.radonc.2021.09.019",
    url: "https://www.thegreenjournal.com/article/S0167-8140(21)08440-0/fulltext",
    description: "Consensus guidelines for implementation of auto-contouring"
  },
  
  // IAEA Technical Reports
  {
    name: "IAEA TRS-430",
    version: "2004",
    reference: "https://www.iaea.org/publications/6789/commissioning-and-quality-assurance-of-computerized-planning-systems-for-radiation-treatment-of-cancer",
    url: "https://www.iaea.org/publications/6789/commissioning-and-quality-assurance-of-computerized-planning-systems-for-radiation-treatment-of-cancer",
    description: "Commissioning and quality assurance of computerized planning systems"
  },
  
  // ICRU Reports
  {
    name: "ICRU Report 83",
    version: "2010",
    reference: "https://doi.org/10.1093/jicru/ndq001",
    url: "https://icru.org/home/reports/prescribing-recording-and-reporting-photon-beam-intensity-modulated-radiation-therapy-imrt-report-83",
    description: "Prescribing, recording, and reporting photon-beam IMRT"
  },
  {
    name: "ICRU Report 91",
    version: "2017",
    reference: "https://doi.org/10.1093/jicru/ndx008",
    url: "https://icru.org/home/reports/prescribing-recording-and-reporting-of-stereotactic-treatments-with-small-photon-beams-report-91",
    description: "Prescribing, recording, and reporting of stereotactic treatments with small photon beams"
  },
  
  // Medical Physics Standards
  {
    name: "IEC 60601-2-1",
    version: "2020",
    reference: "https://doi.org/10.3403/30258698",
    url: "https://www.iec.ch/",
    description: "Medical electrical equipment - Particular requirements for linear accelerators"
  },
  
  // Quality Assurance Guidelines
  {
    name: "NCS Report 22",
    version: "2015",
    reference: "https://doi.org/10.25030/ncs-022",
    url: "https://radiationdosimetry.org/ncs/documents/ncs-22-code-of-practice-for-the-quality-assurance-and-control-for-volumetric-modulated-arc-therapy",
    description: "Code of practice for quality assurance and control for VMAT"
  }
];

export const getGuidelineByName = (name: string): GuidelineReference | undefined => {
  return COMMON_RADIOTHERAPY_GUIDELINES.find(guideline => 
    guideline.name.toLowerCase().includes(name.toLowerCase())
  );
};
