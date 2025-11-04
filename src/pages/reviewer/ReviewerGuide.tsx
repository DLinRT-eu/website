import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft, BookOpen, CheckCircle, FileText, GitBranch, Globe, Shield, AlertCircle, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ReviewerGuide() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mark guide as read when component mounts
  useEffect(() => {
    localStorage.setItem('reviewer_guide_read', 'true');
  }, []);

  // Define all guide sections with searchable content
  const guideSections = useMemo(() => [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      keywords: ['reviewer', 'assignments', 'priority', 'deadline', 'onboarding', 'role'],
      content: 'What is a Reviewer? How Assignments Work Priority Levels deadline management'
    },
    {
      id: 'workflow',
      title: 'Review Workflow',
      icon: CheckCircle,
      keywords: ['process', 'steps', 'checklist', 'start', 'complete', 'verify', 'github', 'issue'],
      content: 'Step-by-Step Process receive assignment start review checklist verify create issues'
    },
    {
      id: 'what-to-review',
      title: 'What to Review',
      icon: FileText,
      keywords: ['information', 'details', 'regulatory', 'compliance', 'documentation', 'technical'],
      content: 'Basic Product Information Technical Details Regulatory Compliance Documentation'
    },
    {
      id: 'verification',
      title: 'Verification Sources',
      icon: Globe,
      keywords: ['sources', 'verify', 'FDA', 'database', 'literature', 'official', 'documentation'],
      content: 'Primary Sources Regulatory Databases Scientific Literature company websites'
    },
    {
      id: 'checklist',
      title: 'Review Checklist Explained',
      icon: CheckCircle,
      keywords: ['checklist', 'items', 'sections', 'notes', 'verify', 'validation'],
      content: 'Basic Information Section Technical Details Section Compliance Regulatory Section'
    },
    {
      id: 'github',
      title: 'Creating Review Issues',
      icon: GitBranch,
      keywords: ['github', 'issue', 'template', 'create', 'report', 'bug', 'error'],
      content: 'When to Create an Issue How to Create an Issue template information evidence'
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: Shield,
      keywords: ['quality', 'documentation', 'efficiency', 'communication', 'tips', 'guidelines'],
      content: 'Review Quality Documentation Efficiency Communication best practices'
    },
    {
      id: 'faq',
      title: 'Common Questions',
      icon: AlertCircle,
      keywords: ['faq', 'questions', 'help', 'time', 'verify', 'contact', 'mistake', 'deadline'],
      content: 'FAQ common questions help verify information deadline extension mistakes'
    }
  ], []);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return guideSections;

    const query = searchQuery.toLowerCase();
    return guideSections.filter(section => 
      section.title.toLowerCase().includes(query) ||
      section.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      section.content.toLowerCase().includes(query)
    );
  }, [searchQuery, guideSections]);

  // Automatically open all sections when searching
  const accordionValue = searchQuery.trim() ? filteredSections.map(s => s.id).join(',') : undefined;

  return (
    <PageLayout>
      <div className="container max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/reviewer/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Reviewer Guide</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Complete guide to reviewing products in the DLinRT database
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guide (e.g., 'github issue', 'verification', 'deadline')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Found {filteredSections.length} {filteredSections.length === 1 ? 'section' : 'sections'} matching "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Start Card */}
        {!searchQuery && (
          <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Quick Start
            </CardTitle>
            <CardDescription>New to reviewing? Start here</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm">Check your <Link to="/reviewer/dashboard" className="text-primary hover:underline">Dashboard</Link> for assigned reviews</li>
              <li className="text-sm">Click "Start Review" on a pending assignment</li>
              <li className="text-sm">Use the review checklist to verify all information</li>
              <li className="text-sm">Create a GitHub issue if changes are needed</li>
              <li className="text-sm">Mark the review as complete when finished</li>
            </ol>
          </CardContent>
        </Card>
        )}

        {/* Main Guide Content */}
        {filteredSections.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {searchQuery ? `Search Results (${filteredSections.length})` : 'Comprehensive Guide'}
              </CardTitle>
              <CardDescription>
                {searchQuery 
                  ? `Showing sections matching "${searchQuery}"`
                  : 'Everything you need to know about reviewing products'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion 
                type="multiple" 
                value={accordionValue ? accordionValue.split(',') : undefined}
                className="w-full"
              >
              
              {/* Section 1: Getting Started */}
              {filteredSections.some(s => s.id === 'getting-started') && (
              <AccordionItem value="getting-started">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Getting Started
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">What is a Reviewer?</h4>
                    <p className="text-sm text-muted-foreground">
                      Reviewers are experts who verify and validate product information in the DLinRT database. 
                      Your role is crucial in maintaining the accuracy and reliability of our database for the 
                      radiation therapy community.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">How Assignments Work</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Product reviews are assigned to you based on your expertise and availability. 
                      You'll receive assignments through your dashboard with:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Priority level (low, medium, high, critical)</li>
                      <li>Deadline (if applicable)</li>
                      <li>Assignment notes from the admin</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Priority Levels</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Critical</Badge>
                        <span className="text-sm">Urgent issues affecting database integrity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">High</Badge>
                        <span className="text-sm">Important updates or new products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Medium</Badge>
                        <span className="text-sm">Regular maintenance reviews</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Low</Badge>
                        <span className="text-sm">Minor updates or routine checks</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 2: Review Workflow */}
              {filteredSections.some(s => s.id === 'workflow') && (
              <AccordionItem value="workflow">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review Workflow
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Step-by-Step Process</h4>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li className="text-sm">
                        <span className="font-medium">Receive Assignment</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          Check your dashboard for new assignments. Review the priority and deadline.
                        </p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Start Review</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          Click "Start Review" to change the status to "In Progress" and begin your work.
                        </p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Use the Checklist</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          Go through each item in the review checklist systematically. Mark items as you verify them.
                        </p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Verify Information</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          Cross-reference all information with official sources. Document your sources in notes.
                        </p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Create Issues</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          If changes are needed, use the "Create Review Issue" button to generate a GitHub issue.
                        </p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Complete Review</span>
                        <p className="text-muted-foreground ml-6 mt-1">
                          Mark the review as complete once all items are verified or issues are created.
                        </p>
                      </li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 3: What to Review */}
              {filteredSections.some(s => s.id === 'what-to-review') && (
              <AccordionItem value="what-to-review">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    What to Review
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Basic Product Information</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Product name and manufacturer</li>
                      <li>Company information and contact details</li>
                      <li>Official website URL (verify it's accessible and correct)</li>
                      <li>Product description and purpose</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technical Details</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Category classification (e.g., TPS, IGRT, QA)</li>
                      <li>Supported anatomical structures (if applicable)</li>
                      <li>Modality information (IMRT, VMAT, protons, etc.)</li>
                      <li>Integration capabilities with other systems</li>
                      <li>Software version information</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Regulatory & Compliance</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>CE Mark status and certification numbers</li>
                      <li>FDA clearance or approval status</li>
                      <li>Regulatory classification (Class I, II, IIb, III)</li>
                      <li>Clinical evidence and validation studies</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Last updated date (should be recent)</li>
                      <li>Links to documentation, white papers, publications</li>
                      <li>User manuals or training materials</li>
                      <li>Release notes and changelog</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 4: Verification Sources */}
              {filteredSections.some(s => s.id === 'verification') && (
              <AccordionItem value="verification">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Verification Sources
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Always verify information from authoritative sources. Here are recommended sources:
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Primary Sources</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Official company websites and product pages</li>
                      <li>Product documentation and user manuals</li>
                      <li>Direct communication with manufacturers</li>
                      <li>Official press releases and announcements</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Regulatory Databases</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>FDA 510(k) database (accessdata.fda.gov)</li>
                      <li>EU MDR/EUDAMED database</li>
                      <li>National regulatory authority databases</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Scientific Literature</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Peer-reviewed journal publications</li>
                      <li>Conference proceedings (ESTRO, ASTRO, AAPM)</li>
                      <li>Clinical trial registries (ClinicalTrials.gov)</li>
                      <li>Technical white papers</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">⚠️ Important</p>
                    <p className="text-sm text-muted-foreground">
                      Always document your sources in the review notes. Include URLs and access dates 
                      for web-based sources.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 5: Review Checklist */}
              {filteredSections.some(s => s.id === 'checklist') && (
              <AccordionItem value="checklist">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review Checklist Explained
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    The review interface includes a comprehensive checklist. Each section has specific items to verify:
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Basic Information Section</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Product name matches official documentation</li>
                      <li>Company name is correct and current</li>
                      <li>Website URL is accessible and correct</li>
                      <li>Description accurately represents the product</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technical Details Section</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Category is correctly assigned</li>
                      <li>Features list is complete and accurate</li>
                      <li>Supported structures are properly classified</li>
                      <li>Modalities are correctly specified</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Compliance & Regulatory Section</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>CE Mark information is current</li>
                      <li>FDA status is verified</li>
                      <li>Regulatory class is correct</li>
                      <li>Clinical evidence is documented</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Adding Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      Each checklist item can have notes. Use notes to:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>Document verification sources</li>
                      <li>Explain discrepancies found</li>
                      <li>Note required updates</li>
                      <li>Record date of verification</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 6: GitHub Issues */}
              {filteredSections.some(s => s.id === 'github') && (
              <AccordionItem value="github">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Creating Review Issues
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">When to Create an Issue</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create a GitHub issue when you identify:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Incorrect or outdated information</li>
                      <li>Missing required fields</li>
                      <li>Broken or incorrect URLs</li>
                      <li>Regulatory status changes</li>
                      <li>Product feature updates</li>
                      <li>Documentation errors</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">How to Create an Issue</h4>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li className="text-sm">
                        Click the "Create Review Issue" button on the review page
                      </li>
                      <li className="text-sm">
                        A pre-filled GitHub issue template will open in a new tab
                      </li>
                      <li className="text-sm">
                        Fill in the template with specific details about the issue
                      </li>
                      <li className="text-sm">
                        Include evidence: URLs, screenshots, or documentation excerpts
                      </li>
                      <li className="text-sm">
                        Submit the issue to notify the admin and maintenance team
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Issue Template Information</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      The template includes:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Product identification details</li>
                      <li>Section for describing the issue</li>
                      <li>Current vs. expected information fields</li>
                      <li>Evidence/source links section</li>
                      <li>Severity assessment</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">💡 Pro Tip</p>
                    <p className="text-sm text-muted-foreground">
                      Be specific in your issue descriptions. Instead of "Website is wrong", 
                      write "Website URL returns 404 error. Correct URL based on FDA listing is..."
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 7: Best Practices */}
              {filteredSections.some(s => s.id === 'best-practices') && (
              <AccordionItem value="best-practices">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Best Practices
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Review Quality</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Be thorough - check every field systematically</li>
                      <li>Be accurate - verify all information with reliable sources</li>
                      <li>Be current - ensure information is up-to-date</li>
                      <li>Be consistent - follow the same verification process each time</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Always document your sources in review notes</li>
                      <li>Include access dates for web-based information</li>
                      <li>Note any discrepancies or unclear information</li>
                      <li>Keep verification evidence organized</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Efficiency</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Start with official company websites</li>
                      <li>Check regulatory databases early</li>
                      <li>Verify links before deep-diving into content</li>
                      <li>Flag missing information clearly</li>
                      <li>Don't spend excessive time on unavailable data</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Communication</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Contact admin if you're stuck or need clarification</li>
                      <li>Request deadline extensions early if needed</li>
                      <li>Share useful verification resources with the team</li>
                      <li>Report systemic issues (e.g., multiple products affected)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

              {/* Section 8: Common Questions */}
              {filteredSections.some(s => s.id === 'faq') && (
              <AccordionItem value="faq">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Common Questions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-1">What if I can't verify information?</h4>
                    <p className="text-sm text-muted-foreground">
                      Create a GitHub issue noting that the information couldn't be verified and explain 
                      what sources you checked. Mark the review as complete after creating the issue.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">How long should a review take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Most reviews take 30-60 minutes. Complex products or those requiring extensive 
                      verification may take longer. Contact admin if a review is taking significantly longer.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Can I request more time?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes. Contact the admin through the platform messaging system or at the provided 
                      contact email if you need a deadline extension. Do this as early as possible.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">What if product information conflicts?</h4>
                    <p className="text-sm text-muted-foreground">
                      Document all conflicting sources in your notes. Prioritize regulatory databases 
                      and official company documentation. Create a GitHub issue highlighting the conflict 
                      for admin review.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">How do I handle discontinued products?</h4>
                    <p className="text-sm text-muted-foreground">
                      Verify the product status from official sources. Create a GitHub issue requesting 
                      the product be marked as discontinued or archived. Document the source confirming 
                      discontinuation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">When should I contact the admin?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact the admin if: you need deadline extensions, have questions about review 
                      scope, find systemic issues affecting multiple products, need access to resources, 
                      or have technical issues with the platform.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">What if I make a mistake?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact the admin immediately. All reviews are auditable, and corrections can be made. 
                      It's better to report and fix mistakes than to let incorrect information persist.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              )}

            </Accordion>
          </CardContent>
        </Card>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No sections match your search for "{searchQuery}"
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/reviewer/dashboard">Go to My Reviews</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
