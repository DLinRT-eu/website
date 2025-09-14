import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterState } from '@/types/filters';

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (filterType: keyof FilterState, value: string) => void;
  onClearAll: () => void;
  className?: string;
}

const ActiveFilterChips = ({ 
  filters, 
  onRemoveFilter, 
  onClearAll, 
  className = "" 
}: ActiveFilterChipsProps) => {
  const filterLabels = {
    tasks: 'Task',
    locations: 'Location', 
    certifications: 'Certification',
    modalities: 'Modality'
  };

  const allActiveFilters = Object.entries(filters).flatMap(([key, values]) =>
    values.map(value => ({
      type: key as keyof FilterState,
      value,
      label: filterLabels[key as keyof FilterState]
    }))
  );

  if (allActiveFilters.length === 0) return null;

  return (
    <div className={`bg-muted/30 rounded-lg p-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          Active filters:
        </span>
        
        {allActiveFilters.map(({ type, value, label }, index) => (
          <Badge
            key={`${type}-${value}-${index}`}
            variant="secondary"
            className="group flex items-center gap-1 pr-1 hover:bg-muted-foreground/10 transition-colors"
          >
            <span className="text-xs text-muted-foreground">{label}:</span>
            <span className="text-xs">{value}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFilter(type, value)}
              className="h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        {allActiveFilters.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="h-6 text-xs px-2 ml-2"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground mt-2">
        {allActiveFilters.length} filter{allActiveFilters.length !== 1 ? 's' : ''} applied
      </div>
    </div>
  );
};

export default ActiveFilterChips;