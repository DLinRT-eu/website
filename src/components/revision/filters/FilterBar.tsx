
import React from 'react';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import CompanyFilter from './CompanyFilter';
import UrgencyFilter from './UrgencyFilter';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  companies: string[];
  selectedCategory: string | null;
  selectedCompany: string | null;
  selectedUrgency: string | null;
  onCategoryFilter: (category: string | null) => void;
  onCompanyFilter: (company: string | null) => void;
  onUrgencyFilter: (urgency: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  companies,
  selectedCategory,
  selectedCompany,
  selectedUrgency,
  onCategoryFilter,
  onCompanyFilter,
  onUrgencyFilter
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchFilter 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      
      <div className="flex flex-wrap gap-2">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryFilter={onCategoryFilter}
        />
        
        <CompanyFilter 
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanyFilter={onCompanyFilter}
        />
        
        <UrgencyFilter 
          selectedUrgency={selectedUrgency}
          onUrgencyFilter={onUrgencyFilter}
        />
      </div>
    </div>
  );
};

export default FilterBar;
