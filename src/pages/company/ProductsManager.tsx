import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle2, Package, Info, FileText } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface CompanyVerification {
  id: string;
  product_id: string;
  verified_at: string;
  verification_notes: string | null;
}

export default function ProductsManager() {
  const { user, isCompany } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifications, setVerifications] = useState<CompanyVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [companyId, setCompanyId] = useState<string>('');

  useEffect(() => {
    if (!user || !isCompany) {
      navigate('/auth');
      return;
    }
    fetchCompanyId();
  }, [user, isCompany]);

  useEffect(() => {
    if (companyId) {
      fetchVerifications();
    }
  }, [companyId]);

  const fetchCompanyId = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('company_representatives')
      .select('company_id')
      .eq('user_id', user.id)
      .eq('verified', true)
      .single();
    
    if (data) {
      setCompanyId(data.company_id);
    } else {
      setLoading(false);
    }
  };

  const fetchVerifications = async () => {
    const { data, error } = await supabase
      .from('company_product_verifications')
      .select('*')
      .eq('company_id', companyId);

    if (!error && data) {
      setVerifications(data);
    }
    setLoading(false);
  };

  const handleVerifyProduct = async () => {
    if (!selectedProduct || !companyId) return;

    const { error } = await supabase
      .from('company_product_verifications')
      .insert({
        product_id: selectedProduct,
        company_id: companyId,
        verified_by: user!.id,
        verification_notes: verificationNotes.trim() || null
      });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Product verified successfully'
      });
      setDialogOpen(false);
      setSelectedProduct('');
      setVerificationNotes('');
      fetchVerifications();
    }
  };

  const companyProducts = ALL_PRODUCTS.filter(p => p.company === companyId);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!companyId) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Company Representative Not Verified</AlertTitle>
            <AlertDescription>
              You need to be verified as a company representative to access this page.
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Product Certifications
          </h1>
          <p className="text-muted-foreground">Manage "Verified by Company" certifications for your products</p>
        </div>

        {/* Guide Section */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              About Company Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is "Verified by Company"?</h3>
              <p className="text-sm text-muted-foreground">
                A certification badge that indicates your company has reviewed and confirmed the accuracy of product information.
                This builds trust with potential customers and shows active product maintenance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How to Certify Your Products:</h3>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                <li>Review all product details for accuracy</li>
                <li>Verify regulatory status is current</li>
                <li>Confirm contact information is up-to-date</li>
                <li>Add verification notes (optional)</li>
                <li>Click "Verify Product" to add the certification badge</li>
              </ol>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Re-verify annually or when product information is updated to maintain certification status.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyProducts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{verifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Not Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {companyProducts.length - verifications.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Products</h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Verify Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Verify Product</DialogTitle>
                  <DialogDescription>
                    Certify that the product information is accurate and up-to-date
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {companyProducts.filter(p => !verifications.find(v => v.product_id === p.id)).map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Verification Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add any notes about this verification..."
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleVerifyProduct}>
                    Verify Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {companyProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No products found</p>
              </CardContent>
            </Card>
          ) : (
            companyProducts.map(product => {
              const verification = verifications.find(v => v.product_id === product.id);
              return (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {product.name}
                          {verification && (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{product.id}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {verification ? (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Verified on {new Date(verification.verified_at).toLocaleDateString()}
                        </div>
                        {verification.verification_notes && (
                          <div className="text-sm">
                            <strong>Notes:</strong> {verification.verification_notes}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Badge variant="outline">Not verified</Badge>
                    )}
                    <div className="mt-4">
                      <Button variant="outline" asChild>
                        <Link to={`/product/${product.id}`}>View Product</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PageLayout>
  );
}
