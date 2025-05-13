
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface UrgencyFilterProps {
  selectedUrgency: string | null;
  onUrgencyFilter: (urgency: string | null) => void;
}

const UrgencyFilter: React.FC<UrgencyFilterProps> = ({ 
  selectedUrgency, 
  onUrgencyFilter 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Urgency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onUrgencyFilter(null)}
          className={selectedUrgency === null ? "bg-accent" : ""}
        >
          All Levels
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onUrgencyFilter('recent')}
          className={selectedUrgency === 'recent' ? "bg-accent" : ""}
        >
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          Recent (0-3 months)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onUrgencyFilter('low')}
          className={selectedUrgency === 'low' ? "bg-accent" : ""}
        >
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          Low (3-6 months)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onUrgencyFilter('medium')}
          className={selectedUrgency === 'medium' ? "bg-accent" : ""}
        >
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
          Medium (6-12 months)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onUrgencyFilter('high')}
          className={selectedUrgency === 'high' ? "bg-accent" : ""}
        >
          <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
          High ({`>`}12 months)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UrgencyFilter;
