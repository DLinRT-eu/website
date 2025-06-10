
import { ArrowDownAZ, ArrowDownZA, Shuffle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type InitiativeSortOption = "random" | "name" | "organization" | "status" | "startDate";

interface InitiativeSortControlsProps {
  onSortChange: (option: InitiativeSortOption) => void;
  onDirectionChange: (ascending: boolean) => void;
  sortBy: InitiativeSortOption;
  ascending: boolean;
}

const InitiativeSortControls = ({
  onSortChange,
  onDirectionChange,
  sortBy,
  ascending
}: InitiativeSortControlsProps) => {
  const handleSortChange = (value: string) => {
    onSortChange(value as InitiativeSortOption);
  };

  const toggleDirection = () => {
    onDirectionChange(!ascending);
  };

  const isDirectionDisabled = sortBy === "random";

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
          <SelectItem value="random">Random</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="organization">Organization</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="startDate">Start Date</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleDirection}
        disabled={isDirectionDisabled}
        title={isDirectionDisabled ? "Direction not applicable for random sort" : ascending ? "Sort A-Z / Oldest first" : "Sort Z-A / Newest first"}
        className="ml-1"
      >
        {sortBy === "random" ? (
          <Shuffle className="h-4 w-4" />
        ) : ascending ? (
          <ArrowDownAZ className="h-4 w-4" />
        ) : (
          <ArrowDownZA className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InitiativeSortControls;
