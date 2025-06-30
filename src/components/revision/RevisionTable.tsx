
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision, getUrgencyLevel } from '@/utils/revisionUtils';
import { validateProduct } from '@/utils/productReviewHelper';
import { exportReviewToCSV, exportReviewToExcel } from '@/utils/reviewExport';
import { useToast } from "@/hooks/use-toast";
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

interface ReviewProduct {
  id: string;
  name: string;
  company: string;
  category: string;
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  issueCount: number;
  lastRevised?: string;
}

const TEAM_MEMBERS = [
  "Unassigned",
  "Alice",
  "Bob",
  "Carol",
  "David",
  "Eva",
  "Mustafa Kadhim"
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
  const { toast } = useToast();
  const [sortField, setSortField] = useState<string>('days');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  // Transform ProductDetails to ReviewProduct for export
  const transformToReviewProducts = (products: ProductDetails[]): ReviewProduct[] => {
    return products.map(product => {
      const checks = validateProduct(product);
      const failures = checks.filter(c => c.status === 'fail').length;
      const warnings = checks.filter(c => c.status === 'warning').length;
      const daysSinceReview = getDaysSinceRevision(product);
      const urgencyLevel = getUrgencyLevel(product);

      return {
        id: product.id || '',
        name: product.name,
        company: product.company,
        category: product.category,
        status: failures > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok',
        urgency: urgencyLevel,
        daysSinceReview,
        issueCount: failures + warnings,
        lastRevised: product.lastRevised
      } as ReviewProduct;
    });
  };

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

  // Handle export functions
  const handleExportCSV = () => {
    try {
      const reviewProducts = transformToReviewProducts(sortedProducts);
      exportReviewToCSV(reviewProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${sortedProducts.length} products to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to CSV format",
        variant: "destructive",
      });
    }
  };

  const handleExportExcel = () => {
    try {
      const reviewProducts = transformToReviewProducts(sortedProducts);
      exportReviewToExcel(reviewProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${sortedProducts.length} products to Excel`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to Excel format",
        variant: "destructive",
      });
    }
  };

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
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
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
