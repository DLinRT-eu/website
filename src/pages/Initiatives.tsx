
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Flask } from 'lucide-react';
import dataService from '@/services/DataService';
import { Initiative } from '@/types/initiative';
import InitiativeFilters from '@/components/initiatives/InitiativeFilters';
import CategorySection from '@/components/initiatives/CategorySection';
import { InitiativeFilterState } from '@/types/filters';
import { useToast } from "@/hooks/use-toast";

const Initiatives = () => {
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>(dataService.getAllInitiatives());
  const [isFiltering, setIsFiltering] = useState(false);
  const { toast } = useToast();
  
  const handleFilterUpdate = (filters: InitiativeFilterState) => {
    const filtered = dataService.filterInitiatives(filters);
    setFilteredInitiatives(filtered);
    
    // Show a toast if filters are applied but no results
    if ((filters.categories.length || filters.status.length || filters.tags.length) && filtered.length === 0) {
      toast({
        title: "No initiatives found",
        description: "Try adjusting your filters to see more results.",
        variant: "destructive",
      });
    }
  };
  
  // Group initiatives by category
  const challenges = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Grand Challenge'
  );
  
  const datasets = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Open Dataset'
  );
  
  const researchProjects = filteredInitiatives.filter(
    (initiative) => initiative.category === 'Research Project'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Research Initiatives | DLinRT</title>
        <meta name="description" content="Explore research initiatives, open datasets, and grand challenges in radiotherapy." />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Flask className="h-8 w-8 text-[#9b87f5]" />
          <h1 className="text-3xl font-bold text-gray-900">Research Initiatives</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl">
          Discover the latest research initiatives, grand challenges, and open datasets in the field of radiotherapy. 
          These resources aim to accelerate innovation and collaboration in radiation oncology research.
        </p>
      </div>

      <InitiativeFilters 
        onFiltersChange={setIsFiltering}
        onFilterUpdate={handleFilterUpdate}
      />
      
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {filteredInitiatives.length} initiatives
          {isFiltering ? " with the selected filters" : ""}
        </p>
      </div>

      <CategorySection title="Grand Challenges" initiatives={challenges} />
      <CategorySection title="Open Datasets" initiatives={datasets} />
      <CategorySection title="Research Projects" initiatives={researchProjects} />

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700">No initiatives found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default Initiatives;
