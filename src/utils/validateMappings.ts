import { ALL_PRODUCTS } from '@/data';
import { COMPANIES } from '@/data/companies';
import type { ProductDetails } from '@/types/productDetails';

/**
 * Validates that all products have correct company mappings and consistent modality formats
 */
export const validateCompanyProductMappings = () => {
  const issues: string[] = [];
  
  // Create a map of all product IDs to their company names
  const productCompanyMap = new Map<string, string>();
  ALL_PRODUCTS.forEach(product => {
    if (product.id) {
      productCompanyMap.set(product.id, product.company);
    }
  });
  
  // Check each company's productIds
  COMPANIES.forEach(company => {
    company.productIds.forEach(productId => {
      const productCompany = productCompanyMap.get(productId);
      
      if (!productCompany) {
        issues.push(`Company "${company.name}" references non-existent product "${productId}"`);
      } else if (productCompany !== company.name) {
        issues.push(`Product "${productId}" belongs to "${productCompany}" but is listed under "${company.name}"`);
      }
    });
  });
  
  // Check for products without company mapping
  ALL_PRODUCTS.forEach(product => {
    if (!product.id || !product.company) return;
    
    const hasCompanyMapping = COMPANIES.some(company => 
      company.productIds.includes(product.id!) && 
      company.name === product.company
    );
    
    if (!hasCompanyMapping) {
      issues.push(`Product "${product.id}" (${product.company}) has no company mapping`);
    }
  });
  
  return issues;
};

/**
 * Validates modality consistency across products
 */
export const validateModalityConsistency = () => {
  const issues: string[] = [];
  const modalityVariations = new Set<string>();
  
  ALL_PRODUCTS.forEach(product => {
    if (!product.modality) return;
    
    if (Array.isArray(product.modality)) {
      product.modality.forEach(modality => {
        modalityVariations.add(modality);
        
        // Check for inconsistent CBCT formatting
        if (modality.includes('CBCT') && modality !== 'CBCT') {
          issues.push(`Product "${product.id}" has inconsistent CBCT modality format: "${modality}"`);
        }
      });
    } else {
      modalityVariations.add(product.modality);
      
      // Check for inconsistent CBCT formatting
      if (product.modality.includes('CBCT') && product.modality !== 'CBCT') {
        issues.push(`Product "${product.id}" has inconsistent CBCT modality format: "${product.modality}"`);
      }
    }
  });
  
  // Log all unique modality variations for review
  console.log('All modality variations:', Array.from(modalityVariations).sort());
  
  return issues;
};

/**
 * Runs all validation checks
 */
export const validateAllMappings = () => {
  console.log('🔍 Validating company-product mappings...');
  const companyIssues = validateCompanyProductMappings();
  
  console.log('🔍 Validating modality consistency...');
  const modalityIssues = validateModalityConsistency();
  
  const allIssues = [...companyIssues, ...modalityIssues];
  
  if (allIssues.length === 0) {
    console.log('✅ All mappings are correct!');
  } else {
    console.log('❌ Found issues:');
    allIssues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  return allIssues;
};