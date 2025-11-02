import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { useReviewerProfile } from '@/hooks/useReviewerProfile';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useAdminProfile } from '@/hooks/useAdminProfile';
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
import { MFASettings } from '@/components/profile/MFASettings';
import { DataExport } from '@/components/profile/DataExport';
import { DeleteAccount } from '@/components/profile/DeleteAccount';
import { User, Mail, Building2, Briefcase, Shield, AlertCircle, Package } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, account, updateAccount, signOut, resendVerificationEmail, loading, profileLoading } = useAuth();
  const { roles, highestRole, isAdmin, activeRole } = useRoles();
  
  // Fetch role-specific profiles
  const { profile: reviewerProfile, updateProfile: updateReviewerProfile, loading: reviewerLoading } = useReviewerProfile(user?.id || null, activeRole === 'reviewer');
  const { profile: companyProfile, updateProfile: updateCompanyProfile, loading: companyLoading } = useCompanyProfile(user?.id || null, activeRole === 'company');
  const { profile: adminProfile, updateProfile: updateAdminProfile, loading: adminLoading } = useAdminProfile(user?.id || null, activeRole === 'admin');
  
  // Determine which profile to use based on active role
  const profile = activeRole === 'reviewer' ? reviewerProfile : activeRole === 'company' ? companyProfile : activeRole === 'admin' ? adminProfile : null;
  const roleProfileLoading = activeRole === 'reviewer' ? reviewerLoading : activeRole === 'company' ? companyLoading : activeRole === 'admin' ? adminLoading : false;
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resendingEmail, setResendingEmail] = useState(false);
  
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
    }
  }, [profile]);

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

    // Update role-specific profile based on active role
    if (activeRole === 'reviewer' && updateReviewerProfile) {
      await updateReviewerProfile({
        first_name: firstName,
        last_name: lastName,
        institution: institution || null,
        specialization: specialization || null,
        bio: bio || null,
        linkedin_url: linkedinUrl || null,
        public_display: publicDisplay,
      });
    } else if (activeRole === 'company' && updateCompanyProfile) {
      await updateCompanyProfile({
        first_name: firstName,
        last_name: lastName,
        position: specialization || null,
        department: institution || null,
      });
    } else if (activeRole === 'admin' && updateAdminProfile) {
      await updateAdminProfile({
        first_name: firstName,
        last_name: lastName,
      });
    }

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
  if (loading) {
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

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profileLoading || roleProfileLoading) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Loading your profile...</AlertTitle>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  if (!account) {
    return (
      <PageLayout>
        <div className="container max-w-4xl py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Account Not Found</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <span>Unable to load your account. This may be a temporary session issue.</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Retry Loading Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
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
                    <span className="font-medium">{account?.email}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Assigned Roles</Label>
                  <div className="flex gap-2 mt-2">
                    {roles.length > 0 ? (
                      roles.map(role => (
                        <Badge key={role} variant={getRoleBadgeVariant(role)}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">No roles assigned yet</Badge>
                    )}
                  </div>
                  {roles.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Contact an administrator to request role assignment.
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

          {/* Role Request Section - Show for all non-admin users */}
          {!isAdmin && (
            <>
              <RoleRequestForm onRequestSubmitted={() => setRefreshKey(prev => prev + 1)} />
              <RoleRequestHistory key={refreshKey} />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
