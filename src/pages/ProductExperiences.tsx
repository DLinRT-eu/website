import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Star, Mail, Linkedin, Building2, ArrowLeft } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';

interface UserExperience {
  id: string;
  product_id: string;
  company_id: string;
  adoption_date: string | null;
  institution: string | null;
  department: string | null;
  experience_rating: number | null;
  experience_notes: string | null;
  use_case: string | null;
  contact_preference: 'email' | 'linkedin' | 'no_contact';
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string | null;
  specialization: string | null;
}

export default function ProductExperiences() {
  const { productId } = useParams<{ productId: string }>();
  const { user, isAdmin, isReviewer, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<UserExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || (!isAdmin && !isReviewer)) {
      navigate('/auth');
      return;
    }

    fetchExperiences();
  }, [user, isAdmin, isReviewer, authLoading, productId, navigate]);

  const fetchExperiences = async () => {
    if (!productId) return;

    const { data, error } = await supabase
      .from('user_product_experiences')
      .select('*')
      .eq('product_id', productId);

    if (!error && data) {
      setExperiences(data);
    }
    setLoading(false);
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

  const product = ALL_PRODUCTS.find(p => p.id === productId);

  return (
    <PageLayout
      title={`User Experiences - ${product?.name || 'Product'} | DLinRT`}
      description="View user experiences and feedback for this product"
    >
      <div className="container max-w-5xl py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to={`/product/${productId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Product
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Experiences</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xl">{product?.name || productId}</span>
            <span>•</span>
            <Building2 className="h-4 w-4" />
            <span>{product?.company}</span>
          </div>
        </div>

        {experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Star className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No shared experiences yet</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                No users have opted to share their experience with this product yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-muted/50">
              <CardContent className="py-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Badge variant="secondary">{experiences.length}</Badge>
                  {experiences.length === 1 ? 'user has' : 'users have'} shared their experience with this product.
                  Users have consented to share this information.
                </p>
              </CardContent>
            </Card>

            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">
                        {exp.first_name} {exp.last_name}
                      </CardTitle>
                      <CardDescription>
                        {exp.specialization && <span>{exp.specialization} • </span>}
                        {exp.institution || 'Institution not specified'}
                        {exp.department && ` • ${exp.department}`}
                      </CardDescription>
                    </div>
                    <div>
                      {exp.experience_rating && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Star
                              key={value}
                              className={`h-5 w-5 ${value <= exp.experience_rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exp.adoption_date && (
                    <div className="text-sm">
                      <span className="font-medium">Adopted:</span>{' '}
                      {new Date(exp.adoption_date).toLocaleDateString()}
                    </div>
                  )}

                  {exp.use_case && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Use Case:</h4>
                      <p className="text-sm text-muted-foreground">{exp.use_case}</p>
                    </div>
                  )}

                  {exp.experience_notes && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Experience Notes:</h4>
                      <p className="text-sm text-muted-foreground">{exp.experience_notes}</p>
                    </div>
                  )}

                  {exp.contact_preference !== 'no_contact' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Contact this user:</p>
                      <div className="flex gap-2">
                        {exp.contact_preference === 'email' && (
                          <Button asChild size="sm" variant="outline">
                            <a href={`mailto:${exp.email}`}>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </a>
                          </Button>
                        )}
                        {exp.contact_preference === 'linkedin' && exp.linkedin_url && (
                          <Button asChild size="sm" variant="outline">
                            <a href={exp.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 mr-2" />
                              Connect on LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}