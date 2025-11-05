import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Loader2, 
  Plus, 
  Calendar, 
  Users, 
  Package, 
  CheckCircle2,
  Clock,
  PlayCircle,
  Archive,
  Download,
  FileSpreadsheet
} from "lucide-react";
import {
  createReviewRound,
  bulkAssignProducts,
  getRoundStatistics,
  updateRoundStatus,
  calculateProposedAssignments,
  getReviewersByExpertise,
  type ReviewRound,
  type ReviewRoundStats
} from "@/utils/reviewRoundUtils";
import { format } from "date-fns";
import { ALL_PRODUCTS } from "@/data";
import { ReviewerSelectionDialog } from "@/components/admin/review-rounds/ReviewerSelectionDialog";
import { AssignmentPreviewDialog, type ProposedAssignment } from "@/components/admin/review-rounds/AssignmentPreviewDialog";
import { 
  fetchAllRoundAssignments, 
  exportToCSV, 
  exportToExcel 
} from "@/utils/exportReviewRounds";

export default function ReviewRounds() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState<ReviewRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [reviewerStats, setReviewerStats] = useState({
    totalReviewers: 0,
    reviewersWithExpertise: 0
  });
  
  // New workflow state
  const [showReviewerSelection, setShowReviewerSelection] = useState(false);
  const [showAssignmentPreview, setShowAssignmentPreview] = useState(false);
  const [currentRoundId, setCurrentRoundId] = useState<string | null>(null);
  const [currentDeadline, setCurrentDeadline] = useState<string | undefined>();
  const [proposedAssignments, setProposedAssignments] = useState<ProposedAssignment[]>([]);
  const [selectedReviewers, setSelectedReviewers] = useState<any[]>([]);
  const [exporting, setExporting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    default_deadline: ''
  });

  useEffect(() => {
    fetchRounds();
    fetchReviewerStats();
  }, []);

  const fetchReviewerStats = async () => {
    try {
      // Count total reviewers
      const { data: reviewers, error: reviewersError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'reviewer');

      if (reviewersError) throw reviewersError;

      // Count reviewers with expertise
      const { data: expertise, error: expertiseError } = await supabase
        .from('reviewer_expertise')
        .select('user_id');

      if (expertiseError) throw expertiseError;

      const uniqueReviewersWithExpertise = new Set(expertise?.map(e => e.user_id) || []).size;

      setReviewerStats({
        totalReviewers: reviewers?.length || 0,
        reviewersWithExpertise: uniqueReviewersWithExpertise
      });
    } catch (error) {
      console.error('Error fetching reviewer stats:', error);
    }
  };

  const fetchRounds = async () => {
    try {
      const { data, error } = await supabase
        .from('review_rounds')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRounds((data || []) as ReviewRound[]);
    } catch (error) {
      console.error('Error fetching rounds:', error);
      toast.error('Failed to load review rounds');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRound = async () => {
    if (!formData.name || !formData.start_date) {
      toast.error('Please fill in required fields');
      return;
    }

    setCreating(true);
    try {
      // Get next round number
      const maxRound = rounds.reduce((max, r) => Math.max(max, r.round_number), 0);
      
      await createReviewRound({
        name: formData.name,
        description: formData.description,
        round_number: maxRound + 1,
        start_date: formData.start_date,
        end_date: formData.end_date || undefined,
        default_deadline: formData.default_deadline || undefined
      });

      toast.success('Review round created');
      setShowCreateDialog(false);
      setFormData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        default_deadline: ''
      });
      fetchRounds();
    } catch (error) {
      console.error('Error creating round:', error);
      toast.error('Failed to create review round');
    } finally {
      setCreating(false);
    }
  };

  const handleStartRound = async (roundId: string, deadline?: string) => {
    // Pre-flight validation
    if (reviewerStats.reviewersWithExpertise === 0) {
      toast.error('Cannot start round: No reviewers have set their expertise preferences yet');
      return;
    }

    if (ALL_PRODUCTS.length === 0) {
      toast.error('No products available to assign');
      return;
    }

    // Open reviewer selection dialog
    setCurrentRoundId(roundId);
    setCurrentDeadline(deadline);
    setShowReviewerSelection(true);
  };

  const handleReviewerSelectionContinue = async (selectedReviewerIds: string[]) => {
    setShowReviewerSelection(false);
    
    try {
      // Calculate proposed assignments
      const productIds = ALL_PRODUCTS.map(p => p.id);
      const proposed = await calculateProposedAssignments(productIds, selectedReviewerIds);
      const reviewers = await getReviewersByExpertise();
      
      setProposedAssignments(proposed);
      setSelectedReviewers(reviewers.filter(r => selectedReviewerIds.includes(r.user_id)));
      setShowAssignmentPreview(true);
    } catch (error) {
      console.error('Error calculating assignments:', error);
      toast.error('Failed to calculate assignments');
    }
  };

  const handleRerunAssignments = async () => {
    try {
      const productIds = ALL_PRODUCTS.map(p => p.id);
      const selectedIds = selectedReviewers.map(r => r.user_id);
      const proposed = await calculateProposedAssignments(productIds, selectedIds);
      setProposedAssignments(proposed);
      toast.success('Assignments recalculated');
    } catch (error) {
      console.error('Error recalculating assignments:', error);
      toast.error('Failed to recalculate assignments');
    }
  };

  const handleConfirmAssignments = async (finalAssignments: ProposedAssignment[]) => {
    if (!currentRoundId) return;
    
    setAssigning(currentRoundId);
    try {
      const productIds = ALL_PRODUCTS.map(p => p.id);
      
      toast.loading(`Creating ${finalAssignments.length} assignments...`);
      
      const result = await bulkAssignProducts(
        currentRoundId, 
        productIds, 
        currentDeadline,
        finalAssignments
      );

      if (result.success > 0) {
        toast.success(`Successfully assigned ${result.success} products to reviewers`);
        
        // Update round status to active
        await updateRoundStatus(currentRoundId, 'active');
        
        // Reset state and close dialogs
        setShowAssignmentPreview(false);
        setCurrentRoundId(null);
        setCurrentDeadline(undefined);
        setProposedAssignments([]);
        setSelectedReviewers([]);
        
        fetchRounds();
      }

      if (result.failed > 0) {
        toast.warning(`${result.failed} products could not be assigned`);
      }
    } catch (error) {
      console.error('Error in bulk assignment:', error);
      toast.error(`Failed to assign products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setAssigning(null);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const data = await fetchAllRoundAssignments();
      if (data.length === 0) {
        toast.error('No assignments to export');
        return;
      }
      exportToCSV(data, `review-assignments-${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('CSV exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const data = await fetchAllRoundAssignments();
      if (data.length === 0) {
        toast.error('No assignments to export');
        return;
      }
      exportToExcel(data, `review-assignments-${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Excel file exported successfully');
    } catch (error) {
      console.error('Error exporting Excel:', error);
      toast.error('Failed to export Excel file');
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: { variant: 'secondary', icon: Clock },
      active: { variant: 'default', icon: PlayCircle },
      completed: { variant: 'outline', icon: CheckCircle2 },
      archived: { variant: 'outline', icon: Archive }
    };

    const config = variants[status] || variants.draft;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Review Rounds</h1>
          <p className="text-muted-foreground mt-1">
            Manage periodic product review cycles
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            disabled={exporting || rounds.length === 0}
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportExcel}
            disabled={exporting || rounds.length === 0}
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4 mr-2" />
            )}
            Export Excel
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Round
          </Button>
        </div>
      </div>

      {/* Reviewer Status Alert */}
      {reviewerStats.totalReviewers === 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">No Reviewers Available</h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                  No users with the reviewer role found. Please assign reviewer roles to users before creating review rounds.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {reviewerStats.totalReviewers > 0 && reviewerStats.reviewersWithExpertise === 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Reviewers Need to Set Expertise</h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                  You have {reviewerStats.totalReviewers} reviewer{reviewerStats.totalReviewers !== 1 ? 's' : ''}, but none have set their expertise preferences yet. 
                  Ask reviewers to visit their Profile page and set their expertise areas before starting a review round.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rounds.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rounds.filter(r => r.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rounds.filter(r => r.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Reviewers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewerStats.totalReviewers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>With Expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reviewerStats.reviewersWithExpertise}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rounds Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Review Rounds</CardTitle>
          <CardDescription>
            View and manage all review rounds
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rounds.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No review rounds created yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowCreateDialog(true)}
              >
                Create your first round
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rounds.map((round) => (
                  <TableRow key={round.id}>
                    <TableCell className="font-medium">#{round.round_number}</TableCell>
                    <TableCell>
                      <div>
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium"
                          onClick={() => navigate(`/admin/review-rounds/${round.id}`)}
                        >
                          {round.name}
                        </Button>
                        {round.description && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {round.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(round.status)}</TableCell>
                    <TableCell>
                      {format(new Date(round.start_date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {round.default_deadline
                        ? format(new Date(round.default_deadline), 'MMM d, yyyy')
                        : '-'}
                    </TableCell>
                    <TableCell>{round.total_assignments || 0}</TableCell>
                    <TableCell>
                      {round.total_assignments > 0 ? (
                        <RoundProgress roundId={round.id} />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {round.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleStartRound(round.id, round.default_deadline)}
                          disabled={assigning === round.id || reviewerStats.reviewersWithExpertise === 0}
                          title={reviewerStats.reviewersWithExpertise === 0 ? 'No reviewers with expertise available' : ''}
                        >
                          {assigning === round.id ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Assigning...
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-3 w-3 mr-1" />
                              Start Round
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Round Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Review Round</DialogTitle>
            <DialogDescription>
              Set up a new periodic review cycle for all products
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Round Name *</Label>
              <Input
                id="name"
                placeholder="Q1 2025 Review"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Quarterly review of all products..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default_deadline">Default Review Deadline</Label>
              <Input
                id="default_deadline"
                type="date"
                value={formData.default_deadline}
                onChange={(e) => setFormData({ ...formData, default_deadline: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRound} disabled={creating}>
              {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Round
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reviewer Selection Dialog */}
      <ReviewerSelectionDialog
        open={showReviewerSelection}
        onOpenChange={setShowReviewerSelection}
        onContinue={handleReviewerSelectionContinue}
        totalProducts={ALL_PRODUCTS.length}
      />

      {/* Assignment Preview Dialog */}
      <AssignmentPreviewDialog
        open={showAssignmentPreview}
        onOpenChange={setShowAssignmentPreview}
        assignments={proposedAssignments}
        reviewers={selectedReviewers}
        onConfirm={handleConfirmAssignments}
        onRerun={handleRerunAssignments}
      />
    </div>
  );
}

function RoundProgress({ roundId }: { roundId: string }) {
  const [stats, setStats] = useState<ReviewRoundStats | null>(null);

  useEffect(() => {
    getRoundStatistics(roundId).then(setStats);
  }, [roundId]);

  if (!stats) return <Loader2 className="h-4 w-4 animate-spin" />;

  const percentage = stats.total_assignments > 0
    ? Math.round((stats.completed_count / stats.total_assignments) * 100)
    : 0;

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground">{percentage}%</span>
    </div>
  );
}
