import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UserPlus, Search, Filter } from 'lucide-react';
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
  review_round_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  reviewer?: {
    first_name: string;
    last_name: string;
  };
}

export default function ReviewAssignment() {
  const { user } = useAuth();
  const { isAdmin } = useRoles();
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

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
    const { data, error } = await supabase.rpc('get_reviewers_with_workload_admin');
    
    if (error) {
      console.error('Error fetching reviewers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviewers',
        variant: 'destructive',
      });
      return;
    }

    const reviewersWithCount = (data || []).map((reviewer: any) => ({
      id: reviewer.id,
      first_name: reviewer.first_name,
      last_name: reviewer.last_name,
      email: reviewer.email,
      assignedCount: Number(reviewer.active_assignments) || 0
    }));

    setReviewers(reviewersWithCount);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        *,
        reviewer:profiles!product_reviews_assigned_to_fkey(first_name, last_name, email)
      `)
      .order('deadline', { ascending: true, nullsFirst: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Error Loading Assignments',
        description: error.message,
        variant: 'destructive',
      });
      setReviews([]);
    } else {
      const reviewsWithReviewer = (data || []).map(review => ({
        ...review,
        reviewer: review.reviewer as any,
      }));
      setReviews(reviewsWithReviewer);
    }

    setLoading(false);
  };

  const handleAssignReview = async () => {
    if (!selectedProduct || !selectedReviewer) {
      toast({
        title: 'Error',
        description: 'Please select both a product and a reviewer',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Use quick assign function with single product
      const { data, error } = await supabase.rpc('quick_assign_products', {
        p_product_ids: [selectedProduct],
        p_reviewer_id: selectedReviewer,
        p_deadline: deadline || null,
      });

      if (error) {
        console.error('Assignment RPC error:', error);
        throw new Error(`${error.message} (Code: ${error.code || 'unknown'})`);
      }

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
    } catch (error: any) {
      console.error('Error assigning review:', error);
      toast({
        title: 'Assignment Failed',
        description: error.message || 'Failed to assign review. Check console for details.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = async (reviewId: string, newStatus: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return;

    const updates: any = { status: newStatus };
    
    // Track timing
    if (newStatus === 'in_progress' && !review.started_at) {
      updates.started_at = new Date().toISOString();
    }
    if (newStatus === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('product_reviews')
      .update(updates)
      .eq('id', reviewId);

    if (error) {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    } else {
      toast({ 
        title: 'Success', 
        description: `Review marked as ${newStatus.replace('_', ' ')}` 
      });
      fetchReviews();
      fetchReviewers();
    }
  };

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;

    const review = reviews.find(r => r.id === reviewToDelete);
    
    const { error } = await supabase
      .from('product_reviews')
      .delete()
      .eq('id', reviewToDelete);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      // Log the removal to assignment history
      if (review && review.review_round_id) {
        await supabase.from('assignment_history').insert({
          review_round_id: review.review_round_id,
          product_id: review.product_id,
          previous_assignee: review.assigned_to,
          change_type: 'remove',
          changed_by: user?.id,
          reason: 'Removed by admin via assignment manager'
        });
      }
      
      toast({
        title: 'Success',
        description: 'Assignment removed',
      });
      fetchReviews();
      fetchReviewers();
    }

    setConfirmDeleteOpen(false);
    setReviewToDelete(null);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(review => {
    if (statusFilter === 'all') return true;
    return review.status === statusFilter;
  });

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
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/admin/review-rounds')}>
              <Calendar className="h-4 w-4" />
              Review Rounds
            </Button>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Manage product review assignments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {reviews.length === 0 
                        ? "No assignments yet. Click 'Assign Review' to get started."
                        : `No ${statusFilter === 'all' ? '' : statusFilter.replace('_', ' ')} assignments found.`
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => {
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
                          <Badge 
                            variant={
                              review.status === 'completed' ? 'success' : 
                              review.status === 'in_progress' ? 'default' : 
                              'outline'
                            } 
                            className="capitalize"
                          >
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
                          <div className="flex gap-2 justify-end">
                            {review.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateStatus(review.id, 'in_progress')}
                              >
                                Start
                              </Button>
                            )}
                            {review.status === 'in_progress' && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleUpdateStatus(review.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                            {review.status === 'completed' && (
                              <Badge variant="success" className="mr-2">✓ Done</Badge>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(review.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove this assignment. The reviewer will no longer have access to this product review.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setReviewToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove Assignment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
}
