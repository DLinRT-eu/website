
import { ProductDetails } from '@/types/productDetails';
import { VALIDATION_RULES } from './fieldValidationHelper';

// Extend the existing ReviewCheck type to include additional properties
export interface ReviewCheck {
  field: string;
  status: 'pass' | 'warning' | 'fail';
  severity: 'low' | 'medium' | 'high';
  message: string;
  // Additional properties for GitHub links
  productId?: string;
  productName?: string;
  company?: string;
  category?: string;
}

export interface ReviewSummary {
  progress: {
    totalChecks: number;
    completedChecks: number;
    passedChecks: number;
    warnings: number;
    failures: number;
    estimatedTimeRemaining: string;
  };
  notes: string[];
}

export function validateProduct(product: ProductDetails): ReviewCheck[] {
  const checks: ReviewCheck[] = VALIDATION_RULES.map(rule => {
    const isValid = rule.checkFunction(product);
    const status = isValid ? 'pass' : (rule.severity === 'high' ? 'fail' : 'warning');
    
    return {
      field: rule.fieldName,
      status,
      severity: rule.severity,
      message: isValid ? rule.successMessage : rule.failureMessage,
      productId: product.id,
      productName: product.name,
      company: product.company,
      category: product.category
    };
  });
  
  return checks;
}

export function generateReviewSummary(product: ProductDetails, checks: ReviewCheck[]): ReviewSummary {
  const totalChecks = checks.length;
  const completedChecks = checks.filter(c => c.status !== 'warning').length;
  const passedChecks = checks.filter(c => c.status === 'pass').length;
  const warnings = checks.filter(c => c.status === 'warning').length;
  const failures = checks.filter(c => c.status === 'fail').length;

  // Estimate time remaining based on the number of failed checks
  const estimatedTimePerFailure = 5; // minutes
  const estimatedTimeRemaining = failures * estimatedTimePerFailure;

  const notes: string[] = [];

  // Add critical issues to notes (only high severity failures)
  const criticalIssues = checks.filter(c => c.status === 'fail' && c.severity === 'high');
  if (criticalIssues.length > 0) {
    notes.push('Critical Issues:');
    criticalIssues.forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  // Add warnings to notes (medium and low severity issues)
  const warningIssues = checks.filter(c => c.status === 'warning' || (c.status === 'fail' && c.severity !== 'high'));
  if (warningIssues.length > 0) {
    notes.push('\nWarnings:');
    warningIssues.forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  // Add next steps only if there are actionable items
  const actionableItems = [];
  if (criticalIssues.length > 0) {
    actionableItems.push('Address critical issues first to ensure data quality');
  }
  if (warningIssues.length > 0) {
    actionableItems.push('Review and update missing information where possible');
  }
  if (!product.lastVerified) {
    actionableItems.push('Verify product information with official sources');
  }

  if (actionableItems.length > 0) {
    notes.push('\nNext Steps:');
    actionableItems.forEach(item => {
      notes.push(`- ${item}`);
    });
  }

  return {
    progress: {
      totalChecks,
      completedChecks,
      passedChecks,
      warnings,
      failures,
      estimatedTimeRemaining: estimatedTimeRemaining.toString()
    },
    notes
  };
}
