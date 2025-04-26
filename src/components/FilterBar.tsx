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

const FilterBar = ({ onFiltersChange }: { onFiltersChange?: (active: boolean) => void }) => {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedCertification, setSelectedCertification] = useState<string>("");

  useEffect(() => {
    const handleReset = () => {
      setSelectedTask("");
      setSelectedLocation("");
      setSelectedCompany("");
      setSelectedCertification("");
    };

    window.addEventListener('resetFilters', handleReset);
    return () => window.removeEventListener('resetFilters', handleReset);
  }, []);

  useEffect(() => {
    onFiltersChange?.(
      Boolean(selectedTask || selectedLocation || selectedCompany || selectedCertification)
    );
  }, [selectedTask, selectedLocation, selectedCompany, selectedCertification, onFiltersChange]);

  const getFilteredOptions = (field: 'task' | 'location' | 'company' | 'certification') => {
    const products = SAMPLE_PRODUCTS.filter((product: Product) => {
      if (selectedTask && product.category !== selectedTask) return false;
      if (selectedLocation && !product.anatomicalLocation?.includes(selectedLocation)) return false;
      if (selectedCompany && product.company !== selectedCompany) return false;
      if (selectedCertification && product.certification !== selectedCertification) return false;
      return true;
    });

    switch (field) {
      case 'task':
        return [...new Set(products.map(p => p.category))];
      case 'location':
        return [...new Set(products.flatMap(p => p.anatomicalLocation || []))];
      case 'company':
        return [...new Set(products.map(p => p.company))];
      case 'certification':
        return [...new Set(products.map(p => p.certification || '').filter(Boolean))];
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
      
      <Select value={selectedTask} onValueChange={setSelectedTask}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select task" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('task').map((task) => (
            <SelectItem key={task as string} value={task as string}>
              {task as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('location').map((location) => (
            <SelectItem key={location as string} value={location as string}>
              {location as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCompany} onValueChange={setSelectedCompany}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('company').map((company) => (
            <SelectItem key={company as string} value={company as string}>
              {company as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCertification} onValueChange={setSelectedCertification}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select certification" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('certification').map((cert) => (
            <SelectItem key={cert as string} value={cert as string}>
              {cert as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
