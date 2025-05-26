
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GitPullRequest } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';
import { createPullRequestUrl } from '@/utils/githubUrlHelper';

interface ReviewNotesProps {
  notes: string[];
  product: ProductDetails;
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({ notes, product }) => {
  // Parse notes into sections
  const parseNoteSections = (notes: string[]) => {
    const sections: { [key: string]: string[] } = {};
    let currentSection = '';
    
    notes.forEach(note => {
      if (note.endsWith(':')) {
        currentSection = note.slice(0, -1);
        sections[currentSection] = [];
      } else if (currentSection && note.startsWith('- ')) {
        sections[currentSection].push(note.slice(2));
      }
    });
    
    return sections;
  };

  const sections = parseNoteSections(notes);

  return (
    <div className="space-y-3">
      {/* Critical Issues */}
      {sections['Critical Issues'] && sections['Critical Issues'].length > 0 && (
        <Alert variant="destructive">
          <AlertTitle className="text-red-700">Critical Issues</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <p className="text-sm mb-2">These issues must be resolved before the product can be considered complete:</p>
              {sections['Critical Issues'].map((issue, i) => (
                <div key={i} className="mt-1 text-sm">• {issue}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Warnings */}
      {sections['Warnings'] && sections['Warnings'].length > 0 && (
        <Alert variant="default" className="bg-yellow-50 border-yellow-200">
          <AlertTitle className="text-yellow-700">Information Gaps</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <p className="text-sm mb-2">Consider adding this information to improve completeness:</p>
              <div className="text-sm text-yellow-600">
                {sections['Warnings'].length} field{sections['Warnings'].length === 1 ? '' : 's'} could be enhanced
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Next Steps */}
      {sections['Next Steps'] && sections['Next Steps'].length > 0 && (
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-700">Next Steps</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              {sections['Next Steps'].map((step, i) => (
                <div key={i} className="mt-1 text-sm">• {step}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* GitHub PR button */}
      <div className="mt-4">
        <Button asChild variant="outline" className="w-full">
          <a 
            href={createPullRequestUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitPullRequest className="mr-2 h-4 w-4" />
            Create Pull Request
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ReviewNotes;
