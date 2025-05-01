
import * as React from "react";
import { useIsMobile } from "./use-mobile";
import debounce from "lodash/debounce";

export function useChartResize() {
  const [dimensions, setDimensions] = React.useState({ 
    width: 0, 
    height: 0 
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 250);

    // Initial measurement
    updateDimensions();
    
    // Add resize listener
    window.addEventListener("resize", debouncedUpdateDimensions);
    
    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
    };
  }, []);

  return { containerRef, dimensions, isMobile };
}
