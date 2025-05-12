
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductDetails } from '@/types/productDetails';
import { getUrgencyLevel } from '@/utils/revisionUtils';
import AssigneeSelector from './AssigneeSelector';

interface ProductTableRowProps {
  product: ProductDetails;
  daysSinceRevision: number;
  currentAssignee: string;
  teamMembers: string[];
  onAssignmentChange: (productId: string, assignee: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  daysSinceRevision,
  currentAssignee,
  teamMembers,
  onAssignmentChange
}) => {
  // Get urgency style
  const getUrgencyStyle = (product: ProductDetails) => {
    const urgency = getUrgencyLevel(product);
    
    switch(urgency) {
      case 'high':
        return 'text-red-600 font-semibold';
      case 'medium':
        return 'text-orange-500';
      default:
        return 'text-yellow-500';
    }
  };

  const lastRevised = product.lastRevised || "2000-01-01";
  
  return (
    <TableRow>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.company}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{lastRevised}</TableCell>
      <TableCell className={getUrgencyStyle(product)}>
        {daysSinceRevision} days
      </TableCell>
      <TableCell className="text-right">
        <AssigneeSelector 
          productId={product.id as string}
          currentAssignee={currentAssignee}
          teamMembers={teamMembers}
          onAssignmentChange={onAssignmentChange}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
