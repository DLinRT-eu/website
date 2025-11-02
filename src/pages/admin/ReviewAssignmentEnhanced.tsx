import { useEffect, useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UserPlus, Search, Mail, Sparkles, Settings, Trash2 } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  assignedCount: number;
  expertise?: Array<{
    category: string;
    priority: number;
  }>;
}

interface ProductReview {
  id: string;
  product_id: string;
  assigned_to: string | null;
  status: string;
  priority: string;
  deadline: string | null;
  profiles?: {
    first_name: string;
    last_name: string;
  };
  reviewer?: any;
}

const PRODUCT_CATEGORIES = [
  'auto-contouring',
  'clinical-prediction',
  'image-enhancement',
  'image-synthesis',
  'performance-monitor',
  'platform',
  'reconstruction',
  'registration',
  'tracking',
  'treatment-planning',
];

export default function ReviewAssignmentEnhanced() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [expertiseDialogOpen, setExpertiseDialogOpen] = useState(false);
  const [autoDistributeDialogOpen, setAutoDistributeDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [selectedReviewerForExpertise, setSelectedReviewerForExpertise] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Invitation form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');
  const [inviteInstitution, setInviteInstitution] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteExpertise, setInviteExpertise] = useState<Array<{ category: string; priority: number }>>([]);
  const [sendingInvite, setSendingInvite] = useState(false);

  // Expertise management state
  const [reviewerExpertise, setReviewerExpertise] = useState<Array<{ category: string; priority: number }>>([]);
  const [savingExpertise, setSavingExpertise] = useState(false);

  // Auto-distribution state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distributing, setDistributing] = useState(false);

  const products = ALL_PRODUCTS;

  useEffect(() => {
    fetchReviewers();
    fetchReviews();
  }, []);

  const fetchReviewers = async () => {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('user_id, role')
      .in('role', ['reviewer', 'admin']);

    if (roleData && roleData.length > 0) {
      const userIds = roleData.map((r) => r.user_id);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', userIds);

      if (profileData) {
        // Get assignment counts
        const { data: reviewCounts } = await supabase
          .from('product_reviews')
          .select('assigned_to')
          .in('assigned_to', userIds)
          .not('status', 'eq', 'completed');

        const countMap = reviewCounts?.reduce((acc, r) => {
          acc[r.assigned_to] = (acc[r.assigned_to] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {};

        // Get expertise for each reviewer
        const { data: expertiseData } = await supabase
          .from('reviewer_expertise')
          .select('*')
          .in('user_id', userIds);

        const expertiseMap = expertiseData?.reduce((acc, exp) => {
          if (!acc[exp.user_id]) acc[exp.user_id] = [];
          acc[exp.user_id].push({
            category: exp.category,
            priority: exp.priority,
          });
          return acc;
        }, {} as Record<string, Array<{ category: string; priority: number }>>) || {};

        const reviewersWithCount: Reviewer[] = profileData.map((profile) => ({
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          assignedCount: countMap[profile.id] || 0,
          expertise: expertiseMap[profile.id] || [],
        }));

        setReviewers(reviewersWithCount);
      }
    }

    setLoading(false);
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
      const reviewsWithReviewer = data.map((review) => ({
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

    const { error } = await supabase.from('product_reviews').insert({
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

  const handleSendInvitation = async () => {
    if (!inviteEmail) {
      toast({
        title: 'Error',
        description: 'Email is required',
        variant: 'destructive',
      });
      return;
    }

    setSendingInvite(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite-reviewer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            email: inviteEmail,
            firstName: inviteFirstName,
            lastName: inviteLastName,
            institution: inviteInstitution,
            expertisePreferences: inviteExpertise,
            message: inviteMessage,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send invitation');
      }

      toast({
        title: 'Success',
        description: `Invitation sent to ${inviteEmail}`,
      });

      // Reset form
      setInviteDialogOpen(false);
      setInviteEmail('');
      setInviteFirstName('');
      setInviteLastName('');
      setInviteInstitution('');
      setInviteMessage('');
      setInviteExpertise([]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSendingInvite(false);
    }
  };

  const handleSaveExpertise = async () => {
    if (!selectedReviewerForExpertise) {
      toast({
        title: 'Error',
        description: 'Please select a reviewer',
        variant: 'destructive',
      });
      return;
    }

    setSavingExpertise(true);

    try {
      // Delete existing expertise
      await supabase
        .from('reviewer_expertise')
        .delete()
        .eq('user_id', selectedReviewerForExpertise);

      // Insert new expertise
      if (reviewerExpertise.length > 0) {
        const { error } = await supabase.from('reviewer_expertise').insert(
          reviewerExpertise.map((exp) => ({
            user_id: selectedReviewerForExpertise,
            category: exp.category,
            priority: exp.priority,
          }))
        );

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Expertise saved successfully',
      });

      setExpertiseDialogOpen(false);
      setSelectedReviewerForExpertise('');
      setReviewerExpertise([]);
      fetchReviewers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSavingExpertise(false);
    }
  };

  const handleAutoDistribute = async () => {
    if (selectedCategories.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one category',
        variant: 'destructive',
      });
      return;
    }

    setDistributing(true);

    try {
      // Get products in selected categories that aren't already assigned
      const productsToAssign = products.filter((p) => 
        selectedCategories.includes(p.category) &&
        !reviews.some((r) => r.product_id === p.id)
      );

      if (productsToAssign.length === 0) {
        toast({
          title: 'Info',
          description: 'No unassigned products found in selected categories',
        });
        setDistributing(false);
        return;
      }

      // Get reviewers with expertise in selected categories
      const eligibleReviewers = reviewers.filter((r) =>
        r.expertise?.some((exp) => selectedCategories.includes(exp.category))
      );

      if (eligibleReviewers.length === 0) {
        toast({
          title: 'Error',
          description: 'No reviewers found with expertise in selected categories',
          variant: 'destructive',
        });
        setDistributing(false);
        return;
      }

      // Auto-distribute logic
      const assignments: Array<{
        product_id: string;
        assigned_to: string;
        priority: string;
        status: string;
      }> = [];

      for (const product of productsToAssign) {
        // Find reviewers with expertise in this product's category
        const matchingReviewers = eligibleReviewers
          .map((reviewer) => {
            const expertise = reviewer.expertise?.find(
              (exp) => exp.category === product.category
            );
            return {
              ...reviewer,
              expertisePriority: expertise?.priority || 999,
            };
          })
          .filter((r) => r.expertisePriority < 999)
          .sort((a, b) => {
            // Sort by expertise priority first (lower = better)
            if (a.expertisePriority !== b.expertisePriority) {
              return a.expertisePriority - b.expertisePriority;
            }
            // Then by current workload (fewer = better)
            return a.assignedCount - b.assignedCount;
          });

        if (matchingReviewers.length > 0) {
          const assignee = matchingReviewers[0];
          assignments.push({
            product_id: product.id!,
            assigned_to: assignee.id,
            priority: 'medium',
            status: 'pending',
          });

          // Update local count for balanced distribution
          assignee.assignedCount++;
        }
      }

      if (assignments.length > 0) {
        const { error } = await supabase
          .from('product_reviews')
          .insert(assignments);

        if (error) throw error;

        toast({
          title: 'Success',
          description: `Assigned ${assignments.length} products to reviewers`,
        });

        setAutoDistributeDialogOpen(false);
        setSelectedCategories([]);
        fetchReviews();
        fetchReviewers();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDistributing(false);
    }
  };

  const loadReviewerExpertise = (reviewerId: string) => {
    const reviewer = reviewers.find((r) => r.id === reviewerId);
    if (reviewer?.expertise) {
      setReviewerExpertise([...reviewer.expertise]);
    } else {
      setReviewerExpertise([]);
    }
  };

  const addExpertiseCategory = (category: string) => {
    if (!reviewerExpertise.some((exp) => exp.category === category)) {
      setReviewerExpertise([...reviewerExpertise, { category, priority: 5 }]);
    }
  };

  const removeExpertiseCategory = (category: string) => {
    setReviewerExpertise(reviewerExpertise.filter((exp) => exp.category !== category));
  };

  const updateExpertisePriority = (category: string, priority: number) => {
    setReviewerExpertise(
      reviewerExpertise.map((exp) =>
        exp.category === category ? { ...exp, priority } : exp
      )
    );
  };

  const addInviteExpertise = (category: string) => {
    if (!inviteExpertise.some((exp) => exp.category === category)) {
      setInviteExpertise([...inviteExpertise, { category, priority: 5 }]);
    }
  };

  const removeInviteExpertise = (category: string) => {
    setInviteExpertise(inviteExpertise.filter((exp) => exp.category !== category));
  };

  const updateInviteExpertisePriority = (category: string, priority: number) => {
    setInviteExpertise(
      inviteExpertise.map((exp) =>
        exp.category === category ? { ...exp, priority } : exp
      )
    );
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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
        <Tabs defaultValue="assignments" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Review Management</h1>
              <p className="text-muted-foreground mt-2">
                Assign products, invite reviewers, and manage expertise
              </p>
            </div>
            <TabsList>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="assignments" className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-3">
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
                        <Select
                          value={selectedProduct}
                          onValueChange={setSelectedProduct}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredProducts.map((product) => (
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
                      <Select
                        value={selectedReviewer}
                        onValueChange={setSelectedReviewer}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewers.map((reviewer) => (
                            <SelectItem key={reviewer.id} value={reviewer.id}>
                              {reviewer.first_name} {reviewer.last_name} (
                              {reviewer.assignedCount} active)
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
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAssignReview}>Assign Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={autoDistributeDialogOpen}
                onOpenChange={setAutoDistributeDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Auto-Distribute
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Auto-Distribute Products</DialogTitle>
                    <DialogDescription>
                      Automatically assign products to reviewers based on their
                      expertise and current workload
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Select Categories to Distribute</Label>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {PRODUCT_CATEGORIES.map((category) => {
                          const unassignedCount = products.filter(
                            (p) =>
                              p.category === category &&
                              !reviews.some((r) => r.product_id === p.id)
                          ).length;

                          return (
                            <div
                              key={category}
                              className="flex items-start space-x-2"
                            >
                              <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() =>
                                  toggleCategorySelection(category)
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={category}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {category
                                    .split('-')
                                    .map(
                                      (w) =>
                                        w.charAt(0).toUpperCase() + w.slice(1)
                                    )
                                    .join(' ')}
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  {unassignedCount} unassigned
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAutoDistributeDialogOpen(false);
                        setSelectedCategories([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAutoDistribute}
                      disabled={
                        distributing || selectedCategories.length === 0
                      }
                    >
                      {distributing ? 'Distributing...' : 'Auto-Distribute'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Assignments Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>
                  Manage product review assignments
                </CardDescription>
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
                      const product = products.find(
                        (p) => p.id === review.product_id
                      );
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
                            ) : (
                              '-'
                            )}
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
          </TabsContent>

          <TabsContent value="reviewers" className="space-y-6">
            {/* Reviewer Actions */}
            <div className="flex gap-3">
              <Dialog
                open={inviteDialogOpen}
                onOpenChange={setInviteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Mail className="h-4 w-4" />
                    Invite Reviewer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Invite New Reviewer</DialogTitle>
                    <DialogDescription>
                      Send an email invitation with expertise preferences
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="reviewer@institution.edu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={inviteInstitution}
                          onChange={(e) =>
                            setInviteInstitution(e.target.value)
                          }
                          placeholder="University Hospital"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={inviteFirstName}
                          onChange={(e) => setInviteFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={inviteLastName}
                          onChange={(e) => setInviteLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Personal Message (Optional)</Label>
                      <Textarea
                        value={inviteMessage}
                        onChange={(e) => setInviteMessage(e.target.value)}
                        placeholder="Add a personal message to the invitation..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Expertise Preferences</Label>
                      <div className="flex flex-wrap gap-2">
                        {PRODUCT_CATEGORIES.map((category) => (
                          <Button
                            key={category}
                            type="button"
                            size="sm"
                            variant={
                              inviteExpertise.some(
                                (exp) => exp.category === category
                              )
                                ? 'default'
                                : 'outline'
                            }
                            onClick={() => {
                              if (
                                inviteExpertise.some(
                                  (exp) => exp.category === category
                                )
                              ) {
                                removeInviteExpertise(category);
                              } else {
                                addInviteExpertise(category);
                              }
                            }}
                          >
                            {category
                              .split('-')
                              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                              .join(' ')}
                          </Button>
                        ))}
                      </div>

                      {inviteExpertise.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <Label className="text-sm">Priority Levels</Label>
                          {inviteExpertise.map((exp) => (
                            <div
                              key={exp.category}
                              className="flex items-center gap-3"
                            >
                              <span className="text-sm flex-1 capitalize">
                                {exp.category.replace('-', ' ')}
                              </span>
                              <Select
                                value={exp.priority.toString()}
                                onValueChange={(value) =>
                                  updateInviteExpertisePriority(
                                    exp.category,
                                    parseInt(value)
                                  )
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Highest</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5 - Medium</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value="7">7</SelectItem>
                                  <SelectItem value="8">8</SelectItem>
                                  <SelectItem value="9">9</SelectItem>
                                  <SelectItem value="10">10 - Lowest</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setInviteDialogOpen(false);
                        setInviteEmail('');
                        setInviteFirstName('');
                        setInviteLastName('');
                        setInviteInstitution('');
                        setInviteMessage('');
                        setInviteExpertise([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendInvitation}
                      disabled={sendingInvite || !inviteEmail}
                    >
                      {sendingInvite ? 'Sending...' : 'Send Invitation'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={expertiseDialogOpen}
                onOpenChange={setExpertiseDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Manage Expertise
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Manage Reviewer Expertise</DialogTitle>
                    <DialogDescription>
                      Set expertise preferences for existing reviewers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Select Reviewer</Label>
                      <Select
                        value={selectedReviewerForExpertise}
                        onValueChange={(value) => {
                          setSelectedReviewerForExpertise(value);
                          loadReviewerExpertise(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a reviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewers.map((reviewer) => (
                            <SelectItem key={reviewer.id} value={reviewer.id}>
                              {reviewer.first_name} {reviewer.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedReviewerForExpertise && (
                      <>
                        <div className="space-y-3">
                          <Label>Expertise Categories</Label>
                          <div className="flex flex-wrap gap-2">
                            {PRODUCT_CATEGORIES.map((category) => (
                              <Button
                                key={category}
                                type="button"
                                size="sm"
                                variant={
                                  reviewerExpertise.some(
                                    (exp) => exp.category === category
                                  )
                                    ? 'default'
                                    : 'outline'
                                }
                                onClick={() => {
                                  if (
                                    reviewerExpertise.some(
                                      (exp) => exp.category === category
                                    )
                                  ) {
                                    removeExpertiseCategory(category);
                                  } else {
                                    addExpertiseCategory(category);
                                  }
                                }}
                              >
                                {category
                                  .split('-')
                                  .map(
                                    (w) => w.charAt(0).toUpperCase() + w.slice(1)
                                  )
                                  .join(' ')}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {reviewerExpertise.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm">Priority Levels</Label>
                            {reviewerExpertise.map((exp) => (
                              <div
                                key={exp.category}
                                className="flex items-center gap-3"
                              >
                                <span className="text-sm flex-1 capitalize">
                                  {exp.category.replace('-', ' ')}
                                </span>
                                <Select
                                  value={exp.priority.toString()}
                                  onValueChange={(value) =>
                                    updateExpertisePriority(
                                      exp.category,
                                      parseInt(value)
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 - Highest</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5 - Medium</SelectItem>
                                    <SelectItem value="6">6</SelectItem>
                                    <SelectItem value="7">7</SelectItem>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="9">9</SelectItem>
                                    <SelectItem value="10">10 - Lowest</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    removeExpertiseCategory(exp.category)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setExpertiseDialogOpen(false);
                        setSelectedReviewerForExpertise('');
                        setReviewerExpertise([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveExpertise}
                      disabled={
                        savingExpertise || !selectedReviewerForExpertise
                      }
                    >
                      {savingExpertise ? 'Saving...' : 'Save Expertise'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Reviewer Workload Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {reviewers.map((reviewer) => (
                <Card key={reviewer.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">
                      {reviewer.first_name} {reviewer.last_name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {reviewer.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold">
                          {reviewer.assignedCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Active assignments
                        </p>
                      </div>
                      {reviewer.expertise && reviewer.expertise.length > 0 && (
                        <div>
                          <p className="text-xs font-medium mb-2">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {reviewer.expertise
                              .sort((a, b) => a.priority - b.priority)
                              .slice(0, 3)
                              .map((exp) => (
                                <Badge
                                  key={exp.category}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {exp.category
                                    .split('-')
                                    .map(
                                      (w) =>
                                        w.charAt(0).toUpperCase() + w.slice(1)
                                    )
                                    .join(' ')}
                                </Badge>
                              ))}
                            {reviewer.expertise.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{reviewer.expertise.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
