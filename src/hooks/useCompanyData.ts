
import { COMPANIES } from '@/data';
import dataService from '@/services/DataService';
import { CompanyDetails } from '@/types/company';

export const useCompanyData = (): CompanyDetails[] => {
  // Get all companies and products
  const companies = COMPANIES;
  const products = dataService.getAllProducts();

  // Prepare data
  const companyData = companies.map(company => {
    const companyProducts = products.filter(p => company.productIds.includes(p.id || ''));
    return {
      ...company,
      products: companyProducts
    };
  });
  return companyData.filter(company => company.products.length > 0);
};
