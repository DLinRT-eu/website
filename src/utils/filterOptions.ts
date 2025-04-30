
import { Product } from "@/types/product";
import { ALL_PRODUCTS } from "@/data";

export const getAllOptions = (field: keyof Product): string[] => {
  switch (field) {
    case 'category': {
      const categories = [...new Set(ALL_PRODUCTS.map(p => p.category))];
      
      // Define the preferred order of categories
      const preferredOrder = [
        "Reconstruction",
        "Image Enhancement",
        "Image Synthesis",
        "Auto-Contouring",
        "Treatment Planning",
        "Clinical Prediction",
        "Registration",
        "Performance Monitor"
      ];
      
      // Sort categories according to preferred order
      return categories.sort((a, b) => {
        const indexA = preferredOrder.indexOf(a);
        const indexB = preferredOrder.indexOf(b);
        
        // If both categories are in the preferred order list
        if (indexA >= 0 && indexB >= 0) {
          return indexA - indexB;
        }
        // If only a is in the preferred order list
        if (indexA >= 0) {
          return -1;
        }
        // If only b is in the preferred order list
        if (indexB >= 0) {
          return 1;
        }
        // If neither is in the list, sort alphabetically
        return a.localeCompare(b);
      });
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
