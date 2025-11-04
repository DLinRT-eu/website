import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle, Search, ArrowLeftRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_PRODUCTS } from "@/data";
import type { ReviewerWithExpertise } from "@/utils/reviewRoundUtils";

export interface ProposedAssignment {
  product_id: string;
  assigned_to: string;
  match_score: number;
}

interface AssignmentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignments: ProposedAssignment[];
  reviewers: ReviewerWithExpertise[];
  onConfirm: (finalAssignments: ProposedAssignment[]) => void;
  onRerun: () => void;
}

export function AssignmentPreviewDialog({
  open,
  onOpenChange,
  assignments,
  reviewers,
  onConfirm,
  onRerun,
}: AssignmentPreviewDialogProps) {
  const [editedAssignments, setEditedAssignments] = useState<ProposedAssignment[]>(assignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirming, setConfirming] = useState(false);

  const productsMap = useMemo(() => {
    return new Map(ALL_PRODUCTS.map(p => [p.id, p]));
  }, []);

  const reviewersMap = useMemo(() => {
    return new Map(reviewers.map(r => [r.user_id, r]));
  }, [reviewers]);

  // Calculate workload statistics
  const workloadStats = useMemo(() => {
    const counts = new Map<string, number>();
    reviewers.forEach(r => counts.set(r.user_id, 0));
    
    editedAssignments.forEach(a => {
      counts.set(a.assigned_to, (counts.get(a.assigned_to) || 0) + 1);
    });

    const values = Array.from(counts.values());
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = max - min;

    return { min, max, avg: Math.round(avg), variance, counts };
  }, [editedAssignments, reviewers]);

  const filteredAssignments = useMemo(() => {
    if (!searchTerm) return editedAssignments;
    const term = searchTerm.toLowerCase();
    return editedAssignments.filter(a => {
      const product = productsMap.get(a.product_id);
      const reviewer = reviewersMap.get(a.assigned_to);
      return (
        product?.name.toLowerCase().includes(term) ||
        product?.company.toLowerCase().includes(term) ||
        reviewer?.first_name.toLowerCase().includes(term) ||
        reviewer?.last_name.toLowerCase().includes(term)
      );
    });
  }, [editedAssignments, searchTerm, productsMap, reviewersMap]);

  const getWorkloadColor = (count: number) => {
    if (count < workloadStats.avg - 1) return "text-green-600";
    if (count > workloadStats.avg + 1) return "text-red-600";
    return "text-yellow-600";
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 20) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (score >= 10) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  const handleReassign = (productId: string, newReviewerId: string) => {
    setEditedAssignments(prev =>
      prev.map(a =>
        a.product_id === productId
          ? { ...a, assigned_to: newReviewerId }
          : a
      )
    );
  };

  const handleAutoBalance = () => {
    // Redistribute to minimize variance while preserving high-score matches
    const targetPerReviewer = Math.floor(editedAssignments.length / reviewers.length);
    const newCounts = new Map(reviewers.map(r => [r.user_id, 0]));
    
    // Sort assignments by match score (preserve good matches)
    const sorted = [...editedAssignments].sort((a, b) => b.match_score - a.match_score);
    
    const balanced = sorted.map(assignment => {
      // If current reviewer is under target, keep assignment
      const currentCount = newCounts.get(assignment.assigned_to) || 0;
      if (currentCount < targetPerReviewer) {
        newCounts.set(assignment.assigned_to, currentCount + 1);
        return assignment;
      }
      
      // Otherwise, find reviewer with lowest count
      let minReviewer = reviewers[0].user_id;
      let minCount = newCounts.get(minReviewer) || 0;
      
      reviewers.forEach(r => {
        const count = newCounts.get(r.user_id) || 0;
        if (count < minCount) {
          minReviewer = r.user_id;
          minCount = count;
        }
      });
      
      newCounts.set(minReviewer, minCount + 1);
      return { ...assignment, assigned_to: minReviewer };
    });
    
    setEditedAssignments(balanced);
  };

  const handleConfirm = async () => {
    setConfirming(true);
    await onConfirm(editedAssignments);
    setConfirming(false);
  };

  const hasHighVariance = workloadStats.variance > 2;
  const hasLowScores = editedAssignments.some(a => a.match_score < 5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Review Assignment Preview</DialogTitle>
          <DialogDescription>
            Review and adjust product assignments before starting the round
          </DialogDescription>
        </DialogHeader>

        {/* Summary Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">Total Assignments</div>
            <div className="text-2xl font-bold">{editedAssignments.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Reviewers</div>
            <div className="text-2xl font-bold">{reviewers.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Avg per Reviewer</div>
            <div className="text-2xl font-bold">{workloadStats.avg}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Workload Range</div>
            <div className="text-2xl font-bold">
              {workloadStats.min}-{workloadStats.max}
            </div>
          </div>
        </div>

        {/* Warnings */}
        {(hasHighVariance || hasLowScores) && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1 text-sm">
              {hasHighVariance && (
                <p className="text-yellow-800 dark:text-yellow-200">
                  Workload variance is {workloadStats.variance} (some reviewers have {workloadStats.variance} more products than others)
                </p>
              )}
              {hasLowScores && (
                <p className="text-yellow-800 dark:text-yellow-200 mt-1">
                  Some products are assigned to reviewers with no matching expertise
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or reviewers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAutoBalance}>
              Auto-balance
            </Button>
            <Button variant="outline" size="sm" onClick={onRerun}>
              Rerun Algorithm
            </Button>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => {
                const product = productsMap.get(assignment.product_id);
                const reviewer = reviewersMap.get(assignment.assigned_to);
                const reviewerCount = workloadStats.counts.get(assignment.assigned_to) || 0;

                if (!product || !reviewer) return null;

                return (
                  <TableRow key={assignment.product_id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.company}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {reviewer.first_name} {reviewer.last_name}
                        </div>
                        <div className={`text-sm ${getWorkloadColor(reviewerCount)}`}>
                          {reviewerCount} assignments
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMatchScoreColor(assignment.match_score)}>
                        {assignment.match_score > 0 ? assignment.match_score : 'No match'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={assignment.assigned_to}
                        onValueChange={(value) => handleReassign(assignment.product_id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <ArrowLeftRight className="h-3 w-3 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewers.map(r => {
                            const count = workloadStats.counts.get(r.user_id) || 0;
                            return (
                              <SelectItem key={r.user_id} value={r.user_id}>
                                <div className="flex items-center justify-between gap-4">
                                  <span>{r.first_name} {r.last_name}</span>
                                  <span className={`text-xs ${getWorkloadColor(count)}`}>
                                    ({count})
                                  </span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={confirming}>
            {confirming && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Confirm & Start Round
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
