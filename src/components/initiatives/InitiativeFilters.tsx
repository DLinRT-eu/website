
import React from "react";
import { Filter } from "lucide-react";
import { FilterSelect } from "../filters/FilterSelect";
import { useInitiativeFilters, getAllInitiativeOptions } from "@/hooks/useInitiativeFilters";
import { InitiativeFilterBarProps } from "@/types/filters";

const InitiativeFilters = ({ onFiltersChange, onFilterUpdate }: InitiativeFilterBarProps) => {
  const { filters, handleFilterChange } = useInitiativeFilters(onFiltersChange, onFilterUpdate);

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 p-4 rounded-lg bg-[#9b87f5]/5">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#9b87f5]" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <FilterSelect
        placeholder="Select category"
        options={getAllInitiativeOptions('category')}
        selectedValues={filters.categories}
        onValueChange={(value) => handleFilterChange(value, 'categories')}
      />
      
      <FilterSelect
        placeholder="Select status"
        options={getAllInitiativeOptions('status')}
        selectedValues={filters.status}
        onValueChange={(value) => handleFilterChange(value, 'status')}
      />

      <FilterSelect
        placeholder="Select tags"
        options={getAllInitiativeOptions('tags')}
        selectedValues={filters.tags}
        onValueChange={(value) => handleFilterChange(value, 'tags')}
      />
    </div>
  );
};

export default InitiativeFilters;
