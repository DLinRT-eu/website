
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';
import { setCookieConsent, getCookieConsent, needsConsent } from '@/utils/cookieUtils';
import CookieSettings from './CookieSettings';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (needsConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent({ analytics: true });
    setShowBanner(false);
    // Reinitialize analytics with new consent
    import('@/services/analytics').then(module => {
      module.default.reinitialize();
    });
    // Reload to ensure all components are properly updated
    window.location.reload();
  };

  const handleRejectAll = () => {
    setCookieConsent({ analytics: false });
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = (accepted?: boolean) => {
    setShowSettings(false);
    if (accepted !== undefined) {
      setShowBanner(false);
      // Reinitialize analytics with new consent
      import('@/services/analytics').then(module => {
        module.default.reinitialize();
      });
      // Reload to ensure all components are properly updated
      window.location.reload();
    }
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl border-2 border-[#00A6D6]/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  We use cookies to improve your experience
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We use analytics cookies to understand how you use our website and improve your experience. 
                  These cookies help us track visitor statistics while respecting your privacy. 
                  You can choose which cookies to accept.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleAcceptAll}
                    className="bg-[#00A6D6] hover:bg-[#00A6D6]/90"
                  >
                    Accept All
                  </Button>
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                  >
                    Reject All
                  </Button>
                  <Button 
                    onClick={handleCustomize}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Customize
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleRejectAll}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showSettings && (
        <CookieSettings onClose={handleSettingsClose} />
      )}
    </>
  );
};

export default CookieConsent;
