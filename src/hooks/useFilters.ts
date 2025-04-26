
import { useState, useEffect } from "react";
import { FilterState } from "@/types/filters";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";

export const useFilters = (
  onFiltersChange?: (active: boolean) => void,
  onFilterUpdate?: (filters: FilterState) => void
) => {
  const [filters, setFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    companies: [],
    certifications: [],
    modalities: []
  });

  useEffect(() => {
    const handleReset = () => {
      setFilters({
        tasks: [],
        locations: [],
        companies: [],
        certifications: [],
        modalities: []
      });
    };

    window.addEventListener('resetFilters', handleReset);
    return () => window.removeEventListener('resetFilters', handleReset);
  }, []);

  useEffect(() => {
    onFiltersChange?.(
      Boolean(filters.tasks.length || filters.locations.length || filters.companies.length || filters.certifications.length || filters.modalities.length)
    );
    onFilterUpdate?.(filters);
  }, [filters, onFiltersChange, onFilterUpdate]);

  const handleFilterChange = (value: string, filterType: keyof FilterState) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  return {
    filters,
    handleFilterChange
  };
};
