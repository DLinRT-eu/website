import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { RoleRequestManager } from '@/components/admin/RoleRequestManager';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserPlus, UserMinus, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter, Trash2 } from 'lucide-react';

type AppRole = 'admin' | 'reviewer' | 'company';
type SortColumn = 'name' | 'email' | 'institution' | null;
type SortDirection = 'asc' | 'desc';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  institution?: string;
  approval_status?: string;
  created_at?: string;
  roles: AppRole[];
}

interface UserWithRolesFromDB {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  institution: string | null;
  created_at: string;
  roles: string[];
}

export default function UserManagement() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>('reviewer');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<AppRole | 'all' | 'none'>('all');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [operationLoading, setOperationLoading] = useState<string | null>(null); // userId-role for loading state
  const [revokeDialog, setRevokeDialog] = useState<{ open: boolean; userId: string; role: AppRole; userName: string } | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId: string; userEmail: string; userName: string } | null>(null);
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Don't check permissions while still loading auth
    if (authLoading) return;
    
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }

    fetchUsers();
  }, [user, isAdmin, authLoading, navigate]);

  // Apply filters and sorting whenever users, search, role filter, or sort changes
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.first_name.toLowerCase().includes(query) ||
        u.last_name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        (u.institution && u.institution.toLowerCase().includes(query))
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      if (roleFilter === 'none') {
        result = result.filter(u => u.roles.length === 0);
      } else {
        result = result.filter(u => u.roles.includes(roleFilter));
      }
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        let aVal: string, bVal: string;
        
        if (sortColumn === 'name') {
          aVal = `${a.first_name} ${a.last_name}`;
          bVal = `${b.first_name} ${b.last_name}`;
        } else if (sortColumn === 'email') {
          aVal = a.email;
          bVal = b.email;
        } else if (sortColumn === 'institution') {
          aVal = a.institution || '';
          bVal = b.institution || '';
        } else {
          return 0;
        }

        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredUsers(result);
  }, [users, searchQuery, roleFilter, sortColumn, sortDirection]);

  const fetchUsers = async () => {
    try {
      // Try using the admin-only function first (more efficient and bypasses RLS)
      // Using type assertion since TypeScript doesn't know about this custom RPC function
      const { data: usersFromFunction, error: functionError } = await supabase
        .rpc('get_users_with_roles_admin_only' as any) as { data: UserWithRolesFromDB[] | null, error: any };

      if (!functionError && usersFromFunction) {
        // Success! Convert the roles array to AppRole[]
        const usersWithRoles: UserProfile[] = usersFromFunction.map(user => ({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          institution: user.institution || undefined,
          created_at: user.created_at,
          roles: (user.roles || []) as AppRole[],
        }));
        setUsers(usersWithRoles);
        setLoading(false);
        return;
      }

      // Fallback to manual fetching if function doesn't exist or fails
      console.warn('RPC function not available, falling back to manual fetch:', functionError);

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, institution, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast({
          title: 'Error',
          description: `Failed to fetch users: ${profilesError.message}`,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (!profiles) {
        toast({
          title: 'Error',
          description: 'No profiles returned',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Fetch ALL roles at once (more efficient and avoids RLS issues)
      const { data: allRolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        toast({
          title: 'Warning',
          description: `Failed to fetch roles: ${rolesError.message}. Users will be shown without role information.`,
          variant: 'destructive',
        });
      }

      // Create a map of user_id to roles for fast lookup
      const rolesMap = new Map<string, AppRole[]>();
      if (allRolesData) {
        allRolesData.forEach(roleEntry => {
          const existingRoles = rolesMap.get(roleEntry.user_id) || [];
          existingRoles.push(roleEntry.role as AppRole);
          rolesMap.set(roleEntry.user_id, existingRoles);
        });
      }

      // Combine profiles with their roles
      const usersWithRoles = profiles.map(profile => ({
        ...profile,
        roles: rolesMap.get(profile.id) || [],
      }));

      setUsers(usersWithRoles);
      setLoading(false);
    } catch (error: any) {
      console.error('Unexpected error in fetchUsers:', error);
      toast({
        title: 'Error',
        description: `Unexpected error: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleGrantRole = async () => {
    if (!selectedUser || !user) return;

    const loadingKey = `${selectedUser.id}-grant`;
    setOperationLoading(loadingKey);

    try {
      // If granting admin role, also grant reviewer and company for testing
      const rolesToGrant: Array<{ user_id: string; role: AppRole; granted_by: string }> = selectedRole === 'admin' 
        ? [
            { user_id: selectedUser.id, role: 'admin' as AppRole, granted_by: user.id },
            { user_id: selectedUser.id, role: 'reviewer' as AppRole, granted_by: user.id },
            { user_id: selectedUser.id, role: 'company' as AppRole, granted_by: user.id }
          ]
        : [{ user_id: selectedUser.id, role: selectedRole, granted_by: user.id }];

      const { error, data } = await supabase
        .from('user_roles')
        .insert(rolesToGrant)
        .select();

      if (error) {
        console.error('Error granting role:', error);
        
        // Provide specific error messages
        let errorMessage = 'Failed to grant role';
        if (error.code === '23505') {
          errorMessage = 'This user already has this role';
        } else if (error.code === '42501') {
          errorMessage = 'Permission denied. You may not have sufficient privileges';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        const message = selectedRole === 'admin'
          ? `Admin role granted (includes reviewer & company for testing)`
          : `${selectedRole} role granted`;
        
        toast({
          title: 'Success',
          description: `${message} to ${selectedUser.first_name} ${selectedUser.last_name}`,
        });
        await fetchUsers();
        setDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Unexpected error granting role:', error);
      toast({
        title: 'Error',
        description: `Unexpected error: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setOperationLoading(null);
    }
  };

  const openRevokeDialog = (userId: string, role: AppRole, userName: string) => {
    setRevokeDialog({ open: true, userId, role, userName });
  };

  const handleRevokeRole = async () => {
    if (!revokeDialog) return;
    
    const { userId, role } = revokeDialog;
    const loadingKey = `${userId}-${role}`;
    setOperationLoading(loadingKey);

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) {
        console.error('Error revoking role:', error);
        
        let errorMessage = 'Failed to revoke role';
        if (error.code === '42501') {
          errorMessage = 'Permission denied. You may not have sufficient privileges';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: `${role} role revoked from ${revokeDialog.userName}`,
        });
        await fetchUsers();
      }
    } catch (error: any) {
      console.error('Unexpected error revoking role:', error);
      toast({
        title: 'Error',
        description: `Unexpected error: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setOperationLoading(null);
      setRevokeDialog(null);
    }
  };

  const openDeleteDialog = (userId: string, userEmail: string, userName: string) => {
    setDeleteDialog({ open: true, userId, userEmail, userName });
    setDeleteConfirmEmail('');
  };

  const handleDeleteUser = async () => {
    if (!deleteDialog || !user) return;

    // Safety check: prevent self-deletion
    if (deleteDialog.userId === user.id) {
      toast({
        title: 'Error',
        description: 'You cannot delete your own account from this interface',
        variant: 'destructive',
      });
      return;
    }

    // Verify email confirmation
    if (deleteConfirmEmail !== deleteDialog.userEmail) {
      toast({
        title: 'Error',
        description: 'Email confirmation does not match',
        variant: 'destructive',
      });
      return;
    }

    setDeleteLoading(true);

    try {
      const { error } = await supabase.auth.admin.deleteUser(deleteDialog.userId);

      if (error) {
        console.error('Error deleting user:', error);
        
        let errorMessage = 'Failed to delete user';
        if (error.message.includes('permission') || error.message.includes('authorized')) {
          errorMessage = 'Permission denied. You may not have sufficient privileges';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: `User ${deleteDialog.userName} has been permanently deleted`,
        });
        await fetchUsers();
        setDeleteDialog(null);
        setDeleteConfirmEmail('');
      }
    } catch (error: any) {
      console.error('Unexpected error deleting user:', error);
      toast({
        title: 'Error',
        description: `Unexpected error: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" />
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const getRoleBadgeVariant = (role: AppRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'reviewer': return 'default';
      case 'company': return 'secondary';
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
            <Shield className="h-8 w-8" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage user roles and permissions</p>
        </div>

        <div className="space-y-6">
          {/* Role Requests Section */}
          <RoleRequestManager />

          {/* Existing Users Section */}
          <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View and manage user roles</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or institution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Role Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as AppRole | 'all' | 'none')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                    <SelectItem value="reviewer">Reviewer Only</SelectItem>
                    <SelectItem value="company">Company Only</SelectItem>
                    <SelectItem value="none">No Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground mb-4">
              Showing {filteredUsers.length} of {users.length} users
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Email
                      {getSortIcon('email')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('institution')}
                  >
                    <div className="flex items-center">
                      Institution
                      {getSortIcon('institution')}
                    </div>
                  </TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No users found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((userProfile) => (
                  <TableRow key={userProfile.id}>
                    <TableCell className="font-medium">
                      {userProfile.first_name} {userProfile.last_name}
                    </TableCell>
                    <TableCell>{userProfile.email}</TableCell>
                    <TableCell>{userProfile.institution || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {userProfile.roles.length > 0 ? (
                          userProfile.roles.map(role => {
                            const isRevoking = operationLoading === `${userProfile.id}-${role}`;
                            return (
                              <Badge key={role} variant={getRoleBadgeVariant(role)} className="gap-1">
                                {role}
                                <button
                                  onClick={() => openRevokeDialog(userProfile.id, role, `${userProfile.first_name} ${userProfile.last_name}`)}
                                  className="ml-1 hover:text-destructive disabled:opacity-50"
                                  disabled={isRevoking}
                                  title="Revoke role"
                                >
                                  {isRevoking ? (
                                    <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  ) : (
                                    <UserMinus className="h-3 w-3" />
                                  )}
                                </button>
                              </Badge>
                            );
                          })
                        ) : (
                          <Badge variant="outline">No roles</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog open={dialogOpen && selectedUser?.id === userProfile.id} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(userProfile)}
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Role
                            </Button>
                          </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Grant Role</DialogTitle>
                            <DialogDescription>
                              Add a role to {userProfile.first_name} {userProfile.last_name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="reviewer">Reviewer</SelectItem>
                                <SelectItem value="company">Company</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setDialogOpen(false)}
                              disabled={operationLoading === `${userProfile.id}-grant`}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleGrantRole}
                              disabled={operationLoading === `${userProfile.id}-grant`}
                            >
                              {operationLoading === `${userProfile.id}-grant` ? (
                                <>
                                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                  Granting...
                                </>
                              ) : (
                                'Grant Role'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteDialog(userProfile.id, userProfile.email, `${userProfile.first_name} ${userProfile.last_name}`)}
                          disabled={userProfile.id === user?.id}
                          title={userProfile.id === user?.id ? 'Cannot delete your own account' : 'Delete user'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>

        {/* Revoke Role Confirmation Dialog */}
        <AlertDialog open={revokeDialog?.open || false} onOpenChange={(open) => !open && setRevokeDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke Role?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to revoke the <strong>{revokeDialog?.role}</strong> role from{' '}
                <strong>{revokeDialog?.userName}</strong>?
                <br /><br />
                This action will immediately remove their access to {revokeDialog?.role}-specific features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={!!operationLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRevokeRole}
                disabled={!!operationLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {operationLoading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Revoking...
                  </>
                ) : (
                  'Revoke Role'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete User Confirmation Dialog */}
        <AlertDialog open={deleteDialog?.open || false} onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog(null);
            setDeleteConfirmEmail('');
          }
        }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">Delete User Account</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4">
                  <p className="font-semibold">
                    You are about to permanently delete the account for:
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium">{deleteDialog?.userName}</p>
                    <p className="text-sm text-muted-foreground">{deleteDialog?.userEmail}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-destructive">⚠️ This action cannot be undone!</p>
                    <p>The following data will be permanently deleted:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      <li>User profile and account</li>
                      <li>All assigned roles</li>
                      <li>Product adoptions and experiences</li>
                      <li>Review assignments and comments</li>
                      <li>Company representative information</li>
                      <li>All associated notifications</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Type the user's email to confirm:</p>
                    <Input
                      value={deleteConfirmEmail}
                      onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                      placeholder={deleteDialog?.userEmail || ''}
                      disabled={deleteLoading}
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                disabled={deleteLoading || deleteConfirmEmail !== deleteDialog?.userEmail}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteLoading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete User Permanently'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
}
