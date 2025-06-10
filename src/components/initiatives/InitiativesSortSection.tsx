
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
  const getSortDescription = () => {
    switch (sortBy) {
      case "random":
        return "randomly ordered";
      case "name":
        return `sorted by name (${ascending ? "A-Z" : "Z-A"})`;
      case "organization":
        return `sorted by organization (${ascending ? "A-Z" : "Z-A"})`;
      case "status":
        return `sorted by status (${ascending ? "Active first" : "Completed first"})`;
      case "startDate":
        return `sorted by start date (${ascending ? "oldest first" : "newest first"})`;
      default:
        return "";
    }
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-sm text-gray-500">
        Showing {filteredCount} initiatives
        {(isFiltering || searchQuery) ? " with the selected filters" : ""}, {getSortDescription()}
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
