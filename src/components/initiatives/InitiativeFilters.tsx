
import React from "react";
import { Filter } from "lucide-react";
import { FilterSelect } from "../filters/FilterSelect";
import { useInitiativeFilters, getAllInitiativeOptions } from "@/hooks/useInitiativeFilters";
import { InitiativeFilterBarProps } from "@/types/filters";
import { useIsMobile } from "@/hooks/use-mobile";

const InitiativeFilters = ({ onFiltersChange, onFilterUpdate }: InitiativeFilterBarProps) => {
  const { filters, handleFilterChange } = useInitiativeFilters(onFiltersChange, onFilterUpdate);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-wrap gap-4 items-start mb-8 p-4 rounded-lg bg-[#9b87f5]/5">
      <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
        <Filter className="h-5 w-5 text-[#9b87f5]" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="w-full">
          <FilterSelect
            placeholder="Select category"
            options={getAllInitiativeOptions('category')}
            selectedValues={filters.categories}
            onValueChange={(value) => handleFilterChange(value, 'categories')}
          />
        </div>
        
        <div className="w-full">
          <FilterSelect
            placeholder="Select status"
            options={getAllInitiativeOptions('status')}
            selectedValues={filters.status}
            onValueChange={(value) => handleFilterChange(value, 'status')}
          />
        </div>

        <div className="w-full">
          <FilterSelect
            placeholder="Select tags"
            options={getAllInitiativeOptions('tags')}
            selectedValues={filters.tags}
            onValueChange={(value) => handleFilterChange(value, 'tags')}
          />
        </div>
      </div>
    </div>
  );
};

export default InitiativeFilters;
