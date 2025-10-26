import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  Activity
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
  const { user, isAdmin } = useAuth();
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

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, isAdmin]);

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

    // Recent role requests (last 5)
    const { data: requests } = await supabase
      .from('role_requests')
      .select('id, requested_role, created_at, profiles(email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5);

    requests?.forEach(req => {
      activities.push({
        id: req.id,
        type: 'role_request',
        description: `${(req.profiles as any)?.email || 'User'} requested ${req.requested_role} role`,
        timestamp: req.created_at,
      });
    });

    // Recent review assignments (last 5)
    const { data: reviews } = await supabase
      .from('product_reviews')
      .select('id, product_id, assigned_at, profiles(first_name, last_name)')
      .order('assigned_at', { ascending: false })
      .limit(5);

    reviews?.forEach(rev => {
      const profile = rev.profiles as any;
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

  if (loading) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
