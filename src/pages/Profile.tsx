import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import PageLayout from '@/components/layout/PageLayout';
import { useToast } from '@/hooks/use-toast';
import RoleRequestForm from '@/components/profile/RoleRequestForm';
import { RoleRequestHistory } from '@/components/profile/RoleRequestHistory';
import { RoleSelector } from '@/components/profile/RoleSelector';
import { MFASettings } from '@/components/profile/MFASettings';
import { DataExport } from '@/components/profile/DataExport';
import { DeleteAccount } from '@/components/profile/DeleteAccount';
import { User, Mail, Building2, Briefcase, Shield, AlertCircle, Package, RefreshCw } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, profile, updateProfile, signOut, resendVerificationEmail, loading, profileLoading, refreshProfile } = useAuth();
  const { roles, highestRole, isAdmin, activeRole, setActiveRole } = useRoles();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [institution, setInstitution] = useState(profile?.institution || '');
  const [specialization, setSpecialization] = useState(profile?.specialization || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '');
  const [publicDisplay, setPublicDisplay] = useState(profile?.public_display || false);

  // Sync form state with profile data when it loads
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setInstitution(profile.institution || '');
      setSpecialization(profile.specialization || '');
      setBio(profile.bio || '');
      setLinkedinUrl(profile.linkedin_url || '');
      setPublicDisplay(profile.public_display || false);
      setLoadingError(null);
    }
  }, [profile]);

  // Check for profile loading issues and attempt to create if missing
  useEffect(() => {
    const checkAndCreateProfile = async () => {
      if (!user || loading || profileLoading || profile || loadingError) return;

      // If we're not loading but don't have a profile, try to create it
      if (!profile && user) {
        try {
          console.log('Profile missing, attempting to create...');
          const { data, error } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.first_name || '',
              last_name: user.user_metadata?.last_name || '',
            })
            .select()
            .single();

          if (error) {
            if (error.code === '23505') { // Duplicate key - profile exists but wasn't loaded
              console.log('Profile exists, refreshing...');
              if (refreshProfile) {
                await refreshProfile();
              }
            } else {
              console.error('Error creating profile:', error);
              setLoadingError('Failed to load profile. Please try refreshing the page.');
            }
          } else {
            console.log('Profile created successfully');
            if (refreshProfile) {
              await refreshProfile();
            }
            toast({
              title: "Profile Created",
              description: "Your profile has been created successfully.",
            });
          }
        } catch (err: any) {
          console.error('Error in profile creation:', err);
          setLoadingError(err.message || 'Failed to create profile');
        }
      }
    };

    // Add a small delay to avoid race conditions
    const timer = setTimeout(checkAndCreateProfile, 1000);
    return () => clearTimeout(timer);
  }, [user, loading, profileLoading, profile, loadingError, refreshProfile, toast]);

  const handleRetry = async () => {
    setRetrying(true);
    setLoadingError(null);
    
    if (refreshProfile) {
      await refreshProfile();
    }
    
    setRetrying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Validation error",
        description: "First name and last name are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate LinkedIn URL format (if provided)
    if (linkedinUrl && !linkedinUrl.startsWith('https://')) {
      toast({
        title: "Validation error",
        description: "LinkedIn URL must start with https://",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);

    await updateProfile({
      first_name: firstName,
      last_name: lastName,
      institution: institution || null,
      specialization: specialization || null,
      bio: bio || null,
      linkedin_url: linkedinUrl || null,
      public_display: publicDisplay,
    });

    setSaving(false);
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    await resendVerificationEmail();
    setResendingEmail(false);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'reviewer': return 'default';
      case 'company': return 'secondary';
      default: return 'outline';
    }
  };

  // Show loading skeleton while profile loads
  if (loading || profileLoading) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-2">Loading your profile...</p>
            </div>
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Show error state if profile failed to load after timeout
  if (loadingError && !loading && !profileLoading) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Profile</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              <p>{loadingError}</p>
              <div className="flex gap-2">
                <Button onClick={handleRetry} variant="outline" disabled={retrying}>
                  {retrying ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </>
                  )}
                </Button>
                <Button onClick={signOut} variant="ghost">
                  Sign Out
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  // If still no profile after everything, show a friendly message
  if (!profile && !loading && !profileLoading) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Setting Up Your Profile</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              <p>We're creating your profile. This should only take a moment...</p>
              <Button onClick={handleRetry} variant="outline" disabled={retrying}>
                {retrying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </>
                )}
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <PageLayout>
      <div className="container max-w-4xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        {/* Email Verification Warning */}
        {user && !user.email_confirmed_at && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Email Not Verified</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>Your email address has not been verified. Please check your inbox for a verification link. You cannot request roles or access certain features until your email is verified.</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="w-fit"
              >
                {resendingEmail ? 'Sending...' : 'Resend Verification Email'}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* Role Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Status
              </CardTitle>
              <CardDescription>Your assigned roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profile?.email}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Assigned Roles</Label>
                  <div className="flex gap-2 mt-2">
                    {roles.length > 0 ? (
                      roles.map(role => (
                        <Badge 
                          key={role} 
                          variant={getRoleBadgeVariant(role)}
                          className={`cursor-pointer transition-all hover:scale-105 ${
                            role === activeRole 
                              ? 'ring-2 ring-offset-2 ring-primary' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => {
                            if (role !== activeRole) {
                              setActiveRole(role as any);
                              toast({
                                title: "Role Changed",
                                description: `You are now using the ${role.charAt(0).toUpperCase() + role.slice(1)} role.`,
                              });
                            }
                          }}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                          {role === activeRole && ' ✓'}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">No roles assigned yet</Badge>
                    )}
                  </div>
                  {roles.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Use the role request form below to request a role.
                    </p>
                  )}
                  {roles.length > 1 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ✓ indicates your currently active role. Click on any role badge to switch roles.
                    </p>
                  )}
                </div>

                {highestRole && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Primary Role</Label>
                    <div className="mt-1">
                      <Badge variant={getRoleBadgeVariant(highestRole)}>
                        {highestRole.charAt(0).toUpperCase() + highestRole.slice(1)}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Selector - for users with multiple roles */}
          <RoleSelector />

          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Institution / Organization
                  </Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g., University Hospital"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Specialization
                  </Label>
                  <Input
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g., Radiation Oncology"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be displayed on the About page if you enable public display.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-display">Public Display</Label>
                    <p className="text-sm text-muted-foreground">
                      Show your profile on the About page (Admins and Reviewers only)
                    </p>
                  </div>
                  <Switch
                    id="public-display"
                    checked={publicDisplay}
                    onCheckedChange={setPublicDisplay}
                    disabled={!isAdmin && !roles.includes('reviewer')}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Admin Tools */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Tools</CardTitle>
                <CardDescription>Administrative functions and oversight</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/admin/user-products">
                    <Package className="h-4 w-4 mr-2" />
                    View User Product Adoptions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          <MFASettings />

          {/* GDPR Compliance */}
          <DataExport />
          <DeleteAccount />

          {/* Role Request Section - Show for all users (can request additional roles) */}
          <RoleRequestForm onRequestSubmitted={() => setRefreshKey(prev => prev + 1)} />
          <RoleRequestHistory key={refreshKey} />
        </div>
      </div>
    </PageLayout>
  );
}
