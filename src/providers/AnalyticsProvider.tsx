
import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Analytics services removed - provider preserved for cookie consent compatibility

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

  // Analytics tracking disabled - preserving provider for cookie consent compatibility

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
