
import React, { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Beaker, Database, Brain } from 'lucide-react';
import dataService from '@/services/DataService';
import { Initiative } from '@/types/initiative';
import InitiativeFilters from '@/components/initiatives/InitiativeFilters';
import InitiativeSearch from '@/components/initiatives/InitiativeSearch';
import CategorySection from '@/components/initiatives/CategorySection';
import { InitiativeFilterState } from '@/types/filters';
import { useToast } from "@/hooks/use-toast";

const Initiatives = () => {
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>(dataService.getAllInitiatives());
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
  
  // Group initiatives by category - excluding Research Projects
  const challenges = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Grand Challenge'
  );
  
  const datasets = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Open Dataset'
  );

  const modelZoos = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Model Zoo'
  );

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
      
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {filteredInitiatives.length} initiatives
          {(isFiltering || searchQuery) ? " with the selected filters" : ""}
        </p>
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
      
      <footer className="mt-16 border-t border-gray-200 pt-6 pb-8 text-center">
        <div className="text-sm text-gray-500">
          &copy; Matteo Maspero, 2025
        </div>
      </footer>
    </div>
  );
};

export default Initiatives;
