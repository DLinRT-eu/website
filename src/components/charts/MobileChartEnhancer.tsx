import React, { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download,
  Maximize2,
  Minimize2,
  Move,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MobileChartEnhancerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  exportHandler?: () => void;
  className?: string;
}

const MobileChartEnhancer: React.FC<MobileChartEnhancerProps> = ({
  children,
  title,
  description,
  exportHandler,
  className = ""
}) => {
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [lastTap, setLastTap] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Double tap to zoom functionality
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
      handleZoomToggle();
    }
    
    setLastTap(currentTime);
  };

  // Pinch to zoom (basic implementation)
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    let initialDistance = 0;
    let initialZoom = zoomLevel;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        initialZoom = zoomLevel;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        
        const scale = currentDistance / initialDistance;
        const newZoom = Math.max(0.5, Math.min(3, initialZoom * scale));
        setZoomLevel(newZoom);
      }
    };

    const element = containerRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, zoomLevel]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.5, prev - 0.25));
  const handleZoomReset = () => setZoomLevel(1);
  const handleZoomToggle = () => setZoomLevel(prev => prev === 1 ? 1.5 : 1);
  const handleFullscreenToggle = () => setIsFullscreen(prev => !prev);

  // Auto-hide controls after inactivity on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimeout();
    const element = containerRef.current;
    if (element) {
      element.addEventListener('touchstart', resetTimeout);
      element.addEventListener('touchmove', resetTimeout);
    }

    return () => {
      clearTimeout(timeout);
      if (element) {
        element.removeEventListener('touchstart', resetTimeout);
        element.removeEventListener('touchmove', resetTimeout);
      }
    };
  }, [isMobile]);

  if (!isMobile) {
    // On desktop, just return the children with minimal wrapper
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''} ${className}`}
    >
      <Card className={`${isFullscreen ? 'h-full border-0 shadow-none' : ''}`}>
        {title && (
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{title}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
              </div>
              <Badge variant="outline" className="ml-2 text-xs">
                Mobile Enhanced
              </Badge>
            </div>
          </CardHeader>
        )}
        
        <CardContent className={`relative overflow-hidden ${isFullscreen ? 'h-full pb-16' : 'p-2'}`}>
          {/* Mobile Controls */}
          <div 
            className={`absolute top-2 right-2 z-10 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="flex flex-wrap gap-1 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-1 shadow-lg">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomIn}
                      className="h-8 w-8 p-0 touch-target-minimum"
                      disabled={zoomLevel >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom in</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomOut}
                      className="h-8 w-8 p-0 touch-target-minimum"
                      disabled={zoomLevel <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom out</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomReset}
                      className="h-8 w-8 p-0 touch-target-minimum"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset zoom</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFullscreenToggle}
                      className="h-8 w-8 p-0 touch-target-minimum"
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}</p>
                  </TooltipContent>
                </Tooltip>
                
                {exportHandler && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={exportHandler}
                        className="h-8 w-8 p-0 touch-target-minimum"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export chart</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </div>

          {/* Chart Container */}
          <div 
            ref={containerRef}
            className="h-full w-full overflow-hidden touch-pan-x touch-pan-y"
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out'
            }}
          >
            {children}
          </div>

          {/* Zoom Level Indicator */}
          {zoomLevel !== 1 && (
            <div className="absolute bottom-2 left-2 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs text-muted-foreground">
              {Math.round(zoomLevel * 100)}%
            </div>
          )}

          {/* Mobile Instructions */}
          {showControls && (
            <div className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-2 max-w-48">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">Double tap to zoom</p>
                  <p>Pinch to zoom in/out</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileChartEnhancer;