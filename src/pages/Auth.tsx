import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { z } from 'zod';
import SEO from '@/components/SEO';

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email must be less than 254 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters'),
});

const signupSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email must be less than 254 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().max(128, 'Password must be less than 128 characters'),
  firstName: z.string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters')
    .trim(),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters')
    .trim(),
  dataProcessingConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to data processing to create an account'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      console.log('[Auth Page] User authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    try {
      const validation = loginSchema.parse({ 
        email: loginEmail.trim(), 
        password: loginPassword 
      });
      
      setLoading(true);
      
      const { error: signInError } = await signIn(validation.email, validation.password);
      
      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setWarning(null);
    
    try {
      const validation = signupSchema.parse({
        email: signupEmail.trim(),
        password: signupPassword,
        confirmPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dataProcessingConsent,
      });
      
      // Check if email is institutional and show warning if not
      const emailDomain = validation.email.toLowerCase().split('@')[1];
      const nonInstitutionalDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'live.com', 'msn.com', 'aol.com', 'icloud.com',
        'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
        'gmx.com', 'inbox.com', 'fastmail.com', 'hushmail.com'
      ];
      
      if (nonInstitutionalDomains.includes(emailDomain)) {
        // Show warning but allow signup to proceed
        setWarning('Note: Institutional email addresses (university, hospital, research center) are strongly preferred. Your account may require additional verification.');
      }
      
      setLoading(true);
      
      const { error: signUpError } = await signUp(
        validation.email,
        validation.password,
        {
          firstName: validation.firstName,
          lastName: validation.lastName,
          dataProcessingConsent: true,
          consentTimestamp: new Date().toISOString(),
        }
      );
      
      if (signUpError) {
        setError(signUpError.message || 'Failed to create account');
        setWarning(null); // Clear warning if there's an error
      } else {
        setSuccessMessage('Account created! Please check your email to verify your account.');
        // Clear form
        setSignupEmail('');
        setSignupPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setDataProcessingConsent(false);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
      setWarning(null); // Clear warning if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Sign In | DLinRT"
        description="Sign in to access the DLinRT platform for deep learning in radiotherapy"
        canonical="https://dlinrt.eu/auth"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">DLinRT.eu</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => navigate('/reset-password')}
                      className="text-sm"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </form>
              </TabsContent>
            
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {successMessage && (
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  {warning && (
                    <Alert variant="default" className="border-amber-500 bg-amber-50 dark:bg-amber-950">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800 dark:text-amber-200">
                        {warning}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Must contain uppercase, lowercase, number, and special character
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  {/* GDPR Consent Section */}
                  <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="data-consent"
                        checked={dataProcessingConsent}
                        onCheckedChange={(checked) => setDataProcessingConsent(checked === true)}
                        required
                        disabled={loading}
                      />
                      <div className="space-y-1 leading-tight flex-1">
                        <label 
                          htmlFor="data-consent" 
                          className="text-sm font-medium cursor-pointer"
                        >
                          Data Processing Consent (Required) *
                        </label>
                        <p className="text-xs text-muted-foreground">
                          I hereby provide my <strong>explicit and informed consent</strong> for DLinRT.eu to collect, 
                          process, and store my personal data (name, email, and profile information) in accordance with 
                          the General Data Protection Regulation (GDPR) Article 6(1)(a). I understand that:
                        </p>
                        <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1 mt-2">
                          <li>My data will be used solely for platform functionality and communication</li>
                          <li>My data will be stored securely on EU-based Supabase servers</li>
                          <li>I can withdraw this consent at any time from my profile settings</li>
                          <li>Upon withdrawal, my data will be anonymized or deleted within 30 days</li>
                          <li>I have the right to access, rectify, or export my data at any time</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">
                          For details, see our{' '}
                          <a href="/privacy" target="_blank" className="underline hover:text-foreground">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                    {!dataProcessingConsent && (
                      <Alert variant="default" className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
                          You must provide consent to process your personal data to use this platform.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || !dataProcessingConsent}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
