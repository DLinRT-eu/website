
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { setCookieConsent, getCookieConsent } from '@/utils/cookieUtils';

interface CookieSettingsProps {
  onClose: (accepted?: boolean) => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ onClose }) => {
  const existingConsent = getCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(existingConsent?.analytics ?? false);

  const handleSave = () => {
    setCookieConsent({ analytics: analyticsEnabled });
    onClose(true);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl" aria-describedby="cookie-settings-description">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <div id="cookie-settings-description" className="sr-only">
            Manage your cookie preferences and privacy settings
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
              <p className="text-sm text-gray-600 mb-2">
                These cookies are necessary for the website to function and cannot be disabled.
              </p>
              <div className="flex items-center justify-between">
                <Label htmlFor="essential" className="text-sm">Website functionality</Label>
                <Switch id="essential" checked={true} disabled />
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
              <p className="text-sm text-gray-600 mb-2">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously. We use this data to improve the user experience.
              </p>
              <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 mb-3">
                <strong>Data collected:</strong> Page views, visitor counts, session duration, popular pages.<br/>
                <strong>Retention:</strong> 2 years maximum.<br/>
                <strong>Third parties:</strong> None - all data stays on your device or our servers.
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="text-sm">Website analytics</Label>
                <Switch 
                  id="analytics" 
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p className="mb-2">
              <strong>Your Rights:</strong> You can change these preferences at any time by clicking 
              "Cookie Settings" in the website footer. You can also request deletion of your data 
              by contacting us.
            </p>
            <p>
              This website is GDPR compliant and respects your privacy choices.
            </p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#00A6D6] hover:bg-[#00A6D6]/90">
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
