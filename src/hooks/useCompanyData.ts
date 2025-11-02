
import { COMPANIES } from '@/data';
import dataService from '@/services/DataService';
import { CompanyDetails } from '@/types/company';
import { ProductDetails } from '@/types/productDetails';
import { countModelsInProduct } from '@/utils/modelCounting';

export const useCompanyData = (
  companies = dataService.getAllCompanies(),
  filteredProducts?: ProductDetails[],
  countingMode: 'models' | 'products' = 'models'
) => {
  // Get products - either use filtered ones if provided or get all
  const products = filteredProducts || dataService.getAllProducts();

  // Prepare data by mapping companies to their products and product counts
  const companyData = companies.map(company => {
    // Match products by company name (more reliable than productIds)
    // This ensures all products from a company are counted, regardless of category
    const companyProducts = products.filter(p => p.company === company.name);
    
    // Count total models for this company
    const totalModels = companyProducts.reduce((sum, product) => sum + countModelsInProduct(product, countingMode), 0);
    
    return {
      name: company.name,
      value: totalModels,
      company, // Keep full company data in case needed
      products: companyProducts // Include the filtered products for this company
    };
  }).filter(item => item.value > 0); // Only include companies with products

  // Return both the formatted data for charts and company details with products
  return {
    companyData,
    totalCompanies: companyData.length
  };
};
