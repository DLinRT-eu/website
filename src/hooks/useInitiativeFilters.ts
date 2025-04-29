
import { useState, useEffect } from "react";
import { InitiativeFilterState } from "@/types/filters";
import { ALL_INITIATIVES } from "@/data";
import { Initiative } from "@/types/initiative";

export const useInitiativeFilters = (
  onFiltersChange?: (active: boolean) => void,
  onFilterUpdate?: (filters: InitiativeFilterState) => void
) => {
  const [filters, setFilters] = useState<InitiativeFilterState>({
    categories: [],
    status: [],
    tags: []
  });

  useEffect(() => {
    const handleReset = () => {
      setFilters({
        categories: [],
        status: [],
        tags: []
      });
    };

    window.addEventListener('resetInitiativeFilters', handleReset);
    return () => window.removeEventListener('resetInitiativeFilters', handleReset);
  }, []);

  useEffect(() => {
    onFiltersChange?.(
      Boolean(filters.categories.length || filters.status.length || filters.tags.length)
    );
    onFilterUpdate?.(filters);
  }, [filters, onFiltersChange, onFilterUpdate]);

  const handleFilterChange = (value: string, filterType: keyof InitiativeFilterState) => {
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

export const getAllInitiativeOptions = (field: keyof Initiative | 'tags') => {
  // Filter out research projects
  const filteredInitiatives = ALL_INITIATIVES.filter(
    initiative => initiative.category !== 'Research Project'
  );
  
  const allOptions = new Set<string>();

  if (field === 'tags') {
    filteredInitiatives.forEach(initiative => {
      initiative.tags.forEach(tag => allOptions.add(tag));
    });
  } else if (field === 'category' || field === 'status') {
    filteredInitiatives.forEach(initiative => {
      if (initiative[field]) {
        allOptions.add(initiative[field] as string);
      }
    });
  }

  return Array.from(allOptions).sort();
};
