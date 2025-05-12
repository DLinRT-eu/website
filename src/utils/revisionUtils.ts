
import { ProductDetails } from '@/types/productDetails';

// Define types for revision statistics
export interface RevisionStats {
  productsNeedingRevision: ProductDetails[];
  revisionPercentage: number;
  averageDaysSinceRevision: number;
  revisionAgeGroups: RevisionAgeGroups;
}

export interface RevisionAgeGroups {
  shortTerm: number; // 0-3 months
  mediumTerm: number; // 3-6 months
  longTerm: number; // 6-12 months
  critical: number; // >12 months
}

// Calculate days since last revision
export const getDaysSinceRevision = (product: ProductDetails): number => {
  const lastRevised = product.lastRevised || "2000-01-01";
  const revisionDate = new Date(lastRevised);
  const today = new Date();
  
  const diffTime = Math.abs(today.getTime() - revisionDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if a product needs revision (>6 months since last revision)
export const needsRevision = (product: ProductDetails): boolean => {
  const daysSinceRevision = getDaysSinceRevision(product);
  return daysSinceRevision > 180; // More than 6 months
};

// Get urgency level based on days since revision
export const getUrgencyLevel = (product: ProductDetails): 'low' | 'medium' | 'high' => {
  const daysSinceRevision = getDaysSinceRevision(product);
  
  if (daysSinceRevision > 365) return 'high';
  if (daysSinceRevision > 180) return 'medium';
  return 'low';
};

// Calculate all revision statistics from product list
export const calculateRevisionStats = (products: ProductDetails[]): RevisionStats => {
  const productsNeedingRevision = products.filter(needsRevision);
  
  // Calculate percentage of products up to date
  const upToDateCount = products.length - productsNeedingRevision.length;
  const revisionPercentage = (upToDateCount / products.length) * 100;
  
  // Calculate average days since revision for all products
  const totalDays = products.reduce((sum, product) => sum + getDaysSinceRevision(product), 0);
  const averageDaysSinceRevision = Math.round(totalDays / products.length);
  
  // Group products by age
  const revisionAgeGroups: RevisionAgeGroups = {
    shortTerm: 0, // 0-3 months
    mediumTerm: 0, // 3-6 months
    longTerm: 0, // 6-12 months
    critical: 0, // >12 months
  };
  
  products.forEach(product => {
    const days = getDaysSinceRevision(product);
    
    if (days > 365) {
      revisionAgeGroups.critical++;
    } else if (days > 180) {
      revisionAgeGroups.longTerm++;
    } else if (days > 90) {
      revisionAgeGroups.mediumTerm++;
    } else {
      revisionAgeGroups.shortTerm++;
    }
  });
  
  return {
    productsNeedingRevision: productsNeedingRevision.sort((a, b) => 
      getDaysSinceRevision(b) - getDaysSinceRevision(a)
    ),
    revisionPercentage: Math.round(revisionPercentage),
    averageDaysSinceRevision,
    revisionAgeGroups
  };
};
