import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface CompanyRevision {
  id: string;
  product_id: string;
  company_id: string;
  revision_date: string;
  changes_summary: string;
  verification_status: string;
  revised_by: string;
  reviewer_feedback: string | null;
  priority: string;
  created_at: string;
}

export default function RevisionApprovalManager() {
  const { user } = useAuth();
  const { isReviewer, isAdmin } = useRoles();
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<CompanyRevision[]>([]);
  const [selectedRevision, setSelectedRevision] = useState<CompanyRevision | null>(null);
  const [feedback, setFeedback] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  useEffect(() => {
    if (user && (isReviewer || isAdmin)) {
      fetchPendingRevisions();
    }
  }, [user, isReviewer, isAdmin]);

  const fetchPendingRevisions = async () => {
    const { data } = await supabase
      .from('company_revisions')
      .select('*')
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false });

    if (data) {
      setRevisions(data);
    }
  };

  const handleOpenDialog = (revision: CompanyRevision, action: 'approve' | 'reject') => {
    setSelectedRevision(revision);
    setActionType(action);
    setFeedback('');
    setDialogOpen(true);
  };

  const handleSubmitDecision = async () => {
    if (!selectedRevision || !user) return;

    const { error } = await supabase
      .from('company_revisions')
      .update({
        verification_status: actionType === 'approve' ? 'approved' : 'rejected',
        verified_by: user.id,
        verified_at: new Date().toISOString(),
        reviewer_feedback: feedback || null,
      })
      .eq('id', selectedRevision.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Revision ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`,
      });
      setDialogOpen(false);
      fetchPendingRevisions();
    }
  };

  const getPriorityColor = (priority: string): 'default' | 'destructive' | 'outline' | 'secondary' => {
    const colors: { [key: string]: 'default' | 'destructive' | 'outline' | 'secondary' } = {
      critical: 'destructive',
      high: 'default',
      medium: 'secondary',
      low: 'outline',
    };
    return colors[priority] || 'outline';
  };

  if (!isReviewer && !isAdmin) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Company Revisions</CardTitle>
          <CardDescription>Review and approve product information updates from companies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {revisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pending revisions to review</p>
            </div>
          ) : (
            revisions.map((revision) => {
              const product = ALL_PRODUCTS.find(p => p.id === revision.product_id);
              return (
                <Card key={revision.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {product?.name || revision.product_id}
                        </CardTitle>
                        <CardDescription>
                          Company: {revision.company_id}
                        </CardDescription>
                      </div>
                      <Badge variant={getPriorityColor(revision.priority)}>
                        {revision.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Changes Summary:</Label>
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {revision.changes_summary}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Submitted: {new Date(revision.created_at).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleOpenDialog(revision, 'approve')}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleOpenDialog(revision, 'reject')}
                        className="gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      {product && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        >
                          View Product
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve' : 'Reject'} Revision
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Confirm that the changes are accurate and complete.'
                : 'Provide feedback explaining why this revision is being rejected.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                {actionType === 'approve' ? 'Reviewer Notes (Optional)' : 'Rejection Reason'}
              </Label>
              <Textarea
                placeholder={actionType === 'approve' 
                  ? 'Add any notes about this approval...'
                  : 'Explain what needs to be corrected...'}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                required={actionType === 'reject'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={handleSubmitDecision}
              disabled={actionType === 'reject' && !feedback.trim()}
            >
              {actionType === 'approve' ? 'Approve Revision' : 'Reject Revision'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
