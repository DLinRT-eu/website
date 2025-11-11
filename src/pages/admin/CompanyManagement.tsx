import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Building2, UserPlus, UserCheck, UserX, Search, AlertCircle } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { COMPANIES } from '@/data';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CompanyRepresentative {
  id: string;
  user_id: string;
  company_name: string;
  company_id: string;
  position: string | null;
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export default function CompanyManagement() {
  const { user } = useAuth();
  const [representatives, setRepresentatives] = useState<CompanyRepresentative[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [position, setPosition] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('company_representatives')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRepresentatives(data as unknown as CompanyRepresentative[]);
    } catch (error: any) {
      console.error('Error fetching representatives:', error);
      toast.error('Failed to load company representatives');
    } finally {
      setLoading(false);
    }
  };

  const getCompanyReps = (companyId: string) => {
    return representatives.filter(rep => rep.company_id === companyId);
  };

  const getVerifiedCount = (companyId: string) => {
    return representatives.filter(rep => rep.company_id === companyId && rep.verified).length;
  };

  const handleAssignUser = async () => {
    if (!userEmail || !selectedCompanyId || !user) {
      toast.error('Please fill in all fields');
      return;
    }

    setProcessing(true);
    try {
      // Find user by email
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', userEmail.trim())
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) {
        toast.error('User not found with that email address');
        return;
      }

      // Check if already assigned
      const existing = representatives.find(
        rep => rep.user_id === profileData.id && rep.company_id === selectedCompanyId
      );

      if (existing) {
        toast.error('User is already assigned to this company');
        return;
      }

      // Check limit
      const verifiedCount = getVerifiedCount(selectedCompanyId);
      if (verifiedCount >= 3) {
        toast.error('Company already has 3 verified representatives (maximum)');
        return;
      }

      // Create company representative
      const company = COMPANIES.find(c => c.id === selectedCompanyId);
      const { error: insertError } = await supabase
        .from('company_representatives')
        .insert({
          user_id: profileData.id,
          company_name: company?.name || selectedCompanyId,
          company_id: selectedCompanyId,
          position: position.trim() || null,
          verified: false,
          verified_by: null,
        });

      if (insertError) throw insertError;

      toast.success('User assigned to company successfully');
      setAssignDialogOpen(false);
      setUserEmail('');
      setPosition('');
      setSelectedCompanyId(null);
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error assigning user:', error);
      toast.error(error.message || 'Failed to assign user');
    } finally {
      setProcessing(false);
    }
  };

  const handleVerify = async (rep: CompanyRepresentative) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .update({
          verified: true,
          verified_by: user.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', rep.id);

      if (error) throw error;

      // Also grant company role if not already granted
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: rep.user_id,
          role: 'company',
          granted_by: user.id,
        });

      // Ignore duplicate key error (role already exists)
      if (roleError && !roleError.message.includes('duplicate')) {
        throw roleError;
      }

      toast.success('Representative verified successfully');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error verifying representative:', error);
      toast.error(error.message || 'Failed to verify representative');
    }
  };

  const handleUnverify = async (rep: CompanyRepresentative) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .update({
          verified: false,
          verified_by: null,
          verified_at: null,
        })
        .eq('id', rep.id);

      if (error) throw error;

      toast.success('Representative unverified');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error unverifying representative:', error);
      toast.error(error.message || 'Failed to unverify representative');
    }
  };

  const handleRemove = async (rep: CompanyRepresentative) => {
    if (!confirm('Are you sure you want to remove this representative?')) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .delete()
        .eq('id', rep.id);

      if (error) throw error;

      toast.success('Representative removed');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error removing representative:', error);
      toast.error(error.message || 'Failed to remove representative');
    }
  };

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = representatives.filter(r => !r.verified).length;
  const totalCompaniesWithReps = new Set(representatives.map(r => r.company_id)).size;

  if (loading) {
    return (
      <PageLayout title="Company Management">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Company Management"
      description="Manage company representatives and verify certification permissions"
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">All Companies</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Verifications
            {pendingCount > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{COMPANIES.length}</p>
                <p className="text-sm text-muted-foreground">
                  {totalCompaniesWithReps} with representatives
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Representatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{representatives.length}</p>
                <p className="text-sm text-muted-foreground">
                  {representatives.filter(r => r.verified).length} verified
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Awaiting admin review</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Each company can have a maximum of 3 verified representatives.
              Representatives must be verified to certify products.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredCompanies.map(company => {
              const companyReps = getCompanyReps(company.id);
              const verifiedCount = getVerifiedCount(company.id);

              return (
                <Card key={company.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle>{company.name}</CardTitle>
                          <CardDescription>{company.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={verifiedCount >= 3 ? 'default' : 'secondary'}>
                          {verifiedCount}/3 verified
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={verifiedCount >= 3}
                          onClick={() => {
                            setSelectedCompanyId(company.id);
                            setAssignDialogOpen(true);
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {companyReps.length > 0 && (
                    <CardContent>
                      <div className="space-y-2">
                        {companyReps.map(rep => (
                          <div
                            key={rep.id}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div>
                              <p className="font-medium">
                                {rep.profiles.first_name} {rep.profiles.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">{rep.profiles.email}</p>
                              {rep.position && (
                                <p className="text-xs text-muted-foreground">{rep.position}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {rep.verified ? (
                                <>
                                  <Badge variant="default">
                                    <UserCheck className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUnverify(rep)}
                                  >
                                    Unverify
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleVerify(rep)}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Verify
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemove(rep)}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingCount === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No pending verifications. All representatives are verified.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {representatives
                .filter(rep => !rep.verified)
                .map(rep => {
                  const company = COMPANIES.find(c => c.id === rep.company_id);
                  return (
                    <Card key={rep.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {rep.profiles.first_name} {rep.profiles.last_name}
                            </CardTitle>
                            <CardDescription>
                              {rep.profiles.email} • {company?.name || rep.company_id}
                            </CardDescription>
                            {rep.position && (
                              <p className="text-sm text-muted-foreground mt-1">{rep.position}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              onClick={() => handleVerify(rep)}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Verify
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleRemove(rep)}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign User to Company</DialogTitle>
            <DialogDescription>
              Add a user as a representative for{' '}
              {COMPANIES.find(c => c.id === selectedCompanyId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="position">Position (Optional)</Label>
              <Input
                id="position"
                placeholder="e.g., Product Manager"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignUser} disabled={processing}>
              {processing ? 'Assigning...' : 'Assign User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
