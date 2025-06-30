
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ProductDetails } from '@/types/productDetails';
import FilterBar from './filters/FilterBar';
import SortableHeader from './table/SortableHeader';
import ProductTableBody from './table/ProductTableBody';
import ExportButtons from './components/ExportButtons';
import { useRevisionTableState } from './hooks/useRevisionTableState';
import { transformToReviewProducts } from './utils/productTransformer';
import { TEAM_MEMBERS } from './types/reviewTypes';

interface RevisionTableProps {
  products: ProductDetails[];
  onAssignmentChange: (productId: string, assignee: string) => void;
  onCategoryFilter: (category: string | null) => void;
  onCompanyFilter: (company: string | null) => void;
  onUrgencyFilter: (urgency: string | null) => void;
  selectedCategory: string | null;
  selectedCompany: string | null;
  selectedUrgency: string | null;
}

const RevisionTable: React.FC<RevisionTableProps> = ({
  products,
  onAssignmentChange,
  onCategoryFilter,
  onCompanyFilter,
  onUrgencyFilter,
  selectedCategory,
  selectedCompany,
  selectedUrgency
}) => {
  const {
    sortField,
    sortDirection,
    searchQuery,
    assignments,
    categories,
    companies,
    sortedProducts,
    handleSort,
    handleAssign,
    handleSearchChange
  } = useRevisionTableState(products);

  // Handle assignment change with parent callback
  const handleAssignmentChange = (productId: string, assignee: string) => {
    handleAssign(productId, assignee);
    onAssignmentChange(productId, assignee);
  };

  // Transform products for export
  const reviewProducts = transformToReviewProducts(sortedProducts);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex flex-col gap-4">
          <FilterBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            categories={categories}
            companies={companies}
            selectedCategory={selectedCategory}
            selectedCompany={selectedCompany}
            selectedUrgency={selectedUrgency}
            onCategoryFilter={onCategoryFilter}
            onCompanyFilter={onCompanyFilter}
            onUrgencyFilter={onUrgencyFilter}
          />
          
          <ExportButtons 
            reviewProducts={reviewProducts}
            assignments={assignments}
            productCount={sortedProducts.length}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader 
                field="name"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
              >
                Product Name
              </SortableHeader>
              <SortableHeader 
                field="company"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
              >
                Company
              </SortableHeader>
              <SortableHeader 
                field="category"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
              >
                Category
              </SortableHeader>
              <SortableHeader 
                field="lastRevised"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
                className="whitespace-nowrap"
              >
                Last Revised
              </SortableHeader>
              <SortableHeader 
                field="days"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
                className="whitespace-nowrap"
              >
                Days Since
              </SortableHeader>
              <SortableHeader 
                field="assignee"
                sortField={sortField} 
                sortDirection={sortDirection}
                onSort={handleSort}
                className="text-right"
              >
                Assignee
              </SortableHeader>
            </TableRow>
          </TableHeader>
          <ProductTableBody 
            products={sortedProducts}
            assignments={assignments}
            teamMembers={TEAM_MEMBERS}
            onAssignmentChange={handleAssignmentChange}
          />
        </Table>
      </div>
      <div className="p-4 border-t text-sm text-muted-foreground">
        Showing {sortedProducts.length} of {products.length} products needing revision
      </div>
    </Card>
  );
};

export default RevisionTable;
