import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface MFAVerificationProps {
  onVerify: (code: string, isBackupCode: boolean) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export const MFAVerification = ({ onVerify, loading, error }: MFAVerificationProps) => {
  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [backupCode, setBackupCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (useBackupCode) {
      await onVerify(backupCode, true);
    } else {
      await onVerify(code, false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Enter the verification code from your authenticator app to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!useBackupCode ? (
            <>
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
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
                type="submit"
                className="w-full"
                disabled={loading || code.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setUseBackupCode(true)}
                  className="text-sm"
                >
                  Use backup code instead
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Backup Code</Label>
                <Input
                  type="text"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                  placeholder="Enter backup code"
                  className="font-mono"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !backupCode}
              >
                {loading ? 'Verifying...' : 'Verify Backup Code'}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setUseBackupCode(false)}
                  className="text-sm"
                >
                  Use authenticator code instead
                </Button>
              </div>
            </>
          )}

          <Alert>
            <AlertDescription className="text-xs">
              If you've lost access to your authenticator app and backup codes,
              please contact support.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
};
