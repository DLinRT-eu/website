import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const establishSession = async () => {
      try {
        console.log('=== Password Reset Flow Debug ===');
        console.log('Full URL:', window.location.href);
        
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        // PKCE flow parameters (modern)
        const code = searchParams.get('code');
        
        // Legacy flow parameters (older reset emails)
        const accessToken = searchParams.get('access_token') || hashParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token') || hashParams.get('refresh_token');
        
        console.log('Detected parameters:', { 
          hasPKCECode: !!code, 
          hasLegacyTokens: !!(accessToken && refreshToken) 
        });

        // Timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.error('Session establishment timed out');
          setSessionError('Session verification timed out. The reset link may have expired.');
          setSessionReady(false);
        }, 5000);

        // PKCE flow (preferred)
        if (code) {
          console.log('Using PKCE flow with code exchange...');
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          clearTimeout(timeoutId);
          
          if (error) {
            console.error('PKCE exchange failed:', error);
            setSessionError('Reset link is invalid or has expired. Please request a new one.');
            setSessionReady(false);
          } else {
            console.log('✓ Session established via PKCE');
            setSessionReady(true);
          }
          return;
        }

        // Legacy token flow (fallback)
        if (accessToken && refreshToken) {
          console.log('Using legacy token flow...');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          clearTimeout(timeoutId);
          
          if (error) {
            console.error('Legacy token flow failed:', error);
            setSessionError('Reset link is invalid or has expired. Please request a new one.');
            setSessionReady(false);
          } else {
            console.log('✓ Session established via legacy tokens');
            setSessionReady(true);
          }
          return;
        }

        // No valid tokens found
        console.error('No reset tokens found in URL');
        clearTimeout(timeoutId);
        setSessionError('Invalid reset link. Please request a new password reset link.');
        setSessionReady(false);
      } catch (err) {
        console.error('Unexpected error:', err);
        setSessionError('An unexpected error occurred. Please try again.');
        setSessionReady(false);
      }
    };

    establishSession();
  }, []);

  const validatePassword = (pwd: string) => {
    const errors: string[] = [];
    if (pwd.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(pwd)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(pwd)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(pwd)) errors.push('One number');
    if (!/[^A-Za-z0-9]/.test(pwd)) errors.push('One special character');
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Please meet all password requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      
      await supabase.from('security_events').insert({
        event_type: 'password_update_failed',
        severity: 'medium',
        details: { 
          error: error.message,
          timestamp: new Date().toISOString() 
        },
      });
      
      setLoading(false);
    } else {
      await supabase.from('security_events').insert({
        event_type: 'password_updated',
        severity: 'info',
        details: { 
          timestamp: new Date().toISOString() 
        },
      });
      
      navigate('/auth');
    }
  };

  if (!sessionReady) {
    return (
      <>
        <SEO 
          title="Update Password"
          description="Update your DLinRT.eu password"
        />
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <CardTitle>Update Password</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {sessionError ? (
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <AlertDescription>{sessionError}</AlertDescription>
                  </Alert>
                  <Button 
                    onClick={() => navigate('/reset-password')}
                    className="w-full"
                  >
                    Request New Reset Link
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Verifying reset link...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Update Password"
        description="Update your DLinRT.eu password"
      />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <CardTitle>Update Password</CardTitle>
            </div>
            <CardDescription>
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  placeholder="Enter new password"
                  required
                />
                
                {password && (
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {validationErrors.includes('At least 8 characters') ? (
                        <XCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      <span className={validationErrors.includes('At least 8 characters') ? 'text-destructive' : 'text-green-500'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validationErrors.includes('One uppercase letter') ? (
                        <XCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      <span className={validationErrors.includes('One uppercase letter') ? 'text-destructive' : 'text-green-500'}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validationErrors.includes('One lowercase letter') ? (
                        <XCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      <span className={validationErrors.includes('One lowercase letter') ? 'text-destructive' : 'text-green-500'}>
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validationErrors.includes('One number') ? (
                        <XCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      <span className={validationErrors.includes('One number') ? 'text-destructive' : 'text-green-500'}>
                        One number
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validationErrors.includes('One special character') ? (
                        <XCircle className="h-3 w-3 text-destructive" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      <span className={validationErrors.includes('One special character') ? 'text-destructive' : 'text-green-500'}>
                        One special character (!@#$%^&*)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
