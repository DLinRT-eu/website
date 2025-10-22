import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { RoleRequestManager } from '@/components/admin/RoleRequestManager';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserPlus, UserMinus } from 'lucide-react';

type AppRole = 'admin' | 'reviewer' | 'company';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  institution?: string;
  roles: AppRole[];
}

export default function UserManagement() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>('reviewer');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }

    fetchUsers();
  }, [user, isAdmin]);

  const fetchUsers = async () => {
    // Fetch all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('last_name');

    if (profilesError) {
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Fetch roles for each user
    const usersWithRoles = await Promise.all(
      profiles.map(async (profile) => {
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', profile.id);

        return {
          ...profile,
          roles: rolesData?.map(r => r.role as AppRole) || [],
        };
      })
    );

    setUsers(usersWithRoles);
    setLoading(false);
  };

  const handleGrantRole = async () => {
    if (!selectedUser || !user) return;

    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: selectedUser.id,
        role: selectedRole,
        granted_by: user.id,
      });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${selectedRole} role granted to ${selectedUser.first_name} ${selectedUser.last_name}`,
      });
      fetchUsers();
      setDialogOpen(false);
    }
  };

  const handleRevokeRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${role} role revoked`,
      });
      fetchUsers();
    }
  };

  const getRoleBadgeVariant = (role: AppRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'reviewer': return 'default';
      case 'company': return 'secondary';
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((userProfile) => (
                  <TableRow key={userProfile.id}>
                    <TableCell className="font-medium">
                      {userProfile.first_name} {userProfile.last_name}
                    </TableCell>
                    <TableCell>{userProfile.email}</TableCell>
                    <TableCell>{userProfile.institution || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {userProfile.roles.length > 0 ? (
                          userProfile.roles.map(role => (
                            <Badge key={role} variant={getRoleBadgeVariant(role)} className="gap-1">
                              {role}
                              <button
                                onClick={() => handleRevokeRole(userProfile.id, role)}
                                className="ml-1 hover:text-destructive"
                              >
                                <UserMinus className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">No roles</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
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
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleGrantRole}>
                              Grant Role
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </PageLayout>
  );
}
