
import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductGridControls from "./grid/ProductGridControls";
import ProductPagination from "./grid/ProductPagination";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "./grid/SortControls";

interface ProductGridProps {
  filters?: FilterState;
}

const ProductGrid = ({ filters }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [ascending, setAscending] = useState(true);

  // Get filtered products from data service
  const filteredProducts = filters 
    ? dataService.filterProducts(filters)
    : dataService.getAllProducts();

  // Sort products based on current sorting criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

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
