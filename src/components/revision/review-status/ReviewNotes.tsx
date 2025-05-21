
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GitPullRequest } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';

interface ReviewNotesProps {
  notes: string[];
  product: ProductDetails;
}

const ReviewNotes: React.FC<ReviewNotesProps> = ({ notes, product }) => {
  return (
    <div className="space-y-3">
      {notes.map((note, index) => {
        if (note.startsWith('Critical Issues:')) {
          return (
            <Alert key={index} variant="destructive">
              <AlertTitle className="text-red-700">Critical Issues</AlertTitle>
              <AlertDescription>
                {notes
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
                {notes
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
                {notes
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
  );
};

export default ReviewNotes;
