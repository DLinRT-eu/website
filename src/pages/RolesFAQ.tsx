import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Mail } from 'lucide-react';

export default function RolesFAQ() {
  return (
    <PageLayout
      title="Roles FAQ | DLinRT"
      description="Frequently asked questions about user roles and permissions on DLinRT"
      canonical="https://dlinrt.eu/roles/faq"
    >
      <div className="container max-w-4xl py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/roles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roles
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Roles FAQ</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about roles and permissions
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {/* General Questions */}
          <Card>
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I request a role?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>To request a role:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>Sign up for an account if you haven't already</li>
                      <li>Navigate to your <Link to="/profile" className="text-primary hover:underline">Profile page</Link></li>
                      <li>Find the "Request New Role" section</li>
                      <li>Select the role you want (Reviewer or Company)</li>
                      <li>Provide justification for why you need this role</li>
                      <li>Submit your request for admin review</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">
                      For Company role, you may need to upload verification documents proving your affiliation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I have multiple roles?</AccordionTrigger>
                  <AccordionContent>
                    <p>Yes! Roles are compatible and can be combined:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>A Reviewer can also track products as a User</li>
                      <li>Company Representatives can request Reviewer status</li>
                      <li>Admins have access to all features</li>
                    </ul>
                    <p className="mt-2">
                      Each role adds specific capabilities without removing existing ones.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does role approval take?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Role approvals are typically processed within 2-5 business days. Administrators review each request to ensure:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>The justification is appropriate</li>
                      <li>For Company roles: verification of company affiliation</li>
                      <li>For Reviewer roles: relevant expertise or credentials</li>
                    </ul>
                    <p className="mt-2">
                      You'll receive a notification once your request is processed.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What if my role request is denied?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If your request is denied, you'll receive a notification with feedback. Common reasons include:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Insufficient justification provided</li>
                      <li>Unable to verify company affiliation</li>
                      <li>Request doesn't meet role requirements</li>
                    </ul>
                    <p className="mt-2">
                      You can submit a new request after addressing the feedback. Contact <a href="mailto:info@dlinrt.eu" className="text-primary hover:underline">info@dlinrt.eu</a> if you need clarification.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* User Role Questions */}
          <Card>
            <CardHeader>
              <CardTitle>User Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="user-1">
                  <AccordionTrigger>What can I do as a User?</AccordionTrigger>
                  <AccordionContent>
                    <p>As a User, you can:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Add products your institution has adopted</li>
                      <li>Rate your experience with products (1-5 stars)</li>
                      <li>Write notes about your experience and use cases</li>
                      <li>Choose whether to share your experience with others</li>
                      <li>Specify how you want to be contacted (email, LinkedIn, or not at all)</li>
                      <li>View all public product information</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="user-2">
                  <AccordionTrigger>Who can see my product adoptions?</AccordionTrigger>
                  <AccordionContent>
                    <p>Your privacy is protected:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li><strong>By default:</strong> Only you can see your product adoptions</li>
                      <li><strong>If you opt-in to share:</strong> Reviewers and the product's company can see your experience</li>
                      <li><strong>Never shared:</strong> Competitor companies cannot see your data</li>
                    </ul>
                    <p className="mt-2 text-sm text-primary font-medium">
                      You have full control over what you share and with whom.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="user-3">
                  <AccordionTrigger>Why should I share my experience?</AccordionTrigger>
                  <AccordionContent>
                    <p>Sharing your experience helps the community by:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Helping other institutions make informed decisions</li>
                      <li>Providing valuable feedback to product companies</li>
                      <li>Contributing to the advancement of the field</li>
                      <li>Building connections with other professionals</li>
                    </ul>
                    <p className="mt-2">
                      You can always change your sharing preferences later.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Reviewer Role Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Reviewer Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="reviewer-1">
                  <AccordionTrigger>What are the responsibilities of a Reviewer?</AccordionTrigger>
                  <AccordionContent>
                    <p>Reviewers are responsible for:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Reviewing assigned product information for accuracy</li>
                      <li>Validating technical specifications and claims</li>
                      <li>Suggesting improvements via GitHub issues</li>
                      <li>Meeting assigned deadlines for reviews</li>
                      <li>Maintaining objectivity and professional standards</li>
                    </ul>
                    <p className="mt-2">
                      Reviews typically take 2-4 hours depending on product complexity.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviewer-2">
                  <AccordionTrigger>How are reviews assigned?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Administrators assign reviews based on:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Your area of expertise and specialization</li>
                      <li>Current workload and availability</li>
                      <li>Product priority and urgency</li>
                    </ul>
                    <p className="mt-2">
                      You'll receive notifications for new assignments and can track them in your reviewer dashboard.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviewer-3">
                  <AccordionTrigger>What if I can't complete a review on time?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If you're unable to meet a deadline:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mt-2">
                      <li>Contact an administrator as soon as possible</li>
                      <li>Explain the situation and expected delay</li>
                      <li>The review may be reassigned if necessary</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">
                      It's better to communicate early than to miss a deadline without notice.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Company Role Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Company Representative Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="company-1">
                  <AccordionTrigger>How do companies benefit from the platform?</AccordionTrigger>
                  <AccordionContent>
                    <p>Company representatives can:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Keep product information accurate and up-to-date</li>
                      <li>View user adoption statistics and feedback</li>
                      <li>Connect with users for testimonials and case studies</li>
                      <li>Respond to user feedback and questions</li>
                      <li>Track product performance and user satisfaction</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="company-2">
                  <AccordionTrigger>Can I see which users adopted our products?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      <strong>Privacy-first approach:</strong> You can only see users who:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li>Have adopted YOUR company's products</li>
                      <li>Have opted-in to share their experience</li>
                      <li>Have specified a contact preference</li>
                    </ul>
                    <p className="mt-2 text-primary font-medium">
                      You cannot see user data for competitor products.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="company-3">
                  <AccordionTrigger>How do I update product information?</AccordionTrigger>
                  <AccordionContent>
                    <p>To update your company's products:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mt-2">
                      <li>Go to your Company Dashboard</li>
                      <li>Click "Submit Revision"</li>
                      <li>Select the product to update</li>
                      <li>Provide a detailed summary of changes</li>
                      <li>Submit for admin review</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">
                      All changes are reviewed to ensure accuracy before publication.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Technical Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Technical & Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="tech-1">
                  <AccordionTrigger>How do I switch between role-based views?</AccordionTrigger>
                  <AccordionContent>
                    <p>Access role-specific features through:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                      <li><strong>Profile menu (top right):</strong> Access your role dashboards</li>
                      <li><strong>My Products:</strong> Manage your product adoptions (User)</li>
                      <li><strong>Review Dashboard:</strong> View assigned reviews (Reviewer)</li>
                      <li><strong>Company Dashboard:</strong> Manage product info (Company)</li>
                      <li><strong>Admin Dashboard:</strong> Platform management (Admin)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-2">
                  <AccordionTrigger>Can I access the public site while logged in?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes! The main navigation (Products, Companies, Dashboard, News, etc.) is always available.
                      Your role-specific features are accessible through your profile menu dropdown.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </Accordion>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
            <CardDescription>
              We're here to help! Contact our team for additional assistance.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild variant="default">
              <a href="mailto:info@dlinrt.eu">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/support">
                Visit Support Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}