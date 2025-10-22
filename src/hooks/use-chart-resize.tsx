
import * as React from "react";
import { useIsMobile } from "./use-mobile";

export function useChartResize() {
  const [dimensions, setDimensions] = React.useState({ 
    width: 0, 
    height: 0 
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    if (!containerRef.current) return;

    // Use ResizeObserver to avoid forced reflows
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { containerRef, dimensions, isMobile };
}
