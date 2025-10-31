import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';

type AppRole = 'admin' | 'reviewer' | 'company';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requireAuth?: boolean;
  requireActiveRole?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  requireAuth = true,
  requireActiveRole = false
}: ProtectedRouteProps) => {
  const { user, roles, activeRole, requiresRoleSelection, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  }

  if (!requireAuth) return <>{children}</>;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (requiresRoleSelection && location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = roles.some(role => allowedRoles.includes(role));
    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <Button asChild><Link to="/">Go Home</Link></Button>
          </div>
        </div>
      );
    }

    if (requireActiveRole && activeRole && !allowedRoles.includes(activeRole as AppRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Wrong Active Role</h2>
            <p className="mb-4">Switch to: {allowedRoles.join(' or ')}</p>
            <Button onClick={() => navigate('/role-selection')}>Switch Role</Button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
