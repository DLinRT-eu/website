
import { Product } from './product';

export interface ProductDetails extends Product {
  // All these properties are already inherited from Product
  // id?: string;
  // name: string;
  // company: string; 
  // description: string;
  // features: string[];
  // category: string;
  // certification?: string;
  // logoUrl: string;
  companyUrl?: string;
  productUrl?: string;
  subspeciality?: string;
  modality?: string | string[];
  diseaseTargeted?: string[];
  keyFeatures?: string[];
  suggestedUse?: string;
  supportedStructures?: string[];
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
  };
  clinicalEvidence?: string;
  lastVerified?: string;
  lastRevised?: string;
  source?: string;
  // New fields for evidence and limitations
  evidence?: string[];
  limitations?: string[];
}
