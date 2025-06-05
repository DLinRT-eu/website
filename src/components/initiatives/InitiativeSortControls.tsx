
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type InitiativeSortOption = "name" | "organization" | "status";

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
          <SelectItem value="organization">Organization</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleDirection}
        title={ascending ? "Sort A-Z" : "Sort Z-A"}
        className="ml-1"
      >
        {ascending ? (
          <ArrowDownAZ className="h-4 w-4" />
        ) : (
          <ArrowDownZA className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InitiativeSortControls;
