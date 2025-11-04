import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Users, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReviewersByExpertise, type ReviewerWithExpertise } from "@/utils/reviewRoundUtils";

interface ReviewerSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (selectedReviewerIds: string[]) => void;
  totalProducts: number;
}

export function ReviewerSelectionDialog({
  open,
  onOpenChange,
  onContinue,
  totalProducts,
}: ReviewerSelectionDialogProps) {
  const [reviewers, setReviewers] = useState<ReviewerWithExpertise[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      loadReviewers();
    }
  }, [open]);

  const loadReviewers = async () => {
    setLoading(true);
    try {
      const data = await getReviewersByExpertise();
      setReviewers(data);
      // Select all by default
      setSelectedIds(new Set(data.map(r => r.user_id)));
    } catch (error) {
      console.error('Error loading reviewers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviewers = useMemo(() => {
    if (!searchTerm) return reviewers;
    const term = searchTerm.toLowerCase();
    return reviewers.filter(r =>
      r.first_name.toLowerCase().includes(term) ||
      r.last_name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term)
    );
  }, [reviewers, searchTerm]);

  const toggleAll = () => {
    if (selectedIds.size === filteredReviewers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredReviewers.map(r => r.user_id)));
    }
  };

  const toggleReviewer = (userId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(userId)) {
      newSet.delete(userId);
    } else {
      newSet.add(userId);
    }
    setSelectedIds(newSet);
  };

  const selectedCount = selectedIds.size;
  const avgPerReviewer = selectedCount > 0 
    ? Math.floor(totalProducts / selectedCount)
    : 0;
  const maxVariance = selectedCount > 0
    ? Math.ceil(totalProducts / selectedCount) - avgPerReviewer
    : 0;

  const getExpertiseCount = (reviewer: ReviewerWithExpertise) => {
    const categories = reviewer.expertise.filter(e => e.preference_type === 'category').length;
    const companies = reviewer.expertise.filter(e => e.preference_type === 'company').length;
    const products = reviewer.expertise.filter(e => e.preference_type === 'product').length;
    return { categories, companies, products };
  };

  const getWorkloadColor = (workload: number) => {
    if (workload < 10) return "text-green-600";
    if (workload < 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Reviewers for Assignment</DialogTitle>
          <DialogDescription>
            Choose which reviewers should receive product assignments for this round
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Search and Summary */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviewers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">
                      {selectedCount} of {filteredReviewers.length} reviewers selected
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {totalProducts} products to assign
                    </div>
                  </div>
                </div>
                {selectedCount > 0 && (
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ~{avgPerReviewer}{maxVariance > 0 && `-${avgPerReviewer + maxVariance}`} products
                    </div>
                    <div className="text-sm text-muted-foreground">per reviewer</div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviewers Table */}
            <div className="flex-1 overflow-auto border rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIds.size === filteredReviewers.length && filteredReviewers.length > 0}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Current Workload</TableHead>
                    <TableHead>Est. New</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviewers.map((reviewer) => {
                    const expertise = getExpertiseCount(reviewer);
                    const isSelected = selectedIds.has(reviewer.user_id);
                    return (
                      <TableRow key={reviewer.user_id}>
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleReviewer(reviewer.user_id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {reviewer.first_name} {reviewer.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {reviewer.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {expertise.categories > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {expertise.categories} cat
                              </Badge>
                            )}
                            {expertise.companies > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {expertise.companies} co
                              </Badge>
                            )}
                            {expertise.products > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {expertise.products} prod
                              </Badge>
                            )}
                            {expertise.categories === 0 && expertise.companies === 0 && expertise.products === 0 && (
                              <span className="text-xs text-muted-foreground">No expertise set</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getWorkloadColor(reviewer.current_workload)}>
                            {reviewer.current_workload}
                          </span>
                        </TableCell>
                        <TableCell>
                          {isSelected ? `~${avgPerReviewer}` : '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => onContinue(Array.from(selectedIds))}
            disabled={selectedIds.size === 0}
          >
            Continue to Assignment Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
