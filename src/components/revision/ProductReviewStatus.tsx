import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProductDetails } from '@/types/productDetails';
import { validateProduct, generateReviewSummary } from '@/utils/productReviewHelper';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProductReviewStatusProps {
  product: ProductDetails;
}

export const ProductReviewStatus: React.FC<ProductReviewStatusProps> = ({ product }) => {
  const checks = validateProduct(product);
  const reviewSummary = generateReviewSummary(product, checks);

  const progressPercentage = 
    (reviewSummary.progress.completedChecks / reviewSummary.progress.totalChecks) * 100;

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
                    .takeWhile(n => !n.startsWith('\n'))
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
                    .takeWhile(n => !n.startsWith('\n'))
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
      </div>
    </div>
  );
};
