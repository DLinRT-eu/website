
import { ProductDetails } from '@/types/productDetails';
import { countStructureTypes } from './structureClassification';

export interface ReviewCheck {
  field: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  severity: 'high' | 'medium' | 'low';
  details?: string; // Additional details about the check
  codeReference?: string; // Reference to related code for this check
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
      severity: 'high',
      details: 'The product name is a mandatory field and cannot be empty.'
    });
  } else {
    checks.push({
      field: 'name',
      status: 'pass',
      message: 'Product name is present',
      severity: 'high'
    });
  }

  if (!product.company?.trim()) {
    checks.push({
      field: 'company',
      status: 'fail',
      message: 'Company name is required',
      severity: 'high',
      details: 'The company name is a mandatory field and cannot be empty.'
    });
  } else {
    checks.push({
      field: 'company',
      status: 'pass',
      message: 'Company name is present',
      severity: 'high'
    });
  }

  // URL Checks
  if (product.website) {
    try {
      new URL(product.website);
      checks.push({
        field: 'website',
        status: 'pass',
        message: 'Valid website URL format',
        severity: 'medium'
      });
    } catch {
      checks.push({
        field: 'website',
        status: 'warning',
        message: 'Invalid website URL format',
        severity: 'medium',
        details: 'The website URL is not in a valid format. It should start with http:// or https://'
      });
    }
  } else {
    checks.push({
      field: 'website',
      status: 'warning',
      message: 'Website URL is missing',
      severity: 'medium',
      details: 'Consider adding a website URL for better product information.'
    });
  }

  // Structure Analysis for Auto-Contouring Products
  if (product.category === 'Auto-Contouring') {
    if (!product.supportedStructures || product.supportedStructures.length === 0) {
      checks.push({
        field: 'supportedStructures',
        status: 'fail',
        message: 'No supported structures defined for auto-contouring product',
        severity: 'high',
        details: 'Auto-contouring products should list the supported structures they can segment.'
      });
    } else {
      const structureCounts = countStructureTypes(product.supportedStructures);
      checks.push({
        field: 'supportedStructures',
        status: 'pass',
        message: `${structureCounts.total} structures defined (${structureCounts.OARs} OARs, ${structureCounts.GTV} GTV, ${structureCounts.Elective} Elective)`,
        severity: 'high'
      });
      
      // Check structure naming consistency
      const inconsistentStructures = product.supportedStructures.filter(s => !s.includes(':'));
      if (inconsistentStructures.length > 0) {
        checks.push({
          field: 'structureNamingConsistency',
          status: 'warning',
          message: `${inconsistentStructures.length} structures have inconsistent naming format`,
          severity: 'medium',
          details: `Structures should follow the 'Region: Structure' format. Examples of inconsistent structures: ${inconsistentStructures.slice(0, 3).join(', ')}${inconsistentStructures.length > 3 ? '...' : ''}`
        });
      } else {
        checks.push({
          field: 'structureNamingConsistency',
          status: 'pass',
          message: 'All structures follow consistent naming format',
          severity: 'medium'
        });
      }
    }
  }

  // Version and Date Validation
  if (product.version) {
    if (!/^\d+\.\d+(\.\d+)?$/.test(product.version)) {
      checks.push({
        field: 'version',
        status: 'warning',
        message: 'Version number format should be X.Y or X.Y.Z',
        severity: 'low',
        details: 'The version number should follow semantic versioning format like 1.0 or 1.0.1'
      });
    } else {
      checks.push({
        field: 'version',
        status: 'pass',
        message: 'Version number has valid format',
        severity: 'low'
      });
    }
  } else {
    checks.push({
      field: 'version',
      status: 'warning',
      message: 'Version information is missing',
      severity: 'medium',
      details: 'Adding version information helps track product evolution.'
    });
  }

  // Last Revision Date Check
  if (product.lastRevised) {
    const lastRevised = new Date(product.lastRevised);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastRevised.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff > 365) {
      checks.push({
        field: 'lastRevised',
        status: 'fail',
        message: `Last revision date is over a year old (${daysDiff} days)`,
        severity: 'high',
        details: 'Product information should be reviewed annually to ensure accuracy.'
      });
    } else if (daysDiff > 180) {
      checks.push({
        field: 'lastRevised',
        status: 'warning',
        message: `Last revision date is over 6 months old (${daysDiff} days)`,
        severity: 'medium',
        details: 'Consider reviewing the product information to ensure it remains current.'
      });
    } else {
      checks.push({
        field: 'lastRevised',
        status: 'pass',
        message: 'Product information was recently reviewed',
        severity: 'medium'
      });
    }
  } else {
    checks.push({
      field: 'lastRevised',
      status: 'fail',
      message: 'Last revision date is missing',
      severity: 'high',
      details: 'Tracking when product information was last reviewed is essential for maintaining data quality.'
    });
  }

  // Regulatory Checks
  if (product.regulatory?.ce) {
    if (!product.regulatory.ce.class) {
      checks.push({
        field: 'regulatory.ce.class',
        status: 'warning',
        message: 'CE class should be specified if CE marking exists',
        severity: 'medium',
        details: 'For products with CE marking, specifying the device class (I, IIa, IIb, III) is important regulatory information.'
      });
    } else {
      checks.push({
        field: 'regulatory.ce.class',
        status: 'pass',
        message: 'CE class is specified',
        severity: 'medium'
      });
    }
  }

  // Description Length Check
  if (product.description) {
    if (product.description.length < 50) {
      checks.push({
        field: 'description',
        status: 'warning',
        message: 'Description is too short',
        severity: 'medium',
        details: 'The product description should be comprehensive enough to provide a good understanding of the product.'
      });
    } else {
      checks.push({
        field: 'description',
        status: 'pass',
        message: 'Description has adequate length',
        severity: 'medium'
      });
    }
  } else {
    checks.push({
      field: 'description',
      status: 'fail',
      message: 'Description is missing',
      severity: 'high',
      details: 'A description is essential for understanding what the product does.'
    });
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
  const highSeverity = checks.filter(c => c.severity === 'high' && c.status !== 'pass');
  const mediumSeverity = checks.filter(c => c.severity === 'medium' && c.status !== 'pass');
  const lowSeverity = checks.filter(c => c.severity === 'low' && c.status !== 'pass');

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
