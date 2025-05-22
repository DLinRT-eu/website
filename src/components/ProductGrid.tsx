
import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductGridControls from "./grid/ProductGridControls";
import ProductPagination from "./grid/ProductPagination";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "./grid/SortControls";
import { ProductDetails } from "@/types/productDetails";

interface ProductGridProps {
  filters?: FilterState;
  searchQuery?: string;
}

const ProductGrid = ({ filters, searchQuery = "" }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortBy, setSortBy] = useState<SortOption>("random");
  const [ascending, setAscending] = useState(true);

  // Get filtered products from data service
  const filteredProducts = filters 
    ? dataService.filterProducts(filters)
    : dataService.getAllProducts();

  // Shuffle products randomly on each reload (only once)
  const shuffledProducts = useMemo(() => {
    const arr = [...filteredProducts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [filteredProducts]);

  // Apply search filter if a query exists
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return shuffledProducts;
    
    return shuffledProducts.filter(product => {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const companyMatch = product.company.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query);
      const featuresMatch = product.features?.some(feature => 
        feature.toLowerCase().includes(query)
      );
      const categoryMatch = product.category.toLowerCase().includes(query);
      
      return nameMatch || companyMatch || descriptionMatch || featuresMatch || categoryMatch;
    });
  }, [shuffledProducts, searchQuery]);

  // Sort products based on current sorting criteria
  const sortedProducts = useMemo(() => {
    if (sortBy === "random") {
      return searchFilteredProducts;
    }
    return [...searchFilteredProducts].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "releaseDate":
          // Handle potentially undefined release dates
          const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case "lastUpdated":
          // Handle potentially undefined last updated dates
          const aUpdated = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const bUpdated = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          comparison = aUpdated - bUpdated;
          break;
      }
      
      // Apply direction
      return ascending ? comparison : -comparison;
    });
  }, [searchFilteredProducts, sortBy, ascending]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handleDirectionChange = (isAscending: boolean) => {
    setAscending(isAscending);
    setCurrentPage(1);
  };

  return (
    <div>
      <ProductGridControls
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        products={sortedProducts}
        sortBy={sortBy}
        ascending={ascending}
        onSortChange={handleSortChange}
        onDirectionChange={handleDirectionChange}
      />
      
      {/* Product count display */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
        {(filters && (filters.tasks.length > 0 || filters.locations.length > 0 || filters.modalities.length > 0 || filters.certifications.length > 0)) || searchQuery ? ' based on your filters' : ''}
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12" role="status" aria-live="polite">
          <h3 className="text-xl font-medium text-gray-700">No products found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your search or filter criteria
          </p>
          {/* UI/UX: Reset Filters button for quick recovery */}
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => window.dispatchEvent(new CustomEvent('resetFilters'))}
            aria-label="Reset all filters"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => {
            try {
              // Ensure product has the required properties for ProductCard
              const productWithLogoUrl = {
                ...product,
                logoUrl: product.logoUrl || '/placeholder.svg' // Provide default if missing
              };
              return <ProductCard key={product.id || `product-${Math.random()}`} {...productWithLogoUrl} />;
            } catch (error) {
              console.error("Error rendering ProductCard:", error);
              return (
                <div className="text-red-500" key={product.id || `error-${Math.random()}`}>
                  Error loading product details.
                </div>
              );
            }
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
