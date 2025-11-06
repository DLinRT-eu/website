import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface HealthCheckResult {
  auth_uid: string | null;
  has_admin_role: boolean;
  can_manage_reviews: boolean;
  can_view_security: boolean;
  user_roles: string[] | null;
  timestamp: string;
}

export function PermissionDiagnostics() {
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: rpcError } = await supabase.rpc('admin_health_check');
      
      if (rpcError) {
        setError(`RPC Error: ${rpcError.message} (Code: ${rpcError.code})`);
        return;
      }

      setResult(data as unknown as HealthCheckResult);
    } catch (err: any) {
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = ({ value }: { value: boolean }) => {
    return value ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Permission Diagnostics</h3>
        <Button 
          onClick={runDiagnostics} 
          disabled={loading}
          size="sm"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Run Check
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Diagnostic Failed</AlertTitle>
          <AlertDescription className="font-mono text-xs mt-2">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="font-medium">Authenticated User ID</span>
            <code className="text-xs">{result.auth_uid || 'None'}</code>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="font-medium">Has Admin Role</span>
            <StatusIcon value={result.has_admin_role} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="font-medium">Can Manage Reviews</span>
            <StatusIcon value={result.can_manage_reviews} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="font-medium">Can View Security Data</span>
            <StatusIcon value={result.can_view_security} />
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium mb-2">Active Roles</div>
            <div className="flex flex-wrap gap-2">
              {result.user_roles && result.user_roles.length > 0 ? (
                result.user_roles.map((role, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
                  >
                    {role}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No roles assigned</span>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-right">
            Checked at: {new Date(result.timestamp).toLocaleString()}
          </div>
        </div>
      )}

      {!result && !error && !loading && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Click "Run Check" to diagnose your permissions
        </p>
      )}
    </Card>
  );
}
