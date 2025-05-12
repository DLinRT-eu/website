
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SortableHeaderProps {
  field: string;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  children: React.ReactNode;
  className?: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  sortField,
  sortDirection,
  onSort,
  children,
  className
}) => {
  return (
    <TableHead 
      className={`cursor-pointer ${className || ''}`}
      onClick={() => onSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? 
        <ArrowUp className="inline ml-1 h-3 w-3" /> : 
        <ArrowDown className="inline ml-1 h-3 w-3" />
      )}
    </TableHead>
  );
};

export default SortableHeader;
