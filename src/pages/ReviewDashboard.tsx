import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@/data';
import { validateProduct } from '@/utils/productReviewHelper';
import { ProductDetails } from '@/types/productDetails';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Clock } from 'lucide-react';

const ReviewDashboard = () => {
  const navigate = useNavigate();
  const products = getProducts();

  // Process all products to get their review status
  const productsWithStatus = products.map(product => {
    const checks = validateProduct(product);
    const failures = checks.filter(c => c.status === 'fail').length;
    const warnings = checks.filter(c => c.status === 'warning').length;
    const lastReviewDate = product.lastVerified || product.lastUpdated || '';
    
    // Calculate days since last review
    const daysSinceReview = lastReviewDate ? 
      Math.floor((new Date().getTime() - new Date(lastReviewDate).getTime()) / (1000 * 60 * 60 * 24)) : 
      365; // Default to 365 if no review date

    return {
      ...product,
      status: failures > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok',
      daysSinceReview,
      issueCount: failures + warnings
    };
  });

  const columns: ColumnDef<ProductDetails & { status: string; daysSinceReview: number; issueCount: number; }>[] = [
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
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={
            status === 'critical' ? 'destructive' : 
            status === 'warning' ? 'warning' : 
            'success'
          }>
            {status === 'critical' ? (
              <Shield className="w-3 h-3 mr-1" />
            ) : status === 'warning' ? (
              <AlertTriangle className="w-3 h-3 mr-1" />
            ) : (
              <Clock className="w-3 h-3 mr-1" />
            )}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      }
    },
    {
      accessorKey: "issueCount",
      header: "Issues",
      cell: ({ row }) => row.original.issueCount
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

  // Calculate summary stats
  const criticalCount = productsWithStatus.filter(p => p.status === 'critical').length;
  const warningCount = productsWithStatus.filter(p => p.status === 'warning').length;
  const overdueCount = productsWithStatus.filter(p => p.daysSinceReview > 180).length;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Review Dashboard</h1>
        <div className="flex gap-2">
          <Badge variant="destructive" className="text-sm">
            {criticalCount} Critical
          </Badge>
          <Badge variant="warning" className="text-sm">
            {warningCount} Warnings
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {overdueCount} Overdue
          </Badge>
        </div>
      </div>

      {criticalCount > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Critical Issues Found</AlertTitle>
          <AlertDescription>
            {criticalCount} products have critical issues that require immediate review.
          </AlertDescription>
        </Alert>
      )}

      {overdueCount > 0 && (
        <Alert>
          <AlertTitle>Review Status</AlertTitle>
          <AlertDescription>
            {overdueCount} products haven't been reviewed in over 180 days.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products Requiring Review</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={productsWithStatus}
            defaultSort={[{ id: 'issueCount', desc: true }]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDashboard;
