
export interface ModelCardData {
  basicInfo: {
    productName: string;
    version: string;
    company: string;
    category: string;
    secondaryCategories: string;
    releaseDate: string;
    lastUpdated: string;
    ceStatus: string;
    fdaStatus: string;
  };
  clinicalApplication: {
    intendedUse: string;
    targetAnatomy: string;
    diseaseTargeted: string;
    modalitySupport: string;
    clinicalEvidence: string;
  };
  technicalSpecs: {
    inputFormats: string;
    outputFormats: string;
    processingTime: string;
    integration: string;
    deployment: string;
    population: string;
  };
  performance: {
    supportedStructures: string;
    limitations: string;
    evidence: string;
  };
  regulatory: {
    ceDetails: string;
    fdaDetails: string;
    intendedUseStatement: string;
    marketPresence: string;
  };
  contact: {
    website: string;
    companyUrl: string;
    productUrl: string;
    logoUrl: string;
    contactEmail: string;
    supportEmail: string;
  };
  quality: {
    lastRevised: string;
    companyRevisionDate: string;
    source: string;
    githubUrl: string;
  };
  guidelines: {
    compliance: string;
    details: string;
  };
}
