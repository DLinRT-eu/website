import React from 'react';
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Clock } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';

interface ReviewProduct extends ProductDetails {
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
}) => {
  const navigate = useNavigate();

  const columns: ColumnDef<ReviewProduct>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.company}</div>
        </div>
      )
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={
          row.original.status === 'critical' ? 'destructive' : 
          row.original.status === 'warning' ? 'warning' : 
          'success'
        }>
          {row.original.status === 'critical' ? (
            <Shield className="w-3 h-3 mr-1" />
          ) : row.original.status === 'warning' ? (
            <AlertTriangle className="w-3 h-3 mr-1" />
          ) : (
            <Clock className="w-3 h-3 mr-1" />
          )}
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      )
    },
    {
      accessorKey: "urgency",
      header: "Urgency",
      cell: ({ row }) => (
        <Badge variant={
          row.original.urgency === 'high' ? 'destructive' : 
          row.original.urgency === 'medium' ? 'warning' : 
          'success'
        }>
          {row.original.urgency.charAt(0).toUpperCase() + row.original.urgency.slice(1)}
        </Badge>
      )
    },
    {
      accessorKey: "issueCount",
      header: "Issues",
    },
    {
      accessorKey: "daysSinceReview",
      header: "Days Since Review",
      cell: ({ row }) => `${row.original.daysSinceReview} days`
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/review/${row.original.id}`)}
        >
          Review
        </Button>
      )
    }
  ];

  return (
    <DataTable 
      columns={columns} 
      data={products}
      defaultSort={defaultSort}
    />
  );
};
