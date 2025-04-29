
import { ALL_PRODUCTS, COMPANIES, NEWS_ITEMS } from "@/data";
import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import type { NewsItem } from "@/types/news";
import type { FilterState } from "@/types/filters";

/**
 * DataService provides methods to access and manipulate product, company, and news data
 */
class DataService {
  // Product methods
  getAllProducts(): ProductDetails[] {
    return ALL_PRODUCTS;
  }

  getProductById(id: string): ProductDetails | undefined {
    return ALL_PRODUCTS.find(product => product.id === id);
  }

  getProductsByCategory(category: string): ProductDetails[] {
    return ALL_PRODUCTS.filter(product => product.category === category);
  }

  getProductsByCompany(companyId: string): ProductDetails[] {
    const company = this.getCompanyById(companyId);
    if (!company) return [];
    
    return ALL_PRODUCTS.filter(product => 
      company.productIds.includes(product.id || '')
    );
  }

  filterProducts(filters: FilterState): ProductDetails[] {
    return ALL_PRODUCTS.filter((product: ProductDetails) => {
      if (filters.tasks?.length && !filters.tasks.includes(product.category)) {
        return false;
      }
      if (filters.locations?.length && !product.anatomicalLocation?.some(loc => 
        filters.locations?.includes(loc))) {
        return false;
      }
      if (filters.certifications?.length && !filters.certifications.includes(
        product.certification || '')) {
        return false;
      }
      if (filters.modalities?.length) {
        // Handle both string and array modalities
        const productModalities = Array.isArray(product.modality) 
          ? product.modality 
          : (product.modality ? [product.modality] : []);
          
        if (!productModalities.some(m => filters.modalities?.includes(m))) {
          return false;
        }
      }
      return true;
    });
  }

  // Company methods
  getAllCompanies(): CompanyDetails[] {
    return COMPANIES;
  }

  getCompanyById(id: string): CompanyDetails | undefined {
    return COMPANIES.find(company => company.id === id);
  }

  getCompanyByName(name: string): CompanyDetails | undefined {
    return COMPANIES.find(company => company.name === name);
  }

  getCompaniesWithProducts(): CompanyDetails[] {
    return COMPANIES.map(company => ({
      ...company,
      products: ALL_PRODUCTS.filter(product => 
        company.productIds.includes(product.id || '')
      )
    })) as CompanyDetails[];
  }

  // News methods
  getAllNews(): NewsItem[] {
    return NEWS_ITEMS;
  }

  getNewsById(id: string): NewsItem | undefined {
    return NEWS_ITEMS.find(item => item.id === id);
  }

  getLatestNews(count: number = 3): NewsItem[] {
    // Sort by date (newest first) and take the specified number
    return [...NEWS_ITEMS]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
}

// Create a singleton instance
const dataService = new DataService();

export default dataService;
