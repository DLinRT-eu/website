import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ProductSelectionTable } from "./ProductSelectionTable";
import { ALL_PRODUCTS } from "@/data";
import { CATEGORY_LABELS } from "@/constants/productCategories";

interface ProductPreference {
  product_id: string;
  priority: number;
}

interface ProductPreferencesProps {
  preferences: ProductPreference[];
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
  onPriorityChange: (productId: string, priority: number) => void;
}

export function ProductPreferences({
  preferences,
  onAdd,
  onRemove,
  onPriorityChange,
}: ProductPreferencesProps) {
  const selectedProductIds = preferences.map(p => p.product_id);

  const productMap = useMemo(() => {
    const map = new Map();
    ALL_PRODUCTS.forEach(product => {
      map.set(product.id, product);
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Browse and Add Products */}
      <div className="space-y-3">
        <Label>Browse and Add Products</Label>
        <ProductSelectionTable
          products={ALL_PRODUCTS}
          selectedIds={selectedProductIds}
          onAdd={onAdd}
        />
      </div>

      {/* Current Preferences */}
      {preferences.length > 0 && (
        <div className="space-y-4">
          <Label>Your Product Expertise</Label>
          {preferences.map((item) => {
            const product = productMap.get(item.product_id);
            return (
              <div key={item.product_id} className="space-y-2 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {product?.name || item.product_id}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Priority: {item.priority}
                      </span>
                    </div>
                    {product && (
                      <p className="text-xs text-muted-foreground">
                        {product.company} • {CATEGORY_LABELS[product.category] || product.category}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.product_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Lower = Direct expertise</span>
                    <span>Higher = Basic familiarity</span>
                  </div>
                  <Slider
                    value={[item.priority]}
                    onValueChange={([value]) => onPriorityChange(item.product_id, value)}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {preferences.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            No products selected yet. Search and add products you have direct experience with.
          </p>
        </div>
      )}
    </div>
  );
}
