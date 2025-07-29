
import { useState, useEffect } from "react";
import ProductGridControls from "./grid/ProductGridControls";
import ProductList from "./grid/ProductList";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "./grid/SortControls";
import { useProductSearch } from "./grid/ProductSearch";
import { useProductSorting, useProductShuffle } from "./grid/ProductSorting";
import { ProductDetails } from "@/types/productDetails";
import ProductComparison from "./comparison/ProductComparison";
import CompareButton from "./comparison/CompareButton";
import { Button } from "./ui/button";
import { Scale } from "lucide-react";
import CompareValidation from './validation/CompareValidation';

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

  // Comparison handlers
  const handleToggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    if (isCompareMode) {
      setSelectedProducts([]);
    }
  };

  const handleProductSelection = (product: ProductDetails, selected: boolean) => {
    if (selected) {
      // Check if product has same task as others
      if (selectedProducts.length > 0) {
        const firstCategory = selectedProducts[0].category;
        if (product.category !== firstCategory) {
          alert(`Cannot compare products from different categories. Selected products are from "${firstCategory}" category.`);
          return;
        }
      }
      
      // Check max selection limit
      if (selectedProducts.length >= 4) {
        alert('Maximum 4 products can be compared at once.');
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
      <div className="flex justify-between items-center mb-4">
        <ProductGridControls
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          products={sortedProducts}
          sortBy={sortBy}
          ascending={ascending}
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
        />
        
        <Button
          variant={isCompareMode ? "default" : "outline"}
          onClick={handleToggleCompareMode}
          className="flex items-center gap-2"
        >
          <Scale className="h-4 w-4" />
          {isCompareMode ? "Exit Compare" : "Compare Products"}
        </Button>
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
      />
      
      {isCompareMode && (
        <CompareButton
          selectedProducts={selectedProducts}
          onCompare={handleCompare}
          onClear={handleClearSelection}
        />
      )}
      
      <ProductComparison
        products={selectedProducts}
        isOpen={showComparison}
        onClose={handleCloseComparison}
      />
      
      <CompareValidation />
    </div>
  );
};

export default ProductGrid;
