import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Users, Search, Building2, Shield, ArrowRight, HelpCircle } from 'lucide-react';

export default function Roles() {
  return (
    <PageLayout
      title="User Roles | DLinRT"
      description="Learn about different user roles and how to contribute to the DLinRT community"
      canonical="https://dlinrt.eu/roles"
    >
      <div className="container max-w-7xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the DLinRT Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with professionals, share experiences, and contribute to advancing deep learning in radiotherapy
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* User Role */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">User</CardTitle>
              </div>
              <CardDescription className="text-base">
                Track your product adoptions and share experiences with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Add and track products you've adopted at your institution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Rate and review your experience with products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Share experiences with other professionals (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Request additional roles (Reviewer or Company)</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-primary">Automatically granted upon signup</p>
              </div>
            </CardContent>
          </Card>

          {/* Reviewer Role */}
          <Card className="hover:shadow-lg transition-shadow border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Reviewer</CardTitle>
              </div>
              <CardDescription className="text-base">
                Contribute your expertise by reviewing and validating product information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Review and validate product information for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Suggest improvements via GitHub issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Access reviewer dashboard with assigned tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>View user product experiences and feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All User role capabilities</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-primary">Requires approval by administrators</p>
              </div>
            </CardContent>
          </Card>

          {/* Company Role */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Company Representative</CardTitle>
              </div>
              <CardDescription className="text-base">
                Keep your company's product information up-to-date and engage with users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Submit revisions for your company's products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>View users who adopted your products (if they opted in)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Access user feedback and experience ratings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Contact users for testimonials (with permission)</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-primary">Requires verification of company affiliation</p>
              </div>
            </CardContent>
          </Card>

          {/* Admin Role */}
          <Card className="hover:shadow-lg transition-shadow border-muted">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">Administrator</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage the platform, approve roles, and ensure data quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What admins do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Approve and manage user role requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Assign review tasks to reviewers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Manage user accounts and permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Monitor platform security and compliance</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-muted-foreground">Not requestable - assigned by organization</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sign up to join the community and start tracking products. You can request additional roles from your profile page.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth">
                Sign Up Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/roles/faq">
                <HelpCircle className="h-4 w-4" />
                View FAQ
              </Link>
            </Button>
          </div>
        </div>

        {/* Role Compatibility */}
        <div className="mt-12 p-6 bg-card border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Role Compatibility</h3>
          <p className="text-muted-foreground mb-4">
            Users can have multiple roles. For example, a Reviewer can also track their own product adoptions as a User.
            Company Representatives can request Reviewer status to contribute to product validation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>User + Reviewer roles are compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>User + Company roles are compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Reviewer + Company roles are compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Admin has access to all features</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}