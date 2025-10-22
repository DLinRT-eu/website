import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, ShieldCheck, ShieldAlert, Download, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const MFASettings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showUnenrollDialog, setShowUnenrollDialog] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    checkMFAStatus();
  }, []);

  const checkMFAStatus = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const hasTOTP = factors?.totp?.some((f) => f.status === 'verified');
      setMfaEnabled(!!hasTOTP);

      if (hasTOTP) {
        const factor = factors.totp.find((f) => f.status === 'verified');
        if (factor) setFactorId(factor.id);
      }
    } catch (error) {
      console.error('Error checking MFA status:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEnrollment = async () => {
    setEnrolling(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setShowEnrollDialog(true);
      generateBackupCodes();
    } catch (error: any) {
      toast({
        title: 'Enrollment Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEnrolling(false);
    }
  };

  const verifyEnrollment = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: 'Invalid Code',
        description: 'Please enter a 6-digit code',
        variant: 'destructive',
      });
      return;
    }

    setVerifying(true);
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verificationCode,
      });

      if (verify.error) throw verify.error;

      // Update profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({
            mfa_enabled: true,
            mfa_enrolled_at: new Date().toISOString(),
            mfa_backup_codes_generated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }

      toast({
        title: 'MFA Enabled',
        description: 'Two-factor authentication is now active on your account',
      });

      setMfaEnabled(true);
      setShowEnrollDialog(false);
      setVerificationCode('');
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  const startUnenrollment = () => {
    setShowUnenrollDialog(true);
  };

  const confirmUnenrollment = async () => {
    if (!password) {
      toast({
        title: 'Password Required',
        description: 'Please enter your password to disable MFA',
        variant: 'destructive',
      });
      return;
    }

    setUnenrolling(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('User not found');

      // Re-authenticate user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (signInError) throw new Error('Invalid password');

      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) throw error;

      // Update profile
      await supabase
        .from('profiles')
        .update({
          mfa_enabled: false,
          mfa_enrolled_at: null,
        })
        .eq('id', user.id);

      toast({
        title: 'MFA Disabled',
        description: 'Two-factor authentication has been removed from your account',
      });

      setMfaEnabled(false);
      setShowUnenrollDialog(false);
      setPassword('');
    } catch (error: any) {
      toast({
        title: 'Unenrollment Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUnenrolling(false);
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mfa-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast({
      title: 'Copied',
      description: 'Secret key copied to clipboard',
    });
  };

  if (loading) {
    return <div className="text-center py-4">Loading MFA settings...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            {mfaEnabled ? (
              <Badge variant="default" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <ShieldAlert className="h-3 w-3" />
                Disabled
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mfaEnabled ? (
            <>
              <Alert>
                <AlertDescription>
                  Two-factor authentication is active. You'll need to enter a code from
                  your authenticator app each time you sign in.
                </AlertDescription>
              </Alert>
              <Button
                onClick={startUnenrollment}
                variant="destructive"
                disabled={unenrolling}
              >
                Disable MFA
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Enable two-factor authentication using an authenticator app like Google
                Authenticator, Authy, or 1Password.
              </p>
              <Button onClick={startEnrollment} disabled={enrolling}>
                Enable MFA
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app, then enter the verification
              code to complete setup.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* QR Code */}
            <div className="flex justify-center p-4 bg-background border rounded-lg">
              <QRCodeSVG value={qrCode} size={200} />
            </div>

            {/* Manual Entry */}
            <div className="space-y-2">
              <Label className="text-xs">Can't scan? Enter this key manually:</Label>
              <div className="flex gap-2">
                <Input value={secret} readOnly className="font-mono text-xs" />
                <Button size="icon" variant="outline" onClick={copySecret}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Backup Codes */}
            {backupCodes.length > 0 && (
              <div className="space-y-2">
                <Label>Backup Codes (Save these in a safe place)</Label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
                  {backupCodes.map((code, i) => (
                    <div key={i}>{code}</div>
                  ))}
                </div>
                <Button
                  onClick={downloadBackupCodes}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup Codes
                </Button>
              </div>
            )}

            {/* Verification */}
            <div className="space-y-2">
              <Label>Enter the 6-digit code from your app</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              onClick={verifyEnrollment}
              disabled={verifying || verificationCode.length !== 6}
              className="w-full"
            >
              Verify and Enable MFA
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unenrollment Dialog */}
      <Dialog open={showUnenrollDialog} onOpenChange={setShowUnenrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password to confirm disabling MFA on your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                Disabling MFA will make your account less secure.
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
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUnenrollDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmUnenrollment}
                variant="destructive"
                disabled={unenrolling || !password}
                className="flex-1"
              >
                Disable MFA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
