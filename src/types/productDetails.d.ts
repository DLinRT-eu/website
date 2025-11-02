
import { Product } from './product';

export interface ProductDetails extends Product {
  // No need to re-declare properties from Product
  companyUrl?: string;
  productUrl?: string;
  subspeciality?: string;
  modality?: string | string[];
  diseaseTargeted?: string[];
  keyFeatures?: string[];
  suggestedUse?: string;
  supportedStructures?: string[] | Array<{
    name: string;
    type: string;
    accuracy?: string;
    validationDataset?: string;
  }>;
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
      notifiedBody?: string;
      certificateNumber?: string;
      regulation?: string;
    };
    fda?: {
      status: string;
      class?: string;
      clearanceNumber?: string;
      regulationNumber?: string;
      productCode?: string;
      type?: string;
    } | string; // Backward compatibility
    intendedUseStatement?: string;
  };
  market?: {
    onMarketSince?: string;
    distributionChannels?: string[];
  };
  pricing?: {
    model?: string[];
    basedOn?: string[];
  } | string;
  clinicalEvidence?: string;
  lastRevised?: string;
  source?: string;
  // New field for multi-category support
  secondaryCategories?: string[];
  // New fields for evidence and limitations
  evidence?: string[] | Array<{
    type: string;
    description: string;
    link: string;
  }>;
  limitations?: string[];
  
  // Additional compatibility fields
  url?: string;
  contactEmail?: string;
  contactPhone?: string;
  anatomy?: string[];
  technicalSpecs?: any;
  regulatoryInfo?: any;
  marketInfo?: any;
  pricingInfo?: any;
  
  // New field for company revision date
  companyRevisionDate?: string;
  
  // New field for guidelines followed
  guidelines?: Array<{
    name: string;
    version?: string;
    reference?: string;
    url?: string;
    compliance?: 'full' | 'partial' | 'planned';
  }>;
  
  // Legacy field for verification date (kept for backward compatibility)
  lastVerified?: string;
}
