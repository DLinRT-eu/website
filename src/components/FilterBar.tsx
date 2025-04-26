
import React from "react";
import { Filter } from "lucide-react";
import { FilterSelect } from "./filters/FilterSelect";
import { useFilters } from "@/hooks/useFilters";
import { getAllOptions } from "@/utils/filterOptions";
import type { FilterBarProps } from "@/types/filters";

const FilterBar = ({ onFiltersChange, onFilterUpdate }: FilterBarProps) => {
  const { filters, handleFilterChange } = useFilters(onFiltersChange, onFilterUpdate);

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 p-4 rounded-lg bg-[#00A6D6]/5">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#00A6D6]" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <FilterSelect
        placeholder="Select tasks"
        options={getAllOptions('category')}
        selectedValues={filters.tasks}
        onValueChange={(value) => handleFilterChange(value, 'tasks')}
      />

      <FilterSelect
        placeholder="Select locations"
        options={[...getAllOptions('anatomicalLocation'), 'Head & Neck']}
        selectedValues={filters.locations}
        onValueChange={(value) => handleFilterChange(value, 'locations')}
      />

      <FilterSelect
        placeholder="Select certifications"
        options={getAllOptions('certification')}
        selectedValues={filters.certifications}
        onValueChange={(value) => handleFilterChange(value, 'certifications')}
      />

      <FilterSelect
        placeholder="Select modality"
        options={getAllOptions('modality')}
        selectedValues={filters.modalities}
        onValueChange={(value) => handleFilterChange(value, 'modalities')}
      />
    </div>
  );
};

export default FilterBar;
