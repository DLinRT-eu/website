import React from 'react';
import { Button } from "@/components/ui/button";

interface ReviewFiltersProps {
  selectedStatus: string | null;
  selectedUrgency: string | null;
  onFilterChange: (type: string, value: string | null) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  selectedStatus,
  selectedUrgency,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onFilterChange('status', null)}
          className={selectedStatus ? 'bg-accent' : ''}
        >
          All Statuses
        </Button>
        {['critical', 'warning', 'ok'].map(status => (
          <Button
            key={status}
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('status', status)}
            className={selectedStatus === status ? 'bg-accent' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onFilterChange('urgency', null)}
          className={selectedUrgency ? 'bg-accent' : ''}
        >
          All Urgencies
        </Button>
        {['high', 'medium', 'low', 'recent'].map(urgency => (
          <Button
            key={urgency}
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('urgency', urgency)}
            className={selectedUrgency === urgency ? 'bg-accent' : ''}
          >
            {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};
