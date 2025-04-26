
import { Product } from "@/types/product";
import { ALL_PRODUCTS } from "@/data";

export const getAllOptions = (field: keyof Product): string[] => {
  switch (field) {
    case 'category': {
      const categories = [...new Set(ALL_PRODUCTS.map(p => p.category))];
      // Make sure Image Synthesis is second in the list
      const imageSynthesisIndex = categories.findIndex(cat => cat === "Image Synthesis");
      if (imageSynthesisIndex > -1) {
        categories.splice(imageSynthesisIndex, 1);
        categories.splice(1, 0, "Image Synthesis");
      }
      return categories;
    }
    case 'anatomicalLocation':
      return [...new Set(ALL_PRODUCTS.flatMap(p => p.anatomicalLocation || []))].filter(Boolean) as string[];
    case 'company':
      return [...new Set(ALL_PRODUCTS.map(p => p.company))];
    case 'certification':
      return [...new Set(ALL_PRODUCTS.map(p => p.certification || '').filter(Boolean))];
    case 'modality':
      return [...new Set(ALL_PRODUCTS.map(p => p.modality || '').filter(Boolean))];
    default:
      return [];
  }
};
