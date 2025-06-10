
import { useState, useMemo, useEffect } from 'react';
import { Initiative } from '@/types/initiative';
import { InitiativeSortOption } from '@/components/initiatives/InitiativeSortControls';

export const useInitiativesSorting = (filteredInitiatives: Initiative[]) => {
  const [sortBy, setSortBy] = useState<InitiativeSortOption>("random");
  const [ascending, setAscending] = useState(true);
  const [randomSeed, setRandomSeed] = useState(Math.random());

  // Generate new random seed when component mounts or when random sort is selected
  useEffect(() => {
    if (sortBy === "random") {
      setRandomSeed(Math.random());
    }
  }, [sortBy]);

  // Sort initiatives based on the selected option
  const sortedInitiatives = useMemo(() => {
    const sorted = [...filteredInitiatives].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "random":
          // Use a seeded pseudo-random sort to ensure consistency during the same session
          const seedA = (a.id + randomSeed.toString()).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const seedB = (b.id + randomSeed.toString()).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          comparison = (seedA % 1000) - (seedB % 1000);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "organization":
          comparison = a.organization.localeCompare(b.organization);
          break;
        case "status":
          const statusOrder = { "Active": 0, "Completed": 1, "Upcoming": 2 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "startDate":
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
          comparison = dateA - dateB;
          break;
        default:
          return 0;
      }
      
      // For random sorting, don't apply ascending/descending
      if (sortBy === "random") {
        return comparison;
      }
      
      return ascending ? comparison : -comparison;
    });

    return sorted;
  }, [filteredInitiatives, sortBy, ascending, randomSeed]);

  const handleSortChange = (option: InitiativeSortOption) => {
    setSortBy(option);
  };

  const handleDirectionChange = (isAscending: boolean) => {
    setAscending(isAscending);
  };

  // Group initiatives by category using the sorted results
  const challenges = useMemo(() => {
    return sortedInitiatives.filter(
      (initiative) => initiative.category === 'Grand Challenge'
    );
  }, [sortedInitiatives]);
  
  const datasets = useMemo(() => {
    return sortedInitiatives.filter(
      (initiative) => initiative.category === 'Open Dataset'
    );
  }, [sortedInitiatives]);

  const modelZoos = useMemo(() => {
    return sortedInitiatives.filter(
      (initiative) => initiative.category === 'Model Zoo'
    );
  }, [sortedInitiatives]);

  return {
    sortBy,
    ascending,
    sortedInitiatives,
    challenges,
    datasets,
    modelZoos,
    handleSortChange,
    handleDirectionChange
  };
};
