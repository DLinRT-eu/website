
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ProductDetails } from '@/types/productDetails';
import { getDaysSinceRevision, getUrgencyLevel } from '@/utils/revisionUtils';
import { ArrowDown, ArrowUp, Filter, Search } from 'lucide-react';

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
  "Alice Johnson",
  "Bob Smith",
  "Carol Martinez",
  "David Wilson",
  "Eva Thompson"
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

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Category</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => onCategoryFilter(null)}
                  className={selectedCategory === null ? "bg-accent" : ""}
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => onCategoryFilter(category)}
                    className={selectedCategory === category ? "bg-accent" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Company</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => onCompanyFilter(null)}
                  className={selectedCompany === null ? "bg-accent" : ""}
                >
                  All Companies
                </DropdownMenuItem>
                {companies.map((company) => (
                  <DropdownMenuItem 
                    key={company} 
                    onClick={() => onCompanyFilter(company)}
                    className={selectedCompany === company ? "bg-accent" : ""}
                  >
                    {company}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Urgency</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => onUrgencyFilter(null)}
                  className={selectedUrgency === null ? "bg-accent" : ""}
                >
                  All Levels
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onUrgencyFilter('low')}
                  className={selectedUrgency === 'low' ? "bg-accent" : ""}
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  Low (6-12 months)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onUrgencyFilter('medium')}
                  className={selectedUrgency === 'medium' ? "bg-accent" : ""}
                >
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  Medium (6-12 months)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onUrgencyFilter('high')}
                  className={selectedUrgency === 'high' ? "bg-accent" : ""}
                >
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                  High ({`>`}12 months)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Product Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? 
                  <ArrowUp className="inline ml-1 h-3 w-3" /> : 
                  <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('company')}
              >
                Company
                {sortField === 'company' && (
                  sortDirection === 'asc' ? 
                  <ArrowUp className="inline ml-1 h-3 w-3" /> : 
                  <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('category')}
              >
                Category
                {sortField === 'category' && (
                  sortDirection === 'asc' ? 
                  <ArrowUp className="inline ml-1 h-3 w-3" /> : 
                  <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead className="whitespace-nowrap">Last Revised</TableHead>
              <TableHead 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => handleSort('days')}
              >
                Days Since
                {sortField === 'days' && (
                  sortDirection === 'asc' ? 
                  <ArrowUp className="inline ml-1 h-3 w-3" /> : 
                  <ArrowDown className="inline ml-1 h-3 w-3" />
                )}
              </TableHead>
              <TableHead className="text-right">Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => {
                const daysSinceRevision = getDaysSinceRevision(product);
                const lastRevised = product.lastRevised || "2000-01-01";
                
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.company}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{lastRevised}</TableCell>
                    <TableCell className={getUrgencyStyle(product)}>
                      {daysSinceRevision} days
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        value={assignments[product.id as string] || "Unassigned"}
                        onValueChange={(value) => handleAssign(product.id as string, value)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                          {TEAM_MEMBERS.map((member) => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
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
        </Table>
      </div>
      <div className="p-4 border-t text-sm text-muted-foreground">
        Showing {sortedProducts.length} of {products.length} products needing revision
      </div>
    </Card>
  );
};

export default RevisionTable;
