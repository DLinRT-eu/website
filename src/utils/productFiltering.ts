import { ProductDetails } from '@/types/productDetails';
import { matchesTask } from './modelCounting';

/**
 * Filter products by task, location, and modality
 */
export const filterProducts = (
  products: ProductDetails[],
  selectedTask: string,
  selectedLocation: string,
  selectedModality: string
): ProductDetails[] => {
  return products.filter(product => {
    // Filter by task if not "all" - now includes secondary categories
    if (selectedTask !== "all" && !matchesTask(product, selectedTask)) {
      return false;
    }
    
    // Filter by location if not "all"
    if (selectedLocation !== "all") {
      // Handle both anatomicalLocation and anatomy fields for consistency
      const anatomyList = product.anatomicalLocation || product.anatomy || [];
      if (!anatomyList.includes(selectedLocation)) {
        return false;
      }
    }
    
    // Filter by modality if not "all"
    if (selectedModality !== "all") {
      if (!product.modality) {
        return false;
      }
      
      if (Array.isArray(product.modality)) {
        if (!product.modality.includes(selectedModality)) {
          return false;
        }
      } else if (product.modality !== selectedModality) {
        return false;
      }
    }
    
    // Product passed all filters
    return true;
  });
};

/**
 * Filter products by anatomical location
 */
export const filterProductsByLocation = (
  products: ProductDetails[],
  location: string
): ProductDetails[] => {
  return products.filter(p => {
    // Handle both anatomicalLocation and anatomy fields for consistency
    const anatomyList = p.anatomicalLocation || p.anatomy || [];
    return anatomyList.includes(location);
  });
};

/**
 * Filter products by modality
 */
export const filterProductsByModality = (
  products: ProductDetails[],
  modality: string
): ProductDetails[] => {
  return products.filter(p => {
    if (Array.isArray(p.modality)) {
      return p.modality.includes(modality);
    }
    return p.modality === modality;
  });
};