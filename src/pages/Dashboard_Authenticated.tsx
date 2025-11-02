import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Users, 
  FileCheck, 
  Building2, 
  BarChart3, 
  Package, 
  ShoppingCart,
  Shield,
  Settings,
  Bell
} from 'lucide-react';
import NewsSection from '@/components/NewsSection';

export default function Dashboard_Authenticated() {
  const { user, profile } = useAuth();
  const { activeRole, isAdmin, isReviewer, isCompany } = useRoles();

  const getRoleDescription = () => {
    if (activeRole === 'admin') {
      return 'Full system access - Manage users, reviews, and system settings';
    }
    if (activeRole === 'reviewer') {
      return 'Review and validate product information for quality assurance';
    }
    if (activeRole === 'company') {
      return 'Manage your company products and certifications';
    }
    return 'Browse and track AI medical imaging products';
  };

  const quickActions = [
    ...(isAdmin ? [
      {
        title: 'Admin Panel',
        description: 'Manage users and system settings',
        icon: Shield,
        link: '/admin',
        color: 'bg-red-50 text-red-600 hover:bg-red-100'
      },
      {
        title: 'User Management',
        description: 'Assign roles and manage users',
        icon: Users,
        link: '/admin/users',
        color: 'bg-red-50 text-red-600 hover:bg-red-100'
      },
      {
        title: 'Review Assignments',
        description: 'Assign products to reviewers',
        icon: FileCheck,
        link: '/admin/reviews',
        color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
      },
      {
        title: 'Company Oversight',
        description: 'Oversee all company certifications',
        icon: Building2,
        link: '/company/dashboard',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      }
    ] : []),
    ...(isReviewer ? [
      {
        title: 'My Reviews',
        description: 'View assigned product reviews',
        icon: FileCheck,
        link: '/reviewer/dashboard',
        color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      }
    ] : []),
    ...(isCompany ? [
      {
        title: 'Company Dashboard',
        description: 'Manage your products',
        icon: Building2,
        link: '/company/dashboard',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      }
    ] : []),
    {
      title: 'Products',
      description: 'Browse all AI medical products',
      icon: Package,
      link: '/products',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      title: 'Analytics',
      description: 'View product statistics',
      icon: BarChart3,
      link: '/dashboard',
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    },
    {
      title: 'My Products',
      description: 'Track your product adoptions',
      icon: ShoppingCart,
      link: '/my-products',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    }
  ];

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.first_name || 'User'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {getRoleDescription()}
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.link} to={action.link}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Role-Specific Widgets */}
        {isAdmin && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/admin/users">Manage Users</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/admin/reviews">Assign Reviews</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/admin/security">Security Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* News Section */}
        <div className="mb-8">
          <NewsSection />
        </div>
      </div>
    </PageLayout>
  );
}
