import { ProductDetails } from '@/types/productDetails';

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
  const checks: ReviewCheck[] = [
    {
      field: 'Name',
      status: product.name ? 'pass' : 'fail',
      severity: 'high',
      message: product.name ? 'Name is valid' : 'Name is missing'
    },
    {
      field: 'Company',
      status: product.company ? 'pass' : 'fail',
      severity: 'high',
      message: product.company ? 'Company is valid' : 'Company is missing'
    },
    {
      field: 'Category',
      status: product.category ? 'pass' : 'fail',
      severity: 'high',
      message: product.category ? 'Category is valid' : 'Category is missing'
    },
    {
      field: 'Description',
      status: product.description ? 'pass' : 'warning',
      severity: 'medium',
      message: product.description ? 'Description is valid' : 'Description is missing'
    },
    {
      field: 'URL',
      status: product.productUrl || product.url ? 'pass' : 'warning',
      severity: 'low',
      message: product.productUrl || product.url ? 'URL is valid' : 'URL is missing'
    },
    {
      field: 'GitHub URL',
      status: product.githubUrl ? 'pass' : 'warning',
      severity: 'low',
      message: product.githubUrl ? 'GitHub URL is specified' : 'GitHub URL is missing - consider adding for easier code access'
    },
    {
      field: 'Contact Email',
      status: product.supportEmail || product.contactEmail ? 'pass' : 'fail',
      severity: 'medium',
      message: product.supportEmail || product.contactEmail ? 'Contact Email is valid' : 'Contact Email is missing'
    },
    {
      field: 'Contact Phone',
      status: product.contactPhone ? 'pass' : 'warning',
      severity: 'low',
      message: product.contactPhone ? 'Contact Phone is valid' : 'Contact Phone is missing'
    },
    {
      field: 'Modality',
      status: product.modality && (Array.isArray(product.modality) ? product.modality.length > 0 : true) ? 'pass' : 'fail',
      severity: 'high',
      message: product.modality && (Array.isArray(product.modality) ? product.modality.length > 0 : true) ? 'Modality is valid' : 'Modality is missing'
    },
    {
      field: 'Anatomy',
      status: (product.anatomicalLocation && product.anatomicalLocation.length > 0) || 
              (product.anatomy && product.anatomy.length > 0) ? 'pass' : 'warning',
      severity: 'medium',
      message: (product.anatomicalLocation && product.anatomicalLocation.length > 0) || 
               (product.anatomy && product.anatomy.length > 0) ? 'Anatomy is valid' : 'Anatomy is missing'
    },
    {
      field: 'Features',
      status: product.features && product.features.length > 0 ? 'pass' : 'warning',
      severity: 'low',
      message: product.features && product.features.length > 0 ? 'Features are valid' : 'Features are missing'
    },
    {
      field: 'Technical Specifications',
      status: product.technicalSpecifications || product.technicalSpecs ? 'pass' : 'warning',
      severity: 'low',
      message: product.technicalSpecifications || product.technicalSpecs ? 'Technical Specifications are valid' : 'Technical Specifications are missing'
    },
    {
      field: 'Regulatory Information',
      status: product.regulatory || product.regulatoryInfo ? 'pass' : 'warning',
      severity: 'low',
      message: product.regulatory || product.regulatoryInfo ? 'Regulatory Information is valid' : 'Regulatory Information is missing'
    },
    {
      field: 'Market Information',
      status: product.market || product.marketInfo ? 'pass' : 'warning',
      severity: 'low',
      message: product.market || product.marketInfo ? 'Market Information is valid' : 'Market Information is missing'
    },
    {
      field: 'Pricing Information',
      status: product.pricing || product.pricingInfo ? 'pass' : 'warning',
      severity: 'low',
      message: product.pricing || product.pricingInfo ? 'Pricing Information is valid' : 'Pricing Information is missing'
    },
    {
      field: 'Evidence',
      status: product.evidence && (Array.isArray(product.evidence) ? product.evidence.length > 0 : true) ? 'pass' : 'warning',
      severity: 'low',
      message: product.evidence && (Array.isArray(product.evidence) ? product.evidence.length > 0 : true) ? 'Evidence is valid' : 'Evidence is missing'
    },
    {
      field: 'Limitations',
      status: product.limitations && product.limitations.length > 0 ? 'pass' : 'warning',
      severity: 'low',
      message: product.limitations && product.limitations.length > 0 ? 'Limitations are valid' : 'Limitations are missing'
    },
    {
      field: 'Last Updated',
      status: product.lastUpdated ? 'pass' : 'fail',
      severity: 'medium',
      message: product.lastUpdated ? 'Last Updated is valid' : 'Last Updated is missing'
    },
    {
      field: 'Last Revised',
      status: product.lastRevised ? 'pass' : 'warning',
      severity: 'low',
      message: product.lastRevised ? 'Last Revised is valid' : 'Last Revised is missing'
    },
    {
      field: 'Last Verified',
      status: product.lastVerified ? 'pass' : 'warning',
      severity: 'low',
      message: product.lastVerified ? 'Last Verified is valid' : 'Last Verified is missing'
    },
    {
      field: 'Company URL',
      status: product.companyUrl ? 'pass' : 'warning',
      severity: 'low',
      message: product.companyUrl ? 'Company URL is valid' : 'Company URL is missing'
    },
  ];
  
  // Add product metadata to each check for GitHub issue creation
  return checks.map(check => ({
    ...check,
    productId: product.id,
    productName: product.name,
    company: product.company,
    category: product.category
  }));
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

  // Add critical issues to notes
  if (failures > 0) {
    notes.push('Critical Issues:');
    checks.filter(c => c.status === 'fail').forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  // Add warnings to notes
  if (warnings > 0) {
    notes.push('\nWarnings:');
    checks.filter(c => c.status === 'warning').forEach(check => {
      notes.push(`- ${check.field}: ${check.message}`);
    });
  }

  // Add suggestions to notes
  notes.push('\nSuggestions:');
  if (!product.description) {
    notes.push('- Add a description to the product');
  }
  if (!product.productUrl && !product.url) {
    notes.push('- Add a URL to the product');
  }
  if (!product.githubUrl) {
    notes.push('- Add a GitHub URL for easier code access during reviews');
  }
  if (!product.contactPhone) {
    notes.push('- Add a contact phone to the product');
  }
  if (!product.features || product.features.length === 0) {
    notes.push('- Add features to the product');
  }
  if (!product.technicalSpecifications && !product.technicalSpecs) {
    notes.push('- Add technical specifications to the product');
  }
  if (!product.regulatory && !product.regulatoryInfo) {
    notes.push('- Add regulatory information to the product');
  }
  if (!product.market && !product.marketInfo) {
    notes.push('- Add market information to the product');
  }
  if (!product.pricing && !product.pricingInfo) {
    notes.push('- Add pricing information to the product');
  }
  if (!product.evidence) {
    notes.push('- Add evidence to the product');
  }
  if (!product.limitations || product.limitations.length === 0) {
    notes.push('- Add limitations to the product');
  }
  if (!product.lastRevised) {
    notes.push('- Add last revised date to the product');
  }
  if (!product.lastVerified) {
    notes.push('- Add last verified date to the product');
  }
  if (!product.companyUrl) {
    notes.push('- Add company URL to the product');
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
