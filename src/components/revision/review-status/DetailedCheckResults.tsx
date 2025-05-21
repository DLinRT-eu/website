
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { Github } from 'lucide-react';
import { ReviewCheck } from '@/utils/productReviewHelper';
import ReviewChecksSection from './ReviewChecksSection';

interface DetailedCheckResultsProps {
  failedChecks: ReviewCheck[];
  warningChecks: ReviewCheck[];
  passedChecks: ReviewCheck[];
}

const DetailedCheckResults: React.FC<DetailedCheckResultsProps> = ({
  failedChecks,
  warningChecks,
  passedChecks,
}) => {
  return (
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
              {failedChecks.map(check => (
                <ReviewChecksSection key={check.field} check={check} />
              ))}
            </div>
          )}
          
          {warningChecks.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-600">Warning Checks ({warningChecks.length})</h4>
              {warningChecks.map(check => (
                <ReviewChecksSection key={check.field} check={check} />
              ))}
            </div>
          )}
          
          {passedChecks.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Passed Checks ({passedChecks.length})</h4>
              {passedChecks.map(check => (
                <ReviewChecksSection key={check.field} check={check} />
              ))}
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
  );
};

export default DetailedCheckResults;
