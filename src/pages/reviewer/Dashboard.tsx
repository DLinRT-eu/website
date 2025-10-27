import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, Clock, AlertCircle, CheckCircle2, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import RevisionApprovalManager from '@/components/company/RevisionApprovalManager';

interface ReviewAssignment {
  id: string;
  product_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'company_reviewed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string | null;
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  notes: string | null;
}

export default function ReviewerDashboard() {
  const { user, isReviewer, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Don't check permissions while still loading auth
    if (authLoading) return;
    
    if (!user || (!isReviewer && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchReviews();
  }, [user, isReviewer, isAdmin, authLoading, navigate]);

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

  const handleStartReview = async (reviewId: string) => {
    const { error } = await supabase
      .from('product_reviews')
      .update({ status: 'in_progress', started_at: new Date().toISOString() })
      .eq('id', reviewId);

    if (!error) {
      fetchReviews();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return null;
    
    const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { text: 'Overdue', variant: 'destructive' as const };
    if (daysUntil <= 3) return { text: `${daysUntil} days left`, variant: 'destructive' as const };
    if (daysUntil <= 7) return { text: `${daysUntil} days left`, variant: 'default' as const };
    return { text: `${daysUntil} days left`, variant: 'secondary' as const };
  };

  const filterReviews = (status: string) => {
    return reviews.filter(r => r.status === status);
  };

  const ReviewCard = ({ review }: { review: ReviewAssignment }) => {
    const deadlineStatus = getDeadlineStatus(review.deadline);

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{review.product_id}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Assigned {formatDistanceToNow(new Date(review.assigned_at), { addSuffix: true })}
              </CardDescription>
            </div>
            <Badge variant={getPriorityColor(review.priority)}>
              {review.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            {review.status === 'completed' && <CheckCircle2 className={`h-4 w-4 ${getStatusColor(review.status)}`} />}
            {review.status === 'in_progress' && <Clock className={`h-4 w-4 ${getStatusColor(review.status)}`} />}
            {review.status === 'pending' && <AlertCircle className={`h-4 w-4 ${getStatusColor(review.status)}`} />}
            <span className="capitalize">{review.status.replace('_', ' ')}</span>
          </div>

          {review.deadline && deadlineStatus && (
            <div className="flex items-center gap-2">
              <Badge variant={deadlineStatus.variant}>
                {deadlineStatus.text}
              </Badge>
            </div>
          )}

          {review.notes && (
            <p className="text-sm text-muted-foreground">{review.notes}</p>
          )}

          <div className="flex gap-2">
            {review.status === 'pending' && (
              <Button
                size="sm"
                onClick={() => handleStartReview(review.id)}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Start Review
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/review/${review.product_id}`)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
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

  const pendingReviews = filterReviews('pending');
  const inProgressReviews = filterReviews('in_progress');
  const completedReviews = filterReviews('completed');

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground mt-2">Manage your assigned product reviews</p>
        </div>

        {/* Stats Cards */}
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
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{inProgressReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{completedReviews.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Revisions */}
        <RevisionApprovalManager />

        {/* Reviews List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({reviews.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingReviews.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressReviews.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No reviews assigned yet</p>
                  <p className="text-sm text-muted-foreground">Check back later for new assignments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <p className="text-lg font-medium">No pending reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4 mt-6">
            {inProgressReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No reviews in progress</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {inProgressReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No completed reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
