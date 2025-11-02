import { useRoles } from '@/contexts/RoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function RoleSelector() {
  const { roles, activeRole, setActiveRole, loading } = useRoles();
  const { toast } = useToast();

  // Don't show if user has no roles or only one role
  if (loading || roles.length <= 1) {
    return null;
  }

  const handleRoleChange = (role: string) => {
    setActiveRole(role as any);
    toast({
      title: "Role Changed",
      description: `You are now using the ${role.charAt(0).toUpperCase() + role.slice(1)} role.`,
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'reviewer': return 'default';
      case 'company': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Full access to all platform features including user management and approvals';
      case 'reviewer':
        return 'Can review and validate product submissions and updates';
      case 'company':
        return 'Can manage company information and product listings';
      default:
        return '';
    }
  };

  const getRoleDisplayName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Active Role
        </CardTitle>
        <CardDescription>
          You have multiple roles. Select which role you want to use for this session.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="active-role">Current Active Role</Label>
          <Select 
            value={activeRole || undefined} 
            onValueChange={handleRoleChange}
          >
            <SelectTrigger id="active-role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role} value={role}>
                  <div className="flex items-center gap-2">
                    {getRoleDisplayName(role)}
                    <Badge variant={getRoleBadgeVariant(role)} className="text-xs">
                      {role}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {activeRole && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{getRoleDisplayName(activeRole)} Role:</strong>{' '}
              {getRoleDescription(activeRole)}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          <p>Your assigned roles:</p>
          <div className="flex gap-2 mt-2">
            {roles.map(role => (
              <Badge key={role} variant={getRoleBadgeVariant(role)}>
                {getRoleDisplayName(role)}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
