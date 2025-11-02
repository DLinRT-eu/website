import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { useProductFiltering } from "@/hooks/useProductFiltering";
import { FilterState } from "@/types/filters";
import FilterBar from "@/components/FilterBar";
import { SelectableProductCard } from "./SelectableProductCard";

interface ProductSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (productId: string) => void;
  selectedProductId?: string;
  excludeProductIds?: string[];
  allProducts: ProductDetails[];
  title?: string;
  description?: string;
}

export const ProductSelectorDialog = ({
  open,
  onOpenChange,
  onSelectProduct,
  selectedProductId,
  excludeProductIds = [],
  allProducts,
  title = "Select Product",
  description = "Search and filter to find the product you want to add",
}: ProductSelectorDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    certifications: [],
    modalities: [],
  });
  const [tempSelectedId, setTempSelectedId] = useState<string | undefined>(
    selectedProductId
  );

  // Filter out already adopted products
  const availableProducts = useMemo(
    () => allProducts.filter((p) => !excludeProductIds.includes(p.id)),
    [allProducts, excludeProductIds]
  );

  // Apply filtering
  const filteredProducts = useProductFiltering({
    products: availableProducts,
    filters,
    searchQuery,
  });

  const handleFilterUpdate = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({
      tasks: [],
      locations: [],
      certifications: [],
      modalities: [],
    });
  };

  const handleConfirm = () => {
    if (tempSelectedId) {
      onSelectProduct(tempSelectedId);
      onOpenChange(false);
    }
  };

  const hasActiveFilters =
    searchQuery ||
    filters.tasks.length > 0 ||
    filters.locations.length > 0 ||
    filters.certifications.length > 0 ||
    filters.modalities.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by product name, company, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <FilterBar onFilterUpdate={handleFilterUpdate} />

          {/* Results Count & Clear */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all filters
              </Button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <ScrollArea className="h-[400px] px-6">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {filteredProducts.map((product) => (
                <SelectableProductCard
                  key={product.id}
                  product={product}
                  isSelected={tempSelectedId === product.id}
                  onSelect={setTempSelectedId}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!tempSelectedId}>
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
