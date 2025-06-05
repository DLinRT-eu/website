import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '@/components/SEO';
import { Beaker, Database, Brain } from 'lucide-react';
import dataService from '@/services/DataService';
import { Initiative } from '@/types/initiative';
import InitiativeFilters from '@/components/initiatives/InitiativeFilters';
import InitiativeSearch from '@/components/initiatives/InitiativeSearch';
import CategorySection from '@/components/initiatives/CategorySection';
import InitiativeSortControls, { InitiativeSortOption } from '@/components/initiatives/InitiativeSortControls';
import { InitiativeFilterState } from '@/types/filters';
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Initiatives = () => {
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>(dataService.getAllInitiatives());
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<InitiativeSortOption>("random");
  const [ascending, setAscending] = useState(true);
  // Initialize shuffleTrigger with a random value to ensure different order on each page load
  const [shuffleTrigger, setShuffleTrigger] = useState(Math.random());
  const { toast } = useToast();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Research Initiatives in Radiotherapy",
    "description": "Explore research initiatives, open datasets, model zoos, and grand challenges in radiotherapy.",
    "url": "https://dlinrt.eu/initiatives",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  // Trigger initial shuffle when component mounts and sortBy is random
  useEffect(() => {
    if (sortBy === "random") {
      setShuffleTrigger(Math.random());
    }
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to shuffle array randomly
  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Memoized function to sort initiatives - prevents continuous re-sorting
  const sortInitiatives = useMemo(() => {
    return (initiatives: Initiative[]): Initiative[] => {
      if (sortBy === "random") {
        return shuffleArray(initiatives);
      }

      const sorted = [...initiatives].sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "organization":
            comparison = a.organization.localeCompare(b.organization);
            break;
          case "status":
            const statusOrder = { "Active": 0, "Completed": 1, "Upcoming": 2 };
            comparison = statusOrder[a.status] - statusOrder[b.status];
            break;
          default:
            return 0;
        }
        
        return ascending ? comparison : -comparison;
      });

      return sorted;
    };
  }, [sortBy, ascending, shuffleTrigger, shuffleArray]);
  
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

  const handleSortChange = (option: InitiativeSortOption) => {
    setSortBy(option);
  };

  const handleDirectionChange = (isAscending: boolean) => {
    if (sortBy === "random") {
      // Trigger a re-shuffle instead of changing direction
      setShuffleTrigger(Math.random());
    } else {
      setAscending(isAscending);
    }
  };
  
  // Group initiatives by category and apply sorting to each category separately
  const challenges = useMemo(() => {
    return sortInitiatives(filteredInitiatives.filter(
      (initiative) => initiative.category === 'Grand Challenge'
    ));
  }, [filteredInitiatives, sortInitiatives]);
  
  const datasets = useMemo(() => {
    return sortInitiatives(filteredInitiatives.filter(
      (initiative) => initiative.category === 'Open Dataset'
    ));
  }, [filteredInitiatives, sortInitiatives]);

  const modelZoos = useMemo(() => {
    return sortInitiatives(filteredInitiatives.filter(
      (initiative) => initiative.category === 'Model Zoo'
    ));
  }, [filteredInitiatives, sortInitiatives]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Research Initiatives"
        description="Explore research initiatives, open datasets, model zoos, and grand challenges in radiotherapy. Discover resources to accelerate innovation in radiation oncology research."
        canonical="https://dlinrt.eu/initiatives"
        structuredData={structuredData}
      />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="h-8 w-8 text-[#9b87f5]" />
          <h1 className="text-3xl font-bold text-gray-900">Research Initiatives</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl">
          Discover the latest research initiatives, grand challenges, open datasets, and model zoos in the field of radiotherapy. 
          These resources aim to accelerate innovation and collaboration in radiation oncology research.
        </p>
      </div>

      <InitiativeSearch onSearch={handleSearch} />

      <InitiativeFilters 
        onFiltersChange={setIsFiltering}
        onFilterUpdate={handleFilterUpdate}
      />

      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {filteredInitiatives.length} initiatives
          {(isFiltering || searchQuery) ? " with the selected filters" : ""}
        </p>
        <InitiativeSortControls 
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
          sortBy={sortBy}
          ascending={ascending}
        />
      </div>

      <CategorySection title="Grand Challenges" initiatives={challenges} />
      <CategorySection title="Open Datasets" initiatives={datasets} />
      <CategorySection title="Model Zoos" initiatives={modelZoos} icon={<Brain className="h-5 w-5 text-[#00A6D6]" />} />

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700">No initiatives found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search terms or filters to see more results.</p>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Initiatives;
