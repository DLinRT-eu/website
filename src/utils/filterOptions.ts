
import { Product } from "@/types/product";
import { ALL_PRODUCTS } from "@/data";
import { MODALITY_TAGS, ANATOMY_TAGS, COMBINED_CERTIFICATION_TAGS } from "@/config/tags";

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
    case 'anatomicalLocation': {
      // Get only the anatomical locations that are actually used in products
      const usedLocations = new Set<string>();
      
      ALL_PRODUCTS.forEach(product => {
        // Handle both anatomicalLocation and anatomy fields for consistency
        const locations = product.anatomicalLocation || product.anatomy || [];
        
        if (locations && Array.isArray(locations)) {
          locations.forEach(location => {
            // Process locations based on our standard tags
            if (ANATOMY_TAGS.includes(location)) {
              usedLocations.add(location);
            } else if (location === "Head" || location === "Neck") {
              usedLocations.add("Head & Neck");
            }
          });
        }
      });
      
      return Array.from(usedLocations).sort();
    }
    case 'company':
      return [...new Set(ALL_PRODUCTS.map(p => p.company))].sort();
    case 'certification': {
      // Get all unique certifications actually used in products
      const usedCertifications = new Set<string>();
      
      ALL_PRODUCTS.forEach(product => {
        if (product.certification) {
          // Handle different certification formats
          if (product.certification === "CE Mark, FDA Cleared") {
            // Convert legacy format to standard format
            usedCertifications.add("CE & FDA");
          } else {
            usedCertifications.add(product.certification);
          }
        }
      });
      
      return Array.from(usedCertifications).sort();
    }
    case 'modality': {
      // Get only the modalities that are actually used in products
      const usedModalities = new Set<string>();
      
      ALL_PRODUCTS.forEach(product => {
        const modalitiesArray = Array.isArray(product.modality) 
          ? product.modality 
          : (product.modality ? [product.modality] : []);
          
        modalitiesArray.forEach(modality => {
          if (MODALITY_TAGS.includes(modality)) {
            usedModalities.add(modality);
          }
        });
      });
      
      return Array.from(usedModalities).sort();
    }
    default:
      return [];
  }
};
