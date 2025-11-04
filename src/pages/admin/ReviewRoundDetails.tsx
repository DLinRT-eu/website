import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Clock, Users, Package, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import type { ReviewRound } from "@/utils/reviewRoundUtils";
import { ALL_PRODUCTS } from "@/data";

interface AssignmentHistoryRecord {
  id: string;
  product_id: string;
  assigned_to: string | null;
  previous_assignee: string | null;
  changed_by: string;
  change_type: 'initial' | 'reassign' | 'remove';
  reason: string | null;
  created_at: string;
  changed_by_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  assigned_to_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  previous_assignee_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Assignment {
  id: string;
  product_id: string;
  assigned_to: string;
  status: string;
  deadline: string | null;
  assigned_at: string;
  reviewer_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function ReviewRoundDetails() {
  const { roundId } = useParams<{ roundId: string }>();
  const navigate = useNavigate();
  const [round, setRound] = useState<ReviewRound | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [history, setHistory] = useState<AssignmentHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roundId) {
      fetchRoundDetails();
    }
  }, [roundId]);

  const fetchRoundDetails = async () => {
    if (!roundId) return;

    try {
      // Fetch round details
      const { data: roundData, error: roundError } = await supabase
        .from('review_rounds')
        .select('*')
        .eq('id', roundId)
        .single();

      if (roundError) throw roundError;
      setRound(roundData as ReviewRound);

      // Fetch assignments with reviewer profiles
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('product_reviews')
        .select('id, product_id, assigned_to, status, deadline, assigned_at')
        .eq('review_round_id', roundId)
        .order('assigned_at', { ascending: false });

      if (assignmentsError) throw assignmentsError;

      // Fetch reviewer profiles separately
      if (assignmentsData && assignmentsData.length > 0) {
        const reviewerIds = [...new Set(assignmentsData.map(a => a.assigned_to))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', reviewerIds);

        const profileMap = new Map(profiles?.map(p => [p.id, p]));
        
        const enrichedAssignments = assignmentsData.map(a => ({
          ...a,
          reviewer_profile: profileMap.get(a.assigned_to)
        }));
        
        setAssignments(enrichedAssignments as Assignment[]);
      } else {
        setAssignments([]);
      }

      // Fetch assignment history
      const { data: historyData, error: historyError } = await supabase
        .from('assignment_history')
        .select('id, product_id, assigned_to, previous_assignee, changed_by, change_type, reason, created_at')
        .eq('review_round_id', roundId)
        .order('created_at', { ascending: false });

      if (historyError) throw historyError;

      // Fetch all related profiles
      if (historyData && historyData.length > 0) {
        const allUserIds = new Set<string>();
        historyData.forEach(h => {
          if (h.assigned_to) allUserIds.add(h.assigned_to);
          if (h.previous_assignee) allUserIds.add(h.previous_assignee);
          if (h.changed_by) allUserIds.add(h.changed_by);
        });

        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', Array.from(allUserIds));

        const profileMap = new Map(profiles?.map(p => [p.id, p]));
        
        const enrichedHistory = historyData.map(h => ({
          ...h,
          changed_by_profile: h.changed_by ? profileMap.get(h.changed_by) : undefined,
          assigned_to_profile: h.assigned_to ? profileMap.get(h.assigned_to) : undefined,
          previous_assignee_profile: h.previous_assignee ? profileMap.get(h.previous_assignee) : undefined
        }));
        
        setHistory(enrichedHistory as AssignmentHistoryRecord[]);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error fetching round details:', error);
      toast.error('Failed to load round details');
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId: string) => {
    return ALL_PRODUCTS.find(p => p.id === productId)?.name || productId;
  };

  const getChangeTypeBadge = (type: string) => {
    const variants = {
      initial: { variant: 'default' as const, label: 'Initial Assignment' },
      reassign: { variant: 'outline' as const, label: 'Reassigned' },
      remove: { variant: 'destructive' as const, label: 'Removed' }
    };
    const config = variants[type as keyof typeof variants] || variants.initial;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'secondary', label: 'Pending' },
      in_progress: { variant: 'default', label: 'In Progress' },
      completed: { variant: 'outline', label: 'Completed' }
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  if (!round) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Round not found</p>
            <Button onClick={() => navigate('/admin/review-rounds')} className="mt-4">
              Back to Rounds
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/review-rounds')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{round.name}</h1>
          {round.description && (
            <p className="text-muted-foreground mt-1">{round.description}</p>
          )}
        </div>
        <Badge variant={round.status === 'active' ? 'default' : 'secondary'}>
          {round.status}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Reviewers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(assignments.map(a => a.assigned_to)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History Records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList>
          <TabsTrigger value="assignments">
            Current Assignments ({assignments.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Assignment History ({history.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
              <CardDescription>All product assignments for this round</CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No assignments yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Assigned At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {getProductName(assignment.product_id)}
                        </TableCell>
                        <TableCell>
                          {assignment.reviewer_profile ? (
                            <div>
                              <div>
                                {assignment.reviewer_profile.first_name}{' '}
                                {assignment.reviewer_profile.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {assignment.reviewer_profile.email}
                              </div>
                            </div>
                          ) : (
                            'Unknown'
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                        <TableCell>
                          {assignment.deadline
                            ? format(new Date(assignment.deadline), 'MMM d, yyyy')
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {format(new Date(assignment.assigned_at), 'MMM d, yyyy HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment History</CardTitle>
              <CardDescription>
                Audit log of all assignment changes and who made them
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No history records yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Changed By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(record.created_at), 'MMM d, yyyy HH:mm')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getProductName(record.product_id)}
                        </TableCell>
                        <TableCell>{getChangeTypeBadge(record.change_type)}</TableCell>
                        <TableCell>
                          {record.change_type === 'initial' && record.assigned_to_profile && (
                            <div>
                              Assigned to{' '}
                              <span className="font-medium">
                                {record.assigned_to_profile.first_name}{' '}
                                {record.assigned_to_profile.last_name}
                              </span>
                            </div>
                          )}
                          {record.change_type === 'reassign' && (
                            <div>
                              {record.previous_assignee_profile && (
                                <span>
                                  From{' '}
                                  <span className="font-medium">
                                    {record.previous_assignee_profile.first_name}{' '}
                                    {record.previous_assignee_profile.last_name}
                                  </span>
                                </span>
                              )}
                              {record.assigned_to_profile && (
                                <span>
                                  {' '}
                                  to{' '}
                                  <span className="font-medium">
                                    {record.assigned_to_profile.first_name}{' '}
                                    {record.assigned_to_profile.last_name}
                                  </span>
                                </span>
                              )}
                            </div>
                          )}
                          {record.change_type === 'remove' && record.previous_assignee_profile && (
                            <div>
                              Removed from{' '}
                              <span className="font-medium">
                                {record.previous_assignee_profile.first_name}{' '}
                                {record.previous_assignee_profile.last_name}
                              </span>
                            </div>
                          )}
                          {record.reason && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {record.reason}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.changed_by_profile ? (
                            <div>
                              <div>
                                {record.changed_by_profile.first_name}{' '}
                                {record.changed_by_profile.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {record.changed_by_profile.email}
                              </div>
                            </div>
                          ) : (
                            'System'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
