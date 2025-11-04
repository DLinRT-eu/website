import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, BookOpen, Settings, FileCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface ChecklistStatus {
  hasPreferences: boolean;
  hasCompletedReview: boolean;
  hasReadGuide: boolean;
}

export default function OnboardingChecklist() {
  const { user } = useAuth();
  const [status, setStatus] = useState<ChecklistStatus>({
    hasPreferences: false,
    hasCompletedReview: false,
    hasReadGuide: false,
  });
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed
    const isDismissed = localStorage.getItem('reviewer_onboarding_dismissed');
    if (isDismissed === 'true') {
      setDismissed(true);
    }

    checkOnboardingStatus();
  }, [user]);

  const checkOnboardingStatus = async () => {
    if (!user) return;

    try {
      // Check if user has set preferences
      const { data: expertiseData } = await supabase
        .from('reviewer_expertise')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      // Check if user has completed at least one review
      const { data: reviewData } = await supabase
        .from('product_reviews')
        .select('id')
        .eq('assigned_to', user.id)
        .eq('status', 'completed')
        .limit(1);

      // Check if user has read the guide (from localStorage)
      const hasReadGuide = localStorage.getItem('reviewer_guide_read') === 'true';

      setStatus({
        hasPreferences: (expertiseData?.length || 0) > 0,
        hasCompletedReview: (reviewData?.length || 0) > 0,
        hasReadGuide,
      });
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('reviewer_onboarding_dismissed', 'true');
    setDismissed(true);
  };

  const completedSteps = Object.values(status).filter(Boolean).length;
  const totalSteps = 3;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = completedSteps === totalSteps;

  // Don't show if dismissed or complete
  if (dismissed || isComplete || loading) {
    return null;
  }

  const steps = [
    {
      id: 'preferences',
      title: 'Set Your Expertise Preferences',
      description: 'Configure areas you want to review',
      completed: status.hasPreferences,
      icon: Settings,
      link: '/reviewer/preferences',
      action: 'Set Preferences',
    },
    {
      id: 'guide',
      title: 'Read the Reviewer Guide',
      description: 'Learn about the review process',
      completed: status.hasReadGuide,
      icon: BookOpen,
      link: '/reviewer/guide',
      action: 'Read Guide',
    },
    {
      id: 'review',
      title: 'Complete Your First Review',
      description: 'Finish reviewing an assigned product',
      completed: status.hasCompletedReview,
      icon: FileCheck,
      link: '/reviewer/dashboard',
      action: 'View Reviews',
    },
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Getting Started as a Reviewer
            </CardTitle>
            <CardDescription className="mt-2">
              Complete these steps to get the most out of your reviewer experience
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 -mt-2 -mr-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedSteps} of {totalSteps} completed
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              step.completed
                ? 'bg-muted/50 border-muted'
                : 'bg-background border-border hover:border-primary/50'
            }`}
          >
            <div className="mt-0.5">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <h4
                      className={`font-medium text-sm ${
                        step.completed ? 'text-muted-foreground line-through' : ''
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
                {!step.completed && (
                  <Button asChild size="sm" variant="outline" className="flex-shrink-0">
                    <Link to={step.link}>{step.action}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
