
import { useMemo } from "react";
import { ProductDetails } from "@/types/productDetails";

interface ProductSearchProps {
  products: ProductDetails[];
  searchQuery: string;
  advancedSearch: boolean;
}

export const useProductSearch = ({ products, searchQuery, advancedSearch }: ProductSearchProps) => {
  return useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    
    return products.filter(product => {
      // Helper function to recursively search through objects and arrays
      const searchInValue = (value: any): boolean => {
        if (!value) return false;
        
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        
        if (Array.isArray(value)) {
          return value.some(item => searchInValue(item));
        }
        
        if (typeof value === 'object') {
          return Object.values(value).some(val => searchInValue(val));
        }
        
        if (typeof value === 'number') {
          return value.toString().includes(query);
        }
        
        return false;
      };

      if (!advancedSearch) {
        // Basic search: only search in main fields
        const basicFields = [
          product.name,
          product.company,
          product.description,
          product.category
        ];

        const basicFieldsMatch = basicFields.some(field => searchInValue(field));
        const featuresMatch = product.features?.some(feature => 
          feature.toLowerCase().includes(query)
        );

        return basicFieldsMatch || featuresMatch;
      }

      // Advanced search: search in all fields
      // Search in basic fields
      const basicFields = [
        product.name,
        product.company,
        product.description,
        product.category,
        product.subspeciality,
        product.certification,
        product.version,
        product.suggestedUse,
        product.clinicalEvidence,
        product.website,
        product.productUrl,
        product.companyUrl,
        product.url,
        product.contactEmail,
        product.contactPhone
      ];

      if (basicFields.some(field => searchInValue(field))) {
        return true;
      }

      // Search in array fields
      const arrayFields = [
        product.features,
        product.anatomicalLocation,
        product.anatomy,
        product.diseaseTargeted,
        product.keyFeatures,
        product.useCases,
        product.compatibleSystems,
        product.secondaryCategories,
        product.limitations
      ];

      if (arrayFields.some(field => searchInValue(field))) {
        return true;
      }

      // Search in modality (can be string or array)
      if (searchInValue(product.modality)) {
        return true;
      }

      // Search in supported structures
      if (product.supportedStructures) {
        if (Array.isArray(product.supportedStructures)) {
          if (product.supportedStructures.some(structure => {
            if (typeof structure === 'string') {
              return structure.toLowerCase().includes(query);
            }
            if (typeof structure === 'object') {
              return searchInValue(structure);
            }
            return false;
          })) {
            return true;
          }
        }
      }

      // Search in technical specifications
      if (product.technicalSpecifications && searchInValue(product.technicalSpecifications)) {
        return true;
      }

      // Search in technology information
      if (product.technology && searchInValue(product.technology)) {
        return true;
      }

      // Search in regulatory information
      if (product.regulatory && searchInValue(product.regulatory)) {
        return true;
      }

      // Search in market information
      if (product.market && searchInValue(product.market)) {
        return true;
      }

      // Search in pricing information
      if (product.pricing && searchInValue(product.pricing)) {
        return true;
      }

      // Search in evidence
      if (product.evidence && searchInValue(product.evidence)) {
        return true;
      }

      // Search in compatibility fields (for backward compatibility)
      if (product.regulatoryInfo && searchInValue(product.regulatoryInfo)) {
        return true;
      }

      if (product.marketInfo && searchInValue(product.marketInfo)) {
        return true;
      }

      if (product.pricingInfo && searchInValue(product.pricingInfo)) {
        return true;
      }

      if (product.technicalSpecs && searchInValue(product.technicalSpecs)) {
        return true;
      }

      return false;
    });
  }, [products, searchQuery, advancedSearch]);
};
