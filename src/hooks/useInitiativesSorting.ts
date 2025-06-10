
import { useState, useMemo, useEffect } from 'react';
import { Initiative } from '@/types/initiative';
import { InitiativeSortOption } from '@/components/initiatives/InitiativeSortControls';

export const useInitiativesSorting = (filteredInitiatives: Initiative[]) => {
  const [sortBy, setSortBy] = useState<InitiativeSortOption>("random");
  const [ascending, setAscending] = useState(true);
  const [randomSeed, setRandomSeed] = useState(() => Math.random());

  // Generate new random seed when component mounts or when random sort is selected
  useEffect(() => {
    if (sortBy === "random") {
      setRandomSeed(Math.random());
    }
  }, [sortBy]);

  // Fisher-Yates shuffle algorithm for proper randomization
  const shuffleArray = (array: Initiative[], seed: number): Initiative[] => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    
    // Use seed to create a pseudo-random number generator
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    let seedValue = seed;
    
    while (currentIndex !== 0) {
      // Generate random index using seeded random
      seedValue = seededRandom(seedValue * 9301 + 49297) * 100000;
      const randomIndex = Math.floor(seededRandom(seedValue) * currentIndex);
      currentIndex--;
      
      // Swap elements
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    
    return shuffled;
  };

  // Sort initiatives based on the selected option
  const sortedInitiatives = useMemo(() => {
    if (sortBy === "random") {
      return shuffleArray(filteredInitiatives, randomSeed);
    }
    
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
        case "startDate":
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
          comparison = dateA - dateB;
          break;
        default:
          return 0;
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
