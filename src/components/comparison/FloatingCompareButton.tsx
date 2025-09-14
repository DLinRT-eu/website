import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, X, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingCompareButtonProps {
  selectedProducts: ProductDetails[];
  onCompare: () => void;
  onClear: () => void;
  onRemoveProduct: (productId: string) => void;
  maxProducts?: number;
}

const FloatingCompareButton = ({ 
  selectedProducts, 
  onCompare, 
  onClear,
  onRemoveProduct,
  maxProducts = 5 
}: FloatingCompareButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedProducts.length === 0) return null;

  const canCompare = selectedProducts.length >= 2;
  const isMaxReached = selectedProducts.length >= maxProducts;

  // Check if selected products have compatible tasks/categories
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
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <Card className="shadow-lg border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Scale className="h-5 w-5 text-primary" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {selectedProducts.length}
                </Badge>
              </div>
              <span className="font-semibold text-sm">Compare Products</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={canCompare ? "default" : "secondary"}>
              {selectedProducts.length} selected
            </Badge>
            {isMaxReached && (
              <Badge variant="destructive">Max reached</Badge>
            )}
            {!hasCompatibleTasks && selectedProducts.length > 1 && (
              <Badge variant="outline" className="text-destructive border-destructive">
                Incompatible
              </Badge>
            )}
          </div>

          {/* Warning message */}
          {!hasCompatibleTasks && selectedProducts.length > 1 && (
            <div className="text-xs text-destructive bg-destructive/5 rounded p-2 mb-3 border border-destructive/20">
              ⚠️ Products must have compatible tasks to compare effectively
            </div>
          )}

          {/* Product list (expandable) */}
          {isExpanded && (
            <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
              {selectedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex items-center justify-between text-xs bg-muted/50 rounded p-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-muted-foreground truncate">{product.company}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveProduct(product.id)}
                    className="h-5 w-5 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Compare button */}
          <Button
            onClick={onCompare}
            disabled={!canCompare || !hasCompatibleTasks}
            size="sm"
            className="w-full"
          >
            <Eye className="h-4 w-4 mr-2" />
            Compare {selectedProducts.length} Products
          </Button>

          {/* Help text */}
          {!canCompare && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Select at least 2 products to compare
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingCompareButton;