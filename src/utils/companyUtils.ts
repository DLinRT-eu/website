import { ProductDetails } from "@/types/productDetails";

export interface CompanyInfo {
  id: string;
  name: string;
  productCount: number;
}

/**
 * Extract unique companies from product catalog
 */
export const extractCompaniesFromProducts = (products: ProductDetails[]): CompanyInfo[] => {
  const companyMap = new Map<string, CompanyInfo>();

  products.forEach((product) => {
    const companyId = product.company.toLowerCase().replace(/\s+/g, '-');
    
    if (companyMap.has(companyId)) {
      const existing = companyMap.get(companyId)!;
      existing.productCount += 1;
    } else {
      companyMap.set(companyId, {
        id: companyId,
        name: product.company,
        productCount: 1,
      });
    }
  });

  return Array.from(companyMap.values());
};
