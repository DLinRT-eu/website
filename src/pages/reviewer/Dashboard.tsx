import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, Clock, AlertCircle, CheckCircle2, Play, BookOpen, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import RevisionApprovalManager from '@/components/company/RevisionApprovalManager';
import OnboardingChecklist from '@/components/reviewer/OnboardingChecklist';

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
  review_round_id?: string | null;
}

interface ReviewRound {
  id: string;
  name: string;
  description?: string;
  round_number: number;
  status: string;
  default_deadline?: string;
}

export default function ReviewerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isReviewer, isAdmin, loading: rolesLoading } = useRoles();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [rounds, setRounds] = useState<ReviewRound[]>([]);
  const [hasExpertise, setHasExpertise] = useState(true);

  useEffect(() => {
    // Wait for both auth and roles to finish loading
    if (authLoading || rolesLoading) return;
    
    if (!user || (!isReviewer && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchReviews();
    fetchRounds();
    checkExpertise();
  }, [user, isReviewer, isAdmin, authLoading, rolesLoading, navigate]);

  const checkExpertise = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('reviewer_expertise')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (!error) {
      setHasExpertise((data?.length || 0) > 0);
    }
  };

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

  const fetchRounds = async () => {
    try {
      const { data, error } = await supabase
        .from('review_rounds')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRounds(data || []);
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
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
      case 'pending': return 'text-yellow-500';
      case 'in_progress': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'company_reviewed': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return { text: 'No deadline', color: 'text-muted-foreground' };

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { text: 'Overdue', color: 'text-destructive' };
    if (daysUntil === 0) return { text: 'Due today', color: 'text-destructive' };
    if (daysUntil <= 3) return { text: `Due in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`, color: 'text-orange-500' };
    return { text: `Due in ${daysUntil} days`, color: 'text-muted-foreground' };
  };

  const ReviewCard = ({ review }: { review: ReviewAssignment }) => {
    const deadlineStatus = getDeadlineStatus(review.deadline);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">Product: {review.product_id}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Assigned {formatDistanceToNow(new Date(review.assigned_at), { addSuffix: true })}</span>
              </div>
            </div>
            <Badge variant={getPriorityColor(review.priority)}>
              {review.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${getStatusColor(review.status)}`}>
              {review.status.replace('_', ' ').toUpperCase()}
            </span>
            {review.deadline && (
              <span className={`flex items-center gap-1 ${deadlineStatus.color}`}>
                <Clock className="h-4 w-4" />
                {deadlineStatus.text}
              </span>
            )}
          </div>

          {review.notes && (
            <p className="text-sm text-muted-foreground">{review.notes}</p>
          )}

          <div className="flex gap-2">
            {review.status === 'pending' && (
              <Button
                size="sm"
                onClick={() => handleStartReview(review.id)}
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Review
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-full"
            >
              <Link to={`/review/${review.product_id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filterReviews = (status: string) => {
    if (status === 'all') return reviews;
    return reviews.filter(r => r.status === status);
  };

  const pendingReviews = filterReviews('pending');
  const inProgressReviews = filterReviews('in_progress');
  const completedReviews = filterReviews('completed');

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Reviews</h1>
            <p className="text-muted-foreground mt-2">Manage your assigned product reviews</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/reviewer/guide">
                <BookOpen className="mr-2 h-4 w-4" />
                Review Guide
              </Link>
            </Button>
            <Button asChild>
              <Link to="/reviewer/due-reviews">View Due Reviews</Link>
            </Button>
          </div>
        </div>

        {/* Onboarding Checklist */}
        <div className="mb-8">
          <OnboardingChecklist />
        </div>

        {/* Active Review Rounds */}
        {rounds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {rounds.map((round) => (
              <Card key={round.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge>{`Round #${round.round_number}`}</Badge>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-2">{round.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {round.description || 'Active review round'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {round.default_deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline: {format(new Date(round.default_deadline), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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

        {/* Revision Approval */}
        <div className="mb-8">
          <RevisionApprovalManager />
        </div>

        {/* Reviews List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All ({reviews.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingReviews.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressReviews.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews assigned yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews in progress</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
