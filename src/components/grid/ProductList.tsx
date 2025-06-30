
import { useMemo } from "react";
import ProductCard from "../ProductCard";
import ProductPagination from "./ProductPagination";
import { ProductDetails } from "@/types/productDetails";

interface ProductListProps {
  products: ProductDetails[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  advancedSearch: boolean;
  hasFilters: boolean;
}

const ProductList = ({ 
  products, 
  currentPage, 
  itemsPerPage, 
  onPageChange,
  searchQuery,
  advancedSearch,
  hasFilters
}: ProductListProps) => {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <h3 className="text-xl font-medium text-gray-700">No products found</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search or filter criteria
        </p>
        <button
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => window.dispatchEvent(new CustomEvent('resetFilters'))}
          aria-label="Reset all filters"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Product count display */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        {hasFilters || searchQuery ? ' based on your filters' : ''}
        {searchQuery && advancedSearch && (
          <span className="ml-2 text-blue-600 font-medium">
            (Advanced search enabled)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => {
          try {
            // Ensure product has the required properties for ProductCard
            const productWithLogoUrl = {
              ...product,
              logoUrl: product.logoUrl || '/placeholder.svg'
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

      {totalPages > 1 && (
        <div className="mt-8">
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
