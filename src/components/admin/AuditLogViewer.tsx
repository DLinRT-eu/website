import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  action_type: string;
  performed_by_email: string;
  target_user_email: string | null;
  details: any;
  created_at: string;
}

export function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_audit_log')
        .select('id, action_type, performed_by_email, target_user_email, details, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching audit logs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load audit logs',
          variant: 'destructive',
        });
      } else {
        setLogs(data || []);
      }
    } catch (error: any) {
      console.error('Unexpected error fetching audit logs:', error);
      toast({
        title: 'Error',
        description: 'Unexpected error loading audit logs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getActionBadgeVariant = (actionType: string) => {
    if (actionType.includes('deleted')) return 'destructive';
    if (actionType.includes('granted')) return 'default';
    if (actionType.includes('revoked')) return 'secondary';
    return 'outline';
  };

  const formatActionType = (actionType: string) => {
    return actionType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Audit Log
        </CardTitle>
        <CardDescription>
          Complete history of administrative actions (last 100 entries)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No audit log entries found</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Target User</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionBadgeVariant(log.action_type)}>
                        {formatActionType(log.action_type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.performed_by_email}
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.target_user_email || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                      {log.details?.target_user_name && (
                        <span className="font-medium">{log.details.target_user_name}</span>
                      )}
                      {log.details?.reason && (
                        <span className="ml-2">({log.details.reason})</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
