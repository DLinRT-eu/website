import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";

interface FilterState {
  tasks: string[];
  locations: string[];
  companies: string[];
  certifications: string[];
  modalities: string[];
}

export interface FilterBarProps {
  onFiltersChange?: (active: boolean) => void;
  onFilterUpdate?: (filters: FilterState) => void;
}

const FilterBar = ({ onFiltersChange, onFilterUpdate }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    companies: [],
    certifications: [],
    modalities: []
  });

  useEffect(() => {
    const handleReset = () => {
      setFilters({
        tasks: [],
        locations: [],
        companies: [],
        certifications: [],
        modalities: []
      });
    };

    window.addEventListener('resetFilters', handleReset);
    return () => window.removeEventListener('resetFilters', handleReset);
  }, []);

  useEffect(() => {
    onFiltersChange?.(
      Boolean(filters.tasks.length || filters.locations.length || filters.companies.length || filters.certifications.length || filters.modalities.length)
    );
    onFilterUpdate?.(filters);
  }, [filters, onFiltersChange, onFilterUpdate]);

  const handleFilterChange = (value: string, filterType: keyof FilterState) => {
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

  const getAllOptions = (field: keyof Product): string[] => {
    switch (field) {
      case 'category':
        return [...new Set(SAMPLE_PRODUCTS.map(p => p.category))];
      case 'anatomicalLocation':
        return [...new Set(SAMPLE_PRODUCTS.flatMap(p => p.anatomicalLocation || []))];
      case 'company':
        return [...new Set(SAMPLE_PRODUCTS.map(p => p.company))];
      case 'certification':
        return [...new Set(SAMPLE_PRODUCTS.map(p => p.certification || '').filter(Boolean))];
      case 'modality':
        return [...new Set(SAMPLE_PRODUCTS.map(p => p.modality || '').filter(Boolean))];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 p-4 rounded-lg bg-[#00A6D6]/5">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#00A6D6]" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <Select
        value={filters.tasks.join(',')}
        onValueChange={(value) => handleFilterChange(value, 'tasks')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select tasks" />
        </SelectTrigger>
        <SelectContent>
          {getAllOptions('category').map((task) => (
            <SelectItem 
              key={task} 
              value={task}
              className={filters.tasks.includes(task) ? "bg-[#00A6D6]/10" : ""}
            >
              {task}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.locations.join(',')}
        onValueChange={(value) => handleFilterChange(value, 'locations')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select locations" />
        </SelectTrigger>
        <SelectContent>
          {getAllOptions('anatomicalLocation').map((location) => (
            <SelectItem 
              key={location} 
              value={location}
              className={filters.locations.includes(location) ? "bg-[#00A6D6]/10" : ""}
            >
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.companies.join(',')}
        onValueChange={(value) => handleFilterChange(value, 'companies')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select companies" />
        </SelectTrigger>
        <SelectContent>
          {getAllOptions('company').map((company) => (
            <SelectItem 
              key={company} 
              value={company}
              className={filters.companies.includes(company) ? "bg-[#00A6D6]/10" : ""}
            >
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.certifications.join(',')}
        onValueChange={(value) => handleFilterChange(value, 'certifications')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select certifications" />
        </SelectTrigger>
        <SelectContent>
          {getAllOptions('certification').map((cert) => (
            <SelectItem 
              key={cert} 
              value={cert}
              className={filters.certifications.includes(cert) ? "bg-[#00A6D6]/10" : ""}
            >
              {cert}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.modalities.join(',')}
        onValueChange={(value) => handleFilterChange(value, 'modalities')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select modality" />
        </SelectTrigger>
        <SelectContent>
          {getAllOptions('modality').map((modality) => (
            <SelectItem 
              key={modality} 
              value={modality}
              className={filters.modalities.includes(modality) ? "bg-[#00A6D6]/10" : ""}
            >
              {modality}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
