
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type CookiePreferences = {
  analytics: boolean;
  necessary: boolean;
};

export const useCookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      setCookieConsent(JSON.parse(savedConsent));
    }
  }, []);

  const updateCookieConsent = (preferences: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setCookieConsent(preferences);
  };

  return { cookieConsent, updateCookieConsent };
};

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const { cookieConsent, updateCookieConsent } = useCookieConsent();

  // Check if consent has been given
  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    updateCookieConsent({ necessary: true, analytics: true });
    setOpen(false);
  };

  const handleAcceptNecessary = () => {
    updateCookieConsent({ necessary: true, analytics: false });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Cookie Consent</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            <p className="mb-4">
              This website uses cookies to improve your experience and for analytics purposes. By using our website, you consent to all cookies in accordance with our Cookie Policy.
            </p>
            <p className="mb-4">
              - Necessary cookies: Essential for the website to function properly.<br />
              - Analytics cookies: Help us understand how you interact with our website.
            </p>
            <p>
              You can change your preferences at any time by clicking "Cookie Settings" at the bottom of the page.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleAcceptNecessary}>
            Accept Necessary
          </Button>
          <AlertDialogAction onClick={handleAcceptAll}>
            Accept All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CookieConsent;
