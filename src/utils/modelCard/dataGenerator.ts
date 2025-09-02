
import { ProductDetails } from "@/types/productDetails";
import { ModelCardData } from "./types";
import { getKeyFeatures, getLogoInfo } from "@/lib/utils";

const formatArray = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return "N/A";
  return arr.join("; ");
};

const formatDate = (date: string | undefined): string => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return date || "N/A";
  }
};


// Helper function to safely format pricing information
const formatPricing = (pricing: any): string => {
  if (!pricing) return "N/A";
  if (typeof pricing === 'string') return pricing;
  if (typeof pricing === 'object') {
    const model = Array.isArray(pricing.model) ? pricing.model.join("; ") : (pricing.model || "N/A");
    const basedOn = Array.isArray(pricing.basedOn) ? pricing.basedOn.join("; ") : (pricing.basedOn || "N/A");
    return `Model: ${model}, Based on: ${basedOn}`;
  }
  return "N/A";
};

// Helper function to format guidelines information
const formatGuidelines = (guidelines: any[] | undefined): { compliance: string; details: string } => {
  if (!guidelines || guidelines.length === 0) {
    return { compliance: "N/A", details: "No guidelines information available" };
  }

  const complianceTypes = guidelines.map(g => g.compliance).filter(Boolean);
  const complianceSummary = complianceTypes.length > 0 ? 
    `${complianceTypes.filter(c => c === 'full').length} full, ${complianceTypes.filter(c => c === 'partial').length} partial, ${complianceTypes.filter(c => c === 'planned').length} planned` :
    "Not specified";

  const details = guidelines.map(g => {
    let detail = g.name;
    if (g.version) detail += ` (v${g.version})`;
    if (g.compliance) detail += ` - ${g.compliance} compliance`;
    if (g.reference) detail += ` [${g.reference}]`;
    return detail;
  }).join("; ");

  return { compliance: complianceSummary, details };
};

export const generateModelCardData = (product: ProductDetails): ModelCardData => {
  // Get standardized features and logo information
  const keyFeatures = getKeyFeatures(product);
  const logoInfo = getLogoInfo(product);

  // Safely handle regulatory data
  const ceStatus = product.regulatory?.ce?.status || 
    (product.certification?.toLowerCase().includes('ce') ? 'Certified' : 'N/A');
  
  const fdaStatus = typeof product.regulatory?.fda === 'string' ? 
    product.regulatory.fda : 
    (typeof product.regulatory?.fda === 'object' ? product.regulatory.fda.status : null) ||
    (product.certification?.toLowerCase().includes('fda') ? 'Cleared' : 'N/A');

  // Safely handle modality data
  const modalitySupport = Array.isArray(product.modality) 
    ? product.modality.join("; ") 
    : (product.modality || "N/A");

  // Safely handle supported structures
  const supportedStructures = Array.isArray(product.supportedStructures)
    ? product.supportedStructures.map(s => {
        if (typeof s === 'string') return s;
        if (typeof s === 'object' && s.name) return s.name;
        return String(s);
      }).join("; ")
    : "N/A";

  // Safely handle evidence data
  const evidenceText = Array.isArray(product.evidence) 
    ? product.evidence.map(e => {
        if (typeof e === 'string') return e;
        if (typeof e === 'object' && e.type && e.description) {
          return `${e.type}: ${e.description}`;
        }
        return String(e);
      }).join("; ")
    : (typeof product.evidence === 'string' ? product.evidence : "N/A");

  // Format guidelines data
  const guidelinesData = formatGuidelines(product.guidelines);

  return {
    basicInfo: {
      productName: product.name || "N/A",
      version: product.version || "N/A",
      company: product.company || "N/A",
      category: product.category || "N/A",
      secondaryCategories: formatArray(product.secondaryCategories),
      releaseDate: formatDate(product.releaseDate),
      lastUpdated: formatDate(product.lastUpdated),
      ceStatus: ceStatus,
      fdaStatus: fdaStatus,
    },
    keyFeatures: {
      features: keyFeatures,
      count: keyFeatures.length,
    },
    clinicalApplication: {
      intendedUse: product.regulatory?.intendedUseStatement || 
        product.suggestedUse || 
        product.description || "N/A",
      targetAnatomy: formatArray(product.anatomicalLocation || product.anatomy),
      diseaseTargeted: formatArray(product.diseaseTargeted),
      modalitySupport: modalitySupport,
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
      supportedStructures: supportedStructures,
      limitations: formatArray(product.limitations),
      evidence: evidenceText,
    },
    regulatory: {
      ceDetails: product.regulatory?.ce ? 
        `${product.regulatory.ce.status}${product.regulatory.ce.class ? ` (Class ${product.regulatory.ce.class})` : ''}` : 
        "N/A",
      fdaDetails: typeof product.regulatory?.fda === 'string' ? 
        product.regulatory.fda : 
        (typeof product.regulatory?.fda === 'object' ? 
         `${product.regulatory.fda.status}${product.regulatory.fda.clearanceNumber ? ` (${product.regulatory.fda.clearanceNumber})` : ''}` : 
         "N/A"),
      intendedUseStatement: product.regulatory?.intendedUseStatement || "N/A",
      marketPresence: product.market?.onMarketSince || "N/A",
    },
    contact: {
      website: product.website || "N/A",
      companyUrl: product.companyUrl || "N/A",
      productUrl: product.productUrl || "N/A",
      logoUrl: logoInfo.url,
      logoSource: logoInfo.source,
      contactEmail: product.contactEmail || "N/A",
      supportEmail: product.supportEmail || "N/A",
    },
    quality: {
      lastRevised: formatDate(product.lastRevised),
      companyRevisionDate: formatDate(product.companyRevisionDate),
      source: product.source || "N/A",
      githubUrl: product.githubUrl || "N/A",
    },
    guidelines: guidelinesData,
  };
};
