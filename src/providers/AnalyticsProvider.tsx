
import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "@/components/CookieConsent";
import analyticsService from "@/services/AnalyticsService";

type AnalyticsContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { cookieConsent } = useCookieConsent();

  // Track page views
  useEffect(() => {
    if (cookieConsent?.analytics) {
      const path = location.pathname;
      const title = document.title;
      analyticsService.trackPageView(path, title);
      
      // Cleanup function - called when component unmounts or location changes
      return () => {
        analyticsService.endPageVisit();
      };
    }
  }, [location, cookieConsent]);

  // Custom event tracking
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    // Only track if analytics consent is given
    if (cookieConsent?.analytics) {
      console.log(`Analytics Event: ${eventName}`, eventData);
      // In a real implementation, you would send this to a backend service
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
