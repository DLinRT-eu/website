
import { useState, useEffect } from "react";
import ProductGridControls from "./grid/ProductGridControls";
import ProductList from "./grid/ProductList";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "./grid/SortControls";
import { useProductSearch } from "./grid/ProductSearch";
import { useProductSorting, useProductShuffle } from "@/hooks/useProductSorting";
import { ProductDetails } from "@/types/productDetails";
import ProductComparison from "./comparison/ProductComparison";
import CompareButton from "./comparison/CompareButton";
import FloatingCompareButton from "./comparison/FloatingCompareButton";
import { Button } from "./ui/button";
import { Scale } from "lucide-react";

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
  
  // Comparison state
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductDetails[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Get filtered products from data service
  const filteredProducts = filters 
    ? dataService.filterProducts(filters)
    : dataService.getAllProducts();

  // Shuffle products randomly on each reload (only once), but not in compare mode
  const shuffledProducts = useProductShuffle(filteredProducts);

  // Apply search filtering
  const searchFilteredProducts = useProductSearch({
    products: shuffledProducts,
    searchQuery,
    advancedSearch
  });

  // Apply sorting - disable random sort in compare mode
  const sortedProducts = useProductSorting({
    products: searchFilteredProducts,
    sortBy: isCompareMode && sortBy === "random" ? "name" : sortBy,
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

  // Comparison handlers
  const handleToggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    if (isCompareMode) {
      setSelectedProducts([]);
    }
  };

  const handleProductSelection = (product: ProductDetails, selected: boolean) => {
    if (selected) {
      // Check if product has compatible tasks with others (including secondary categories)
      if (selectedProducts.length > 0) {
        const getProductCategories = (p: ProductDetails) => {
          const categories = [p.category];
          if (p.secondaryCategories) {
            categories.push(...p.secondaryCategories);
          }
          return categories;
        };

        const firstProductCategories = getProductCategories(selectedProducts[0]);
        const productCategories = getProductCategories(product);
        const hasCompatibleCategories = firstProductCategories.some(cat => 
          productCategories.includes(cat)
        );

        if (!hasCompatibleCategories) {
          alert(`Cannot compare products without compatible categories. Selected products have categories: "${firstProductCategories.join(', ')}" and this product has: "${productCategories.join(', ')}".`);
          return;
        }
      }
      
      // Check max selection limit
      if (selectedProducts.length >= 5) {
        alert('Maximum 5 products can be compared at once.');
        return;
      }
      
      setSelectedProducts(prev => [...prev, product]);
    } else {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleCompare = () => {
    if (selectedProducts.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
  };

  return (
    <div>
      {/* Enhanced grid controls with better comparison discoverability */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
        <ProductGridControls
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          products={sortedProducts}
          sortBy={sortBy}
          ascending={ascending}
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant={isCompareMode ? "default" : "outline"}
            onClick={handleToggleCompareMode}
            className="flex items-center gap-2 touch-target-minimum"
          >
            <Scale className="h-4 w-4" />
            {isCompareMode ? "Exit Compare" : "Compare Products"}
          </Button>
          {!isCompareMode && (
            <div className="text-xs text-muted-foreground">
              Select products to compare
            </div>
          )}
        </div>
      </div>
      
      <ProductList
        products={sortedProducts}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        advancedSearch={advancedSearch}
        hasFilters={!!hasFilters}
        isSelectable={isCompareMode}
        selectedProducts={selectedProducts}
        onSelectionChange={handleProductSelection}
        showAllInCompareMode={true}
      />
      
      {/* Enhanced floating compare button */}
      <FloatingCompareButton
        selectedProducts={selectedProducts}
        onCompare={handleCompare}
        onClear={handleClearSelection}
        onRemoveProduct={(productId) => {
          const updatedProducts = selectedProducts.filter(p => p.id !== productId);
          setSelectedProducts(updatedProducts);
        }}
      />
      
      <ProductComparison
        products={selectedProducts}
        isOpen={showComparison}
        onClose={handleCloseComparison}
      />
    </div>
  );
};

export default ProductGrid;
