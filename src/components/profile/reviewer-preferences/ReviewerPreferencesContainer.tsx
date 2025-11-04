import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CategoryPreferences } from "./CategoryPreferences";
import { CompanyPreferences } from "./CompanyPreferences";
import { ProductPreferences } from "./ProductPreferences";

interface ReviewerPreferencesContainerProps {
  userId: string;
}

interface Preference {
  id: string;
  preference_type: 'category' | 'company' | 'product';
  category?: string;
  company_id?: string;
  product_id?: string;
  priority: number;
  notes?: string;
}

export function ReviewerPreferencesContainer({ userId }: ReviewerPreferencesContainerProps) {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreferences();
  }, [userId]);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('reviewer_expertise')
        .select('*')
        .eq('user_id', userId)
        .returns<Preference[]>();

      if (error) throw error;

      setPreferences((data || []) as Preference[]);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPreference = async (
    type: 'category' | 'company' | 'product',
    value: string
  ) => {
    try {
      const insertData: any = {
        user_id: userId,
        preference_type: type,
        priority: 5,
      };

      if (type === 'category') insertData.category = value;
      else if (type === 'company') insertData.company_id = value;
      else if (type === 'product') insertData.product_id = value;

      const { error } = await supabase
        .from('reviewer_expertise')
        .insert(insertData);

      if (error) throw error;

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added`);
      fetchPreferences();
    } catch (error) {
      console.error('Error adding preference:', error);
      toast.error('Failed to add preference');
    }
  };

  const handleRemovePreference = async (
    type: 'category' | 'company' | 'product',
    value: string
  ) => {
    try {
      const query = supabase
        .from('reviewer_expertise')
        .delete()
        .eq('user_id', userId)
        .eq('preference_type', type);

      if (type === 'category') query.eq('category', value);
      else if (type === 'company') query.eq('company_id', value);
      else if (type === 'product') query.eq('product_id', value);

      const { error } = await query;

      if (error) throw error;

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`);
      fetchPreferences();
    } catch (error) {
      console.error('Error removing preference:', error);
      toast.error('Failed to remove preference');
    }
  };

  const handlePriorityChange = async (
    type: 'category' | 'company' | 'product',
    value: string,
    priority: number
  ) => {
    try {
      // Update local state immediately for better UX
      setPreferences(prev =>
        prev.map(p => {
          if (p.preference_type === type) {
            if (type === 'category' && p.category === value) return { ...p, priority };
            if (type === 'company' && p.company_id === value) return { ...p, priority };
            if (type === 'product' && p.product_id === value) return { ...p, priority };
          }
          return p;
        })
      );

      const query = supabase
        .from('reviewer_expertise')
        .update({ priority })
        .eq('user_id', userId)
        .eq('preference_type', type);

      if (type === 'category') query.eq('category', value);
      else if (type === 'company') query.eq('company_id', value);
      else if (type === 'product') query.eq('product_id', value);

      const { error } = await query;

      if (error) throw error;
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
      fetchPreferences(); // Revert on error
    }
  };

  const categoryPreferences = preferences
    .filter(p => p.preference_type === 'category' && p.category)
    .map(p => ({ category: p.category!, priority: p.priority }));

  const companyPreferences = preferences
    .filter(p => p.preference_type === 'company' && p.company_id)
    .map(p => ({ company_id: p.company_id!, priority: p.priority }));

  const productPreferences = preferences
    .filter(p => p.preference_type === 'product' && p.product_id)
    .map(p => ({ product_id: p.product_id!, priority: p.priority }));

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
                  Product matches have the highest impact on assignment decisions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Summary Stats */}
        <div className="flex gap-2 mt-4">
          <Badge variant="outline">
            {categoryPreferences.length} {categoryPreferences.length === 1 ? 'Category' : 'Categories'}
          </Badge>
          <Badge variant="outline">
            {companyPreferences.length} {companyPreferences.length === 1 ? 'Company' : 'Companies'}
          </Badge>
          <Badge variant="outline">
            {productPreferences.length} {productPreferences.length === 1 ? 'Product' : 'Products'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">
              Task Categories
              {categoryPreferences.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {categoryPreferences.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="companies">
              Companies
              {companyPreferences.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {companyPreferences.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="products">
              Products
              {productPreferences.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {productPreferences.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <CategoryPreferences
              preferences={categoryPreferences}
              onAdd={(category) => handleAddPreference('category', category)}
              onRemove={(category) => handleRemovePreference('category', category)}
              onPriorityChange={(category, priority) => 
                handlePriorityChange('category', category, priority)
              }
            />
          </TabsContent>

          <TabsContent value="companies" className="mt-6">
            <CompanyPreferences
              preferences={companyPreferences}
              onAdd={(companyId) => handleAddPreference('company', companyId)}
              onRemove={(companyId) => handleRemovePreference('company', companyId)}
              onPriorityChange={(companyId, priority) => 
                handlePriorityChange('company', companyId, priority)
              }
            />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductPreferences
              preferences={productPreferences}
              onAdd={(productId) => handleAddPreference('product', productId)}
              onRemove={(productId) => handleRemovePreference('product', productId)}
              onPriorityChange={(productId, priority) => 
                handlePriorityChange('product', productId, priority)
              }
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
