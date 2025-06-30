
import { ProductDetails } from "@/types/productDetails";
import { ModelCardData } from "./types";

const formatArray = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return "N/A";
  return arr.join("; ");
};

const formatDate = (date: string | undefined): string => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

// Helper function to generate logo URL based on company name if needed
const generateLogoUrl = (product: ProductDetails): string => {
  if (product.logoUrl && product.logoUrl.trim() !== '') {
    return product.logoUrl.startsWith('/') ? product.logoUrl.trim() : `/${product.logoUrl.trim()}`;
  }
  
  // Create a standardized company logo filename
  const standardizedCompany = product.company.toLowerCase().replace(/\s+/g, '-');
  return `/logos/${standardizedCompany}.png`;
};

export const generateModelCardData = (product: ProductDetails): ModelCardData => {
  return {
    basicInfo: {
      productName: product.name || "N/A",
      version: product.version || "N/A",
      company: product.company || "N/A",
      category: product.category || "N/A",
      secondaryCategories: formatArray(product.secondaryCategories),
      releaseDate: formatDate(product.releaseDate),
      lastUpdated: formatDate(product.lastUpdated),
      ceStatus: product.regulatory?.ce?.status || (product.certification?.toLowerCase().includes('ce') ? 'Certified' : 'N/A'),
      fdaStatus: product.regulatory?.fda || (product.certification?.toLowerCase().includes('fda') ? 'Cleared' : 'N/A'),
    },
    clinicalApplication: {
      intendedUse: product.regulatory?.intendedUseStatement || product.suggestedUse || product.description || "N/A",
      targetAnatomy: formatArray(product.anatomicalLocation || product.anatomy),
      diseaseTargeted: formatArray(product.diseaseTargeted),
      modalitySupport: Array.isArray(product.modality) ? product.modality.join("; ") : (product.modality || "N/A"),
      clinicalEvidence: product.clinicalEvidence || "N/A",
    },
    technicalSpecs: {
      inputFormats: formatArray(product.technicalSpecifications?.inputFormat),
      outputFormats: formatArray(product.technicalSpecifications?.outputFormat),
      processingTime: product.technology?.processingTime || "N/A",
      integration: formatArray(product.technology?.integration),
      deployment: formatArray(product.technology?.deployment),
      population: product.technicalSpecifications?.population || "N/A",
    },
    performance: {
      supportedStructures: Array.isArray(product.supportedStructures) 
        ? product.supportedStructures.map(s => typeof s === 'string' ? s : s.name).join("; ")
        : "N/A",
      limitations: formatArray(product.limitations),
      evidence: Array.isArray(product.evidence) 
        ? product.evidence.map(e => typeof e === 'string' ? e : `${e.type}: ${e.description}`).join("; ")
        : (typeof product.evidence === 'string' ? product.evidence : "N/A"),
    },
    regulatory: {
      ceDetails: product.regulatory?.ce ? `${product.regulatory.ce.status} (Class ${product.regulatory.ce.class})` : "N/A",
      fdaDetails: product.regulatory?.fda || "N/A",
      intendedUseStatement: product.regulatory?.intendedUseStatement || "N/A",
      marketPresence: product.market?.countriesPresent ? `${product.market.countriesPresent} countries` : "N/A",
    },
    contact: {
      website: product.website || "N/A",
      companyUrl: product.companyUrl || "N/A",
      productUrl: product.productUrl || "N/A",
      logoUrl: generateLogoUrl(product),
      contactEmail: product.contactEmail || "N/A",
      supportEmail: product.supportEmail || "N/A",
    },
    quality: {
      lastVerified: formatDate(product.lastVerified),
      lastRevised: formatDate(product.lastRevised),
      source: product.source || "N/A",
      githubUrl: product.githubUrl || "N/A",
    },
  };
};
