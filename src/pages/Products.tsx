
import SearchHeader from "@/components/SearchHeader";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";
import type { FilterState } from "@/types/filters";
import SEO from "@/components/SEO";

const Products = () => {
  const [filtersActive, setFiltersActive] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    certifications: [],
    modalities: [],
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Radiotherapy Products",
    "description": "Search and explore deep learning products in Radiotherapy, including auto-contouring, image synthesis, and treatment planning tools",
    "url": "https://dlinrt.eu/products",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  const handleResetFilters = () => {
    const event = new CustomEvent('resetFilters');
    window.dispatchEvent(event);
    setFiltersActive(false);
    setCurrentFilters({
      tasks: [],
      locations: [],
      certifications: [],
      modalities: [],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Products in Radiotherapy"
        description="Search and explore deep learning products in Radiotherapy, including auto-contouring, image synthesis, and treatment planning tools."
        canonical="https://dlinrt.eu/products"
        structuredData={structuredData}
      />
      <SearchHeader />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
          <button 
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-[#00A6D6] transition-colors cursor-pointer"
          >
            Showing {filtersActive ? 'filtered' : 'all'} products
          </button>
        </div>
        <FilterBar 
          onFiltersChange={setFiltersActive} 
          onFilterUpdate={setCurrentFilters}
        />
        <ProductGrid filters={currentFilters} />
      </main>
    </div>
  );
};

export default Products;
