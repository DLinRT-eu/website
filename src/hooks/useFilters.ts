
import { useState, useEffect } from "react";
import { FilterState } from "@/types/filters";
import { ALL_PRODUCTS } from "@/data";
import { Product } from "@/types/product";

export const useFilters = (
  onFiltersChange?: (active: boolean) => void,
  onFilterUpdate?: (filters: FilterState) => void
) => {
  const [filters, setFilters] = useState<FilterState>({
    tasks: [],
    modalities: [],
    locations: [],
    certifications: []
  });

  useEffect(() => {
    const handleReset = () => {
      setFilters({
        tasks: [],
        modalities: [],
        locations: [],
        certifications: []
      });
    };

    window.addEventListener('resetFilters', handleReset);
    return () => window.removeEventListener('resetFilters', handleReset);
  }, []);

  useEffect(() => {
    const hasActiveFilters = Object.values(filters).some(
      filterArray => filterArray.length > 0
    );
    
    onFiltersChange?.(hasActiveFilters);
    onFilterUpdate?.(filters);
  }, [filters, onFiltersChange, onFilterUpdate]);

  // Toggle selection logic - add if not present, remove if present
  const handleFilterChange = (value: string, filterType: keyof FilterState) => {
    setFilters(prev => {
      const currentValues = [...prev[filterType]];
      const valueIndex = currentValues.indexOf(value);
      
      if (valueIndex >= 0) {
        // Remove the value
        currentValues.splice(valueIndex, 1);
      } else {
        // Add the value
        currentValues.push(value);
      }
      
      return {
        ...prev,
        [filterType]: currentValues
      };
    });
  };

  return {
    filters,
    handleFilterChange,
    setFilters
  };
};
