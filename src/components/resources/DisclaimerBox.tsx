import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBox = () => {
  return (
    <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        <strong className="font-semibold">Important Disclaimer:</strong> DLinRT.eu is an informational resource. 
        The platform does not constitute medical advice, nor does it certify the regulatory status of listed products. 
        It is the sole responsibility of manufacturers to comply with all applicable regulations. Always verify the 
        regulatory status (e.g., CE marking) directly with the manufacturer.
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBox;