import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Loader2, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Reviewer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface QuickAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productIds: string[];
  productNames: string[];
  onAssignmentComplete?: () => void;
}

export function QuickAssignDialog({
  open,
  onOpenChange,
  productIds,
  productNames,
  onAssignmentComplete
}: QuickAssignDialogProps) {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
  const [deadline, setDeadline] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [loadingReviewers, setLoadingReviewers] = useState(false);
  const { toast } = useToast();

  // Fetch reviewers when dialog opens
  useEffect(() => {
    if (open) {
      fetchReviewers();
    }
  }, [open]);

  const fetchReviewers = async () => {
    setLoadingReviewers(true);
    try {
      // First get user IDs with reviewer or admin roles
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id')
        .in('role', ['admin', 'reviewer']);

      if (roleError) throw roleError;

      const userIds = roleData?.map(r => r.user_id) || [];

      if (userIds.length === 0) {
        setReviewers([]);
        return;
      }

      // Then get profiles for those users
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', userIds)
        .order('first_name');

      if (error) throw error;
      setReviewers(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load reviewers',
        variant: 'destructive',
      });
    } finally {
      setLoadingReviewers(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedReviewer) {
      toast({
        title: 'Reviewer Required',
        description: 'Please select a reviewer',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('quick_assign_products', {
        p_product_ids: productIds,
        p_reviewer_id: selectedReviewer,
        p_deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null,
      });

      if (error) throw error;

      const result = data as { success: boolean; assigned_count: number; round_id: string };
      
      toast({
        title: 'Assignment Complete',
        description: `Successfully assigned ${result.assigned_count} product(s) to reviewer`,
      });

      onAssignmentComplete?.();
      onOpenChange(false);
      
      // Reset form
      setSelectedReviewer('');
      setDeadline(undefined);
    } catch (error: any) {
      toast({
        title: 'Assignment Failed',
        description: error.message || 'Failed to assign products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedReviewerData = reviewers.find(r => r.id === selectedReviewer);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Quick Assign Products
          </DialogTitle>
          <DialogDescription>
            Assign selected products to a reviewer. This creates a review round automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Products Summary */}
          <div className="space-y-2">
            <Label>Selected Products ({productIds.length})</Label>
            <div className="max-h-32 overflow-y-auto rounded-md border p-3 space-y-1">
              {productNames.map((name, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  • {name}
                </div>
              ))}
            </div>
          </div>

          {/* Reviewer Selection */}
          <div className="space-y-2">
            <Label htmlFor="reviewer">Assign To *</Label>
            {loadingReviewers ? (
              <div className="flex items-center justify-center p-4 border rounded-md">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Loading reviewers...</span>
              </div>
            ) : (
              <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                <SelectTrigger id="reviewer">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {reviewers.map((reviewer) => (
                    <SelectItem key={reviewer.id} value={reviewer.id}>
                      {reviewer.first_name} {reviewer.last_name} ({reviewer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Deadline Selection */}
          <div className="space-y-2">
            <Label>Deadline (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !deadline && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, 'PPP') : 'Default: 14 days from now'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Summary */}
          {selectedReviewerData && (
            <div className="rounded-md bg-muted p-3 space-y-1">
              <p className="text-sm font-medium">Assignment Summary</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Reviewer: {selectedReviewerData.first_name} {selectedReviewerData.last_name}</p>
                <p>• Products: {productIds.length}</p>
                <p>• Deadline: {deadline ? format(deadline, 'PPP') : '14 days from now'}</p>
                <p>• Status: Will be set to "Pending"</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={loading || !selectedReviewer || loadingReviewers}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              'Assign Products'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
