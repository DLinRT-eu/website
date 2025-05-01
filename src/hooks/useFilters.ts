
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
    // Handle reset event
    const handleReset = () => {
      setFilters({
        tasks: [],
        modalities: [],
        locations: [],
        certifications: []
      });
    };

    // Handle task filter event from taxonomy clicks
    const handleTaskFilter = (event: CustomEvent) => {
      if (event.detail && event.detail.task) {
        setFilters(prev => ({
          ...prev,
          tasks: [event.detail.task]
        }));
      }
    };

    // Handle modality filter event
    const handleModalityFilter = (event: CustomEvent) => {
      if (event.detail && event.detail.modality) {
        setFilters(prev => ({
          ...prev,
          modalities: [event.detail.modality]
        }));
      }
    };

    // Handle anatomy filter event
    const handleAnatomyFilter = (event: CustomEvent) => {
      if (event.detail && event.detail.anatomy) {
        setFilters(prev => ({
          ...prev,
          locations: [event.detail.anatomy]
        }));
      }
    };

    // Handle certification filter event
    const handleCertificationFilter = (event: CustomEvent) => {
      if (event.detail && event.detail.certification) {
        setFilters(prev => ({
          ...prev,
          certifications: [event.detail.certification]
        }));
      }
    };

    // Add event listeners
    window.addEventListener('resetFilters', handleReset);
    window.addEventListener('setTaskFilter', handleTaskFilter as EventListener);
    window.addEventListener('setModalityFilter', handleModalityFilter as EventListener);
    window.addEventListener('setAnatomyFilter', handleAnatomyFilter as EventListener);
    window.addEventListener('setCertificationFilter', handleCertificationFilter as EventListener);

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener('resetFilters', handleReset);
      window.removeEventListener('setTaskFilter', handleTaskFilter as EventListener);
      window.removeEventListener('setModalityFilter', handleModalityFilter as EventListener);
      window.removeEventListener('setAnatomyFilter', handleAnatomyFilter as EventListener);
      window.removeEventListener('setCertificationFilter', handleCertificationFilter as EventListener);
    };
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
