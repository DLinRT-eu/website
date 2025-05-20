import { Product } from '../../../types/product';

/**
 * Example of an image registration product
 * This template shows the required fields and format for registration products
 */
const registrationExample: Product = {
  id: 'example-registration',
  name: 'Example Registration Product',
  company: {
    name: 'Example Company',
    website: 'https://example.com'
  },
  website: 'https://example.com/product',
  category: 'Registration',
  features: [
    'Multi-modality registration',
    'Deformable registration',
    'Real-time visualization',
    'Quality metrics'
  ],
  certifications: {
    ce: true,
    fda: true
  },
  supportedModalities: ['CT', 'MRI', 'PET', 'CBCT'],
  anatomicalLocations: [
    'Brain',
    'Head and Neck',
    'Thorax',
    'Abdomen',
    'Pelvis'
  ],
  integrations: [
    'DICOM Import/Export',
    'PACS Integration',
    'Treatment Planning System Integration'
  ],
  publications: [
    {
      title: 'Example Publication on Registration Accuracy',
      url: 'https://example.com/publication1'
    }
  ],
  intendedUse: 'Registration of medical images for radiation therapy planning and adaptation.',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
};

export default registrationExample;
