
import React from 'react';
import { cn } from "@/lib/utils";
import { useChartResize } from "@/hooks/use-chart-resize";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileChartEnhancer from "@/components/charts/MobileChartEnhancer";

interface ResponsiveChartWrapperProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
  title?: string;
  description?: string;
  exportHandler?: () => void;
}

const ResponsiveChartWrapper: React.FC<ResponsiveChartWrapperProps> = ({ 
  children, 
  minHeight = "300px",
  className,
  title,
  description,
  exportHandler
}) => {
  const { containerRef, dimensions } = useChartResize();
  const isMobile = useIsMobile();

  const chartContent = (
    <div 
      ref={containerRef}
      className={cn("w-full", className)}
      style={{ minHeight }}
    >
      {dimensions.width > 0 && children}
    </div>
  );

  if (isMobile) {
    return (
      <MobileChartEnhancer
        title={title}
        description={description}
        exportHandler={exportHandler}
        className={className}
      >
        {chartContent}
      </MobileChartEnhancer>
    );
  }

  return chartContent;
};

export default ResponsiveChartWrapper;
