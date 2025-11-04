import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { PRODUCT_CATEGORIES, CATEGORY_LABELS } from "@/constants/productCategories";

interface CategoryPreference {
  category: string;
  priority: number;
}

interface CategoryPreferencesProps {
  preferences: CategoryPreference[];
  onAdd: (category: string) => void;
  onRemove: (category: string) => void;
  onPriorityChange: (category: string, priority: number) => void;
}

export function CategoryPreferences({
  preferences,
  onAdd,
  onRemove,
  onPriorityChange,
}: CategoryPreferencesProps) {
  const selectedCategories = preferences.map(p => p.category);
  const availableCategories = PRODUCT_CATEGORIES.filter(
    cat => !selectedCategories.includes(cat)
  );

  return (
    <div className="space-y-6">
      {/* Current Preferences */}
      {preferences.length > 0 && (
        <div className="space-y-4">
          <Label>Your Task Expertise Areas</Label>
          {preferences.map((item) => (
            <div key={item.category} className="space-y-2 p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {CATEGORY_LABELS[item.category] || item.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Priority: {item.priority}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.category)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Lower = Stronger expertise</span>
                  <span>Higher = Less familiar</span>
                </div>
                <Slider
                  value={[item.priority]}
                  onValueChange={([value]) => onPriorityChange(item.category, value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Category */}
      {availableCategories.length > 0 && (
        <div className="space-y-3">
          <Label>Add Task Category</Label>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => onAdd(category)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {CATEGORY_LABELS[category] || category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {preferences.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            No task categories selected yet. Add categories above to indicate your expertise areas.
          </p>
        </div>
      )}
    </div>
  );
}
