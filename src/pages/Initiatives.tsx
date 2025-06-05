
import React from 'react';
import InitiativesHeader from '@/components/initiatives/InitiativesHeader';
import InitiativesFiltersSection from '@/components/initiatives/InitiativesFiltersSection';
import InitiativesSortSection from '@/components/initiatives/InitiativesSortSection';
import InitiativesCategorySections from '@/components/initiatives/InitiativesCategorySections';
import { useInitiativesData } from '@/hooks/useInitiativesData';
import { useInitiativesSorting } from '@/hooks/useInitiativesSorting';
import Footer from "@/components/Footer";

const Initiatives = () => {
  const {
    filteredInitiatives,
    isFiltering,
    searchQuery,
    handleFilterUpdate,
    handleSearch,
    setIsFiltering
  } = useInitiativesData();

  const {
    sortBy,
    ascending,
    challenges,
    datasets,
    modelZoos,
    handleSortChange,
    handleDirectionChange
  } = useInitiativesSorting(filteredInitiatives);

  return (
    <div className="container mx-auto px-4 py-8">
      <InitiativesHeader />

      <InitiativesFiltersSection
        onSearch={handleSearch}
        onFiltersChange={setIsFiltering}
        onFilterUpdate={handleFilterUpdate}
      />

      <InitiativesSortSection
        filteredCount={filteredInitiatives.length}
        isFiltering={isFiltering}
        searchQuery={searchQuery}
        sortBy={sortBy}
        ascending={ascending}
        onSortChange={handleSortChange}
        onDirectionChange={handleDirectionChange}
      />

      <InitiativesCategorySections
        challenges={challenges}
        datasets={datasets}
        modelZoos={modelZoos}
        filteredInitiatives={filteredInitiatives}
      />
      
      <Footer />
    </div>
  );
};

export default Initiatives;
