import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CountingModeToggleProps {
  countingMode: 'models' | 'products';
  onToggle: (mode: 'models' | 'products') => void;
}

export const CountingModeToggle: React.FC<CountingModeToggleProps> = ({ 
  countingMode, 
  onToggle 
}) => {
  return (
    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm">
      <div className="flex items-center space-x-2">
        <Label htmlFor="counting-mode" className="text-sm font-medium">
          Count Products
        </Label>
        <Switch
          id="counting-mode"
          checked={countingMode === 'models'}
          onCheckedChange={(checked) => onToggle(checked ? 'models' : 'products')}
          className="data-[state=checked]:bg-primary"
        />
        <Label htmlFor="counting-mode" className="text-sm font-medium">
          Count Models
        </Label>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-2">
              <p className="font-semibold">Products vs Models:</p>
              <p className="text-xs">
                <strong>Products:</strong> Each software product is counted once, regardless of supported modalities.
              </p>
              <p className="text-xs">
                <strong>Models:</strong> For auto-contouring, each supported modality (CT, MRI, CBCT) represents a separate AI model. 
                One product supporting 3 modalities = 3 models.
              </p>
              <p className="text-xs text-amber-600">
                <strong>Note:</strong> Totals may differ between charts due to filtering - some products/models may support multiple categories or locations.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};