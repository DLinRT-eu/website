import { ProductDetails } from '@/types/productDetails';
import { countStructureTypes } from './structureClassification';

interface ReviewCheck {
  field: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  severity: 'high' | 'medium' | 'low';
}

interface ReviewProgress {
  totalChecks: number;
  completedChecks: number;
  passedChecks: number;
  warnings: number;
  failures: number;
  estimatedTimeRemaining: number; // in minutes
}

interface ReviewResult {
  productId: string;
  checks: ReviewCheck[];
  progress: ReviewProgress;
  notes: string[];
  lastUpdated: string;
}

/**
 * Performs automated validation checks on a product
 */
export function validateProduct(product: ProductDetails): ReviewCheck[] {
  const checks: ReviewCheck[] = [];

  // Basic Information Checks
  if (!product.name?.trim()) {
    checks.push({
      field: 'name',
      status: 'fail',
      message: 'Product name is required',
      severity: 'high'
    });
  }

  if (!product.company?.trim()) {
    checks.push({
      field: 'company',
      status: 'fail',
      message: 'Company name is required',
      severity: 'high'
    });
  }

  // URL Checks
  if (product.website) {
    try {
      new URL(product.website);
    } catch {
      checks.push({
        field: 'website',
        status: 'warning',
        message: 'Invalid website URL format',
        severity: 'medium'
      });
    }
  }

  // Structure Analysis for Auto-Contouring Products
  if (product.category === 'Auto-Contouring' && product.supportedStructures) {
    const structureCounts = countStructureTypes(product.supportedStructures);
    if (structureCounts.total === 0) {
      checks.push({
        field: 'supportedStructures',
        status: 'fail',
        message: 'No supported structures defined for auto-contouring product',
        severity: 'high'
      });
    }
  }

  // Version and Date Validation
  if (product.version) {
    if (!/^\d+\.\d+(\.\d+)?$/.test(product.version)) {
      checks.push({
        field: 'version',
        status: 'warning',
        message: 'Version number format should be X.Y or X.Y.Z',
        severity: 'low'
      });
    }
  }

  // Regulatory Checks
  if (product.regulatory?.ce) {
    if (!product.regulatory.ce.class) {
      checks.push({
        field: 'regulatory.ce.class',
        status: 'warning',
        message: 'CE class should be specified if CE marking exists',
        severity: 'medium'
      });
    }
  }

  return checks;
}

/**
 * Generates a review summary with progress tracking
 */
export function generateReviewSummary(
  product: ProductDetails,
  checks: ReviewCheck[]
): ReviewResult {
  const progress: ReviewProgress = {
    totalChecks: checks.length,
    completedChecks: checks.length,
    passedChecks: checks.filter(c => c.status === 'pass').length,
    warnings: checks.filter(c => c.status === 'warning').length,
    failures: checks.filter(c => c.status === 'fail').length,
    estimatedTimeRemaining: calculateEstimatedTime(checks)
  };

  return {
    productId: product.id || '',
    checks,
    progress,
    notes: generateReviewNotes(product, checks),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Calculates estimated review time based on remaining checks
 */
function calculateEstimatedTime(checks: ReviewCheck[]): number {
  // Base time: 30 minutes
  let estimatedMinutes = 30;

  // Add time for each remaining issue
  const failureCount = checks.filter(c => c.status === 'fail').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;

  // Failures typically need more time to investigate and fix
  estimatedMinutes += failureCount * 20;
  estimatedMinutes += warningCount * 10;

  return estimatedMinutes;
}

/**
 * Generates standardized review notes based on validation results
 */
function generateReviewNotes(
  product: ProductDetails,
  checks: ReviewCheck[]
): string[] {
  const notes: string[] = [];

  // Group checks by severity
  const highSeverity = checks.filter(c => c.severity === 'high');
  const mediumSeverity = checks.filter(c => c.severity === 'medium');
  const lowSeverity = checks.filter(c => c.severity === 'low');

  if (highSeverity.length > 0) {
    notes.push('Critical Issues:');
    highSeverity.forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  if (mediumSeverity.length > 0) {
    notes.push('\nWarnings:');
    mediumSeverity.forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  if (lowSeverity.length > 0) {
    notes.push('\nSuggestions:');
    lowSeverity.forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  return notes;
}
