import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock, XCircle } from 'lucide-react';

interface ApprovalGateProps {
  children: ReactNode;
}

/**
 * ApprovalGate - Wrapper component that checks user approval status
 * 
 * Blocks access to content for users whose registration is:
 * - Still pending admin approval
 * - Rejected by admin
 * 
 * Allows access for:
 * - Core team members (auto-approved)
 * - Users with 'approved' status
 */
export function ApprovalGate({ children }: ApprovalGateProps) {
  const { user, profile, loading, signOut } = useAuth();

  // Still loading
  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please wait while we load your account information.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You must be logged in to access this content.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Core team members are automatically approved
  if (profile?.is_core_team) {
    return <>{children}</>;
  }

  // Check approval status
  if (profile?.approval_status === 'rejected') {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Registration Rejected</AlertTitle>
          <AlertDescription>
            Your registration has been reviewed and unfortunately we cannot approve access at this time. 
            If you believe this is an error, please contact support at info@dlinrt.eu.
          </AlertDescription>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="mt-4"
          >
            Sign Out
          </Button>
        </Alert>
      </div>
    );
  }

  if (profile?.approval_status === 'pending') {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertTitle>Awaiting Approval</AlertTitle>
          <AlertDescription>
            Your registration is currently under review by our administrators. 
            You will receive access once your account has been approved.
            <br /><br />
            <strong>Email:</strong> {profile.email}
            <br />
            This typically takes 1-2 business days. If you have questions, contact info@dlinrt.eu.
          </AlertDescription>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="mt-4"
          >
            Sign Out
          </Button>
        </Alert>
      </div>
    );
  }

  // Approved users can access
  if (profile?.approval_status === 'approved') {
    return <>{children}</>;
  }

  // Profile doesn't exist or missing approval_status - shouldn't happen
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Profile Not Found</AlertTitle>
        <AlertDescription>
          We couldn't find your profile or approval status. Please try logging out and back in.
          If the issue persists, contact support.
        </AlertDescription>
        <Button 
          variant="outline" 
          onClick={signOut}
          className="mt-4"
        >
          Sign Out
        </Button>
      </Alert>
    </div>
  );
}
