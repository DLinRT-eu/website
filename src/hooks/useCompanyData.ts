
import { COMPANIES } from '@/data';
import dataService from '@/services/DataService';
import { CompanyDetails } from '@/types/company';
import { ProductDetails } from '@/types/productDetails';
import { countModelsInProduct } from '@/utils/modelCounting';

export const useCompanyData = (
  companies = dataService.getAllCompanies(),
  filteredProducts?: ProductDetails[]
) => {
  // Get products - either use filtered ones if provided or get all
  const products = filteredProducts || dataService.getAllProducts();

  // Prepare data by mapping companies to their products and product counts
  const companyData = companies.map(company => {
    // Get products for this company, either from filtered list or all products
    const companyProducts = products.filter(p => {
      const hasId = p.id || '';
      const isIncluded = company.productIds.includes(hasId);
      
      // Debug logging for inconsistent company numbers
      if (company.name === "Siemens Healthineers" && !isIncluded && hasId) {
        console.log(`Siemens product not matched: ${hasId}, productIds:`, company.productIds);
      }
      
      return isIncluded;
    });
    
    // Count total models for this company
    const totalModels = companyProducts.reduce((sum, product) => sum + countModelsInProduct(product), 0);
    
    return {
      name: company.name,
      value: totalModels,
      company // Keep full company data in case needed
    };
  }).filter(item => item.value > 0); // Only include companies with products

  // Return both the formatted data for charts and company details with products
  return {
    companyData,
    totalCompanies: companyData.length
  };
};
