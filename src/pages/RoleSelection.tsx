import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Building2, Eye, UserCircle } from 'lucide-react';
import SEO from '@/components/SEO';

const RoleSelection = () => {
  const { availableRoles, activeRole, setActiveRole, loading, requiresRoleSelection } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If role is already selected or not required, redirect
    if (!loading && (!requiresRoleSelection || activeRole)) {
      navigate('/', { replace: true });
    }
  }, [loading, requiresRoleSelection, activeRole, navigate]);

  const handleRoleSelect = (role: string) => {
    setActiveRole(role);
    navigate('/', { replace: true });
  };

  const roleConfigs = {
    admin: {
      icon: Shield,
      title: 'Administrator',
      description: 'Full system access to manage users, reviews, and platform settings',
      color: 'from-red-500 to-red-600',
      responsibilities: [
        'Manage user roles and permissions',
        'Oversee product reviews and assignments',
        'Monitor platform security and compliance',
        'Access all system features and data'
      ]
    },
    reviewer: {
      icon: Eye,
      title: 'Reviewer',
      description: 'Review and validate AI/ML products for regulatory compliance',
      color: 'from-blue-500 to-blue-600',
      responsibilities: [
        'Review assigned AI/ML products',
        'Validate regulatory compliance',
        'View user product experiences',
        'Provide feedback on submissions'
      ]
    },
    company: {
      icon: Building2,
      title: 'Company Representative',
      description: 'Manage your company\'s product information and user adoptions',
      color: 'from-green-500 to-green-600',
      responsibilities: [
        'Update company product information',
        'View user adoption statistics',
        'Submit product revisions',
        'Respond to user feedback'
      ]
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Select Your Role"
        description="Choose your active role to access role-specific features"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <UserCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Select Your Role
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You have multiple roles assigned to your account. Please select which role you'd like to use for this session.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              You can switch roles at any time from the header menu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableRoles.map((role) => {
              const config = roleConfigs[role as keyof typeof roleConfigs];
              if (!config) return null;

              const Icon = config.icon;

              return (
                <Card 
                  key={role}
                  className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${config.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{config.title}</CardTitle>
                    <CardDescription className="text-base">
                      {config.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-foreground">Key Responsibilities:</p>
                      <ul className="space-y-2">
                        {config.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(role);
                      }}
                    >
                      Continue as {config.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/roles')}
              className="mx-auto"
            >
              Learn more about roles
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
