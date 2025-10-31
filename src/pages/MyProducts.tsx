import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, Star, Building2, Info } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface UserProduct {
  id: string;
  product_id: string;
  company_id: string;
  adoption_date: string | null;
  institution: string | null;
  department: string | null;
  experience_rating: number | null;
  experience_notes: string | null;
  use_case: string | null;
  willing_to_share_experience: boolean;
  contact_preference: 'email' | 'linkedin' | 'no_contact';
}

export default function MyProducts() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<UserProduct | null>(null);
  
  // Form state
  const [selectedProductId, setSelectedProductId] = useState('');
  const [adoptionDate, setAdoptionDate] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [rating, setRating] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [useCase, setUseCase] = useState('');
  const [willingToShare, setWillingToShare] = useState(false);
  const [contactPreference, setContactPreference] = useState<'email' | 'linkedin' | 'no_contact'>('no_contact');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProducts();
  }, [user, authLoading, navigate]);

  const fetchProducts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_products')
      .select('*')
      .eq('user_id', user.id)
      .order('adoption_date', { ascending: false, nullsFirst: false });

    if (!error && data) {
      setProducts(data as UserProduct[]);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setSelectedProductId('');
    setAdoptionDate('');
    setInstitution('');
    setDepartment('');
    setRating(3);
    setNotes('');
    setUseCase('');
    setWillingToShare(false);
    setContactPreference('no_contact');
    setEditingProduct(null);
  };

  const handleOpenDialog = (product?: UserProduct) => {
    if (product) {
      setEditingProduct(product);
      setSelectedProductId(product.product_id);
      setAdoptionDate(product.adoption_date || '');
      setInstitution(product.institution || '');
      setDepartment(product.department || '');
      setRating(product.experience_rating || 3);
      setNotes(product.experience_notes || '');
      setUseCase(product.use_case || '');
      setWillingToShare(product.willing_to_share_experience);
      setContactPreference(product.contact_preference);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedProductId) {
      toast({
        title: 'Error',
        description: 'Please select a product',
        variant: 'destructive',
      });
      return;
    }

    const catalogProduct = ALL_PRODUCTS.find(p => p.id === selectedProductId);
    if (!catalogProduct) return;

    const productData = {
      user_id: user!.id,
      product_id: selectedProductId,
      company_id: catalogProduct.company,
      adoption_date: adoptionDate || null,
      institution: institution || null,
      department: department || null,
      experience_rating: rating,
      experience_notes: notes || null,
      use_case: useCase || null,
      willing_to_share_experience: willingToShare,
      contact_preference: contactPreference,
    };

    let error;
    if (editingProduct) {
      ({ error } = await supabase
        .from('user_products')
        .update(productData)
        .eq('id', editingProduct.id));
    } else {
      ({ error } = await supabase
        .from('user_products')
        .insert(productData));
    }

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: editingProduct ? 'Product updated successfully' : 'Product added successfully',
      });
      setDialogOpen(false);
      resetForm();
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product?')) return;

    const { error } = await supabase
      .from('user_products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Product removed successfully',
      });
      fetchProducts();
    }
  };

  if (loading || authLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="My Products | DLinRT"
      description="Manage your adopted products and share your experience"
    >
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8" />
              My Products
            </h1>
            <p className="text-muted-foreground mt-2">Track products you've adopted and share your experience</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogDescription>
                  Track products you've adopted and optionally share your experience with the community
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product *</Label>
                  <Select value={selectedProductId} onValueChange={setSelectedProductId} disabled={!!editingProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_PRODUCTS.map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} ({product.company})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adoption-date">Adoption Date</Label>
                    <Input
                      id="adoption-date"
                      type="date"
                      value={adoptionDate}
                      onChange={(e) => setAdoptionDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      placeholder="Your institution name"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Radiation Oncology"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Experience Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="use-case">Use Case</Label>
                  <Textarea
                    id="use-case"
                    placeholder="How do you use this product?"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Experience Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Share your thoughts about this product..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Privacy Control:</strong> Your information is private by default. Enable sharing below only if you want to help others by sharing your experience.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="share-toggle">Share my experience</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow reviewers and the product company to see your feedback
                    </p>
                  </div>
                  <Switch
                    id="share-toggle"
                    checked={willingToShare}
                    onCheckedChange={setWillingToShare}
                  />
                </div>

                {willingToShare && (
                  <div className="space-y-2">
                    <Label>How can others contact you?</Label>
                    <Select value={contactPreference} onValueChange={(value: any) => setContactPreference(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Via Email</SelectItem>
                        <SelectItem value="linkedin">Via LinkedIn</SelectItem>
                        <SelectItem value="no_contact">View only (no contact)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingProduct ? 'Update' : 'Add Product'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Start tracking products you've adopted</p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {products.map((userProduct) => {
              const catalogProduct = ALL_PRODUCTS.find(p => p.id === userProduct.product_id);
              return (
                <Card key={userProduct.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-xl">{catalogProduct?.name || userProduct.product_id}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Building2 className="h-3 w-3" />
                          {catalogProduct?.company || userProduct.company_id}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenDialog(userProduct)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(userProduct.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {userProduct.adoption_date && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Adoption Date</Label>
                          <p>{new Date(userProduct.adoption_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {userProduct.institution && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Institution</Label>
                          <p>{userProduct.institution}</p>
                        </div>
                      )}
                      {userProduct.department && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Department</Label>
                          <p>{userProduct.department}</p>
                        </div>
                      )}
                      {userProduct.experience_rating && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Rating</Label>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <Star
                                key={value}
                                className={`h-4 w-4 ${value <= userProduct.experience_rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {userProduct.use_case && (
                      <div>
                        <Label className="text-sm font-medium">Use Case</Label>
                        <p className="text-sm text-muted-foreground mt-1">{userProduct.use_case}</p>
                      </div>
                    )}

                    {userProduct.experience_notes && (
                      <div>
                        <Label className="text-sm font-medium">Experience Notes</Label>
                        <p className="text-sm text-muted-foreground mt-1">{userProduct.experience_notes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      {userProduct.willing_to_share_experience ? (
                        <>
                          <Badge variant="secondary">Sharing Enabled</Badge>
                          <Badge variant="outline">{userProduct.contact_preference.replace('_', ' ')}</Badge>
                        </>
                      ) : (
                        <Badge variant="outline">Private</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
}