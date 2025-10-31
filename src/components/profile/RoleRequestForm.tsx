import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { user, profile } = useAuth();
  const [requestedRole, setRequestedRole] = useState<'reviewer' | 'company'>('reviewer');
  const [justification, setJustification] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasUserProducts, setHasUserProducts] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);

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

    // Validate email on load
    if (user?.email) {
      const validation = validateInstitutionalEmail(user.email);
      if (!validation.isValid) {
        setEmailValidationError(validation.error || 'Invalid email');
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to request a role');
      return;
    }

    // Validate institutional email
    if (user.email) {
      const validation = validateInstitutionalEmail(user.email);
      if (!validation.isValid) {
        toast.error(validation.error);
        return;
      }
    }

    // Check if email is verified
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user?.email_confirmed_at) {
      toast.error('Please verify your email address before requesting a role');
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

    const { error } = await supabase
      .from('role_requests')
      .insert({
        user_id: user.id,
        requested_role: requestedRole,
        justification: justification.trim(),
        company_id: requestedRole === 'company' ? companyId.trim() : null,
        status: 'pending'
      });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Role request submitted successfully');
      setJustification('');
      setCompanyId('');
      onRequestSubmitted();
    }

    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Role</CardTitle>
      </CardHeader>
      <CardContent>
        {emailValidationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {emailValidationError}
            </AlertDescription>
          </Alert>
        )}

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
                <SelectItem value="reviewer">Reviewer</SelectItem>
                <SelectItem 
                  value="company" 
                  disabled={hasUserProducts}
                >
                  Company Representative {hasUserProducts && '(Remove product adoptions first)'}
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

          <Button type="submit" disabled={submitting || !!emailValidationError}>
            {submitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
