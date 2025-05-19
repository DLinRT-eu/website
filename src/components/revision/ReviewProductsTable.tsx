import React from 'react';
import { Button } from "@/components/ui/button";
import { SimpleTable, Column } from "@/components/ui/simple-table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReviewProduct {
  id: string;
  name: string;
  company: string;
  category: string;
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  issueCount: number;
}

interface ReviewProductsTableProps {
  products: ReviewProduct[];
  defaultSort?: { id: string; desc: boolean; }[];
}

export const ReviewProductsTable: React.FC<ReviewProductsTableProps> = ({
  products,
  defaultSort = [{ id: 'issueCount', desc: true }]
}) => {  const navigate = useNavigate();

  const columns: Column<ReviewProduct>[] = [
    {
      id: "name",
      header: "Product",
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      cell: (row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-muted-foreground">{row.company}</div>
        </div>
      )
    },
    {
      id: "category",
      header: "Category",
      sortable: true,
      sortFn: (a, b) => a.category.localeCompare(b.category),
      cell: (row) => row.category
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      cell: (row) => (
        <Badge variant={
          row.status === 'critical' ? 'destructive' : 
          row.status === 'warning' ? 'warning' : 
          'success'
        }>
          {row.status === 'critical' ? (
            <Shield className="w-3 h-3 mr-1" />
          ) : row.status === 'warning' ? (
            <AlertTriangle className="w-3 h-3 mr-1" />
          ) : (
            <Clock className="w-3 h-3 mr-1" />
          )}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      )
    },
    {
      id: "urgency",
      header: "Urgency",
      sortable: true,
      sortFn: (a, b) => a.urgency.localeCompare(b.urgency),
      cell: (row) => (
        <Badge variant={
          row.urgency === 'high' ? 'destructive' : 
          row.urgency === 'medium' ? 'warning' : 
          'success'
        }>
          {row.urgency.charAt(0).toUpperCase() + row.urgency.slice(1)}
        </Badge>
      )
    },
    {
      id: "issueCount",
      header: "Issues",
      sortable: true,
      sortFn: (a, b) => a.issueCount - b.issueCount,
      cell: (row) => row.issueCount
    },
    {
      id: "daysSinceReview",
      header: "Days Since Review",
      sortable: true,
      sortFn: (a, b) => a.daysSinceReview - b.daysSinceReview,
      cell: (row) => `${row.daysSinceReview} days`
    },
    {
      id: "actions",
      header: "",
      cell: (row) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/review/${row.id}`)}
        >
          Review
        </Button>
      )
    }
  ];

  return (
    <SimpleTable 
      columns={columns} 
      data={products}
      defaultSort={defaultSort?.[0]}
    />
  );
};
