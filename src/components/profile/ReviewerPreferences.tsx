import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, X, Info } from "lucide-react";
import { PRODUCT_CATEGORIES, CATEGORY_LABELS } from "@/constants/productCategories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReviewerPreferencesProps {
  userId: string;
}

interface ExpertiseItem {
  category: string;
  priority: number;
  notes?: string;
}

export function ReviewerPreferences({ userId }: ReviewerPreferencesProps) {
  const [expertise, setExpertise] = useState<ExpertiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchExpertise();
  }, [userId]);

  const fetchExpertise = async () => {
    try {
      const { data, error } = await supabase
        .from('reviewer_expertise')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const expertiseData = data || [];
      setExpertise(expertiseData);

      // Calculate available categories
      const selectedCategories = expertiseData.map(e => e.category);
      setAvailableCategories(
        PRODUCT_CATEGORIES.filter(cat => !selectedCategories.includes(cat))
      );
    } catch (error) {
      console.error('Error fetching expertise:', error);
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (category: string) => {
    try {
      const { error } = await supabase
        .from('reviewer_expertise')
        .insert({
          user_id: userId,
          category,
          priority: 5
        });

      if (error) throw error;

      toast.success('Category added');
      fetchExpertise();
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  };

  const handleRemoveCategory = async (category: string) => {
    try {
      const { error } = await supabase
        .from('reviewer_expertise')
        .delete()
        .eq('user_id', userId)
        .eq('category', category);

      if (error) throw error;

      toast.success('Category removed');
      fetchExpertise();
    } catch (error) {
      console.error('Error removing category:', error);
      toast.error('Failed to remove category');
    }
  };

  const handlePriorityChange = async (category: string, priority: number) => {
    try {
      // Update local state immediately for better UX
      setExpertise(prev =>
        prev.map(e => e.category === category ? { ...e, priority } : e)
      );

      const { error } = await supabase
        .from('reviewer_expertise')
        .update({ priority })
        .eq('user_id', userId)
        .eq('category', category);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
      fetchExpertise(); // Revert on error
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Review Preferences</CardTitle>
            <CardDescription className="mt-1.5">
              Select your areas of expertise to receive relevant review assignments
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">
                  Priority levels (1-10): Lower numbers indicate stronger expertise.
                  Admins will prioritize assigning products that match your expertise.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Expertise */}
        {expertise.length > 0 && (
          <div className="space-y-4">
            <Label>Your Expertise Areas</Label>
            {expertise.map((item) => (
              <div key={item.category} className="space-y-2 p-4 border rounded-lg">
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
                    onClick={() => handleRemoveCategory(item.category)}
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
                    onValueChange={([value]) => handlePriorityChange(item.category, value)}
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
            <Label>Add Expertise Area</Label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddCategory(category)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {CATEGORY_LABELS[category] || category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {expertise.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              No expertise areas selected yet. Add categories above to start receiving review assignments.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
