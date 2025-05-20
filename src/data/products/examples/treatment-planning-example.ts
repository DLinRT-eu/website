import { Product } from '../../../types/product';

/**
 * Example of a treatment planning product
 * This template shows the required fields and format for treatment planning products
 */
const treatmentPlanningExample: Product = {
  id: 'example-treatment-planning',
  name: 'Example Treatment Planning Product',
  company: {
    name: 'Example Company',
    website: 'https://example.com'
  },
  website: 'https://example.com/product',
  category: 'Treatment Planning',
  features: [
    'Automated plan generation',
    'Multi-criteria optimization',
    'Real-time plan adaptation',
    'Quality assurance tools'
  ],
  certifications: {
    ce: true,
    fda: true
  },
  supportedModalities: ['CT', 'MRI', 'PET'],
  anatomicalLocations: [
    'Brain',
    'Head and Neck',
    'Thorax',
    'Breast',
    'Abdomen',
    'Pelvis'
  ],
  integrations: [
    'DICOM Import/Export',
    'Record & Verify System Integration',
    'Treatment Planning System Integration',
    'PACS Integration'
  ],
  publications: [
    {
      title: 'Example Publication on Auto-Planning Performance',
      url: 'https://example.com/publication1'
    }
  ],
  intendedUse: 'Automated generation and optimization of radiation therapy treatment plans.',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
};

export default treatmentPlanningExample;
