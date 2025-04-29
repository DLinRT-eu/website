
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
      return [...new Set(ALL_PRODUCTS.flatMap(p => p.anatomicalLocation || []))].sort();
    case 'company':
      return [...new Set(ALL_PRODUCTS.map(p => p.company))].sort();
    case 'certification':
      return [...new Set(ALL_PRODUCTS.map(p => p.certification || '').filter(Boolean))].sort();
    case 'modality': {
      const modalitiesArray = ALL_PRODUCTS.map(p => 
        Array.isArray(p.modality) ? p.modality : (p.modality ? [p.modality] : [])
      ).flat();
      return [...new Set(modalitiesArray)].filter(Boolean).sort();
    }
    default:
      return [];
  }
};
