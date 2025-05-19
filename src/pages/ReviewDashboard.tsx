import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@/data';
import { validateProduct } from '@/utils/productReviewHelper';
import { calculateRevisionStats, getUrgencyLevel, getDaysSinceRevision } from '@/utils/revisionUtils';
import { ProductDetails } from '@/types/productDetails';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import RevisionSummaryCards from '@/components/revision/RevisionSummaryCards';
import RevisionChart from '@/components/revision/RevisionChart';
import { ReviewProductsTable } from '@/components/revision/ReviewProductsTable';
import { ReviewFilters } from '@/components/revision/ReviewFilters';

interface ReviewProduct extends ProductDetails {
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  issueCount: number;
}

const ReviewDashboard = () => {
  const { toast } = useToast();
  const products = getProducts();
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);

  // Calculate revision stats
  const { 
    productsNeedingRevision, 
    revisionPercentage, 
    averageDaysSinceRevision,
    revisionAgeGroups 
  } = calculateRevisionStats(products);

  // Process products to get their review status
  const productsWithStatus = products.map(product => {
    const checks = validateProduct(product);
    const failures = checks.filter(c => c.status === 'fail').length;
    const warnings = checks.filter(c => c.status === 'warning').length;
    const daysSinceReview = getDaysSinceRevision(product);
    const urgencyLevel = getUrgencyLevel(product);

    return {
      ...product,
      status: failures > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok',
      urgency: urgencyLevel,
      daysSinceReview,
      issueCount: failures + warnings
    } as ReviewProduct;
  });

  // Filter products based on selected filters
  const filteredProducts = productsWithStatus.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedCompany && product.company !== selectedCompany) return false;
    if (selectedStatus && product.status !== selectedStatus) return false;
    if (selectedUrgency && product.urgency !== selectedUrgency) return false;
    return true;
  });

  // Calculate summary stats
  const criticalCount = filteredProducts.filter(p => p.status === 'critical').length;
  const warningCount = filteredProducts.filter(p => p.status === 'warning').length;
  const overdueCount = filteredProducts.filter(p => p.urgency === 'high').length;

  // Handle filter changes
  const handleFilterChange = (type: string, value: string | null) => {
    switch(type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'company':
        setSelectedCompany(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
      case 'urgency':
        setSelectedUrgency(value);
        break;
    }

    toast({
      description: value ? 
        `Filtering by ${type}: ${value}` :
        `Filter reset for ${type}`,
    });
  };

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

      <RevisionSummaryCards
        totalProducts={products.length}
        productsNeedingRevision={productsNeedingRevision.length}
        revisionPercentage={revisionPercentage}
        averageDaysSinceRevision={averageDaysSinceRevision}
      />

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
          <AlertTitle>Review Status</AlertTitle>          <AlertDescription>
            {overdueCount} products are overdue for review ({'>'}12 months).
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Product List</TabsTrigger>
          <TabsTrigger value="chart">Revision Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Products Requiring Review</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewFilters
                selectedStatus={selectedStatus}
                selectedUrgency={selectedUrgency}
                onFilterChange={handleFilterChange}
              />
              <ReviewProductsTable 
                products={filteredProducts}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart">
          <Card>
            <CardContent className="pt-6">
              <RevisionChart revisionAgeGroups={revisionAgeGroups} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewDashboard;
