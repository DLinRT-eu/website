
import { useEffect } from "react";
import analyticsTracker from "../AnalyticsTracker";

/**
 * React hook for automatic page tracking
 */
export const usePageTracking = () => {
  useEffect(() => {
    const path = window.location.pathname;
    const title = document.title;
    analyticsTracker.trackPageView(path, title);
    
    // End tracking when component unmounts or page changes
    return () => {
      analyticsTracker.endPageVisit();
    };
  }, [window.location.pathname]);
  
  return analyticsTracker;
};
