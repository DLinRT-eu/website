
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision, getUrgencyLevel } from '@/utils/revisionUtils';
import { validateProduct } from '@/utils/productReviewHelper';
import { ReviewProduct } from '../types/reviewTypes';

export const transformToReviewProducts = (products: ProductDetails[]): ReviewProduct[] => {
  return products.map(product => {
    const checks = validateProduct(product);
    const failures = checks.filter(c => c.status === 'fail').length;
    const warnings = checks.filter(c => c.status === 'warning').length;
    const daysSinceReview = getDaysSinceRevision(product);
    const urgencyLevel = getUrgencyLevel(product);

    return {
      id: product.id || '',
      name: product.name,
      company: product.company,
      category: product.category,
      status: failures > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok',
      urgency: urgencyLevel,
      daysSinceReview,
      issueCount: failures + warnings,
      lastRevised: product.lastRevised
    } as ReviewProduct;
  });
};
