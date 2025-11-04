import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { Navigate, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { ReviewerPreferencesContainer } from '@/components/profile/reviewer-preferences/ReviewerPreferencesContainer';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Info } from 'lucide-react';

export default function ReviewerPreferences() {
  const { user, loading: authLoading } = useAuth();
  const { isReviewer, isAdmin, activeRole } = useRoles();

  // Redirect if not authenticated or not a reviewer
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (!authLoading && !isReviewer && !isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <PageLayout
      title="Reviewer Preferences - DLinRT.eu"
      description="Configure your expertise preferences to receive relevant product review assignments"
    >
      <div className="container max-w-6xl py-8">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/reviewer/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expertise Preferences</h1>
              <p className="text-muted-foreground">
                Configure your areas of expertise to receive relevant product review assignments
              </p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>How Preferences Affect Assignments</AlertTitle>
          <AlertDescription>
            The system uses your expertise preferences to intelligently match you with product reviews.
            Set higher priority levels for areas where you have deep expertise. Products matching your
            preferences will be prioritized for assignment to you.
          </AlertDescription>
        </Alert>

        {/* Main Preferences Component */}
        {user && <ReviewerPreferencesContainer userId={user.id} />}
      </div>
    </PageLayout>
  );
}
