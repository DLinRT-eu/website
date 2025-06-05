
import { useState, useMemo } from 'react';
import { Initiative } from '@/types/initiative';
import { InitiativeSortOption } from '@/components/initiatives/InitiativeSortControls';

export const useInitiativesSorting = (filteredInitiatives: Initiative[]) => {
  const [sortBy, setSortBy] = useState<InitiativeSortOption>("status");
  const [ascending, setAscending] = useState(true);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Sort initiatives based on the selected option
  const sortedInitiatives = useMemo(() => {
    if (sortBy === "random") {
      // Only shuffle when random is selected
      const shuffled = [...filteredInitiatives];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // For all other sorting options, work directly with filteredInitiatives
    const sorted = [...filteredInitiatives].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
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
        default:
          return 0;
      }
      
      return ascending ? comparison : -comparison;
    });

    return sorted;
  }, [filteredInitiatives, sortBy, ascending, shuffleKey]);

  const handleSortChange = (option: InitiativeSortOption) => {
    setSortBy(option);
  };

  const handleDirectionChange = (isAscending: boolean) => {
    if (sortBy === "random") {
      // Trigger a re-shuffle by updating shuffle key
      setShuffleKey(prev => prev + 1);
    } else {
      setAscending(isAscending);
    }
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
