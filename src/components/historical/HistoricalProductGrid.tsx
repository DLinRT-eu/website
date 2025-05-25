
import { useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import ProductGridControls from "../grid/ProductGridControls";
import ProductPagination from "../grid/ProductPagination";
import { SortOption } from "../grid/SortControls";
import { ProductDetails } from "@/types/productDetails";

interface HistoricalProductGridProps {
  products: ProductDetails[];
  quarter: string;
  searchQuery?: string;
}

const HistoricalProductGrid = ({ products, quarter, searchQuery = "" }: HistoricalProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortBy, setSortBy] = useState<SortOption>("random");
  const [ascending, setAscending] = useState(true);

  // Apply search filter if a query exists
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product => {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name?.toLowerCase().includes(query);
      const companyMatch = product.company?.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query);
      const featuresMatch = product.features?.some(feature => 
        feature.toLowerCase().includes(query)
      );
      const categoryMatch = product.category?.toLowerCase().includes(query);
      
      return nameMatch || companyMatch || descriptionMatch || featuresMatch || categoryMatch;
    });
  }, [products, searchQuery]);

  // Sort products based on current sorting criteria
  const sortedProducts = useMemo(() => {
    if (sortBy === "random") {
      return searchFilteredProducts;
    }
    return [...searchFilteredProducts].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = (a.name || "").localeCompare(b.name || "");
          break;
        case "releaseDate":
          const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case "lastUpdated":
          const aUpdated = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const bUpdated = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          comparison = aUpdated - bUpdated;
          break;
      }
      
      return ascending ? comparison : -comparison;
    });
  }, [searchFilteredProducts, sortBy, ascending]);

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
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Products from {quarter}
        </h2>
        <p className="text-gray-600">
          Historical snapshot of {products.length} products
        </p>
      </div>

      <ProductGridControls
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        products={sortedProducts}
        sortBy={sortBy}
        ascending={ascending}
        onSortChange={handleSortChange}
        onDirectionChange={handleDirectionChange}
      />
      
      <div className="mb-4 text-sm text-gray-500">
        Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
        {searchQuery ? ' based on your search' : ''}
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No products found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product, index) => {
            const productWithLogoUrl = {
              ...product,
              logoUrl: product.logoUrl || '/placeholder.svg'
            };
            return (
              <ProductCard 
                key={product.id || `historical-${quarter}-${index}`} 
                {...productWithLogoUrl} 
              />
            );
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

export default HistoricalProductGrid;
