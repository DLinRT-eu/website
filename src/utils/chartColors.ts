
// Custom colors with better contrast and readability
export const CHART_COLORS = [
  '#0EA5E9',   // Bright Ocean Blue
  '#8B5CF6',   // Vivid Purple
  '#10B981',   // Emerald Green
  '#F43F5E',   // Vibrant Red
  '#F59E0B',   // Amber
  '#EC4899',   // Pink
  '#14B8A6',   // Teal
  '#6366F1',   // Indigo
  '#EF4444',   // Red
  '#84CC16',   // Lime
];

// Fixed mapping of anatomical locations to colors
export const LOCATION_COLORS: Record<string, string> = {
  'Whole body': '#0EA5E9',   // Bright Ocean Blue
  'Agnostic': '#8B5CF6',     // Vivid Purple
  'Abdomen': '#10B981',      // Emerald Green
  'Body': '#F43F5E',         // Vibrant Red
  'Brain': '#F59E0B',        // Amber
  'Breast': '#EC4899',       // Pink
  'Head & Neck': '#14B8A6',  // Teal
  'Pelvis': '#6366F1',       // Indigo
  'Male Pelvis': '#EF4444',  // Red
  'Female Pelvis': '#84CC16', // Lime
  'Thorax': '#8B5CF6',       // Vivid Purple
};

// Fixed mapping of modalities to colors
export const MODALITY_COLORS: Record<string, string> = {
  'CT': '#0EA5E9',           // Bright Ocean Blue
  'MRI': '#10B981',          // Emerald Green
  'PET': '#8B5CF6',          // Vivid Purple
  'PET/CT': '#F59E0B',       // Orange
  'CBCT': '#1E3A8A',         // Dark Blue
  'SPECT': '#F59E0B',        // Amber
  'X-ray': '#F43F5E',        // Vibrant Red
  'Ultrasound': '#14B8A6',   // Teal
  'LINAC': '#6366F1',        // Indigo
  'MRI-LINAC': '#EC4899',    // Pink
  'RT Struct': '#8B5CF6',    // Vivid Purple
  'Multi-modal': '#6366F1',  // Indigo
  'Agnostic': '#EC4899',     // Pink
};

// Get modality color with fallback
export const getModalityColor = (modality: string | string[]): string => {
  if (!modality) return '#64748B'; // Gray fallback
  
  const modalityStr = Array.isArray(modality) ? modality.join(', ') : modality;
  const normalizedModality = modalityStr.toLowerCase();
  
  // Check for exact matches first
  for (const [key, color] of Object.entries(MODALITY_COLORS)) {
    if (normalizedModality.includes(key.toLowerCase())) {
      return color;
    }
  }
  
  return '#64748B'; // Gray fallback
};
