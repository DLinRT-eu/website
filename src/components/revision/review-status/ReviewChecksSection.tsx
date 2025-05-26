
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Shield, ChevronDown, ChevronRight, Code, FileText, Github } from 'lucide-react';
import { ReviewCheck } from '@/utils/productReviewHelper';
import { createEditUrl } from '@/utils/githubUrlHelper';

interface ReviewChecksSectionProps {
  check: ReviewCheck;
}

const ReviewChecksSection: React.FC<ReviewChecksSectionProps> = ({ check }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate GitHub issue URL with pre-filled content
  const getGitHubIssueUrl = (check: ReviewCheck) => {
    const issueTitle = encodeURIComponent(`Review Issue: ${check.field} - ${check.message}`);
    const issueBody = encodeURIComponent(
      `## Product Review Issue\n\n` +
      `- **Product ID**: ${check.productId || 'unknown'}\n` +
      `- **Product Name**: ${check.productName || 'unknown'}\n` +
      `- **Company**: ${check.company || 'unknown'}\n\n` +
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

  return (
    <div key={check.field} className="border rounded-md mb-2">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
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
              <a href={createEditUrl({ id: check.productId, category: check.category, company: check.company })} target="_blank" rel="noopener noreferrer">
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

export default ReviewChecksSection;
