import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Info, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CategoryPreferences } from "./CategoryPreferences";
import { CompanyPreferences } from "./CompanyPreferences";
import { ProductPreferences } from "./ProductPreferences";
import { PreferenceImportExport } from "./PreferenceImportExport";

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
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('🔵 [Preferences] Session verification:', {
        userId,
        sessionUserId: session?.user?.id,
        sessionEmail: session?.user?.email,
        sessionMatch: session?.user?.id === userId,
        error,
        timestamp: new Date().toISOString()
      });
    };
    
    verifySession();
    fetchPreferences();
  }, [userId]);

  const fetchPreferences = async () => {
    try {
      console.log('🔵 [Preferences] Fetching preferences for userId:', userId);
      
      const { data, error } = await supabase
        .from('reviewer_expertise')
        .select('*')
        .eq('user_id', userId)
        .returns<Preference[]>();

      if (error) {
        console.error('🔴 [Preferences] Fetch error:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      console.log('✅ [Preferences] Successfully fetched preferences:', {
        count: data?.length || 0,
        data,
        timestamp: new Date().toISOString()
      });

      setPreferences((data || []) as Preference[]);
    } catch (error: any) {
      console.error('🔴 [Preferences] Error in catch block:', {
        error,
        errorString: error?.toString(),
        timestamp: new Date().toISOString()
      });
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

      // LOG: Data being inserted
      console.log('🔵 [Preferences] Attempting to add preference:', {
        type,
        value,
        insertData,
        userId,
        timestamp: new Date().toISOString()
      });

      const { data, error } = await supabase
        .from('reviewer_expertise')
        .insert(insertData)
        .select(); // Add .select() to get back the inserted record

      if (error) {
        // LOG: Detailed error information
        console.error('🔴 [Preferences] Insert failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
          errorHint: error.hint,
          insertData,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      // LOG: Success with inserted record
      console.log('✅ [Preferences] Successfully added preference:', {
        type,
        value,
        insertedRecord: data,
        timestamp: new Date().toISOString()
      });

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added`);
      fetchPreferences();
    } catch (error: any) {
      // LOG: Catch block error
      console.error('🔴 [Preferences] Error in catch block:', {
        error,
        errorString: error?.toString(),
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      });
      
      // Show more detailed error to user
      toast.error(`Failed to add preference: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleRemovePreference = async (
    type: 'category' | 'company' | 'product',
    value: string
  ) => {
    try {
      console.log('🔵 [Preferences] Attempting to remove preference:', {
        type,
        value,
        userId,
        timestamp: new Date().toISOString()
      });

      const query = supabase
        .from('reviewer_expertise')
        .delete()
        .eq('user_id', userId)
        .eq('preference_type', type);

      if (type === 'category') query.eq('category', value);
      else if (type === 'company') query.eq('company_id', value);
      else if (type === 'product') query.eq('product_id', value);

      const { error } = await query;

      if (error) {
        console.error('🔴 [Preferences] Remove failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      console.log('✅ [Preferences] Successfully removed preference:', {
        type,
        value,
        timestamp: new Date().toISOString()
      });

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`);
      fetchPreferences();
    } catch (error: any) {
      console.error('🔴 [Preferences] Error removing preference:', {
        error,
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      });
      toast.error(`Failed to remove preference: ${error?.message || 'Unknown error'}`);
    }
  };

  const handlePriorityChange = async (
    type: 'category' | 'company' | 'product',
    value: string,
    priority: number
  ) => {
    try {
      console.log('🔵 [Preferences] Attempting to update priority:', {
        type,
        value,
        priority,
        userId,
        timestamp: new Date().toISOString()
      });

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

      if (error) {
        console.error('🔴 [Preferences] Priority update failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      console.log('✅ [Preferences] Successfully updated priority:', {
        type,
        value,
        priority,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('🔴 [Preferences] Error updating priority:', {
        error,
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      });
      toast.error(`Failed to update priority: ${error?.message || 'Unknown error'}`);
      fetchPreferences(); // Revert on error
    }
  };

  const handleBulkAddProducts = async (productIds: string[], priority: number) => {
    try {
      const insertData = productIds.map(productId => ({
        user_id: userId,
        preference_type: 'product' as const,
        product_id: productId,
        priority,
      }));

      console.log('🔵 [Preferences] Attempting bulk add products:', {
        productCount: productIds.length,
        productIds,
        priority,
        userId,
        timestamp: new Date().toISOString()
      });

      const { data, error } = await supabase
        .from('reviewer_expertise')
        .insert(insertData)
        .select();

      if (error) {
        console.error('🔴 [Preferences] Bulk add failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      console.log('✅ [Preferences] Successfully bulk added products:', {
        insertedCount: data?.length || 0,
        timestamp: new Date().toISOString()
      });

      fetchPreferences();
    } catch (error: any) {
      console.error('🔴 [Preferences] Error bulk adding products:', {
        error,
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  };

  const handleExport = () => {
    return {
      version: '1.0',
      exported_at: new Date().toISOString(),
      categories: categoryPreferences,
      companies: companyPreferences,
      products: productPreferences,
    };
  };

  const handleImport = async (data: {
    categories: Array<{ category: string; priority: number }>;
    companies: Array<{ company_id: string; priority: number }>;
    products: Array<{ product_id: string; priority: number }>;
  }) => {
    try {
      const insertData = [
        ...data.categories.map(c => ({
          user_id: userId,
          preference_type: 'category' as const,
          category: c.category,
          priority: c.priority,
        })),
        ...data.companies.map(c => ({
          user_id: userId,
          preference_type: 'company' as const,
          company_id: c.company_id,
          priority: c.priority,
        })),
        ...data.products.map(p => ({
          user_id: userId,
          preference_type: 'product' as const,
          product_id: p.product_id,
          priority: p.priority,
        })),
      ];

      console.log('🔵 [Preferences] Attempting to import preferences:', {
        totalCount: insertData.length,
        categoriesCount: data.categories.length,
        companiesCount: data.companies.length,
        productsCount: data.products.length,
        userId,
        timestamp: new Date().toISOString()
      });

      const { data: insertedData, error } = await supabase
        .from('reviewer_expertise')
        .insert(insertData)
        .select();

      if (error) {
        console.error('🔴 [Preferences] Import failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      console.log('✅ [Preferences] Successfully imported preferences:', {
        insertedCount: insertedData?.length || 0,
        timestamp: new Date().toISOString()
      });

      fetchPreferences();
    } catch (error: any) {
      console.error('🔴 [Preferences] Error importing preferences:', {
        error,
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  };

  const handleClearAll = async () => {
    try {
      const { error } = await supabase
        .from('reviewer_expertise')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('All preferences cleared');
      setShowClearDialog(false);
      fetchPreferences();
    } catch (error) {
      console.error('Error clearing preferences:', error);
      toast.error('Failed to clear preferences');
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
        {/* Summary Stats and Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
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
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              disabled={preferences.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <PreferenceImportExport
              onExport={handleExport}
              onImport={handleImport}
            />
          </div>
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
              onBulkAddProducts={handleBulkAddProducts}
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

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Preferences?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all your expertise preferences:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>{categoryPreferences.length} {categoryPreferences.length === 1 ? 'category' : 'categories'}</li>
                <li>{companyPreferences.length} {companyPreferences.length === 1 ? 'company' : 'companies'}</li>
                <li>{productPreferences.length} {productPreferences.length === 1 ? 'product' : 'products'}</li>
              </ul>
              <p className="mt-2 text-destructive font-medium">
                This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Clear All Preferences
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
