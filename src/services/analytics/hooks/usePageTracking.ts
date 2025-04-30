
import { useEffect } from "react";
import analyticsTracker from "../AnalyticsTracker";
import { useCookieConsent } from "@/components/CookieConsent";

/**
 * React hook for automatic page tracking
 */
export const usePageTracking = () => {
  const { cookieConsent } = useCookieConsent();
  
  useEffect(() => {
    // Only track if analytics consent is given
    if (cookieConsent?.analytics) {
      const path = window.location.pathname;
      const title = document.title;
      analyticsTracker.trackPageView(path, title);
      
      // End tracking when component unmounts or page changes
      return () => {
        analyticsTracker.endPageVisit();
      };
    }
  }, [window.location.pathname, cookieConsent]);
  
  return analyticsTracker;
};
