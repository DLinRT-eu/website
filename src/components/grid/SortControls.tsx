
import { useState } from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type SortOption = "name" | "releaseDate" | "lastUpdated";

interface SortControlsProps {
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (ascending: boolean) => void;
  sortBy: SortOption;
  ascending: boolean;
}

const SortControls = ({
  onSortChange,
  onDirectionChange,
  sortBy,
  ascending
}: SortControlsProps) => {
  const handleSortChange = (value: string) => {
    onSortChange(value as SortOption);
  };

  const toggleDirection = () => {
    onDirectionChange(!ascending);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Sort by:</span>
      <Select
        value={sortBy}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="releaseDate">Release Date</SelectItem>
          <SelectItem value="lastUpdated">Last Updated</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleDirection}
        title={ascending ? "Ascending" : "Descending"}
        className="ml-1"
      >
        {ascending ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowDownZA className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SortControls;
