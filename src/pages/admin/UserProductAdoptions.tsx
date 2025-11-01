import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Download, Search, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProductAdoption {
  first_name: string;
  last_name: string;
  email: string;
  institution: string;
  product_id: string;
  adoption_date: string;
  experience_rating: number | null;
  use_case: string | null;
  willing_to_share_experience: boolean;
}

export default function UserProductAdoptions() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [adoptions, setAdoptions] = useState<UserProductAdoption[]>([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState<UserProductAdoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchAdoptions();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = adoptions.filter(a =>
        a.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.product_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdoptions(filtered);
    } else {
      setFilteredAdoptions(adoptions);
    }
  }, [searchTerm, adoptions]);

  const fetchAdoptions = async () => {
    const { data, error } = await supabase
      .from('user_products')
      .select(`
        product_id,
        adoption_date,
        experience_rating,
        use_case,
        willing_to_share_experience,
        profiles!inner(
          first_name,
          last_name,
          email,
          institution
        )
      `)
      .order('adoption_date', { ascending: false });

    if (!error && data) {
      const formatted = data.map((item: any) => ({
        first_name: item.profiles.first_name,
        last_name: item.profiles.last_name,
        email: item.profiles.email,
        institution: item.profiles.institution,
        product_id: item.product_id,
        adoption_date: item.adoption_date,
        experience_rating: item.experience_rating,
        use_case: item.use_case,
        willing_to_share_experience: item.willing_to_share_experience
      }));
      setAdoptions(formatted);
      setFilteredAdoptions(formatted);
    }
    setLoading(false);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Institution', 'Product', 'Adoption Date', 'Rating', 'Use Case', 'Willing to Share'];
    const rows = filteredAdoptions.map(a => [
      `${a.first_name} ${a.last_name}`,
      a.email,
      a.institution || 'N/A',
      a.product_id,
      new Date(a.adoption_date).toLocaleDateString(),
      a.experience_rating || 'N/A',
      a.use_case || 'N/A',
      a.willing_to_share_experience ? 'Yes' : 'No'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-product-adoptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: 'Export Complete',
      description: 'CSV file downloaded successfully'
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Product Adoptions</h1>
          <p className="text-muted-foreground">View all users and their adopted products</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Adoptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAdoptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(filteredAdoptions.map(a => a.email)).size}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Willing to Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredAdoptions.filter(a => a.willing_to_share_experience).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, institution, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Adoption Date</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Share Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdoptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium">No adoptions found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdoptions.map((adoption, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {adoption.first_name} {adoption.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground">{adoption.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{adoption.institution || 'N/A'}</TableCell>
                      <TableCell>
                        <Link to={`/product/${adoption.product_id}`} className="text-primary hover:underline">
                          {adoption.product_id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(adoption.adoption_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {adoption.experience_rating ? (
                          <Badge variant="secondary">{adoption.experience_rating}/10</Badge>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={adoption.willing_to_share_experience ? 'default' : 'outline'}>
                          {adoption.willing_to_share_experience ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
