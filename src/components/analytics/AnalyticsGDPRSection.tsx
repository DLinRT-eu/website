import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Trash2 } from 'lucide-react';

interface AnalyticsGDPRSectionProps {
  consent: any;
  loading: boolean;
  onClearData: () => void;
}

export const AnalyticsGDPRSection: React.FC<AnalyticsGDPRSectionProps> = ({
  consent,
  loading,
  onClearData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Privacy Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy & GDPR Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              This analytics data is stored securely in our database and uses cookies only with your explicit consent. 
              All visitor tracking is anonymous and privacy-focused.
            </p>
            <p>
              <strong>Data retention:</strong> Maximum 1 year<br/>
              <strong>Cookie consent:</strong> {consent?.analytics ? 'Granted' : 'Not granted'}<br/>
              <strong>Consent date:</strong> {consent?.timestamp ? new Date(consent.timestamp).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Your Data Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You have the right to delete your analytics data at any time. This action is irreversible.
          </p>
          <Button 
            onClick={onClearData}
            variant="outline"
            className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={loading}
          >
            <Trash2 className="h-4 w-4" />
            Clear All Analytics Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};