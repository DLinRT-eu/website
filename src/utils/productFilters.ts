import { ProductDetails } from "@/types/productDetails";
import { CERTIFICATION_TAGS, CERTIFICATION_MAPPING } from "@/config/tags";

/**
 * Checks if a product has CE or FDA regulatory approval
 */
export const hasRegulatoryApproval = (product: ProductDetails): boolean => {
  // Check for FDA clearance/approval
  const hasFDA = product.certification?.toLowerCase().includes('fda') || 
                 (product.regulatory?.fda && 
                  (typeof product.regulatory.fda === 'string' ? 
                   (product.regulatory.fda.includes('510(k)') || 
                    product.regulatory.fda.includes('Cleared') || 
                    product.regulatory.fda.includes('Approved')) :
                   (product.regulatory.fda.status?.includes('510(k)') ||
                    product.regulatory.fda.status?.includes('Cleared') ||
                    product.regulatory.fda.status?.includes('Approved'))));
  
  // Check for CE mark approval
  const hasCE = product.certification?.toLowerCase().includes('ce') || 
               (product.regulatory?.ce?.status === 'Approved' || 
                product.regulatory?.ce?.status === 'Certified');
                
  // Check for MDR exempt status
  const hasMDRExempt = product.certification === 'MDR exempt';
  
  return hasFDA || hasCE || hasMDRExempt;
};

/**
 * Checks if a product contains deep learning keywords in its description or features
 */
export const containsDeepLearningKeywords = (product: ProductDetails): boolean => {
  const descriptionLower = product.description.toLowerCase();
  const featuresLower = product.features.map(f => f.toLowerCase());
  
  const dlKeywords = [
    'artificial intelligence', 'deep learning', ' ai ', 'ai-', '-ai ', 'ai.', 'neural', 
    'machine learning', 'ai-powered', 'ai powered', 'dl ', 'dl-', '-dl ', 'dl.'
  ];
  
  // Check in description
  if (dlKeywords.some(keyword => descriptionLower.includes(keyword))) {
    return true;
  }
  
  // Check in features
  if (featuresLower.some(feature => 
    dlKeywords.some(keyword => feature.includes(keyword))
  )) {
    return true;
  }
  
  // Check in key features
  if (product.keyFeatures && product.keyFeatures.some(kf => 
    dlKeywords.some(keyword => kf.toLowerCase().includes(keyword))
  )) {
    return true;
  }
  
  // Special case for Image Synthesis category - these are all DL-based
  if (product.category === "Image Synthesis") {
    return true;
  }
  
  return false;
};

/**
 * Normalizes anatomical locations (standardizes Head/Neck references, removes problematic locations)
 */
export const normalizeAnatomicalLocations = (locations: string[]): string[] => {
  return locations.map(location => {
    // Merge "Head" or "Neck" into "Head & Neck"
    if (location === "Head" || location === "Neck") {
      return "Head & Neck";
    }
    // Filter out "Musculoskeletal" and "Spine"
    if (location === "Musculoskeletal") {
      return ""; // Remove Musculoskeletal
    }
    return location;
  }).filter(Boolean); // Remove empty strings
};

/**
 * Standardizes certification names to prevent duplicates
 */
export const standardizeCertification = (certification: string): string => {
  // Normalize certifications to merge variations
  const cert = certification.toLowerCase().trim();
  
  // Handle combined certifications first
  if (cert.includes('ce') && cert.includes('fda')) {
    return 'ce & fda';
  }
  
  // Handle individual certifications
  if (cert.includes('ce')) {
    return 'ce';
  }
  if (cert.includes('fda')) {
    return 'fda';
  }
  if (cert === 'mdr exempt') {
    return 'mdr exempt';
  }
  if (cert === 'nmpa') {
    return 'nmpa';
  }
  
  return cert;
};

/**
 * Gets standardized certification tags from a product
 */
export const getStandardizedCertificationTags = (product: ProductDetails): string[] => {
  // If using combined certifications like "CE & FDA"
  if (product.certification && CERTIFICATION_MAPPING[product.certification]) {
    return CERTIFICATION_MAPPING[product.certification];
  }
  
  // Otherwise extract from both certification field and regulatory details
  const certTags: string[] = [];
  
  if (product.certification) {
    if (product.certification.toLowerCase().includes('ce')) certTags.push('CE');
    if (product.certification.toLowerCase().includes('fda')) certTags.push('FDA');
    if (product.certification === 'MDR exempt') certTags.push('MDR exempt');
    if (product.certification.toLowerCase().includes('nmpa')) certTags.push('NMPA');
  }
  
  // Check regulatory fields
  if (product.regulatory?.ce?.status === 'Approved' || 
      product.regulatory?.ce?.status === 'Certified') {
    if (!certTags.includes('CE')) certTags.push('CE');
  }
  
  if (product.regulatory?.fda && 
      (typeof product.regulatory.fda === 'string' ? 
       (product.regulatory.fda.includes('510(k)') || 
        product.regulatory.fda.includes('Cleared') || 
        product.regulatory.fda.includes('Approved')) :
       (product.regulatory.fda.status?.includes('510(k)') ||
        product.regulatory.fda.status?.includes('Cleared') ||
        product.regulatory.fda.status?.includes('Approved')))) {
    if (!certTags.includes('FDA')) certTags.push('FDA');
  }
  
  return certTags.filter(tag => CERTIFICATION_TAGS.includes(tag));
};
