import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { format } from 'date-fns';

interface RoleRequest {
  id: string;
  user_id: string;
  requested_role: 'admin' | 'reviewer' | 'company';
  status: 'pending' | 'approved' | 'rejected';
  justification: string;
  company_id?: string;
  created_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const RoleRequestManager = () => {
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RoleRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoleRequests();
  }, []);

  const fetchRoleRequests = async () => {
    try {
      const { data: requestsData, error } = await supabase
        .from('role_requests')
        .select(`
          id,
          user_id,
          requested_role,
          status,
          justification,
          company_id,
          created_at,
          profiles:user_id (
            email,
            first_name,
            last_name
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        // Silently handle permission denied errors (happens during initial load)
        if (error.code === '42501' || error.message.includes('permission denied')) {
          console.warn('Permission denied for role_requests - auth may still be loading');
          setRequests([]);
          setLoading(false);
          return;
        }
        throw error;
      }

      // Transform nested profiles data
      const transformedRequests = (requestsData || []).map(req => ({
        ...req,
        profiles: Array.isArray(req.profiles) ? req.profiles[0] : req.profiles
      })) as RoleRequest[];

      setRequests(transformedRequests);
    } catch (error: any) {
      console.error('Error fetching role requests:', error);
      toast({
        title: 'Error loading role requests',
        description: 'Unable to load pending role requests. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (request: RoleRequest) => {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Grant the role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: request.user_id,
          role: request.requested_role,
          granted_by: user.id,
        });

      if (roleError) throw roleError;

      // If company role, update company_representatives
      if (request.requested_role === 'company' && request.company_id) {
        const { error: companyError } = await supabase
          .from('company_representatives')
          .update({
            verified: true,
            verified_by: user.id,
            verified_at: new Date().toISOString(),
          })
          .eq('user_id', request.user_id)
          .eq('company_id', request.company_id);

        if (companyError) throw companyError;
      }

      // Update request status
      const { error: updateError } = await supabase
        .from('role_requests')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      toast({
        title: 'Role Approved',
        description: `Successfully granted ${request.requested_role} role to ${request.profiles.email}`,
      });

      setSelectedRequest(null);
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectRequest = async (request: RoleRequest) => {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('role_requests')
        .update({
          status: 'rejected',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (error) throw error;

      toast({
        title: 'Role Request Rejected',
        description: `Rejected ${request.requested_role} role request from ${request.profiles.email}`,
      });

      setSelectedRequest(null);
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'reviewer': return 'secondary';
      case 'company': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Role Requests</CardTitle>
          <CardDescription>
            Review and approve role requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pending role requests
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {request.profiles.first_name} {request.profiles.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request.profiles.email}
                      </p>
                    </div>
                    <Badge variant={getRoleBadgeVariant(request.requested_role)}>
                      {request.requested_role}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Justification:</p>
                    <p className="text-sm text-muted-foreground">
                      {request.justification}
                    </p>
                  </div>

                  {request.company_id && (
                    <div>
                      <p className="text-sm font-medium mb-1">Company ID:</p>
                      <p className="text-sm text-muted-foreground">
                        {request.company_id}
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Requested on {format(new Date(request.created_at), 'PPP')}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                      disabled={processing}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Role Request</DialogTitle>
            <DialogDescription>
              Approve or reject this role request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">User:</p>
                <p className="text-sm">{selectedRequest.profiles.email}</p>
              </div>
              <div>
                <p className="font-semibold">Requested Role:</p>
                <Badge variant={getRoleBadgeVariant(selectedRequest.requested_role)}>
                  {selectedRequest.requested_role}
                </Badge>
              </div>
              <div>
                <p className="font-semibold mb-2">Justification:</p>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {selectedRequest.justification}
                </p>
              </div>
              {selectedRequest.company_id && (
                <div>
                  <p className="font-semibold">Company:</p>
                  <p className="text-sm">{selectedRequest.company_id}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedRequest(null)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedRequest && handleRejectRequest(selectedRequest)}
              disabled={processing}
            >
              Reject
            </Button>
            <Button
              onClick={() => selectedRequest && handleApproveRequest(selectedRequest)}
              disabled={processing}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
