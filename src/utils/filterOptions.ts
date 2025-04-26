
import { Product } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/data/products";

export const getAllOptions = (field: keyof Product): string[] => {
  switch (field) {
    case 'category': {
      const categories = [...new Set(SAMPLE_PRODUCTS.map(p => p.category))];
      const imageSynthesisIndex = categories.findIndex(cat => cat === "Image Synthesis");
      
      if (imageSynthesisIndex > -1) {
        categories.splice(imageSynthesisIndex, 1);
        categories.splice(1, 0, "Image Synthesis");
      }
      
      return categories;
    }
    case 'anatomicalLocation':
      return [...new Set(SAMPLE_PRODUCTS.flatMap(p => p.anatomicalLocation || []))];
    case 'company':
      return [...new Set(SAMPLE_PRODUCTS.map(p => p.company))];
    case 'certification':
      return [...new Set(SAMPLE_PRODUCTS.map(p => p.certification || '').filter(Boolean))];
    case 'modality':
      return [...new Set(SAMPLE_PRODUCTS.map(p => p.modality || '').filter(Boolean))];
    default:
      return [];
  }
};
