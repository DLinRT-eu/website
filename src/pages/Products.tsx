
import SearchHeader from "@/components/SearchHeader";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import { useState, useEffect } from "react";
import type { FilterState } from "@/types/filters";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { getAllOptions } from "@/utils/filterOptions";
import dataService from "@/services/DataService";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [filtersActive, setFiltersActive] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    certifications: [],
    modalities: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Get all products and count by category
  const allProducts = dataService.getAllProducts();
  const totalProductCount = allProducts.length;

  // Check URL parameters for initial filters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const taskParam = urlParams.get('task');
    
    if (taskParam) {
      const newFilters = { ...currentFilters, tasks: [taskParam] };
      setCurrentFilters(newFilters);
      setFiltersActive(true);
      
      // Dispatch an event to notify filter components about the change
      const event = new CustomEvent('setTaskFilter', { 
        detail: { task: taskParam }
      });
      window.dispatchEvent(event);
      
      toast.info(`Showing ${taskParam} products`);
    }
  }, [location.search]);

  useEffect(() => {
    // Check if preview is loaded
    const timer = setTimeout(() => {
      console.log("Page loaded and rendered");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    setSearchQuery("");
    toast.success("Filters have been reset");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterUpdate = (newFilters: FilterState) => {
    // Standardize certification labels to avoid duplicates
    if (newFilters.certifications) {
      newFilters.certifications = newFilters.certifications.map(cert => {
        if (cert.toLowerCase().includes('ce')) return 'CE Mark';
        if (cert.toLowerCase().includes('fda')) return 'FDA Cleared';
        return cert;
      });
    }
    
    setCurrentFilters(newFilters);
    setFiltersActive(
      Object.values(newFilters).some(filterArray => filterArray.length > 0)
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Products in Radiotherapy"
        description="Search and explore deep learning products in Radiotherapy, including auto-contouring, image synthesis, and treatment planning tools."
        canonical="https://dlinrt.eu/products"
        structuredData={structuredData}
      />
      <SearchHeader onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured Products
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({totalProductCount} total products)
            </span>
          </h2>
          <button 
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-[#00A6D6] transition-colors cursor-pointer"
          >
            {filtersActive || searchQuery ? 'Reset filters' : 'Showing all products'}
          </button>
        </div>
        
        <FilterBar 
          onFiltersChange={setFiltersActive} 
          onFilterUpdate={handleFilterUpdate}
        />
        <ProductGrid 
          filters={currentFilters} 
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
};

export default Products;
