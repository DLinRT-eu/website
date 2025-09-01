
import { ALL_PRODUCTS, COMPANIES, NEWS_ITEMS, ALL_INITIATIVES } from "@/data";
import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import type { NewsItem } from "@/types/news";
import type { Initiative } from "@/types/initiative";
import type { FilterState } from "@/types/filters";
import { 
  hasRegulatoryApproval, 
  containsDeepLearningKeywords, 
  normalizeAnatomicalLocations,
  standardizeCertification 
} from "@/utils/productFilters";

/**
 * Helper function to check if a product matches a task/category
 */
const matchesTask = (product: ProductDetails, task: string): boolean => {
  if (product.category === task) return true;
  if (product.secondaryCategories?.includes(task)) return true;
  return false;
};

/**
 * DataService provides methods to access and manipulate product, company, and news data
 */
class DataService {
  // Product methods
  getAllProducts(): ProductDetails[] {
    // Return all products with regulatory approval
    return ALL_PRODUCTS.filter(product => hasRegulatoryApproval(product));
  }

  getProductById(id: string): ProductDetails | undefined {
    // Handle legacy ID mapping
    const legacyIdMapping: Record<string, string> = {
      "philips-compressed-sense": "philips-smartspeed-ai"
    };
    
    const actualId = legacyIdMapping[id] || id;
    
    return ALL_PRODUCTS.find(product => product.id === actualId && 
      hasRegulatoryApproval(product));
  }

  getProductsByCategory(category: string): ProductDetails[] {
    return ALL_PRODUCTS.filter(product => 
      matchesTask(product, category) && hasRegulatoryApproval(product)
    );
  }

  getProductsByCompany(companyId: string): ProductDetails[] {
    const company = this.getCompanyById(companyId);
    if (!company) return [];
    
    return ALL_PRODUCTS.filter(product => 
      company.productIds.includes(product.id || '') && hasRegulatoryApproval(product)
    );
  }

  filterProducts(filters: FilterState): ProductDetails[] {
    return ALL_PRODUCTS.filter((product: ProductDetails) => {
      // First check regulatory approval
      if (!hasRegulatoryApproval(product)) {
        return false;
      }
      
      if (filters.tasks?.length && !filters.tasks.some(task => matchesTask(product, task))) {
        return false;
      }
      if (filters.locations?.length) {
        // Normalize anatomical locations: merge Head and Neck into Head & Neck
        const normalizedLocations = normalizeAnatomicalLocations(product.anatomicalLocation || []);
        
        if (!normalizedLocations.some(loc => 
          filters.locations?.includes(loc))) {
          return false;
        }
      }
      
      // Standardize certification check - handle merged certifications
      if (filters.certifications?.length) {
        const productCert = standardizeCertification(product.certification || '');
        if (!filters.certifications.some(cert => {
          const filterCert = standardizeCertification(cert);
          return filterCert === productCert;
        })) {
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
        hasRegulatoryApproval(product)
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

  // Presentation data methods
  getPresentationData() {
    const products = this.getAllProducts();
    const companies = this.getAllCompanies();
    
    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))];
    
    // Category breakdown
    const categoryBreakdown = categories.map(category => ({
      name: category,
      count: products.filter(p => p.category === category).length
    }));
    
    // Products by category
    const productsByCategory = categories.map(category => ({
      category,
      products: products.filter(p => p.category === category).map(product => ({
        name: product.name,
        company: product.company,
        modality: Array.isArray(product.modality) ? product.modality.join(', ') : product.modality,
        certification: product.certification,
        companyLogo: companies.find(c => c.name === product.company)?.logoUrl || ""
      }))
    }));
    
    // Modality breakdown
    const modalities = [...new Set(products.flatMap(p => 
      Array.isArray(p.modality) ? p.modality : (p.modality ? [p.modality] : [])
    ))];
    const modalityBreakdown = modalities.map(modality => ({
      name: modality,
      count: products.filter(p => {
        const productModalities = Array.isArray(p.modality) ? p.modality : (p.modality ? [p.modality] : []);
        return productModalities.includes(modality);
      }).length
    }));
    
    // Location breakdown
    const locations = [...new Set(products.flatMap(p => p.anatomicalLocation || []))];
    const locationBreakdown = locations.map(location => ({
      name: location,
      count: products.filter(p => p.anatomicalLocation?.includes(location)).length
    }));
    
    // Certification breakdown
    const certifications = [...new Set(products.map(p => p.certification).filter(Boolean))];
    const certificationBreakdown = certifications.map(cert => ({
      name: cert!,
      count: products.filter(p => p.certification === cert).length
    }));
    
    // Company logos
    const companyLogos = companies.map(company => ({
      name: company.name,
      logo: company.logoUrl ? company.logoUrl : ""
    }));

    // Analytics data (mock data for presentation)
    const analyticsData = {
      totalViews: 15420,
      uniqueVisitors: 8930,
      averageSessionDuration: "3:24",
      topPages: [
        { page: "Products Directory", views: 4250 },
        { page: "Auto-contouring Solutions", views: 2840 },
        { page: "Treatment Planning", views: 1960 },
        { page: "Company Profiles", views: 1530 },
        { page: "Image Synthesis", views: 1210 }
      ],
      trafficTrends: [
        { month: "Jan", visitors: 1200 },
        { month: "Feb", visitors: 1450 },
        { month: "Mar", visitors: 1680 },
        { month: "Apr", visitors: 1920 },
        { month: "May", visitors: 2150 },
        { month: "Jun", visitors: 2380 }
      ]
    };

    // Contact and engagement info
    const contactInfo = {
      email: "info@dlinrt.eu",
      githubUrl: "https://github.com/DLinRT-eu/website",
      newsletterSignups: 1240,
      rssSubscribers: 385
    };
    
    return {
      totalCompanies: companies.length,
      totalProducts: products.length,
      totalCategories: categories.length,
      companyLogos,
      categoryBreakdown,
      productsByCategory,
      modalityBreakdown,
      locationBreakdown,
      certificationBreakdown,
      analyticsData,
      contactInfo
    };
  }
}

// Create a singleton instance
const dataService = new DataService();

export default dataService;
