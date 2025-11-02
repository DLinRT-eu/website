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
 * ApprovalGate - Wrapper component that checks approval status
 * 
 * For Phase 2 implementation:
 * - Currently allows all authenticated users through
 * - Future: Check approval_status field when added to profiles table
 * - Shows pending/rejected messages as needed
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

  // Check if approval_status exists (future implementation)
  // For now, we'll check if the profile has is_core_team flag
  // Core team members are automatically approved
  if (profile?.is_core_team) {
    return <>{children}</>;
  }

  // Future: Add approval_status field to profiles table
  // For now, allow all authenticated users with profiles through
  if (profile) {
    return <>{children}</>;
  }

  // Profile doesn't exist - shouldn't happen but handle gracefully
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Profile Not Found</AlertTitle>
        <AlertDescription>
          We couldn't find your profile. Please try logging out and back in.
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
