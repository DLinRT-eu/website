
export interface Product {
  id?: string;
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
  logoUrl: string;
  companyUrl?: string;
  productUrl?: string;
  anatomicalLocation?: string[];
  modality?: string | string[];
  subspeciality?: string;
  diseaseTargeted?: string[];
  releaseDate?: string;
  version?: string;
  price?: number;
  website?: string;
  supportEmail?: string;
  trainingRequired?: boolean;
  compatibleSystems?: string[];
  userRating?: number;
  lastUpdated?: string;
  lastVerified?: string;
  lastRevised?: string;
  clinicalEvidence?: string;
  // Adding supported structures for auto-contouring models
  supportedStructures?: string[];
  // Adding useCases for product use cases
  useCases?: string[];
  // Adding properties needed by exportProducts.ts
  keyFeatures?: string[];
  technicalSpecifications?: {
    population?: string;
    input?: string[];
    inputFormat?: string[];
    output?: string[];
    outputFormat?: string[];
  };
  technology?: {
    integration?: string[];
    deployment?: string[];
    triggerForAnalysis?: string;
    processingTime?: string;
  };
  regulatory?: {
    ce?: {
      status: string;
      class?: string;
      type?: string;
    };
    fda?: string;
    intendedUseStatement?: string;
  };
  market?: {
    onMarketSince?: string;
    distributionChannels?: string[];
    countriesPresent?: number;
    payingCustomers?: string;
    researchUsers?: string;
  };
  pricing?: {
    model?: string[];
    basedOn?: string[];
  } | string;
  // New fields for evidence and limitations
  evidence?: string[];
  limitations?: string[];
}
