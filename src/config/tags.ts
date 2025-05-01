
// Valid modality options
export const MODALITY_TAGS = [
  'CT', 
  'MRI',
  'CBCT',
  'PET',
  'X-ray',
  'LINAC',
  'MRI-LINAC'
];

// Valid anatomical location options
export const ANATOMY_TAGS = [
  'Whole body',
  'Agnostic',
  'Abdomen', 
  'Body',
  'Brain',
  'Breast',
  'Head & Neck',
  'Pelvis',
  'Prostate',
  'Thorax',
  'Multiple'
];

// Valid certification options
export const CERTIFICATION_TAGS = [
  'FDA',
  'CE',
  'CE exempt',
  'MDR exempt',
  'NMPA'
];

// Combined certification values (for display purposes)
export const COMBINED_CERTIFICATION_TAGS = [
  'CE & FDA',
  'CE',
  'FDA',
  'MDR exempt',
  'NMPA'
];

// Mapping of certification display values to their component tags
export const CERTIFICATION_MAPPING: Record<string, string[]> = {
  'CE & FDA': ['CE', 'FDA'],
  'CE': ['CE'],
  'FDA': ['FDA'],
  'MDR exempt': ['MDR exempt'],
  'NMPA': ['NMPA']
};
