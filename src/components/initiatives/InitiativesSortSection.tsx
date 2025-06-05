
import React from 'react';
import InitiativeSortControls, { InitiativeSortOption } from './InitiativeSortControls';

interface InitiativesSortSectionProps {
  filteredCount: number;
  isFiltering: boolean;
  searchQuery: string;
  sortBy: InitiativeSortOption;
  ascending: boolean;
  onSortChange: (option: InitiativeSortOption) => void;
  onDirectionChange: (ascending: boolean) => void;
}

const InitiativesSortSection = ({
  filteredCount,
  isFiltering,
  searchQuery,
  sortBy,
  ascending,
  onSortChange,
  onDirectionChange
}: InitiativesSortSectionProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-sm text-gray-500">
        Showing {filteredCount} initiatives
        {(isFiltering || searchQuery) ? " with the selected filters" : ""}
      </p>
      <InitiativeSortControls 
        onSortChange={onSortChange}
        onDirectionChange={onDirectionChange}
        sortBy={sortBy}
        ascending={ascending}
      />
    </div>
  );
};

export default InitiativesSortSection;
