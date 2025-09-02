import { ProductDetails } from "@/types/productDetails";

export interface ParsedFDAInfo {
  status: string;
  class?: string;
  clearanceNumber?: string;
  regulationNumber?: string;
  productCode?: string;
  type?: string;
}

export interface ParsedCEInfo {
  status: string;
  class?: string;
  type?: string;
  notifiedBody?: string;
  certificateNumber?: string;
  regulation?: string;
}

/**
 * Parses FDA regulatory information from string or object format
 */
export function parseFDAInfo(fda: string | object | undefined): ParsedFDAInfo | null {
  if (!fda) return null;
  
  if (typeof fda === 'object') {
    return fda as ParsedFDAInfo;
  }
  
  // Parse string format
  const fdaStr = fda as string;
  const result: ParsedFDAInfo = {
    status: fdaStr
  };
  
  // Extract clearance number (K-number or P-number)
  const clearanceMatch = fdaStr.match(/([KP]\d{6})/);
  if (clearanceMatch) {
    result.clearanceNumber = clearanceMatch[1];
    result.type = clearanceMatch[1].startsWith('K') ? '510(k)' : 'PMA';
  }
  
  // Extract class
  const classMatch = fdaStr.match(/Class\s+(I{1,3})/i);
  if (classMatch) {
    result.class = `Class ${classMatch[1]}`;
  }
  
  // Extract regulation number
  const regMatch = fdaStr.match(/Regulation\s+Number:\s*([^;]+)/i);
  if (regMatch) {
    result.regulationNumber = regMatch[1].trim();
  }
  
  // Extract product code
  const codeMatch = fdaStr.match(/Product\s+Code:\s*([A-Z]{2,3})/i);
  if (codeMatch) {
    result.productCode = codeMatch[1];
  }
  
  return result;
}

/**
 * Parses CE regulatory information
 */
export function parseCEInfo(ce: object | undefined): ParsedCEInfo | null {
  if (!ce) return null;
  return ce as ParsedCEInfo;
}

/**
 * Formats FDA information for display
 */
export function formatFDAInfo(fda: ParsedFDAInfo): string {
  let parts: string[] = [];
  
  if (fda.status) parts.push(fda.status);
  if (fda.clearanceNumber) parts.push(`(${fda.clearanceNumber})`);
  if (fda.class) parts.push(fda.class);
  if (fda.regulationNumber) parts.push(`Regulation: ${fda.regulationNumber}`);
  if (fda.productCode) parts.push(`Product Code: ${fda.productCode}`);
  
  return parts.join('; ');
}

/**
 * Formats CE information for display
 */
export function formatCEInfo(ce: ParsedCEInfo): string {
  let parts: string[] = [];
  
  if (ce.status) parts.push(ce.status);
  if (ce.class) parts.push(ce.class);
  if (ce.type) parts.push(`(${ce.type})`);
  if (ce.certificateNumber) parts.push(`Cert: ${ce.certificateNumber}`);
  if (ce.notifiedBody) parts.push(`NB: ${ce.notifiedBody}`);
  
  return parts.join('; ');
}

/**
 * Gets standardized certification tags from product data
 */
export function getStandardizedCertificationTags(product: ProductDetails): string[] {
  const tags: string[] = [];
  
  const fdaInfo = parseFDAInfo(product.regulatory?.fda);
  const ceInfo = parseCEInfo(product.regulatory?.ce);
  
  if (fdaInfo) {
    if (fdaInfo.clearanceNumber?.startsWith('K')) {
      tags.push('FDA 510(k)');
    } else if (fdaInfo.clearanceNumber?.startsWith('P')) {
      tags.push('FDA PMA');
    } else if (fdaInfo.status?.includes('510(k)')) {
      tags.push('FDA 510(k)');
    } else if (fdaInfo.status?.includes('PMA')) {
      tags.push('FDA PMA');
    } else {
      tags.push('FDA');
    }
  }
  
  if (ceInfo) {
    if (ceInfo.type === 'MDR') {
      tags.push('CE MDR');
    } else if (ceInfo.type === 'MDD') {
      tags.push('CE MDD');
    } else {
      tags.push('CE');
    }
  }
  
  // Fallback to original certification field
  if (!tags.length && product.certification) {
    const cert = product.certification.toLowerCase();
    if (cert.includes('ce') && cert.includes('fda')) {
      if (ceInfo?.type === 'MDR') tags.push('CE MDR');
      else tags.push('CE');
      tags.push('FDA');
    } else if (cert.includes('ce')) {
      if (ceInfo?.type === 'MDR') tags.push('CE MDR');
      else tags.push('CE');
    } else if (cert.includes('fda')) {
      tags.push('FDA');
    }
  }
  
  return tags;
}