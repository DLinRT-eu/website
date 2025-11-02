import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Package, CheckCircle2, Clock, AlertCircle, Plus, FileText } from 'lucide-react';

interface CompanyProduct {
  id: string;
  company_id: string;
  product_id: string;
  verified_at: string | null;
  verification_notes: string | null;
  supporting_documents: any;
  created_at: string;
  updated_at: string;
}

export default function CompanyProductsManager() {
  const { user, loading: authLoading } = useAuth();
  const { isCompany, isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<CompanyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || (!isCompany && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchProducts();
  }, [user, isCompany, isAdmin, authLoading, navigate]);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      let query = supabase
        .from('company_product_verifications')
        .select('*')
        .order('created_at', { ascending: false });

      // If company role, filter by their company
      if (isCompany && !isAdmin) {
        const { data: companyData } = await supabase
          .from('company_representatives')
          .select('company_id')
          .eq('user_id', user.id)
          .eq('verified', true)
          .single();

        if (companyData) {
          query = query.eq('company_id', companyData.company_id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product certifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = (product: CompanyProduct) => {
    if (product.verified_at) {
      return <Badge className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Verified</Badge>;
    }
    return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
  };

  if (authLoading || loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  const verifiedProducts = products.filter(p => p.verified_at);
  const pendingProducts = products.filter(p => !p.verified_at);

  return (
    <PageLayout>
      <div className="container max-w-6xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8" />
              Product Certifications
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your product certification submissions
            </p>
          </div>
          <Button onClick={() => navigate('/company/dashboard')}>
            <Plus className="h-4 w-4 mr-2" />
            New Certification
          </Button>
        </div>

        {products.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Certifications Yet</AlertTitle>
            <AlertDescription>
              You haven't submitted any product certifications. Start by submitting your first certification from the Company Dashboard.
            </AlertDescription>
          </Alert>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">
                All ({products.length})
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verified ({verifiedProducts.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingProducts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-4">
                {products.map(product => (
                  <Card key={product.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Product ID: {product.product_id}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Company: {product.company_id}
                          </CardDescription>
                        </div>
                        {getVerificationBadge(product)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Submitted:</span>
                          <span>{new Date(product.created_at).toLocaleDateString()}</span>
                        </div>
                        {product.verified_at && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Verified:</span>
                            <span>{new Date(product.verified_at).toLocaleDateString()}</span>
                          </div>
                        )}
                        {product.verification_notes && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">Verification Notes:</span>
                            </div>
                            <p className="text-sm">{product.verification_notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified">
              <div className="grid gap-4">
                {verifiedProducts.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Verified Products</AlertTitle>
                    <AlertDescription>
                      You don't have any verified certifications yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  verifiedProducts.map(product => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>Product ID: {product.product_id}</CardTitle>
                            <CardDescription>Company: {product.company_id}</CardDescription>
                          </div>
                          {getVerificationBadge(product)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Verified:</span>
                            <span>{new Date(product.verified_at!).toLocaleDateString()}</span>
                          </div>
                          {product.verification_notes && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4" />
                                <span className="font-medium">Notes:</span>
                              </div>
                              <p className="text-sm">{product.verification_notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="grid gap-4">
                {pendingProducts.length === 0 ? (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>All Products Verified</AlertTitle>
                    <AlertDescription>
                      Great! All your certifications have been verified.
                    </AlertDescription>
                  </Alert>
                ) : (
                  pendingProducts.map(product => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>Product ID: {product.product_id}</CardTitle>
                            <CardDescription>Company: {product.company_id}</CardDescription>
                          </div>
                          {getVerificationBadge(product)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Submitted:</span>
                            <span>{new Date(product.created_at).toLocaleDateString()}</span>
                          </div>
                          <Alert className="mt-4">
                            <Clock className="h-4 w-4" />
                            <AlertDescription>
                              Your certification is awaiting review by our team.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageLayout>
  );
}
