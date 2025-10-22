import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UserPlus, Search } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  assignedCount: number;
}

interface ProductReview {
  id: string;
  product_id: string;
  assigned_to: string | null;
  status: string;
  priority: string;
  deadline: string | null;
  reviewer?: {
    first_name: string;
    last_name: string;
  };
}

export default function ReviewAssignment() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');
  const [deadline, setDeadline] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const products = ALL_PRODUCTS;

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }

    fetchReviewers();
    fetchReviews();
  }, [user, isAdmin]);

  const fetchReviewers = async () => {
    // Get all users with reviewer or admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('user_id, role')
      .in('role', ['reviewer', 'admin']);

    if (!roleData) return;

    const reviewerIds = [...new Set(roleData.map(r => r.user_id))];

    // Get profiles for these users
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, email')
      .in('id', reviewerIds);

    if (!profiles) return;

    // Count assignments for each reviewer
    const reviewersWithCount = await Promise.all(
      profiles.map(async (profile) => {
        const { count } = await supabase
          .from('product_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('assigned_to', profile.id)
          .neq('status', 'completed');

        return {
          ...profile,
          assignedCount: count || 0,
        };
      })
    );

    setReviewers(reviewersWithCount);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        *,
        profiles!product_reviews_assigned_to_fkey(first_name, last_name)
      `)
      .order('deadline', { ascending: true, nullsFirst: false });

    if (!error && data) {
      const reviewsWithReviewer = data.map(review => ({
        ...review,
        reviewer: review.profiles as any,
      }));
      setReviews(reviewsWithReviewer);
    }

    setLoading(false);
  };

  const handleAssignReview = async () => {
    if (!selectedProduct || !selectedReviewer) {
      toast({
        title: 'Error',
        description: 'Please select a product and reviewer',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('product_reviews')
      .insert({
        product_id: selectedProduct,
        assigned_to: selectedReviewer,
        priority,
        deadline: deadline || null,
        status: 'pending',
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
        description: 'Review assigned successfully',
      });
      setDialogOpen(false);
      setSelectedProduct('');
      setSelectedReviewer('');
      setPriority('medium');
      setDeadline('');
      fetchReviews();
      fetchReviewers();
    }
  };

  const handleDeleteAssignment = async (reviewId: string) => {
    const { error } = await supabase
      .from('product_reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Assignment deleted',
      });
      fetchReviews();
      fetchReviewers();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
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

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Review Assignments</h1>
            <p className="text-muted-foreground mt-2">Assign products to reviewers</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Assign Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Assign Product Review</DialogTitle>
                <DialogDescription>
                  Select a product and assign it to a reviewer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProducts.map(product => (
                          <SelectItem key={product.id} value={product.id!}>
                            {product.name} - {product.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reviewer</Label>
                  <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewers.map(reviewer => (
                        <SelectItem key={reviewer.id} value={reviewer.id}>
                          {reviewer.first_name} {reviewer.last_name} ({reviewer.assignedCount} active)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignReview}>
                  Assign Review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviewer Workload */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {reviewers.map(reviewer => (
            <Card key={reviewer.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {reviewer.first_name} {reviewer.last_name}
                </CardTitle>
                <CardDescription className="text-xs">{reviewer.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviewer.assignedCount}</div>
                <p className="text-xs text-muted-foreground">Active assignments</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assignments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>Manage product review assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => {
                  const product = products.find(p => p.id === review.product_id);
                  return (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">
                        {product?.name || review.product_id}
                      </TableCell>
                      <TableCell>
                        {review.reviewer 
                          ? `${review.reviewer.first_name} ${review.reviewer.last_name}`
                          : 'Unassigned'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(review.priority)}>
                          {review.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {review.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {review.deadline ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(review.deadline).toLocaleDateString()}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteAssignment(review.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
