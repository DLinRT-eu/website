
import { CompanyDetails } from '@/types/company';
import { ProductDetails } from '@/types/productDetails';

export const useCompanyData = (companies: CompanyDetails[], filteredProducts: ProductDetails[]) => {
  // Prepare data for company products
  const companyData = companies
    .map(company => ({
      name: company.name,
      value: filteredProducts.filter(p => p.company === company.name).length
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
  
  const totalCompanies = companyData.length;

  return {
    companyData,
    totalCompanies
  };
};
