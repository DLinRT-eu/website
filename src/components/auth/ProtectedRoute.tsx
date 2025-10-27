import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';

type AppRole = 'admin' | 'reviewer' | 'company';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { user, roles, loading } = useAuth();

  // Always show loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Loading authentication..." />
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = roles.some(role => allowedRoles.includes(role));
    
    // Add debug logging in development
    if (import.meta.env.DEV) {
      console.log('[ProtectedRoute] Checking access:', {
        user: user?.email,
        requiredRoles: allowedRoles,
        userRoles: roles,
        hasAccess: hasRequiredRole
      });
    }
    
    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Required role: {allowedRoles.join(' or ')}
            </p>
            {import.meta.env.DEV && (
              <p className="text-xs text-muted-foreground mb-4">
                Your roles: {roles.length > 0 ? roles.join(', ') : 'none'}
              </p>
            )}
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
