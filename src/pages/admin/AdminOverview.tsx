import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, CheckCircle, Clock, Users, FileText, Building2, Shield, Gauge, Lock, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import PageLayout from '@/components/layout/PageLayout';

interface PendingRoleRequest {
  id: string;
  user_id: string;
  requested_role: string;
  justification: string;
  created_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface UnassignedReview {
  id: string;
  product_id: string;
  priority: string;
  created_at: string;
}

interface PendingRevision {
  id: string;
  product_id: string;
  verification_status: string;
  created_at: string;
}

interface RecentUser {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminOverview() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roleRequests, setRoleRequests] = useState<PendingRoleRequest[]>([]);
  const [unassignedReviews, setUnassignedReviews] = useState<UnassignedReview[]>([]);
  const [pendingRevisions, setPendingRevisions] = useState<PendingRevision[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchAllData();
  }, [isAdmin, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch pending role requests with user profiles
      const { data: requests, error: requestsError } = await supabase
        .from('role_requests')
        .select('id, user_id, requested_role, justification, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (requestsError) {
        console.error('Error fetching role requests:', requestsError);
      } else if (requests) {
        // Fetch profiles separately
        const userIds = requests.map(r => r.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, email, first_name, last_name')
          .in('id', userIds);

        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        
        const enrichedRequests = requests.map(request => ({
          ...request,
          profiles: profilesMap.get(request.user_id) || {
            email: 'Unknown',
            first_name: 'Unknown',
            last_name: 'User'
          }
        }));
        
        setRoleRequests(enrichedRequests);
      }

      // Fetch unassigned reviews
      const { data: reviews } = await supabase
        .from('product_reviews')
        .select('id, product_id, priority, created_at')
        .is('assigned_to', null)
        .order('created_at', { ascending: false })
        .limit(10);
      setUnassignedReviews(reviews || []);

      // Fetch pending revisions
      const { data: revisions } = await supabase
        .from('company_revisions')
        .select('id, product_id, verification_status, created_at')
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);
      setPendingRevisions(revisions || []);

      // Fetch recent users (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: users } = await supabase
        .from('profiles')
        .select('id, email, created_at')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);
      setRecentUsers(users || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRole = async (requestId: string, userId: string, requestedRole: 'admin' | 'reviewer' | 'company') => {
    try {
      // Check for existing roles and conflicts
      const { data: existingRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      const userRoles = existingRoles?.map(r => r.role) || [];

      // Check for company + reviewer conflict
      if (requestedRole === 'company' && userRoles.includes('reviewer')) {
        toast.error('Cannot assign Company role: User already has Reviewer role (incompatible)');
        return;
      }

      if (requestedRole === 'reviewer' && userRoles.includes('company')) {
        toast.error('Cannot assign Reviewer role: User already has Company role (incompatible)');
        return;
      }

      // Check for company + user products conflict
      if (requestedRole === 'company') {
        const { data: userProducts, error: productsError } = await supabase
          .from('user_products')
          .select('id')
          .eq('user_id', userId)
          .limit(1);

        if (productsError) throw productsError;

        if (userProducts && userProducts.length > 0) {
          toast.error('Cannot assign Company role: User has product adoptions (conflict of interest)');
          return;
        }
      }

      // Grant the role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: requestedRole, granted_by: userId }]);

      if (roleError) throw roleError;

      // Update request status
      const { error: updateError } = await supabase
        .from('role_requests')
        .update({ status: 'approved', reviewed_by: userId, reviewed_at: new Date().toISOString() })
        .eq('id', requestId);

      if (updateError) throw updateError;

      toast.success('Role approved successfully');
      fetchAllData();
    } catch (error) {
      console.error('Error approving role:', error);
      toast.error('Failed to approve role');
    }
  };

  const handleRejectRole = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('role_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

      toast.success('Role request rejected');
      fetchAllData();
    } catch (error) {
      console.error('Error rejecting role:', error);
      toast.error('Failed to reject role');
    }
  };

  const totalPending = roleRequests.length + unassignedReviews.length + pendingRevisions.length;
  const urgentCount = unassignedReviews.filter(r => r.priority === 'high').length;

  return (
    <>
      <SEO 
        title="Admin Overview | DLinRT.eu"
        description="Administrator dashboard for managing users, reviews, and content"
      />
      <PageLayout>
        <div className="container mx-auto py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Admin Overview</h1>
              <p className="text-muted-foreground mt-2">
                Centralized dashboard for all pending administrative tasks
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/admin/users')}>
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin/reviews')}>
                <FileText className="h-4 w-4 mr-2" />
                Review Assignment
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPending}</div>
                <p className="text-xs text-muted-foreground">Items requiring action</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Urgent Reviews</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{urgentCount}</div>
                <p className="text-xs text-muted-foreground">High priority unassigned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Role Requests</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roleRequests.length}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentUsers.length}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Administrative Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Administrative Tools
              </CardTitle>
              <CardDescription>Quick access to admin and reviewer features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Admin Pages Section */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin Pages <Badge variant="secondary" className="ml-2">Admin role required</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/admin')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Gauge className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">Admin Dashboard</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Central administrative hub with stats and quick actions
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/admin/users')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Users className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">User Management</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Manage user roles and permissions
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/admin/reviews')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <ClipboardCheck className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">Review Assignment</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Assign product reviews to reviewers
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/admin/security')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">Security Dashboard</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Monitor security events and system health
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Reviewer Pages Section */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Reviewer Pages <Badge variant="secondary" className="ml-2">Reviewer or Admin role</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/review')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">Review Dashboard</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Product review management interface
                          </div>
                        </div>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => navigate('/reviewer/dashboard')}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Gauge className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">Reviewer Dashboard</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Personal reviewer workspace
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Role Requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Pending Role Requests ({roleRequests.length})
                  </CardTitle>
                  <CardDescription>Users requesting elevated access</CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate('/admin/users')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {roleRequests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No pending role requests</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {request.profiles.first_name} {request.profiles.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">{request.profiles.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.requested_role}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{request.justification}</TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveRole(request.id, request.user_id, request.requested_role as 'admin' | 'reviewer' | 'company')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectRole(request.id)}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Unassigned Reviews */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Unassigned Product Reviews ({unassignedReviews.length})
                  </CardTitle>
                  <CardDescription>Products awaiting reviewer assignment</CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate('/admin/reviews')}>
                  Assign Reviews
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {unassignedReviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">All reviews are assigned</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unassignedReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-mono">{review.product_id}</TableCell>
                        <TableCell>
                          <Badge variant={review.priority === 'high' ? 'destructive' : 'secondary'}>
                            {review.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => navigate('/admin/reviews')}>
                            Assign →
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Pending Company Revisions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Pending Company Revisions ({pendingRevisions.length})
              </CardTitle>
              <CardDescription>Product updates awaiting verification</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRevisions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No pending revisions</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRevisions.map((revision) => (
                      <TableRow key={revision.id}>
                        <TableCell className="font-mono">{revision.product_id}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{revision.verification_status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(revision.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => navigate('/company/dashboard')}>
                            Review →
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent User Signups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent User Signups ({recentUsers.length})
              </CardTitle>
              <CardDescription>New users in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              {recentUsers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No new users</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => navigate('/admin/users')}>
                            View Profile →
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </>
  );
}
