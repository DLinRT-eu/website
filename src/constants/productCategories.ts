export const PRODUCT_CATEGORIES = [
  'auto-contouring',
  'clinical-prediction',
  'image-enhancement',
  'quality-assurance',
  'treatment-planning',
  'dose-calculation',
  'adaptive-radiotherapy',
  'patient-positioning',
  'motion-management',
  'workflow-automation'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export const CATEGORY_LABELS: Record<string, string> = {
  'auto-contouring': 'Auto-Contouring',
  'clinical-prediction': 'Clinical Prediction',
  'image-enhancement': 'Image Enhancement',
  'quality-assurance': 'Quality Assurance',
  'treatment-planning': 'Treatment Planning',
  'dose-calculation': 'Dose Calculation',
  'adaptive-radiotherapy': 'Adaptive Radiotherapy',
  'patient-positioning': 'Patient Positioning',
  'motion-management': 'Motion Management',
  'workflow-automation': 'Workflow Automation'
};
