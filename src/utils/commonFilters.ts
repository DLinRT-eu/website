import { ProductDetails } from "@/types/productDetails";

/**
 * Checks if a product matches a specific task
 */
export const matchesTask = (product: ProductDetails, task: string): boolean => {
  if (task === "all") return true;
  
  return product.category === task || 
         (product.secondaryCategories && product.secondaryCategories.includes(task));
};

/**
 * Checks if a product matches a specific location
 */
export const matchesLocation = (product: ProductDetails, location: string): boolean => {
  if (location === "all") return true;
  
  const productLocation = product.anatomicalLocation || product.anatomy;
  if (!productLocation) return false;
  
  if (Array.isArray(productLocation)) {
    return productLocation.some(loc => 
      String(loc).toLowerCase().includes(location.toLowerCase()) ||
      location.toLowerCase().includes(String(loc).toLowerCase())
    );
  }
  
  return String(productLocation).toLowerCase().includes(location.toLowerCase()) ||
         location.toLowerCase().includes(String(productLocation).toLowerCase());
};

/**
 * Checks if a product matches a specific modality
 */
export const matchesModality = (product: ProductDetails, modality: string): boolean => {
  if (modality === "all") return true;
  
  if (!product.modality) return false;
  
  if (Array.isArray(product.modality)) {
    return product.modality.includes(modality);
  }
  
  return product.modality === modality;
};

/**
 * Generic filter composition function
 */
export const applyFilters = <T>(
  items: T[],
  filters: Array<(item: T) => boolean>
): T[] => {
  return items.filter(item => filters.every(filter => filter(item)));
};

/**
 * Debounced search filter
 */
export const createSearchFilter = (searchTerm: string) => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return (product: ProductDetails): boolean => {
    if (!normalizedSearch) return true;
    
    const searchableFields = [
      product.name,
      product.company,
      product.description,
      product.category,
      ...(product.features || []),
      ...(product.keyFeatures || [])
    ];
    
    return searchableFields.some(field => 
      field?.toLowerCase().includes(normalizedSearch)
    );
  };
};