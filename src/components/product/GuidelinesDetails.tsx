
import React from 'react';
import { ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import type { ProductDetails } from '@/types/productDetails';

interface GuidelinesDetailsProps {
  product: ProductDetails;
}

const GuidelinesDetails: React.FC<GuidelinesDetailsProps> = ({ product }) => {
  if (!product.guidelines || product.guidelines.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Guidelines Compliance</h3>
        <p className="text-gray-500">No guidelines information available.</p>
      </div>
    );
  }

  const getComplianceIcon = (compliance?: string) => {
    switch (compliance) {
      case 'full':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'planned':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getComplianceColor = (compliance?: string) => {
    switch (compliance) {
      case 'full':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Guidelines Compliance</h3>
      <div className="space-y-4">
        {product.guidelines.map((guideline, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{guideline.name}</h4>
                {guideline.version && (
                  <p className="text-sm text-gray-600">Version: {guideline.version}</p>
                )}
              </div>
              {guideline.compliance && (
                <Badge className={`ml-2 ${getComplianceColor(guideline.compliance)}`}>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(guideline.compliance)}
                    <span className="capitalize">{guideline.compliance}</span>
                  </div>
                </Badge>
              )}
            </div>
            
            {guideline.reference && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>Reference:</strong> {guideline.reference}
              </p>
            )}
            
            {guideline.url && (
              <a
                href={guideline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Guideline
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidelinesDetails;
