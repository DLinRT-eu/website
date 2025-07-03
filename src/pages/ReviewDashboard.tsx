
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exportReviewToCSV, exportReviewToExcel } from '@/utils/reviewExport';
import { useToast } from "@/hooks/use-toast";
import RevisionSummaryCards from '@/components/revision/RevisionSummaryCards';
import RevisionChart from '@/components/revision/RevisionChart';
import { ReviewProductsTable } from '@/components/revision/ReviewProductsTable';
import { ReviewFilters } from '@/components/revision/ReviewFilters';
import { ReviewDashboardHeader } from '@/components/dashboard/ReviewDashboardHeader';
import { ReviewDashboardAlerts } from '@/components/dashboard/ReviewDashboardAlerts';
import { useReviewData } from '@/hooks/useReviewData';
import { ALL_PRODUCTS } from '@/data';

const ReviewDashboard = () => {
  const { toast } = useToast();
  const {
    filteredProducts,
    revisionStats,
    summaryStats,
    assignments,
    selectedCategory,
    selectedCompany,
    selectedStatus,
    selectedUrgency,
    setSelectedCategory,
    setSelectedCompany,
    setSelectedStatus,
    setSelectedUrgency
  } = useReviewData();

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

  // Handle export functions
  const handleExportCSV = () => {
    try {
      exportReviewToCSV(filteredProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${filteredProducts.length} products to CSV`,
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
      exportReviewToExcel(filteredProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${filteredProducts.length} products to Excel`,
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
    <div className="container mx-auto py-8 space-y-6">
      <ReviewDashboardHeader
        criticalCount={summaryStats.criticalCount}
        warningCount={summaryStats.warningCount}
        overdueCount={summaryStats.overdueCount}
        onExportCSV={handleExportCSV}
        onExportExcel={handleExportExcel}
      />

      <RevisionSummaryCards
        totalProducts={ALL_PRODUCTS.length}
        productsNeedingRevision={revisionStats.productsNeedingRevision.length}
        revisionPercentage={revisionStats.revisionPercentage}
        averageDaysSinceRevision={revisionStats.averageDaysSinceRevision}
      />

      <ReviewDashboardAlerts
        criticalCount={summaryStats.criticalCount}
        overdueCount={summaryStats.overdueCount}
      />

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
              <RevisionChart revisionAgeGroups={revisionStats.revisionAgeGroups} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewDashboard;
