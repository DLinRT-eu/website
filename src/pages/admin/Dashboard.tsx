import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  UserPlus,
  FileText,
  TrendingUp,
  Activity,
  Building2,
  Calendar,
  Stethoscope,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface DashboardStats {
  totalUsers: number;
  usersByRole: {
    admin: number;
    reviewer: number;
    company: number;
    noRole: number;
  };
  pendingRoleRequests: number;
  activeReviews: {
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
  pendingRevisions: number;
  recentSecurityEvents: number;
}

interface RecentActivity {
  id: string;
  type: 'role_request' | 'review_assignment' | 'user_signup' | 'security_event';
  description: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    usersByRole: { admin: 0, reviewer: 0, company: 0, noRole: 0 },
    pendingRoleRequests: 0,
    activeReviews: { pending: 0, inProgress: 0, completed: 0, overdue: 0 },
    pendingRevisions: 0,
    recentSecurityEvents: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [healthCheckRunning, setHealthCheckRunning] = useState(false);
  const [healthCheckResult, setHealthCheckResult] = useState<any>(null);

  useEffect(() => {
    // Don't check permissions while still loading auth
    if (authLoading) return;
    
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, isAdmin, authLoading, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch users by role
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('role');

      const roleCount = {
        admin: rolesData?.filter(r => r.role === 'admin').length || 0,
        reviewer: rolesData?.filter(r => r.role === 'reviewer').length || 0,
        company: rolesData?.filter(r => r.role === 'company').length || 0,
        noRole: (totalUsers || 0) - (rolesData?.length || 0),
      };

      // Fetch pending role requests
      const { count: pendingRequests } = await supabase
        .from('role_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch review stats
      const { data: reviewsData } = await supabase
        .from('product_reviews')
        .select('status, deadline');

      const now = new Date();
      const reviewStats = {
        pending: reviewsData?.filter(r => r.status === 'pending').length || 0,
        inProgress: reviewsData?.filter(r => r.status === 'in_progress').length || 0,
        completed: reviewsData?.filter(r => r.status === 'completed').length || 0,
        overdue: reviewsData?.filter(r => 
          r.deadline && new Date(r.deadline) < now && r.status !== 'completed'
        ).length || 0,
      };

      // Fetch pending revisions
      const { count: pendingRevisions } = await supabase
        .from('company_revisions')
        .select('*', { count: 'exact', head: true })
        .eq('verification_status', 'pending');

      // Fetch recent security events (last 24 hours)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const { count: recentSecurity } = await supabase
        .from('security_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString())
        .in('severity', ['high', 'critical']);

      setStats({
        totalUsers: totalUsers || 0,
        usersByRole: roleCount,
        pendingRoleRequests: pendingRequests || 0,
        activeReviews: reviewStats,
        pendingRevisions: pendingRevisions || 0,
        recentSecurityEvents: recentSecurity || 0,
      });

      // Fetch recent activity
      await fetchRecentActivity();

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    const activities: RecentActivity[] = [];

    // Step 1: Fetch recent role requests (last 5)
    const { data: requests } = await supabase
      .from('role_requests')
      .select('id, requested_role, created_at, user_id')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5);

    // Step 2: Fetch recent review assignments (last 5)
    const { data: reviews } = await supabase
      .from('product_reviews')
      .select('id, product_id, assigned_at, assigned_to')
      .order('assigned_at', { ascending: false })
      .limit(5);

    // Step 3: Collect all unique user IDs
    const userIds = new Set<string>();
    requests?.forEach(req => req.user_id && userIds.add(req.user_id));
    reviews?.forEach(rev => rev.assigned_to && userIds.add(rev.assigned_to));

    // Step 4: Fetch profiles for all those user IDs
    let profilesMap = new Map();
    if (userIds.size > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', Array.from(userIds));

      profilesData?.forEach(p => {
        profilesMap.set(p.id, p);
      });
    }

    // Step 5: Build activities with mapped profiles
    requests?.forEach(req => {
      const profile = profilesMap.get(req.user_id);
      activities.push({
        id: req.id,
        type: 'role_request',
        description: `${profile?.email || 'User'} requested ${req.requested_role} role`,
        timestamp: req.created_at,
      });
    });

    reviews?.forEach(rev => {
      const profile = profilesMap.get(rev.assigned_to);
      activities.push({
        id: rev.id,
        type: 'review_assignment',
        description: `Review assigned to ${profile?.first_name || ''} ${profile?.last_name || ''} for ${rev.product_id}`,
        timestamp: rev.assigned_at || '',
      });
    });

    // Sort by timestamp
    activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setRecentActivity(activities.slice(0, 10));
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'role_request': return <UserPlus className="h-4 w-4" />;
      case 'review_assignment': return <FileText className="h-4 w-4" />;
      case 'user_signup': return <Users className="h-4 w-4" />;
      case 'security_event': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const runHealthCheck = async () => {
    setHealthCheckRunning(true);
    try {
      const { data, error } = await supabase.rpc('admin_health_check');
      
      if (error) {
        console.error('Health check error:', error);
        toast({
          title: 'Health Check Failed',
          description: error.message || 'Failed to run health check',
          variant: 'destructive',
        });
        setHealthCheckResult({ error: error.message });
        return;
      }
      
      setHealthCheckResult(data);
      toast({
        title: 'Health Check Complete',
        description: 'System diagnostics completed successfully',
      });
    } catch (error: any) {
      console.error('Health check error:', error);
      toast({
        title: 'Health Check Failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setHealthCheckResult({ error: error.message });
    } finally {
      setHealthCheckRunning(false);
    }
  };

  if (loading || authLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Overview of system activity and management</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.usersByRole.admin} admins, {stats.usersByRole.reviewer} reviewers, {stats.usersByRole.company} companies
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRoleRequests}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Role requests awaiting review
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Active Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeReviews.pending + stats.activeReviews.inProgress}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.activeReviews.overdue > 0 && (
                  <span className="text-destructive">{stats.activeReviews.overdue} overdue</span>
                )}
                {stats.activeReviews.overdue === 0 && 'All on track'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentSecurityEvents}</div>
              <div className="text-xs text-muted-foreground mt-1">
                High/critical in last 24h
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/reviews">
                  <FileText className="h-5 w-5" />
                  <span>Assign Reviews</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/users">
                  <Users className="h-5 w-5" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/security">
                  <Shield className="h-5 w-5" />
                  <span>Security Dashboard</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/review">
                  <Activity className="h-5 w-5" />
                  <span>Review Dashboard</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/company/dashboard">
                  <Building2 className="h-5 w-5" />
                  <span>Company Oversight</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/review-rounds">
                  <Calendar className="h-5 w-5" />
                  <span>Review Rounds</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Diagnostics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              System Diagnostics
            </CardTitle>
            <CardDescription>
              Check admin permissions and authentication status to troubleshoot access issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Button 
                  onClick={runHealthCheck}
                  disabled={healthCheckRunning}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${healthCheckRunning ? 'animate-spin' : ''}`} />
                  {healthCheckRunning ? 'Running...' : 'Run Health Check'}
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Tests your authentication status, role assignments, and permission levels.</p>
                  <p className="mt-1">Use this if you're experiencing permission denied errors.</p>
                </div>
              </div>

              {healthCheckResult && (
                <div className="mt-4 p-4 rounded-lg bg-muted border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    {healthCheckResult.error ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-destructive">Diagnostic Failed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Diagnostic Results</span>
                      </>
                    )}
                  </h4>
                  
                  {healthCheckResult.error ? (
                    <div className="space-y-2 text-sm">
                      <div className="text-destructive">
                        <strong>Error:</strong> {healthCheckResult.error}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">User ID:</span>
                        <div className="font-mono text-xs mt-1 bg-background p-2 rounded">
                          {healthCheckResult.auth_uid || 'null'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <div className="font-mono text-xs mt-1 bg-background p-2 rounded">
                          {healthCheckResult.timestamp ? format(new Date(healthCheckResult.timestamp), 'MMM d, HH:mm:ss') : 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Admin Status:</span>
                        <div className="mt-1">
                          {healthCheckResult.has_admin_role ? (
                            <Badge className="bg-green-600">✓ Admin</Badge>
                          ) : (
                            <Badge variant="destructive">✗ Not Admin</Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Can Manage Reviews:</span>
                        <div className="mt-1">
                          {healthCheckResult.can_manage_reviews ? (
                            <Badge className="bg-green-600">✓ Yes</Badge>
                          ) : (
                            <Badge variant="outline">✗ No</Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Can View Security:</span>
                        <div className="mt-1">
                          {healthCheckResult.can_view_security ? (
                            <Badge className="bg-green-600">✓ Yes</Badge>
                          ) : (
                            <Badge variant="outline">✗ No</Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned Roles:</span>
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {healthCheckResult.user_roles && healthCheckResult.user_roles.length > 0 ? (
                            healthCheckResult.user_roles.map((role: string) => (
                              <Badge key={role} variant="secondary">{role}</Badge>
                            ))
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system events and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 && (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                )}
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(activity.timestamp), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Warnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alerts & Warnings
              </CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.activeReviews.overdue > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Overdue Reviews</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.activeReviews.overdue} review{stats.activeReviews.overdue > 1 ? 's' : ''} past deadline
                      </p>
                    </div>
                  </div>
                )}

                {stats.pendingRoleRequests > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Pending Role Requests</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.pendingRoleRequests} request{stats.pendingRoleRequests > 1 ? 's' : ''} awaiting review
                      </p>
                    </div>
                  </div>
                )}

                {stats.pendingRevisions > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Pending Revisions</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.pendingRevisions} company revision{stats.pendingRevisions > 1 ? 's' : ''} to verify
                      </p>
                    </div>
                  </div>
                )}

                {stats.recentSecurityEvents > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <Shield className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Security Events</p>
                      <p className="text-sm text-muted-foreground">
                        {stats.recentSecurityEvents} high/critical event{stats.recentSecurityEvents > 1 ? 's' : ''} detected
                      </p>
                    </div>
                  </div>
                )}

                {stats.activeReviews.overdue === 0 && 
                 stats.pendingRoleRequests === 0 && 
                 stats.pendingRevisions === 0 && 
                 stats.recentSecurityEvents === 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">All systems operational</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
