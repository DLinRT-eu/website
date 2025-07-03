import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface AnalyticsStatusCardProps {
  trackingEnabled: boolean;
}

export const AnalyticsStatusCard: React.FC<AnalyticsStatusCardProps> = ({ trackingEnabled }) => {
  if (trackingEnabled) return null;

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-yellow-800">
          <Shield className="h-5 w-5" />
          <p className="text-sm">
            Analytics tracking is currently disabled. To see new data, please accept analytics cookies in your cookie preferences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};