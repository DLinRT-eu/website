import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type AppRole = 'admin' | 'reviewer' | 'company';

interface RoleRequestFormProps {
  onRequestSubmitted: () => void;
}

export const RoleRequestForm = ({ onRequestSubmitted }: RoleRequestFormProps) => {
  const [requestedRole, setRequestedRole] = useState<AppRole | ''>('');
  const [justification, setJustification] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestedRole || !justification.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a role and provide justification',
        variant: 'destructive',
      });
      return;
    }

    if (requestedRole === 'company' && !companyId.trim()) {
      toast({
        title: 'Missing Company ID',
        description: 'Please provide your company ID for company role requests',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check email verification
      if (!user.email_confirmed_at) {
        toast({
          title: 'Email verification required',
          description: 'Please verify your email before requesting a role. Check your inbox for the verification link.',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('role_requests')
        .insert({
          user_id: user.id,
          requested_role: requestedRole,
          justification: justification.trim(),
          company_id: requestedRole === 'company' ? companyId.trim() : null,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: 'Request Submitted',
        description: 'Your role request has been submitted for review',
      });

      setRequestedRole('');
      setJustification('');
      setCompanyId('');
      onRequestSubmitted();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Role</CardTitle>
        <CardDescription>
          Request reviewer or company access. Your request will be reviewed by an administrator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={requestedRole}
              onValueChange={(value) => setRequestedRole(value as AppRole)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reviewer">Reviewer</SelectItem>
                <SelectItem value="company">Company Representative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {requestedRole === 'company' && (
            <div className="space-y-2">
              <Label htmlFor="company">Company ID</Label>
              <Input
                id="company"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="e.g., mim-software, siemens-healthineers"
              />
              <p className="text-xs text-muted-foreground">
                Enter your company identifier from the DLinRT.eu database
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain why you need this role and how you plan to contribute..."
              rows={5}
            />
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
