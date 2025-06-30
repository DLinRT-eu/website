
import { useState, useEffect } from "react";
import ProductGridControls from "./grid/ProductGridControls";
import ProductList from "./grid/ProductList";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "./grid/SortControls";
import { useProductSearch } from "./grid/ProductSearch";
import { useProductSorting, useProductShuffle } from "./grid/ProductSorting";

interface ProductGridProps {
  filters?: FilterState;
  searchQuery?: string;
  advancedSearch?: boolean;
}

const ProductGrid = ({ filters, searchQuery = "", advancedSearch = false }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortBy, setSortBy] = useState<SortOption>("random");
  const [ascending, setAscending] = useState(true);

  // Get filtered products from data service
  const filteredProducts = filters 
    ? dataService.filterProducts(filters)
    : dataService.getAllProducts();

  // Shuffle products randomly on each reload (only once)
  const shuffledProducts = useProductShuffle(filteredProducts);

  // Apply search filtering
  const searchFilteredProducts = useProductSearch({
    products: shuffledProducts,
    searchQuery,
    advancedSearch
  });

  // Apply sorting
  const sortedProducts = useProductSorting({
    products: searchFilteredProducts,
    sortBy,
    ascending
  });

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  const hasFilters = filters && (
    filters.tasks.length > 0 || 
    filters.locations.length > 0 || 
    filters.modalities.length > 0 || 
    filters.certifications.length > 0
  );

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
      
      <ProductList
        products={sortedProducts}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        advancedSearch={advancedSearch}
        hasFilters={!!hasFilters}
      />
    </div>
  );
};

export default ProductGrid;
