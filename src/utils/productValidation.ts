
import { ProductDetails } from "@/types/productDetails";
import { MODALITY_TAGS, ANATOMY_TAGS, CERTIFICATION_TAGS, COMBINED_CERTIFICATION_TAGS } from "@/config/tags";

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  invalidValues: string[];
}

export const validateProduct = (product: ProductDetails): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: []
  };
  
  // Validate modalities
  if (product.modality) {
    const modalityArray = Array.isArray(product.modality) ? product.modality : [product.modality];
    const invalidModalities = modalityArray.filter(m => !MODALITY_TAGS.includes(m));
    
    if (invalidModalities.length > 0) {
      result.isValid = false;
      result.errors.push({
        field: 'modality',
        message: 'Contains invalid modality values',
        invalidValues: invalidModalities
      });
    }
  }
  
  // Validate anatomical locations
  if (product.anatomicalLocation && Array.isArray(product.anatomicalLocation)) {
    const invalidLocations = product.anatomicalLocation.filter(loc => !ANATOMY_TAGS.includes(loc));
    
    if (invalidLocations.length > 0) {
      result.isValid = false;
      result.errors.push({
        field: 'anatomicalLocation',
        message: 'Contains invalid anatomical location values',
        invalidValues: invalidLocations
      });
    }
  }
  
  // Validate certification
  if (product.certification) {
    // For combined certifications
    if (COMBINED_CERTIFICATION_TAGS && !COMBINED_CERTIFICATION_TAGS.includes(product.certification)) {
      result.isValid = false;
      result.errors.push({
        field: 'certification',
        message: 'Contains invalid certification value',
        invalidValues: [product.certification]
      });
    }
  }
  
  return result;
};
