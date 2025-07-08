/**
 * Chart Data Validation and Sanitization Utilities
 * Provides security measures for chart components to prevent XSS and data injection attacks
 */

/**
 * Sanitizes a string by removing potentially dangerous characters and limiting length
 */
export const sanitizeString = (input: string, maxLength: number = 100): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags, script tags, and other potentially dangerous content
  const sanitized = input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/[<>'"]/g, '') // Remove quotes and angle brackets
    .trim();
  
  // Limit length to prevent extremely long strings
  return sanitized.length > maxLength ? sanitized.substring(0, maxLength) + '...' : sanitized;
};

/**
 * Validates and sanitizes a numeric value
 */
export const sanitizeNumber = (input: any): number => {
  const num = Number(input);
  
  // Check for valid number, not NaN, not Infinity
  if (!Number.isFinite(num)) {
    return 0;
  }
  
  // Ensure reasonable bounds for chart data
  const MAX_VALUE = 1000000; // 1 million max
  const MIN_VALUE = -1000000; // -1 million min
  
  return Math.max(MIN_VALUE, Math.min(MAX_VALUE, Math.floor(num)));
};

/**
 * Validates and sanitizes chart data for bar/pie charts
 */
export interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

export const validateChartData = (data: any[]): ChartDataItem[] => {
  if (!Array.isArray(data)) {
    console.warn('Chart data is not an array, returning empty array');
    return [];
  }
  
  // Limit array size to prevent performance issues
  const MAX_ITEMS = 100;
  const limitedData = data.slice(0, MAX_ITEMS);
  
  return limitedData
    .filter(item => item && typeof item === 'object') // Ensure item is an object
    .map(item => {
      const sanitizedItem: ChartDataItem = {
        name: sanitizeString(item.name || 'Unknown', 50),
        value: sanitizeNumber(item.value)
      };
      
      // Sanitize additional properties while preserving chart functionality
      if (item.isSelected !== undefined) {
        sanitizedItem.isSelected = Boolean(item.isSelected);
      }
      
      if (item.isFiltered !== undefined) {
        sanitizedItem.isFiltered = Boolean(item.isFiltered);
      }
      
      if (item.fill && typeof item.fill === 'string') {
        // Validate CSS color values to prevent injection
        const validColorPattern = /^(#[0-9A-Fa-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|\w+)$/;
        sanitizedItem.fill = validColorPattern.test(item.fill.trim()) ? item.fill.trim() : '#00A6D6';
      }
      
      if (item.color && typeof item.color === 'string') {
        const validColorPattern = /^(#[0-9A-Fa-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|\w+)$/;
        sanitizedItem.color = validColorPattern.test(item.color.trim()) ? item.color.trim() : '#00A6D6';
      }
      
      return sanitizedItem;
    })
    .filter(item => item.name.length > 0); // Remove items with empty names
};

/**
 * Validates click handler data to prevent malicious function calls
 */
export const validateClickData = (data: any): { name: string } | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }
  
  if (typeof data.name !== 'string' || data.name.length === 0) {
    return null;
  }
  
  return {
    name: sanitizeString(data.name, 50)
  };
};

/**
 * Validates counting mode to ensure only valid values
 */
export const validateCountingMode = (mode: any): 'models' | 'products' => {
  return mode === 'products' ? 'products' : 'models';
};

/**
 * Validates total count to ensure it's a safe number
 */
export const validateTotalCount = (total: any): number => {
  return sanitizeNumber(total);
};

/**
 * Validates selected filter values
 */
export const validateFilterValue = (value: any): string => {
  if (typeof value !== 'string') {
    return 'all';
  }
  
  const sanitized = sanitizeString(value, 30);
  return sanitized.length > 0 ? sanitized : 'all';
};