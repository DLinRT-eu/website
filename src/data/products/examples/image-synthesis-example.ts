import { Product } from '../../../types/product';

/**
 * Example of an image synthesis product
 * This template shows the required fields and format for image synthesis products
 */
const imageSynthesisExample: Product = {
  id: 'example-image-synthesis',
  name: 'Example Image Synthesis Product',
  company: {
    name: 'Example Company',
    website: 'https://example.com'
  },
  website: 'https://example.com/product',
  category: 'Image Synthesis',
  features: [
    'MR-to-CT synthesis',
    'Synthetic CT generation',
    'Electron density mapping',
    'Multi-sequence support'
  ],
  certifications: {
    ce: true,
    fda: true
  },
  supportedModalities: ['MRI'],
  anatomicalLocations: [
    'Brain',
    'Head and Neck',
    'Pelvis'
  ],
  integrations: [
    'DICOM Import/Export',
    'PACS Integration',
    'Treatment Planning System Integration'
  ],
  publications: [
    {
      title: 'Example Publication on Synthetic CT Accuracy',
      url: 'https://example.com/publication1'
    }
  ],
  intendedUse: 'Generation of synthetic CT images from MR images for radiation therapy planning.',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
};

export default imageSynthesisExample;
