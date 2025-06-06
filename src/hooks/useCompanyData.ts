
import { COMPANIES } from '@/data';
import dataService from '@/services/DataService';
import { CompanyDetails } from '@/types/company';
import { ProductDetails } from '@/types/productDetails';

export const useCompanyData = (
  companies = dataService.getAllCompanies(),
  filteredProducts?: ProductDetails[]
) => {
  // Get products - either use filtered ones if provided or get all
  const products = filteredProducts || dataService.getAllProducts();

  // Prepare data by mapping companies to their products and product counts
  const companyData = companies.map(company => {
    // Get products for this company, either from filtered list or all products
    const companyProducts = products.filter(p => company.productIds.includes(p.id || ''));
    
    return {
      name: company.name,
      value: companyProducts.length,
      company // Keep full company data in case needed
    };
  }).filter(item => item.value > 0); // Only include companies with products

  // Return both the formatted data for charts and company details with products
  return {
    companyData,
    totalCompanies: companyData.length
  };
};
