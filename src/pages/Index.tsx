
import React, { useState } from 'react';
import IntroSection from "@/components/IntroSection";
import NewsSection from "@/components/NewsSection";
import SearchHeader from "@/components/SearchHeader";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { Link } from "react-router-dom";

const Index = () => {
  const [filtersActive, setFiltersActive] = useState(false);

  const handleResetFilters = () => {
    // We'll dispatch a custom event that FilterBar will listen to
    const event = new CustomEvent('resetFilters');
    window.dispatchEvent(event);
    setFiltersActive(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <IntroSection />
      <NewsSection />
      <SearchHeader />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
          <button 
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-[#00A6D6] transition-colors cursor-pointer"
          >
            Showing all products
          </button>
        </div>
        <FilterBar onFiltersChange={setFiltersActive} />
        <ProductGrid />
        <footer className="mt-16 border-t border-gray-200 pt-8 pb-12">
          <div className="flex justify-center space-x-8">
            <Link 
              to="/maintenance-team" 
              className="text-[#00A6D6] hover:text-[#00A6D6]/80 transition-colors duration-200"
            >
              Meet Our Maintenance Team
            </Link>
            <Link 
              to="/donate" 
              className="text-[#9b87f5] hover:text-[#8b5cf6] transition-colors duration-200"
            >
              Support Our Project
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
