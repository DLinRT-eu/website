import { useState, useMemo } from 'react';
import { ALL_PRODUCTS } from '@/data';
import { validateProduct } from '@/utils/productReviewHelper';
import { calculateRevisionStats, getUrgencyLevel, getDaysSinceRevision } from '@/utils/revisionUtils';

interface ReviewProduct {
  id: string;
  name: string;
  company: string;
  category: string;
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  issueCount: number;
}

export const useReviewData = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  // Calculate revision stats
  const revisionStats = useMemo(() => calculateRevisionStats(ALL_PRODUCTS), []);

  // Process products to get their review status
  const productsWithStatus = useMemo(() => {
    return ALL_PRODUCTS.map(product => {
      const checks = validateProduct(product);
      const failures = checks.filter(c => c.status === 'fail').length;
      const warnings = checks.filter(c => c.status === 'warning').length;
      const daysSinceReview = getDaysSinceRevision(product);
      const urgencyLevel = getUrgencyLevel(product);

      return {
        ...product,
        status: failures > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok',
        urgency: urgencyLevel,
        daysSinceReview,
        issueCount: failures + warnings
      } as ReviewProduct;
    });
  }, []);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return productsWithStatus.filter(product => {
      if (selectedCategory && product.category !== selectedCategory) return false;
      if (selectedCompany && product.company !== selectedCompany) return false;
      if (selectedStatus && product.status !== selectedStatus) return false;
      if (selectedUrgency && product.urgency !== selectedUrgency) return false;
      return true;
    });
  }, [productsWithStatus, selectedCategory, selectedCompany, selectedStatus, selectedUrgency]);

  // Calculate summary stats
  const summaryStats = useMemo(() => ({
    criticalCount: filteredProducts.filter(p => p.status === 'critical').length,
    warningCount: filteredProducts.filter(p => p.status === 'warning').length,
    overdueCount: filteredProducts.filter(p => p.urgency === 'high').length
  }), [filteredProducts]);

  return {
    // Data
    filteredProducts,
    revisionStats,
    summaryStats,
    assignments,
    
    // Filter states
    selectedCategory,
    selectedCompany,
    selectedStatus,
    selectedUrgency,
    
    // Filter setters
    setSelectedCategory,
    setSelectedCompany,
    setSelectedStatus,
    setSelectedUrgency,
    setAssignments
  };
};