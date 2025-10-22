import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { format } from 'date-fns';

interface RoleRequest {
  id: string;
  requested_role: string;
  status: string;
  justification: string;
  company_id?: string;
  created_at: string;
  reviewed_at?: string;
}

export const RoleRequestHistory = () => {
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoleRequests();
  }, []);

  const fetchRoleRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('role_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching role requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
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
    <Card>
      <CardHeader>
        <CardTitle>Role Request History</CardTitle>
        <CardDescription>
          View the status of your role requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No role requests yet
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold capitalize">
                      {request.requested_role} Role
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Requested on {format(new Date(request.created_at), 'PPP')}
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                
                {request.company_id && (
                  <div>
                    <p className="text-sm font-medium">Company: {request.company_id}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">
                    {request.justification}
                  </p>
                </div>

                {request.reviewed_at && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Reviewed on {format(new Date(request.reviewed_at), 'PPP')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
