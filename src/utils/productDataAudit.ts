
import { ProductDetails } from "@/types/productDetails";

/**
 * Interface for storing audit results
 */
export interface DataAuditResult {
  category: string;
  total: number;
  missingDates: number;
  outdatedDates: number;
  missingUrls: number;
  nonArrayModalities: number;
  missingStructures: number;
  inconsistentRegulatory: number;
  dateFixCount: number;
  urlFixCount: number;
  modalityFixCount: number;
  structuresFixCount: number;
  regulatoryFixCount: number;
}

/**
 * Audits a set of products for data consistency issues
 */
export const auditProductData = (products: ProductDetails[]): DataAuditResult => {
  const today = new Date("2025-05-13");
  const oldDate = new Date("2000-01-01");
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  let result: DataAuditResult = {
    category: products[0]?.category || "Unknown",
    total: products.length,
    missingDates: 0,
    outdatedDates: 0,
    missingUrls: 0,
    nonArrayModalities: 0,
    missingStructures: 0,
    inconsistentRegulatory: 0,
    dateFixCount: 0,
    urlFixCount: 0,
    modalityFixCount: 0,
    structuresFixCount: 0,
    regulatoryFixCount: 0
  };
  
  products.forEach(product => {
    // Check for missing or outdated dates
    if (!product.lastRevised || !product.lastUpdated) {
      result.missingDates++;
    }
    if (product.lastRevised === "2000-01-01") {
      result.outdatedDates++;
    }
    
    // Check for missing URLs
    if (!product.companyUrl || !product.productUrl) {
      result.missingUrls++;
    }
    
    // Check for non-array modalities
    if (product.modality && !Array.isArray(product.modality)) {
      result.nonArrayModalities++;
    }
    
    // Check for missing structures in auto-contouring products
    if (product.category === "Auto-Contouring" && (!product.supportedStructures || product.supportedStructures.length === 0)) {
      result.missingStructures++;
    }
    
    // Check for inconsistent regulatory info
    if (!product.regulatory || 
        !product.regulatory.ce || 
        !product.regulatory.ce.status ||
        !product.regulatory.fda) {
      result.inconsistentRegulatory++;
    }
  });
  
  return result;
};

/**
 * Returns specific recommendations for fixing data issues
 */
export const getDataFixRecommendations = (result: DataAuditResult): string[] => {
  const recommendations: string[] = [];
  
  if (result.missingDates > 0 || result.outdatedDates > 0) {
    recommendations.push(
      `Fix date information: ${result.missingDates} products missing dates, ${result.outdatedDates} with outdated dates.`
    );
  }
  
  if (result.missingUrls > 0) {
    recommendations.push(
      `Add missing URLs: ${result.missingUrls} products need URL validation.`
    );
  }
  
  if (result.nonArrayModalities > 0) {
    recommendations.push(
      `Convert modalities to arrays: ${result.nonArrayModalities} products have non-array modality formats.`
    );
  }
  
  if (result.missingStructures > 0 && result.category === "Auto-Contouring") {
    recommendations.push(
      `Add supported structures: ${result.missingStructures} auto-contouring products need structure information.`
    );
  }
  
  if (result.inconsistentRegulatory > 0) {
    recommendations.push(
      `Standardize regulatory data: ${result.inconsistentRegulatory} products have inconsistent regulatory information.`
    );
  }
  
  return recommendations;
};

/**
 * Generates a summary report for the standardization process
 */
export const generateStandardizationReport = (before: DataAuditResult, after: DataAuditResult): string => {
  const improvements = [
    `Fixed dates: ${after.dateFixCount}/${before.missingDates + before.outdatedDates}`,
    `Fixed URLs: ${after.urlFixCount}/${before.missingUrls}`,
    `Fixed modalities: ${after.modalityFixCount}/${before.nonArrayModalities}`,
    `Fixed structures: ${after.structuresFixCount}/${before.missingStructures}`,
    `Fixed regulatory: ${after.regulatoryFixCount}/${before.inconsistentRegulatory}`
  ];
  
  return `
## Standardization Report for ${before.category} Products

Total products processed: ${before.total}

### Improvements Made:
${improvements.map(i => `- ${i}`).join('\n')}

### Remaining Issues:
${getDataFixRecommendations(after).map(r => `- ${r}`).join('\n')}
  `;
};
