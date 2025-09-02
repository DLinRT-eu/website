import { useMemo } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { FilterState } from '@/types/filters';
import { matchesTask, matchesLocation, matchesModality, applyFilters, createSearchFilter } from '@/utils/commonFilters';

interface UseProductFilteringProps {
  products: ProductDetails[];
  filters: {
    tasks: string[];
    locations: string[];
    certifications: string[];
    modalities: string[];
  };
  searchQuery?: string;
}

export const useProductFiltering = ({ 
  products, 
  filters, 
  searchQuery = '' 
}: UseProductFilteringProps) => {
  return useMemo(() => {
    const filterFunctions = [
      // Search filter
      createSearchFilter(searchQuery),
      
      // Task filter
      (product: ProductDetails) => {
        if (filters.tasks.length === 0) return true;
        return filters.tasks.includes(product.category);
      },
      
      // Location filter
      (product: ProductDetails) => {
        if (filters.locations.length === 0) return true;
        return matchesLocation(product, filters.locations[0] || 'all');
      },
      
      // Modality filter
      (product: ProductDetails) => {
        if (filters.modalities.length === 0) return true;
        return matchesModality(product, filters.modalities[0] || 'all');
      },
      
      // Certification filter
      (product: ProductDetails) => {
        if (filters.certifications.length === 0) return true;
        return filters.certifications.some(cert => 
          product.certification?.toLowerCase().includes(cert.toLowerCase())
        );
      }
    ];

    return applyFilters(products, filterFunctions);
  }, [products, filters, searchQuery]);
};

export const useProductStats = (filteredProducts: ProductDetails[]) => {
  return useMemo(() => {
    const totalProducts = filteredProducts.length;
    
    const stats = {
      totalProducts,
      companiesCount: new Set(filteredProducts.map(p => p.company)).size,
      categoriesCount: new Set(filteredProducts.map(p => p.category)).size,
      modalitiesCount: new Set(
        filteredProducts
          .flatMap(p => Array.isArray(p.modality) ? p.modality : [p.modality])
          .filter(Boolean)
      ).size,
      
      // Top categories
      topCategories: Object.entries(
        filteredProducts.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
        
      // Top companies
      topCompanies: Object.entries(
        filteredProducts.reduce((acc, product) => {
          acc[product.company] = (acc[product.company] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
    };
    
    return stats;
  }, [filteredProducts]);
};