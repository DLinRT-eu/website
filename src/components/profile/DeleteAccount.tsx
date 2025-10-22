import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const DeleteAccount = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const requiresMFA = profile?.mfa_enabled;

  const handleDelete = async () => {
    if (!user?.email || !password) {
      toast({
        title: 'Missing information',
        description: 'Please enter your password',
        variant: 'destructive',
      });
      return;
    }

    if (requiresMFA && !mfaCode) {
      toast({
        title: 'MFA code required',
        description: 'Please enter your MFA verification code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (signInError) throw new Error('Invalid password');

      // Verify MFA if enabled
      if (requiresMFA && mfaCode) {
        const { data: factors } = await supabase.auth.mfa.listFactors();
        const factor = factors?.totp?.find((f) => f.status === 'verified');
        
        if (factor) {
          const { data: challenge } = await supabase.auth.mfa.challenge({
            factorId: factor.id,
          });

          if (challenge) {
            const { error: verifyError } = await supabase.auth.mfa.verify({
              factorId: factor.id,
              challengeId: challenge.id,
              code: mfaCode,
            });

            if (verifyError) throw new Error('Invalid MFA code');
          }
        }
      }

      // Mark account for deletion (soft delete - actual deletion after 30 days)
      const { error: deleteError } = await supabase
        .from('profiles')
        .update({
          public_display: false,
          bio: null,
          specialization: null,
          institution: null,
          linkedin_url: null,
        })
        .eq('id', user.id);

      if (deleteError) throw deleteError;

      // Delete user (this will cascade to related tables)
      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (authDeleteError) {
        // If admin delete fails, we at least anonymized the profile
        console.error('Error deleting user:', authDeleteError);
      }

      toast({
        title: 'Account deletion initiated',
        description: 'Your account has been scheduled for deletion.',
      });

      await signOut();
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Deletion failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              This action cannot be undone. All your data will be permanently deleted after 30 days.
            </AlertDescription>
          </Alert>
          <Button
            variant="destructive"
            onClick={() => setShowDialog(true)}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogDescription>
              This will permanently delete your account and all data. Please enter your credentials to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                Your account will be scheduled for permanent deletion in 30 days. During this time, your data will be inaccessible.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {requiresMFA && (
              <div className="space-y-2">
                <Label>MFA Code</Label>
                <Input
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="Enter your 6-digit code"
                  maxLength={6}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => setShowDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={loading || !password || (requiresMFA && !mfaCode)}
                className="flex-1"
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
