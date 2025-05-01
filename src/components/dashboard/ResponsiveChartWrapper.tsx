
import React from 'react';
import { cn } from "@/lib/utils";
import { useChartResize } from "@/hooks/use-chart-resize";

interface ResponsiveChartWrapperProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
}

const ResponsiveChartWrapper: React.FC<ResponsiveChartWrapperProps> = ({ 
  children, 
  minHeight = "300px",
  className
}) => {
  const { containerRef, dimensions } = useChartResize();

  return (
    <div 
      ref={containerRef}
      className={cn("w-full", className)}
      style={{ minHeight }}
    >
      {dimensions.width > 0 && children}
    </div>
  );
};

export default ResponsiveChartWrapper;
