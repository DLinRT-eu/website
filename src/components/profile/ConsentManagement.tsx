import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const ConsentManagement = () => {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const consentGiven = profile?.data_processing_consent_given;
  const consentWithdrawn = profile?.data_processing_consent_withdrawn;
  const consentTimestamp = profile?.data_processing_consent_timestamp;

  const handleWithdrawConsent = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          data_processing_consent_withdrawn: true,
          data_processing_consent_withdrawn_at: new Date().toISOString(),
        })
        .eq('id', profile?.id);

      if (error) throw error;

      // Log withdrawal
      await supabase.from('consent_audit_log').insert({
        user_id: profile?.id,
        action: 'withdrawn',
        consent_version: profile?.data_processing_consent_version || '1.0',
      });

      toast({
        title: 'Consent withdrawn',
        description: 'Your data processing consent has been withdrawn. Your account will be reviewed for data retention.',
      });

      if (refreshProfile) {
        await refreshProfile();
      }
      setShowWithdrawDialog(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Processing Consent (GDPR)
          </CardTitle>
          <CardDescription>
            Manage your consent for personal data processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Status</p>
              {consentGiven && consentTimestamp && (
                <p className="text-xs text-muted-foreground">
                  Granted on {format(new Date(consentTimestamp), 'PPP')}
                </p>
              )}
              {!consentGiven && (
                <p className="text-xs text-muted-foreground">No consent recorded</p>
              )}
            </div>
            <Badge variant={consentWithdrawn ? 'destructive' : consentGiven ? 'default' : 'outline'}>
              {consentWithdrawn ? (
                <><XCircle className="h-3 w-3 mr-1" /> Withdrawn</>
              ) : consentGiven ? (
                <><CheckCircle2 className="h-3 w-3 mr-1" /> Active</>
              ) : (
                <><AlertTriangle className="h-3 w-3 mr-1" /> Not Given</>
              )}
            </Badge>
          </div>

          {/* Information */}
          <Alert>
            <AlertDescription className="text-sm space-y-2">
              <p><strong>Your Rights under GDPR:</strong></p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Right to access your personal data (use Data Export below)</li>
                <li>Right to rectify incorrect data (edit your profile)</li>
                <li>Right to erasure ("right to be forgotten" - use Delete Account)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability (via export)</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Actions */}
          {!consentWithdrawn && consentGiven && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Withdrawing consent will limit your access to platform features and may result in 
                data anonymization or deletion within 30 days.
              </p>
              <Button
                variant="outline"
                onClick={() => setShowWithdrawDialog(true)}
                className="w-full"
              >
                Withdraw Data Processing Consent
              </Button>
            </div>
          )}

          {consentWithdrawn && (
            <Alert variant="destructive">
              <AlertDescription>
                You have withdrawn your consent to data processing. Your account access may be limited, 
                and your data will be reviewed for retention requirements.
              </AlertDescription>
            </Alert>
          )}

          {!consentGiven && !consentWithdrawn && (
            <Alert variant="default" className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                No consent record found. This may indicate an older account created before consent tracking was implemented.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Data Processing Consent</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw your consent for data processing?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription className="text-sm space-y-2">
                <p><strong>Consequences of withdrawing consent:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Limited access to platform features</li>
                  <li>Your data will be anonymized or deleted within 30 days</li>
                  <li>You may need to create a new account to use the platform again</li>
                  <li>Some data may be retained for legal obligations</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowWithdrawDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleWithdrawConsent}
                variant="destructive"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Processing...' : 'Withdraw Consent'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
