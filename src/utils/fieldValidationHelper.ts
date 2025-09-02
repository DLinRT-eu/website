
import { ProductDetails } from '@/types/productDetails';

export interface FieldValidationRule {
  fieldName: string;
  checkFunction: (product: ProductDetails) => boolean;
  severity: 'low' | 'medium' | 'high';
  successMessage: string;
  failureMessage: string;
  alternativeFields?: string[];
}

// Helper function to check if any of the alternative fields have values
export function hasAnyFieldValue(product: ProductDetails, fields: string[]): boolean {
  return fields.some(field => {
    const value = (product as any)[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  });
}

// Centralized validation rules
export const VALIDATION_RULES: FieldValidationRule[] = [
  {
    fieldName: 'Name',
    checkFunction: (product) => Boolean(product.name),
    severity: 'high',
    successMessage: 'Name is valid',
    failureMessage: 'Name is missing'
  },
  {
    fieldName: 'Company',
    checkFunction: (product) => Boolean(product.company),
    severity: 'high',
    successMessage: 'Company is valid',
    failureMessage: 'Company is missing'
  },
  {
    fieldName: 'Category',
    checkFunction: (product) => Boolean(product.category),
    severity: 'high',
    successMessage: 'Category is valid',
    failureMessage: 'Category is missing'
  },
  {
    fieldName: 'Description',
    checkFunction: (product) => Boolean(product.description),
    severity: 'medium',
    successMessage: 'Description is valid',
    failureMessage: 'Description is missing'
  },
  {
    fieldName: 'URL',
    checkFunction: (product) => hasAnyFieldValue(product, ['productUrl', 'url']),
    severity: 'low',
    successMessage: 'URL is valid',
    failureMessage: 'URL is missing',
    alternativeFields: ['productUrl', 'url']
  },
  {
    fieldName: 'GitHub URL',
    checkFunction: (product) => Boolean(product.githubUrl),
    severity: 'low',
    successMessage: 'GitHub URL is specified',
    failureMessage: 'GitHub URL is missing - consider adding for easier code access'
  },
  {
    fieldName: 'Contact Email',
    checkFunction: (product) => hasAnyFieldValue(product, ['supportEmail', 'contactEmail']),
    severity: 'medium',
    successMessage: 'Contact Email is valid',
    failureMessage: 'Contact Email is missing',
    alternativeFields: ['supportEmail', 'contactEmail']
  },
  {
    fieldName: 'Contact Phone',
    checkFunction: (product) => Boolean(product.contactPhone),
    severity: 'low',
    successMessage: 'Contact Phone is valid',
    failureMessage: 'Contact Phone is missing'
  },
  {
    fieldName: 'Modality',
    checkFunction: (product) => {
      if (Array.isArray(product.modality)) {
        return product.modality.length > 0;
      }
      return Boolean(product.modality);
    },
    severity: 'high',
    successMessage: 'Modality is valid',
    failureMessage: 'Modality is missing'
  },
  {
    fieldName: 'Anatomy',
    checkFunction: (product) => hasAnyFieldValue(product, ['anatomicalLocation', 'anatomy']),
    severity: 'medium',
    successMessage: 'Anatomy is valid',
    failureMessage: 'Anatomy is missing',
    alternativeFields: ['anatomicalLocation', 'anatomy']
  },
  {
    fieldName: 'Features',
    checkFunction: (product) => Boolean(product.features && product.features.length > 0),
    severity: 'low',
    successMessage: 'Features are valid',
    failureMessage: 'Features are missing'
  },
  {
    fieldName: 'Technical Specifications',
    checkFunction: (product) => hasAnyFieldValue(product, ['technicalSpecifications', 'technicalSpecs']),
    severity: 'low',
    successMessage: 'Technical Specifications are valid',
    failureMessage: 'Technical Specifications are missing',
    alternativeFields: ['technicalSpecifications', 'technicalSpecs']
  },
  {
    fieldName: 'Regulatory Information',
    checkFunction: (product) => hasAnyFieldValue(product, ['regulatory', 'regulatoryInfo']),
    severity: 'low',
    successMessage: 'Regulatory Information is valid',
    failureMessage: 'Regulatory Information is missing',
    alternativeFields: ['regulatory', 'regulatoryInfo']
  },
  {
    fieldName: 'Market Information',
    checkFunction: (product) => hasAnyFieldValue(product, ['market', 'marketInfo']),
    severity: 'low',
    successMessage: 'Market Information is valid',
    failureMessage: 'Market Information is missing',
    alternativeFields: ['market', 'marketInfo']
  },
  {
    fieldName: 'Pricing Information',
    checkFunction: (product) => hasAnyFieldValue(product, ['pricing', 'pricingInfo']),
    severity: 'low',
    successMessage: 'Pricing Information is valid',
    failureMessage: 'Pricing Information is missing',
    alternativeFields: ['pricing', 'pricingInfo']
  },
  {
    fieldName: 'Evidence',
    checkFunction: (product) => {
      if (Array.isArray(product.evidence)) {
        return product.evidence.length > 0;
      }
      return Boolean(product.evidence);
    },
    severity: 'low',
    successMessage: 'Evidence is valid',
    failureMessage: 'Evidence is missing'
  },
  {
    fieldName: 'Limitations',
    checkFunction: (product) => Boolean(product.limitations && product.limitations.length > 0),
    severity: 'low',
    successMessage: 'Limitations are valid',
    failureMessage: 'Limitations are missing'
  },
  {
    fieldName: 'Last Updated',
    checkFunction: (product) => Boolean(product.lastUpdated),
    severity: 'medium',
    successMessage: 'Last Updated is valid',
    failureMessage: 'Last Updated is missing'
  },
  {
    fieldName: 'Last Revised',
    checkFunction: (product) => Boolean(product.lastRevised),
    severity: 'medium',
    successMessage: 'Last Revised is valid',
    failureMessage: 'Last Revised is missing'
  },
  {
    fieldName: 'Company URL',
    checkFunction: (product) => Boolean(product.companyUrl),
    severity: 'low',
    successMessage: 'Company URL is valid',
    failureMessage: 'Company URL is missing'
  }
];
