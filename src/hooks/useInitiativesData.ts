
import { useState, useEffect } from 'react';
import dataService from '@/services/DataService';
import { Initiative } from '@/types/initiative';
import { InitiativeFilterState } from '@/types/filters';
import { useToast } from "@/hooks/use-toast";

export const useInitiativesData = () => {
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>(dataService.getAllInitiatives());
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Handle search and filtering
  useEffect(() => {
    const applyFiltersAndSearch = () => {
      let results = dataService.getAllInitiatives();
      
      // Apply search if there's a query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        results = results.filter(initiative => 
          initiative.name.toLowerCase().includes(query) || 
          initiative.description.toLowerCase().includes(query) ||
          initiative.tags.some(tag => tag.toLowerCase().includes(query)) ||
          initiative.organization.toLowerCase().includes(query) ||
          initiative.category.toLowerCase().includes(query)
        );
      }
      
      setFilteredInitiatives(results);
    };
    
    applyFiltersAndSearch();
  }, [searchQuery]);
  
  const handleFilterUpdate = (filters: InitiativeFilterState) => {
    const filtered = dataService.filterInitiatives(filters);
    
    // If there's a search query, further filter by search
    let results = filtered;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = filtered.filter(initiative => 
        initiative.name.toLowerCase().includes(query) || 
        initiative.description.toLowerCase().includes(query) ||
        initiative.tags.some(tag => tag.toLowerCase().includes(query)) ||
        initiative.organization.toLowerCase().includes(query) ||
        initiative.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredInitiatives(results);
    
    // Show a toast if filters are applied but no results
    if ((filters.categories.length || filters.status.length || filters.tags.length || searchQuery) && results.length === 0) {
      toast({
        title: "No initiatives found",
        description: "Try adjusting your filters or search terms to see more results.",
        variant: "destructive",
      });
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    filteredInitiatives,
    isFiltering,
    searchQuery,
    handleFilterUpdate,
    handleSearch,
    setIsFiltering
  };
};
