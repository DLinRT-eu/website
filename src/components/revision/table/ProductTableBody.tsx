
import React from 'react';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision } from '@/utils/revisionUtils';
import ProductTableRow from './ProductTableRow';

interface ProductTableBodyProps {
  products: ProductDetails[];
  assignments: Record<string, string>;
  teamMembers: string[];
  onAssignmentChange: (productId: string, assignee: string) => void;
}

const ProductTableBody: React.FC<ProductTableBodyProps> = ({
  products,
  assignments,
  teamMembers,
  onAssignmentChange
}) => {
  return (
    <TableBody>
      {products.length > 0 ? (
        products.map((product) => {
          const daysSinceRevision = getDaysSinceRevision(product);
          const currentAssignee = assignments[product.id as string] || "Unassigned";
          
          return (
            <ProductTableRow 
              key={product.id}
              product={product}
              daysSinceRevision={daysSinceRevision}
              currentAssignee={currentAssignee}
              teamMembers={teamMembers}
              onAssignmentChange={onAssignmentChange}
            />
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
            No products found matching the current filters
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ProductTableBody;
