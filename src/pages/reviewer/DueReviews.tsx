import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, Clock, AlertCircle, CheckCircle2, Play, BookOpen, FileCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReviewAssignment {
  id: string;
  product_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string | null;
  assigned_at: string;
  notes: string | null;
}

export default function DueReviews() {
  const { user, isReviewer, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || (!isReviewer && !isAdmin)) {
      navigate('/auth');
      return;
    }
    fetchReviews();
  }, [user, isReviewer, isAdmin]);

  const fetchReviews = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('assigned_to', user.id)
      .order('deadline', { ascending: true, nullsFirst: false });

    if (!error && data) {
      setReviews(data as ReviewAssignment[]);
    }
    setLoading(false);
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return null;
    const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntil < 0) return { text: 'Overdue', variant: 'destructive' as const, days: daysUntil };
    if (daysUntil <= 3) return { text: `${daysUntil} days left`, variant: 'destructive' as const, days: daysUntil };
    if (daysUntil <= 7) return { text: `${daysUntil} days left`, variant: 'default' as const, days: daysUntil };
    return { text: `${daysUntil} days left`, variant: 'secondary' as const, days: daysUntil };
  };

  const overdueReviews = reviews.filter(r => {
    if (!r.deadline) return false;
    const status = getDeadlineStatus(r.deadline);
    return status && status.days < 0;
  });

  const dueSoonReviews = reviews.filter(r => {
    if (!r.deadline) return false;
    const status = getDeadlineStatus(r.deadline);
    return status && status.days >= 0 && status.days <= 7;
  });

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
          <h1 className="text-3xl font-bold mb-2">Due Reviews</h1>
          <p className="text-muted-foreground">Manage your assigned reviews and deadlines</p>
        </div>

        {/* Alert for overdue/due soon */}
        {(overdueReviews.length > 0 || dueSoonReviews.length > 0) && (
          <Alert variant={overdueReviews.length > 0 ? 'destructive' : 'default'} className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              {overdueReviews.length > 0 && `${overdueReviews.length} overdue review(s). `}
              {dueSoonReviews.length > 0 && `${dueSoonReviews.length} review(s) due within 7 days.`}
            </AlertDescription>
          </Alert>
        )}

        {/* How to Review Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              How to Review a Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="guide">
                <AccordionTrigger>View Review Guidelines</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1. Technical Validation</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Verify regulatory certifications (CE/FDA)</li>
                      <li>Check clinical evidence documentation</li>
                      <li>Validate technical specifications</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Completeness Check</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>All required fields filled</li>
                      <li>Contact information verified</li>
                      <li>Market availability confirmed</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3. Quality Assessment</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Accuracy of information</li>
                      <li>Clarity of documentation</li>
                      <li>Consistency across fields</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4. Regulatory Compliance</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>MDR/IVDR compliance (EU)</li>
                      <li>FDA clearance status (US)</li>
                      <li>Post-market surveillance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">5. Final Steps</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Add review notes</li>
                      <li>Set review score (1-10)</li>
                      <li>Mark complete or request changes</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{overdueReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{dueSoonReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {reviews.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Reviews</h2>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No reviews assigned yet</p>
              </CardContent>
            </Card>
          ) : (
            reviews.map(review => {
              const deadlineStatus = getDeadlineStatus(review.deadline);
              return (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{review.product_id}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          Assigned {formatDistanceToNow(new Date(review.assigned_at), { addSuffix: true })}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {review.priority && (
                          <Badge variant={review.priority === 'critical' || review.priority === 'high' ? 'destructive' : 'secondary'}>
                            {review.priority}
                          </Badge>
                        )}
                        <Badge variant={
                          review.status === 'completed' ? 'default' :
                          review.status === 'in_progress' ? 'secondary' : 'outline'
                        }>
                          {review.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {review.deadline && deadlineStatus && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <Badge variant={deadlineStatus.variant}>
                          {deadlineStatus.text}
                        </Badge>
                      </div>
                    )}
                    {review.notes && (
                      <p className="text-sm text-muted-foreground">{review.notes}</p>
                    )}
                    <Button asChild>
                      <Link to={`/review/${review.product_id}`}>View Review</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PageLayout>
  );
}
