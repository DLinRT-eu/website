import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Building2, FileEdit, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface CompanyRevision {
  id: string;
  product_id: string;
  revision_date: string;
  changes_summary: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
}

export default function CompanyDashboard() {
  const { user, isCompany } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<CompanyRevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [changesSummary, setChangesSummary] = useState('');

  const products = ALL_PRODUCTS;

  useEffect(() => {
    if (!user || !isCompany) {
      navigate('/auth');
      return;
    }

    fetchRevisions();
  }, [user, isCompany]);

  const fetchRevisions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('company_revisions')
      .select('*')
      .eq('revised_by', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRevisions(data as CompanyRevision[]);
    }
    setLoading(false);
  };

  const handleSubmitRevision = async () => {
    if (!selectedProduct || !changesSummary.trim()) {
      toast({
        title: 'Error',
        description: 'Please select a product and provide a summary of changes',
        variant: 'destructive',
      });
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const { error } = await supabase
      .from('company_revisions')
      .insert({
        product_id: selectedProduct,
        company_id: product.company,
        revised_by: user!.id,
        revision_date: new Date().toISOString().split('T')[0],
        changes_summary: changesSummary,
        verification_status: 'pending',
      });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Revision submitted for verification',
      });
      setDialogOpen(false);
      setSelectedProduct('');
      setChangesSummary('');
      fetchRevisions();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  const pendingRevisions = revisions.filter(r => r.verification_status === 'pending');
  const approvedRevisions = revisions.filter(r => r.verification_status === 'approved');
  const rejectedRevisions = revisions.filter(r => r.verification_status === 'rejected');

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              Company Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your product revisions</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <FileEdit className="h-4 w-4" />
                Submit Revision
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Product Revision</DialogTitle>
                <DialogDescription>
                  Submit changes for review and verification
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
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Changes Summary</Label>
                  <Textarea
                    placeholder="Describe the changes made to the product information..."
                    value={changesSummary}
                    onChange={(e) => setChangesSummary(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRevision}>
                  Submit for Review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Revisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingRevisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{approvedRevisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{rejectedRevisions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Revisions List */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({revisions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRevisions.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRevisions.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRevisions.length})</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'approved', 'rejected'].map(tab => {
            const tabRevisions = tab === 'all' ? revisions : 
              tab === 'pending' ? pendingRevisions :
              tab === 'approved' ? approvedRevisions : rejectedRevisions;

            return (
              <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
                {tabRevisions.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileEdit className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No revisions</p>
                    </CardContent>
                  </Card>
                ) : (
                  tabRevisions.map(revision => {
                    const product = products.find(p => p.id === revision.product_id);
                    return (
                      <Card key={revision.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">
                                {product?.name || revision.product_id}
                              </CardTitle>
                              <CardDescription>
                                Submitted on {new Date(revision.created_at).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(revision.verification_status)}
                              <Badge variant={getStatusBadgeVariant(revision.verification_status)}>
                                {revision.verification_status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <Label className="text-sm font-medium">Changes Summary:</Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {revision.changes_summary}
                              </p>
                            </div>
                            {revision.verified_at && (
                              <div className="text-xs text-muted-foreground">
                                Verified on {new Date(revision.verified_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </PageLayout>
  );
}
