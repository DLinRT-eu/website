
import { useState, useMemo } from 'react';
import { Initiative } from '@/types/initiative';
import { InitiativeSortOption } from '@/components/initiatives/InitiativeSortControls';

export const useInitiativesSorting = (filteredInitiatives: Initiative[]) => {
  const [sortBy, setSortBy] = useState<InitiativeSortOption>("random");
  const [ascending, setAscending] = useState(true);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Shuffle initiatives only when needed (on mount or when shuffle button is clicked)
  const shuffledInitiatives = useMemo(() => {
    if (sortBy !== "random") return filteredInitiatives;
    
    const shuffled = [...filteredInitiatives];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [filteredInitiatives, sortBy, shuffleKey]);

  // Sort initiatives (excluding random sorting which is handled above)
  const sortedInitiatives = useMemo(() => {
    if (sortBy === "random") {
      return shuffledInitiatives;
    }

    const sorted = [...shuffledInitiatives].sort((a, b) => {
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
  }, [shuffledInitiatives, sortBy, ascending]);

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
