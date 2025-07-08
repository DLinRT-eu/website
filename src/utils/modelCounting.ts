import { ProductDetails } from '@/types/productDetails';

/**
 * Helper function to check if a product matches a task/category
 */
export const matchesTask = (product: ProductDetails, task: string): boolean => {
  if (product.category === task) return true;
  if (product.secondaryCategories?.includes(task)) return true;
  return false;
};

/**
 * Helper function to count models within a product
 * For auto-contouring: count distinct modalities as separate models (CT, MRI, CBCT)
 * For image synthesis: each product typically represents one model
 * For other categories: each product represents one model
 */
export const countModelsInProduct = (product: ProductDetails, countingMode: 'models' | 'products' = 'models'): number => {
  // If counting products, always return 1
  if (countingMode === 'products') {
    return 1;
  }
  
  // For auto-contouring products, count distinct modalities as separate models
  if (product.category === "Auto-Contouring") {
    if (Array.isArray(product.modality)) {
      return product.modality.length;
    } else if (product.modality) {
      return 1;
    }
    return 1; // Default to 1 if no modality specified
  }
  
  // For other categories, each product typically represents one model
  return 1;
};

/**
 * Count total models in a list of products
 */
export const countTotalModels = (products: ProductDetails[], countingMode: 'models' | 'products' = 'models'): number => {
  return products.reduce((sum, product) => sum + countModelsInProduct(product, countingMode), 0);
};

/**
 * Count models that match a specific task/category
 */
export const countModelsForTask = (products: ProductDetails[], task: string, countingMode: 'models' | 'products' = 'models'): number => {
  const matchingProducts = products.filter(p => matchesTask(p, task));
  return countTotalModels(matchingProducts, countingMode);
};