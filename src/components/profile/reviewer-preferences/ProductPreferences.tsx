import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PreferenceSearchCombo } from "./PreferenceSearchCombo";
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
  const [filterCompany, setFilterCompany] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const selectedProductIds = preferences.map(p => p.product_id);

  const productMap = useMemo(() => {
    const map = new Map();
    ALL_PRODUCTS.forEach(product => {
      map.set(product.id, product);
    });
    return map;
  }, []);

  const companies = useMemo(() => {
    const uniqueCompanies = new Set(ALL_PRODUCTS.map(p => p.company));
    return Array.from(uniqueCompanies).sort();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(ALL_PRODUCTS.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      if (filterCompany !== "all" && product.company !== filterCompany) return false;
      if (filterCategory !== "all" && product.category !== filterCategory) return false;
      return true;
    });
  }, [filterCompany, filterCategory]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Filter by Company</Label>
          <Select value={filterCompany} onValueChange={setFilterCompany}>
            <SelectTrigger>
              <SelectValue placeholder="All companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Filter by Category</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {CATEGORY_LABELS[category] || category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Add */}
      <div className="space-y-3">
        <Label>Search and Add Products</Label>
        <PreferenceSearchCombo
          items={filteredProducts}
          selectedIds={selectedProductIds}
          onSelect={onAdd}
          getId={(product) => product.id || ""}
          getLabel={(product) => product.name}
          getSearchText={(product) => 
            `${product.name} ${product.company} ${product.category} ${product.modality || ''}`
          }
          renderItem={(product) => (
            <div className="flex flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="text-xs text-muted-foreground">
                {product.company} • {CATEGORY_LABELS[product.category] || product.category}
              </span>
            </div>
          )}
          placeholder="Search products..."
          emptyText="No products found."
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
