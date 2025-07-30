import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, X } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';

interface CompareButtonProps {
  selectedProducts: ProductDetails[];
  onCompare: () => void;
  onClear: () => void;
  maxProducts?: number;
}

const CompareButton = ({ 
  selectedProducts, 
  onCompare, 
  onClear, 
  maxProducts = 5 
}: CompareButtonProps) => {
  if (selectedProducts.length === 0) return null;

  const canCompare = selectedProducts.length >= 2;
  const isMaxReached = selectedProducts.length >= maxProducts;

  // Check if selected products have compatible tasks/categories (including secondary categories)
  const getProductCategories = (product: ProductDetails) => {
    const categories = [product.category];
    if (product.secondaryCategories) {
      categories.push(...product.secondaryCategories);
    }
    return categories;
  };

  const firstProductCategories = selectedProducts[0] ? getProductCategories(selectedProducts[0]) : [];
  const hasCompatibleTasks = selectedProducts.length <= 1 || selectedProducts.every(product => {
    const productCategories = getProductCategories(product);
    return firstProductCategories.some(cat => productCategories.includes(cat));
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-background border rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Compare Products</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant={canCompare ? "default" : "secondary"}>
            {selectedProducts.length} selected
          </Badge>
          {isMaxReached && (
            <Badge variant="destructive">Max reached</Badge>
          )}
        </div>
        
        {!hasCompatibleTasks && selectedProducts.length > 1 && (
          <div className="text-xs text-destructive">
            ⚠️ Products must have compatible tasks to compare
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3 max-h-24 overflow-y-auto">
        {selectedProducts.map((product) => (
          <div key={product.id} className="text-xs text-muted-foreground truncate">
            • {product.name}
          </div>
        ))}
      </div>

      <Button
        onClick={onCompare}
        disabled={!canCompare || !hasCompatibleTasks}
        size="sm"
        className="w-full"
      >
        Compare {selectedProducts.length} Products
      </Button>
      
      {!canCompare && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Select at least 2 products to compare
        </p>
      )}
    </div>
  );
};

export default CompareButton;