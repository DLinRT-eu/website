
import { ProductDetails } from '@/types/productDetails';

export const performanceMonitorExample: ProductDetails = {
  id: "example-monitor",
  name: "Example Performance Monitor",
  company: "Example Company",
  companyUrl: "https://example.com",
  category: "Performance Monitor",
  description: "An example radiotherapy performance monitoring system for testing and documentation.",
  url: "https://example.com/products/monitor",
  contactEmail: "info@example.com",
  contactPhone: "+1 555-123-4567",
  
  modality: ["LINAC", "CBCT", "EPID"],
  anatomy: ["N/A"],
  
  features: [
    "Real-time machine performance monitoring",
    "Beam quality assurance analytics",
    "Predictive maintenance alerts",
    "EPID-based dose verification",
    "Comprehensive reporting dashboard"
  ],
  
  technicalSpecs: {
    inputFormat: ["DICOM", "Log files", "Machine data"],
    outputFormat: ["Reports", "Dashboards", "Alerts"],
    integrations: ["Major LINAC vendors", "R&V systems", "QA software"],
    processingTime: "Real-time monitoring with <30s latency",
    accuracy: "Detects 99.5% of deviations >1%"
  },
  
  regulatoryInfo: {
    ceMark: true,
    fdaClearance: true,
    regulatoryClass: "Class II medical device",
    approvalDate: "2023-03-05"
  },
  
  marketInfo: {
    releaseDate: "2022-07-01",
    countries: ["USA", "EU", "UK", "Canada", "Australia", "Japan"],
    installBase: "100+ LINACs monitored worldwide"
  },
  
  pricingInfo: {
    pricingModel: "Per-machine license with support contract",
    priceRange: "$15,000-$25,000/machine/year",
    trialAvailability: "60-day evaluation period available"
  },
  
  evidence: [
    {
      type: "Technical Validation",
      description: "Validation against conventional QA methods",
      link: "https://example.com/qa-validation"
    },
    {
      type: "Clinical Implementation Study",
      description: "Workflow integration study across 5 centers",
      link: "https://doi.org/10.xxxx/xxxx.xxxx"
    }
  ],
  
  limitations: [
    "Requires specific machine configuration for full functionality",
    "Some features depend on vendor-specific data access",
    "Network connectivity required for real-time monitoring"
  ],
  
  lastUpdated: "2023-06-01",
  lastRevised: "2023-06-01",
  lastVerified: "2023-06-01"
};

export default performanceMonitorExample;
