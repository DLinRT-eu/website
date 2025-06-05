
import React from 'react';
import InitiativeSearch from './InitiativeSearch';
import InitiativeFilters from './InitiativeFilters';
import { InitiativeFilterState } from '@/types/filters';

interface InitiativesFiltersSectionProps {
  onSearch: (query: string) => void;
  onFiltersChange: (isFiltering: boolean) => void;
  onFilterUpdate: (filters: InitiativeFilterState) => void;
}

const InitiativesFiltersSection = ({ 
  onSearch, 
  onFiltersChange, 
  onFilterUpdate 
}: InitiativesFiltersSectionProps) => {
  return (
    <>
      <InitiativeSearch onSearch={onSearch} />
      <InitiativeFilters 
        onFiltersChange={onFiltersChange}
        onFilterUpdate={onFilterUpdate}
      />
    </>
  );
};

export default InitiativesFiltersSection;
