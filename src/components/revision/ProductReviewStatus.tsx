
import React from 'react';
import { ProductDetails } from "@/types/productDetails";
import { validateProduct, generateReviewSummary } from '@/utils/productReviewHelper';
import ProgressCard from './review-status/ProgressCard';
import ReviewNotes from './review-status/ReviewNotes';
import DetailedCheckResults from './review-status/DetailedCheckResults';

interface ProductReviewStatusProps {
  product: ProductDetails;
}

export const ProductReviewStatus: React.FC<ProductReviewStatusProps> = ({ product }) => {
  // Run checks and generate summary
  const checks = validateProduct(product);
  const reviewSummary = generateReviewSummary(product, checks);

  // Group checks by status
  const failedChecks = checks.filter(c => c.status === 'fail');
  const warningChecks = checks.filter(c => c.status === 'warning');
  const passedChecks = checks.filter(c => c.status === 'pass');

  return (
    <div className="space-y-4">
      {/* Progress Card */}
      <ProgressCard 
        completedChecks={reviewSummary.progress.completedChecks}
        totalChecks={reviewSummary.progress.totalChecks}
        passedChecks={reviewSummary.progress.passedChecks}
        warnings={reviewSummary.progress.warnings}
        failures={reviewSummary.progress.failures}
        estimatedTimeRemaining={reviewSummary.progress.estimatedTimeRemaining}
      />

      {/* Review Notes */}
      <ReviewNotes 
        notes={reviewSummary.notes}
        product={product}
      />

      {/* Detailed Check Results */}
      <DetailedCheckResults 
        failedChecks={failedChecks}
        warningChecks={warningChecks}
        passedChecks={passedChecks}
      />
    </div>
  );
};

export default ProductReviewStatus;
