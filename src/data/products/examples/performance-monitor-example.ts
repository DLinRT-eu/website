import { Product } from '../../../types/product';

/**
 * Example of a performance monitoring product
 * This template shows the required fields and format for monitoring products
 */
const performanceMonitorExample: Product = {
  id: 'example-performance-monitor',
  name: 'Example Performance Monitor',
  company: {
    name: 'Example Company',
    website: 'https://example.com'
  },
  website: 'https://example.com/product',
  category: 'Performance Monitor',
  features: [
    'Real-time treatment verification',
    'Machine learning-based error detection',
    'Automated quality assurance',
    'Performance analytics dashboard'
  ],
  certifications: {
    ce: true,
    fda: true
  },
  supportedModalities: ['LINAC', 'CT', 'CBCT'],
  anatomicalLocations: [
    'Brain',
    'Head and Neck',
    'Thorax',
    'Abdomen',
    'Pelvis'
  ],
  integrations: [
    'DICOM Import/Export',
    'Record & Verify System Integration',
    'Treatment Planning System Integration',
    'Hospital Information System Integration'
  ],
  publications: [
    {
      title: 'Example Publication on Treatment Verification Accuracy',
      url: 'https://example.com/publication1'
    }
  ],
  intendedUse: 'Real-time monitoring and verification of radiation therapy treatment delivery.',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
};

export default performanceMonitorExample;
