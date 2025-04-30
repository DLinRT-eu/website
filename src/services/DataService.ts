import { ALL_PRODUCTS, COMPANIES, NEWS_ITEMS, ALL_INITIATIVES } from "@/data";
import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import type { NewsItem } from "@/types/news";
import type { Initiative } from "@/types/initiative";
import type { FilterState } from "@/types/filters";

/**
 * DataService provides methods to access and manipulate product, company, and news data
 */
class DataService {
  // Product methods
  getAllProducts(): ProductDetails[] {
    // Only return products with regulatory approval (CE or FDA)
    return ALL_PRODUCTS.filter(product => this.hasRegulatoryApproval(product) && this.containsAIKeywords(product));
  }

  getProductById(id: string): ProductDetails | undefined {
    return ALL_PRODUCTS.find(product => product.id === id && this.hasRegulatoryApproval(product) && this.containsAIKeywords(product));
  }

  getProductsByCategory(category: string): ProductDetails[] {
    return ALL_PRODUCTS.filter(product => 
      product.category === category && this.hasRegulatoryApproval(product) && this.containsAIKeywords(product)
    );
  }

  getProductsByCompany(companyId: string): ProductDetails[] {
    const company = this.getCompanyById(companyId);
    if (!company) return [];
    
    return ALL_PRODUCTS.filter(product => 
      company.productIds.includes(product.id || '') && this.hasRegulatoryApproval(product) && this.containsAIKeywords(product)
    );
  }

  filterProducts(filters: FilterState): ProductDetails[] {
    return ALL_PRODUCTS.filter((product: ProductDetails) => {
      // First check regulatory approval and AI keywords
      if (!this.hasRegulatoryApproval(product) || !this.containsAIKeywords(product)) {
        return false;
      }
      
      if (filters.tasks?.length && !filters.tasks.includes(product.category)) {
        return false;
      }
      if (filters.locations?.length && !product.anatomicalLocation?.some(loc => 
        filters.locations?.includes(loc))) {
        return false;
      }
      
      // Standardize certification check - handle both "CE" and "CE Mark" as the same
      if (filters.certifications?.length) {
        const productCert = this.standardizeCertification(product.certification || '');
        if (!filters.certifications.some(cert => 
          this.standardizeCertification(cert) === productCert)) {
          return false;
        }
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
  
  // Helper method to standardize certification names
  private standardizeCertification(certification: string): string {
    // Normalize certifications to prevent duplicates like "CE" and "CE Mark"
    certification = certification.toLowerCase().trim();
    if (certification.includes('ce')) {
      return 'ce';
    }
    if (certification.includes('fda')) {
      return 'fda';
    }
    return certification;
  }
  
  // Helper method to check if product has FDA or CE approval
  private hasRegulatoryApproval(product: ProductDetails): boolean {
    // Check for FDA clearance/approval
    const hasFDA = product.certification?.toLowerCase().includes('fda') || 
                   (product.regulatory?.fda && 
                    (product.regulatory.fda.includes('510(k)') || 
                     product.regulatory.fda.includes('Cleared') || 
                     product.regulatory.fda.includes('Approved')));
    
    // Check for CE mark approval
    const hasCE = product.certification?.toLowerCase().includes('ce') || 
                 (product.regulatory?.ce?.status === 'Approved' || 
                  product.regulatory?.ce?.status === 'Certified');
    
    return hasFDA || hasCE;
  }
  
  // Helper method to check if product description contains AI keywords
  public containsAIKeywords(product: ProductDetails): boolean {
    const descriptionLower = product.description.toLowerCase();
    const featuresLower = product.features.map(f => f.toLowerCase());
    
    const aiKeywords = ['artificial intelligence', 'deep learning', ' ai ', 'ai-', '-ai ', 'ai.', 'neural', 'machine learning', 'ai-powered', 'ai powered'];
    
    // Check in description
    if (aiKeywords.some(keyword => descriptionLower.includes(keyword))) {
      return true;
    }
    
    // Check in features
    if (featuresLower.some(feature => 
      aiKeywords.some(keyword => feature.includes(keyword))
    )) {
      return true;
    }
    
    // Check in key features
    if (product.keyFeatures && product.keyFeatures.some(kf => 
      aiKeywords.some(keyword => kf.toLowerCase().includes(keyword))
    )) {
      return true;
    }
    
    // Special case for Image Synthesis category - these are all AI-based
    if (product.category === "Image Synthesis") {
      return true;
    }
    
    return false;
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
    // Only include companies with products that pass regulatory approval
    return COMPANIES.map(company => ({
      ...company,
      products: ALL_PRODUCTS.filter(product => 
        company.productIds.includes(product.id || '') && 
        this.hasRegulatoryApproval(product) && this.containsAIKeywords(product)
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
  
  // Initiative methods
  getAllInitiatives(): Initiative[] {
    // Filter out Research Projects
    return ALL_INITIATIVES.filter(initiative => initiative.category !== 'Research Project');
  }
  
  getInitiativeById(id: string): Initiative | undefined {
    return ALL_INITIATIVES.find(initiative => initiative.id === id);
  }
  
  getInitiativesByCategory(category: string): Initiative[] {
    return ALL_INITIATIVES.filter(initiative => initiative.category === category);
  }
  
  getInitiativesByStatus(status: string): Initiative[] {
    return ALL_INITIATIVES.filter(initiative => initiative.status === status);
  }
  
  getInitiativesByTag(tag: string): Initiative[] {
    return ALL_INITIATIVES.filter(initiative => initiative.tags.includes(tag));
  }
  
  filterInitiatives(filters: {categories?: string[], status?: string[], tags?: string[]}): Initiative[] {
    // Start with all initiatives except Research Projects
    const initiatives = ALL_INITIATIVES.filter(initiative => initiative.category !== 'Research Project');
    
    // Then apply filters
    return initiatives.filter(initiative => {
      if (filters.categories?.length && !filters.categories.includes(initiative.category)) {
        return false;
      }
      if (filters.status?.length && !filters.status.includes(initiative.status)) {
        return false;
      }
      if (filters.tags?.length && !initiative.tags.some(tag => filters.tags?.includes(tag))) {
        return false;
      }
      return true;
    });
  }
}

// Create a singleton instance
const dataService = new DataService();

export default dataService;
