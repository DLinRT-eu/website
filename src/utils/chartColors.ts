
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
