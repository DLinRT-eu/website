import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { validateInstitutionalEmail } from '@/utils/emailValidation';

interface RoleRequestFormProps {
  onRequestSubmitted: () => void;
}

export default function RoleRequestForm({ onRequestSubmitted }: RoleRequestFormProps) {
  const { user, profile, roles } = useAuth();
  const [requestedRole, setRequestedRole] = useState<'reviewer' | 'company'>('reviewer');
  const [justification, setJustification] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasUserProducts, setHasUserProducts] = useState(false);

  // Compute which roles the user already has
  const hasReviewerRole = roles.includes('reviewer');
  const hasCompanyRole = roles.includes('company');

  useEffect(() => {
    // Check if user has products (incompatible with company role)
    const checkUserProducts = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_products')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);
        
        setHasUserProducts((data?.length || 0) > 0);
      }
    };

    checkUserProducts();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to request a role');
      return;
    }

    // Warn about institutional email preference (but don't block)
    if (user.email) {
      const validation = validateInstitutionalEmail(user.email);
      if (!validation.isValid) {
        // Show warning but don't block the request
        toast.warning(
          'Note: Institutional email addresses are preferred. Your request will be reviewed by an admin.',
          { duration: 5000 }
        );
        console.warn('[RoleRequest] Non-institutional email detected:', user.email);
      }
    }

    // Check if email is verified
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error fetching user:', userError);
      toast.error('Failed to verify user authentication');
      return;
    }

    if (!userData.user?.email_confirmed_at) {
      toast.error('Please verify your email address before requesting a role');
      return;
    }

    // Check if user already has this role
    if (requestedRole === 'reviewer' && hasReviewerRole) {
      toast.error('You already have the Reviewer role');
      return;
    }

    if (requestedRole === 'company' && hasCompanyRole) {
      toast.error('You already have the Company Representative role');
      return;
    }

    // Check for conflicting roles
    if (requestedRole === 'company' && hasReviewerRole) {
      toast.error('Company role is incompatible with Reviewer role. Please contact an admin to remove your Reviewer role first.');
      return;
    }

    // Check role compatibility
    if (requestedRole === 'company' && hasUserProducts) {
      toast.error('Company role is incompatible with having product adoptions. Please remove your product adoptions first.');
      return;
    }

    if (!justification.trim()) {
      toast.error('Please provide justification for your role request');
      return;
    }

    if (requestedRole === 'company' && !companyId.trim()) {
      toast.error('Please provide your company ID');
      return;
    }

    setSubmitting(true);

    try {
      console.log('Submitting role request:', {
        user_id: user.id,
        requested_role: requestedRole,
        company_id: requestedRole === 'company' ? companyId.trim() : null
      });

      const { data, error } = await supabase
        .from('role_requests')
        .insert({
          user_id: user.id,
          requested_role: requestedRole,
          justification: justification.trim(),
          company_id: requestedRole === 'company' ? companyId.trim() : null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting role request:', error);
        toast.error(`Failed to submit request: ${error.message}`);
      } else {
        console.log('Role request submitted successfully:', data);
        toast.success('Role request submitted successfully! An admin will review your request.');
        setJustification('');
        setCompanyId('');
        onRequestSubmitted();
      }
    } catch (err: any) {
      console.error('Exception submitting role request:', err);
      toast.error(`An error occurred: ${err.message || 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Role</CardTitle>
        {(hasReviewerRole || hasCompanyRole) && (
          <CardDescription className="text-amber-600">
            You can request additional roles. Note: Company role is incompatible with Reviewer role.
          </CardDescription>
        )}
        {!hasReviewerRole && !hasCompanyRole && (
          <CardDescription>
            Request a specialized role to contribute to the DLinRT platform. All registered users already have basic access - only request Reviewer or Company Representative roles if needed.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important Role Restrictions:</strong>
            <ul className="mt-2 ml-4 list-disc text-sm">
              <li><strong>Company Representatives</strong> cannot have user product adoptions (conflict of interest)</li>
              <li><strong>Company Representatives</strong> and <strong>Reviewers</strong> are incompatible roles</li>
              <li>All registered users have basic access by default - only request specialized roles if needed</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="role">Requested Role</Label>
            <Select 
              value={requestedRole} 
              onValueChange={(value) => setRequestedRole(value as 'reviewer' | 'company')}
            >
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  value="reviewer"
                  disabled={hasReviewerRole}
                >
                  Reviewer {hasReviewerRole && '(Already assigned)'}
                </SelectItem>
                <SelectItem 
                  value="company" 
                  disabled={hasUserProducts || hasCompanyRole}
                >
                  Company Representative 
                  {hasCompanyRole && ' (Already assigned)'}
                  {hasUserProducts && !hasCompanyRole && ' (Remove product adoptions first)'}
                </SelectItem>
              </SelectContent>
            </Select>
            {requestedRole === 'company' && hasUserProducts && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Company representative role is incompatible with user product adoptions to prevent conflicts of interest. Please remove your product adoptions before requesting this role.
                </AlertDescription>
              </Alert>
            )}
            {hasReviewerRole && requestedRole === 'company' && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Company representative role is incompatible with Reviewer role due to conflict of interest. You will need to have your Reviewer role removed first.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {requestedRole === 'company' && (
            <div>
              <Label htmlFor="companyId">Company ID</Label>
              <Input
                id="companyId"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="e.g., mim-software, siemens"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your company identifier from the DLinRT database
              </p>
            </div>
          )}

          <div>
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
}
