
import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import analyticsTracker from "@/services/analytics";
import { migrateAnalyticsData } from "@/services/analytics/storageUtils";

type AnalyticsContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let location;
  
  // Safely get location - only if we're in a Router context
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation fails, we're not in a Router context
    console.warn('AnalyticsProvider not in Router context:', error);
    location = null;
  }

  // Initialize analytics and run migration once
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await migrateAnalyticsData();
      } catch (error) {
        console.warn('Analytics migration failed:', error);
      }
    };
    
    initializeAnalytics();
  }, []);

  // Track page views - only if location is available
  useEffect(() => {
    if (!location) return;
    
    const trackPageView = async () => {
      const path = location.pathname;
      const title = document.title;
      
      try {
        await analyticsTracker.trackPageView(path, title);
      } catch (error) {
        console.warn('Failed to track page view:', error);
      }
    };

    trackPageView();
    
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
