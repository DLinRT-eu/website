import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SEO from '@/components/SEO';

export default function AdminAccessTest() {
  const { user, session, roles, loading, isAdmin } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [rolesFromDb, setRolesFromDb] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any>({});
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadSessionInfo();
  }, [user]);

  const loadSessionInfo = async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    setSessionInfo(currentSession);
  };

  const testRolesQuery = async () => {
    setTesting(true);
    const results: any = {};

    try {
      // Test 1: Direct query
      console.log('Test 1: Direct roles query');
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user?.id);

      results.directQuery = {
        success: !error,
        data,
        error: error?.message,
        count: data?.length || 0,
      };

      // Test 2: Check session
      const { data: { session: testSession } } = await supabase.auth.getSession();
      results.session = {
        exists: !!testSession,
        userId: testSession?.user?.id,
        expiresAt: testSession?.expires_at,
        isExpired: testSession?.expires_at ? testSession.expires_at < Math.floor(Date.now() / 1000) : null,
      };

      // Test 3: Check RLS with has_role function
      if (user?.id) {
        const { data: hasRoleData, error: hasRoleError } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin',
        });

        results.hasRoleFunction = {
          success: !hasRoleError,
          hasAdmin: hasRoleData,
          error: hasRoleError?.message,
        };
      }

      setRolesFromDb(data || []);
      setTestResults(results);
    } catch (error: any) {
      results.error = error.message;
      setTestResults(results);
    } finally {
      setTesting(false);
    }
  };

  const clearAuthState = async () => {
    await supabase.auth.signOut();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/auth';
  };

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Refresh failed:', error);
    } else {
      console.log('Session refreshed:', data);
      loadSessionInfo();
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Admin Access Test - DLinRT.eu"
        description="Debug page for testing admin authentication and access"
      />
      
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Access Test</h1>
            <p className="text-muted-foreground">Debug page for authentication testing</p>
          </div>
          <Badge variant={isAdmin ? "default" : "destructive"}>
            {isAdmin ? "Admin Access" : "No Admin Access"}
          </Badge>
        </div>

        {/* Current User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {loading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : user ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              Current User Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-sm">{user?.id || 'Not authenticated'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-mono text-sm">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Loading State</p>
                <Badge variant={loading ? "secondary" : "outline"}>
                  {loading ? 'Loading...' : 'Complete'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Context Roles</p>
                <div className="flex gap-2">
                  {roles.length > 0 ? (
                    roles.map(role => (
                      <Badge key={role} variant="default">{role}</Badge>
                    ))
                  ) : (
                    <Badge variant="outline">No roles</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Session Information
              <Button size="sm" onClick={refreshSession}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Session
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sessionInfo ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Access Token (first 20 chars)</p>
                    <p className="font-mono text-xs">{sessionInfo.access_token?.substring(0, 20)}...</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expires At</p>
                    <p className="text-sm">
                      {sessionInfo.expires_at 
                        ? new Date(sessionInfo.expires_at * 1000).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Is Expired</p>
                    <Badge variant={
                      sessionInfo.expires_at && sessionInfo.expires_at < Math.floor(Date.now() / 1000)
                        ? "destructive"
                        : "default"
                    }>
                      {sessionInfo.expires_at && sessionInfo.expires_at < Math.floor(Date.now() / 1000)
                        ? "Expired"
                        : "Valid"}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>No active session found</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Database Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Database Roles Test
              <Button 
                size="sm" 
                onClick={testRolesQuery} 
                disabled={testing || !user}
              >
                {testing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Run Tests
              </Button>
            </CardTitle>
            <CardDescription>
              Test direct database queries and RLS policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.keys(testResults).length > 0 && (
              <div className="space-y-4">
                {/* Direct Query Test */}
                {testResults.directQuery && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Direct Roles Query</h4>
                      <Badge variant={testResults.directQuery.success ? "default" : "destructive"}>
                        {testResults.directQuery.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                    {testResults.directQuery.error ? (
                      <Alert variant="destructive">
                        <AlertDescription>{testResults.directQuery.error}</AlertDescription>
                      </Alert>
                    ) : (
                      <div>
                        <p className="text-sm">Found {testResults.directQuery.count} role(s)</p>
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(testResults.directQuery.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Session Test */}
                {testResults.session && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Session Status</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Session exists: {testResults.session.exists ? '✅' : '❌'}</div>
                      <div>User ID: {testResults.session.userId || 'N/A'}</div>
                      <div>Expires: {testResults.session.expiresAt 
                        ? new Date(testResults.session.expiresAt * 1000).toLocaleString()
                        : 'N/A'}
                      </div>
                      <div>Expired: {testResults.session.isExpired ? '❌' : '✅'}</div>
                    </div>
                  </div>
                )}

                {/* has_role Function Test */}
                {testResults.hasRoleFunction && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">has_role() Function</h4>
                      <Badge variant={testResults.hasRoleFunction.success ? "default" : "destructive"}>
                        {testResults.hasRoleFunction.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                    {testResults.hasRoleFunction.error ? (
                      <Alert variant="destructive">
                        <AlertDescription>{testResults.hasRoleFunction.error}</AlertDescription>
                      </Alert>
                    ) : (
                      <p className="text-sm">
                        Has admin role: {testResults.hasRoleFunction.hasAdmin ? '✅ Yes' : '❌ No'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {rolesFromDb.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Roles from Database:</h4>
                  <div className="flex gap-2">
                    {rolesFromDb.map((roleRow) => (
                      <Badge key={roleRow.id} variant="default">
                        {roleRow.role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={clearAuthState}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Auth State & Sign Out
            </Button>
            <p className="text-xs text-muted-foreground">
              This will clear all local storage, session storage, and sign you out.
            </p>
          </CardContent>
        </Card>

        {/* Console Logs Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Check your browser console (F12) for detailed authentication logs.
            All AuthContext operations are logged with [AuthContext] prefix.
          </AlertDescription>
        </Alert>
      </div>
    </PageLayout>
  );
}
