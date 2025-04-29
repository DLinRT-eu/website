
import { useState, useEffect } from "react";
import { InitiativeFilterState } from "@/types/filters";
import { ALL_INITIATIVES } from "@/data";

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
  const allOptions = new Set<string>();

  if (field === 'tags') {
    ALL_INITIATIVES.forEach(initiative => {
      initiative.tags.forEach(tag => allOptions.add(tag));
    });
  } else if (field === 'category' || field === 'status') {
    ALL_INITIATIVES.forEach(initiative => {
      if (initiative[field]) {
        allOptions.add(initiative[field] as string);
      }
    });
  }

  return Array.from(allOptions).sort();
};
