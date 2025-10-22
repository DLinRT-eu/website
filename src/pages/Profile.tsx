import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import PageLayout from '@/components/layout/PageLayout';
import { RoleRequestForm } from '@/components/profile/RoleRequestForm';
import { RoleRequestHistory } from '@/components/profile/RoleRequestHistory';
import { MFASettings } from '@/components/profile/MFASettings';
import { ProfileDocuments } from '@/components/profile/ProfileDocuments';
import { User, Mail, Building2, Briefcase, Shield } from 'lucide-react';

export default function Profile() {
  const { profile, roles, highestRole, updateProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [institution, setInstitution] = useState(profile?.institution || '');
  const [specialization, setSpecialization] = useState(profile?.specialization || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '');
  const [publicDisplay, setPublicDisplay] = useState(profile?.public_display || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await updateProfile({
      first_name: firstName,
      last_name: lastName,
      institution,
      specialization,
      bio,
      linkedin_url: linkedinUrl,
      public_display: publicDisplay,
    });

    setLoading(false);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'reviewer': return 'default';
      case 'company': return 'secondary';
      default: return 'outline';
    }
  };

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
                    disabled={!roles.includes('admin') && !roles.includes('reviewer')}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Role Request Section - Only show if user doesn't have admin role */}
          {!roles.includes('admin') && (
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
