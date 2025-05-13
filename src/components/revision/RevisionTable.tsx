
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision } from '@/utils/revisionUtils';
import FilterBar from './filters/FilterBar';
import SortableHeader from './table/SortableHeader';
import ProductTableBody from './table/ProductTableBody';

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

const TEAM_MEMBERS = [
  "Unassigned",
  "Alice",
  "Bob",
  "Carol",
  "David",
  "Eva"
];

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
  const [sortField, setSortField] = useState<string>('days');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  // Get unique categories and companies
  const categories = Array.from(new Set(products.map(p => p.category)));
  const companies = Array.from(new Set(products.map(p => p.company)));

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch(sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'days':
        comparison = getDaysSinceRevision(a) - getDaysSinceRevision(b);
        break;
      default:
        comparison = getDaysSinceRevision(a) - getDaysSinceRevision(b);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle assignment change
  const handleAssign = (productId: string, assignee: string) => {
    setAssignments({ ...assignments, [productId]: assignee });
    onAssignmentChange(productId, assignee);
  };

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
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
            onAssignmentChange={handleAssign}
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
