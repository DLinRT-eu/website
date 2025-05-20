import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProductDetails } from '@/types/productDetails';
import { validateProduct, generateReviewSummary, type ReviewCheck } from '@/utils/productReviewHelper';
import { Shield, AlertTriangle, CheckCircle, Github, ChevronDown, ChevronRight, Code, FileText, GitPullRequest } from 'lucide-react';

interface ProductReviewStatusProps {
  product: ProductDetails;
}

export const ProductReviewStatus: React.FC<ProductReviewStatusProps> = ({ product }) => {
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  
  // Run checks and generate summary
  const checks = validateProduct(product);
  const reviewSummary = generateReviewSummary(product, checks);

  const progressPercentage = 
    (reviewSummary.progress.completedChecks / reviewSummary.progress.totalChecks) * 100;

  // Toggle details visibility for a specific check
  const toggleDetails = (fieldName: string) => {
    setShowDetails(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  // Group checks by status
  const failedChecks = checks.filter(c => c.status === 'fail');
  const warningChecks = checks.filter(c => c.status === 'warning');
  const passedChecks = checks.filter(c => c.status === 'pass');

  // Generate GitHub issue URL with pre-filled content
  const getGitHubIssueUrl = (check: ReviewCheck) => {
    const issueTitle = encodeURIComponent(`Review Issue: ${check.field} - ${check.message}`);
    const issueBody = encodeURIComponent(
      `## Product Review Issue\n\n` +
      `- **Product ID**: ${product.id}\n` +
      `- **Product Name**: ${product.name}\n` +
      `- **Company**: ${product.company}\n\n` +
      `### Issue Details\n` +
      `- **Field**: ${check.field}\n` +
      `- **Status**: ${check.status}\n` +
      `- **Severity**: ${check.severity}\n` +
      `- **Message**: ${check.message}\n\n` +
      `### Additional Information\n` +
      `<!-- Add any additional information or context here -->`
    );
    
    return `https://github.com/DLinRT-eu/website/issues/new?title=${issueTitle}&body=${issueBody}&labels=review`;
  };

  // Generate GitHub edit URL
  const getGitHubEditUrl = () => {
    // Product category is required
    if (!product.category || !product.company) return '';
    
    // Convert category to directory name
    const categorySlug = product.category.toLowerCase().replace(/ /g, '-');
    
    // Single file categories
    const singleFileCategories = ['registration', 'clinical-prediction'];
    
    // Build file path based on category structure
    let filePath = '';
    if (singleFileCategories.includes(categorySlug)) {
      // These categories have all products in a single file
      filePath = `src/data/products/${categorySlug}.ts`;
    } else {
      // Extract full company name from product ID by finding the last component that's not a functional term
      const functionalTerms = ['contour', 'segmentation', 'enhance', 'suite', 'vision', 'planning', 'dose', 'monitor'];
      const idParts = product.id.split('-');
      let companyParts = [];
      
      for (const part of idParts) {
        if (functionalTerms.includes(part.toLowerCase())) break;
        companyParts.push(part);
      }
      
      const companySlug = companyParts.join('-');
      filePath = `src/data/products/${categorySlug}/${companySlug}.ts`;
    }
    
    return `https://github.com/DLinRT-eu/website/edit/main/${filePath}`;
  };

  // Render a check with collapsible details
  const renderCheck = (check: ReviewCheck) => {
    const isOpen = showDetails[check.field] || false;
    
    return (
      <div key={check.field} className="border rounded-md mb-2">
        <div 
          className="flex items-center justify-between p-3 cursor-pointer" 
          onClick={() => toggleDetails(check.field)}
        >
          <div className="flex items-center gap-2">
            {check.status === 'fail' && <Shield className="h-4 w-4 text-red-500" />}
            {check.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
            {check.status === 'pass' && <CheckCircle className="h-4 w-4 text-green-500" />}
            <span className="font-medium">{check.field}</span>
            <Badge 
              variant={check.severity === 'high' ? 'destructive' : check.severity === 'medium' ? 'warning' : 'outline'}
              className="ml-2 text-xs"
            >
              {check.severity}
            </Badge>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">{check.message}</span>
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </div>
        
        {isOpen && (
          <div className="p-3 border-t bg-muted/50">
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Field Details</h4>
              <p className="text-sm">{check.field}</p>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Message</h4>
              <p className="text-sm">{check.message}</p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                asChild
              >
                <a href={getGitHubIssueUrl(check)} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  Create Issue
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                asChild
              >
                <a href={getGitHubEditUrl()} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-3.5 w-3.5" />
                  Edit Product
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                asChild
              >
                <a href={`https://github.com/DLinRT-eu/website/search?q=${encodeURIComponent(check.field)}`} target="_blank" rel="noopener noreferrer">
                  <Code className="h-3.5 w-3.5" />
                  View Code References
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Review Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {reviewSummary.progress.completedChecks} of {reviewSummary.progress.totalChecks} checks completed
              </span>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {reviewSummary.progress.passedChecks} Passed
                </Badge>
                <Badge variant="outline" className="bg-yellow-50">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {reviewSummary.progress.warnings} Warnings
                </Badge>
                <Badge variant="outline" className="bg-red-50">
                  <Shield className="w-3 h-3 mr-1" />
                  {reviewSummary.progress.failures} Failures
                </Badge>
              </div>
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-sm text-muted-foreground">
              Estimated time remaining: {reviewSummary.progress.estimatedTimeRemaining} minutes
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Notes */}
      <div className="space-y-3">
        {reviewSummary.notes.map((note, index) => {
          if (note.startsWith('Critical Issues:')) {
            return (
              <Alert key={index} variant="destructive">
                <AlertTitle className="text-red-700">Critical Issues</AlertTitle>
                <AlertDescription>
                  {reviewSummary.notes
                    .slice(index + 1)
                    .filter(n => !n.startsWith('\n'))
                    .map((issue, i) => (
                      <div key={i} className="mt-1">{issue}</div>
                    ))}
                </AlertDescription>
              </Alert>
            );
          }
          if (note.startsWith('\nWarnings:')) {
            return (
              <Alert key={index} variant="default" className="bg-yellow-50 border-yellow-200">
                <AlertTitle className="text-yellow-700">Warnings</AlertTitle>
                <AlertDescription>
                  {reviewSummary.notes
                    .slice(index + 1)
                    .filter(n => !n.startsWith('\n'))
                    .map((warning, i) => (
                      <div key={i} className="mt-1">{warning}</div>
                    ))}
                </AlertDescription>
              </Alert>
            );
          }
          if (note.startsWith('\nSuggestions:')) {
            return (
              <Alert key={index} variant="default" className="bg-blue-50 border-blue-200">
                <AlertTitle className="text-blue-700">Suggestions</AlertTitle>
                <AlertDescription>
                  {reviewSummary.notes
                    .slice(index + 1)
                    .map((suggestion, i) => (
                      <div key={i} className="mt-1">{suggestion}</div>
                    ))}
                </AlertDescription>
              </Alert>
            );
          }
          return null;
        })}

        {/* Add GitHub PR button */}
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <a 
              href={`https://github.com/DLinRT-eu/website/compare/main...review/${product.id}?expand=1&title=Review:%20${encodeURIComponent(product.name)}&labels=review`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitPullRequest className="mr-2 h-4 w-4" />
              Create Pull Request
            </a>
          </Button>
        </div>
      </div>

      {/* Detailed Check Results */}
      <div className="space-y-6 mt-6">
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer p-3 border rounded-md bg-muted/30">
              <h3 className="text-lg font-medium">Detailed Check Results</h3>
              <ChevronDown className="h-5 w-5" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            {failedChecks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Failed Checks ({failedChecks.length})</h4>
                {failedChecks.map(check => renderCheck(check))}
              </div>
            )}
            
            {warningChecks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-600">Warning Checks ({warningChecks.length})</h4>
                {warningChecks.map(check => renderCheck(check))}
              </div>
            )}
            
            {passedChecks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Passed Checks ({passedChecks.length})</h4>
                {passedChecks.map(check => renderCheck(check))}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button variant="outline" asChild>
                <a href="https://github.com/DLinRT-eu/website/issues" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View All Issues
                </a>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

