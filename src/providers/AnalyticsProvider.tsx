
import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import analyticsTracker from "@/services/analytics";

type AnalyticsContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    const path = location.pathname;
    const title = document.title;
    analyticsTracker.trackPageView(path, title);
    
    // Cleanup function - called when component unmounts or location changes
    return () => {
      analyticsTracker.endPageVisit();
    };
  }, [location]);

  // Custom event tracking
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    console.log(`Analytics Event: ${eventName}`, eventData);
    // In a real implementation, you would send this to a backend service
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
