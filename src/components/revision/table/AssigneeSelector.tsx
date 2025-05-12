
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssigneeSelectorProps {
  productId: string;
  currentAssignee: string;
  teamMembers: string[];
  onAssignmentChange: (productId: string, assignee: string) => void;
}

const AssigneeSelector: React.FC<AssigneeSelectorProps> = ({
  productId,
  currentAssignee,
  teamMembers,
  onAssignmentChange
}) => {
  return (
    <Select
      value={currentAssignee}
      onValueChange={(value) => onAssignmentChange(productId, value)}
    >
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue placeholder="Unassigned" />
      </SelectTrigger>
      <SelectContent>
        {teamMembers.map((member) => (
          <SelectItem key={member} value={member}>
            {member}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelector;
