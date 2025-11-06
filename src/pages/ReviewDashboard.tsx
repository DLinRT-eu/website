
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, UserCheck } from "lucide-react";
import { exportReviewToCSV, exportReviewToExcel } from '@/utils/reviewExport';
import { useToast } from "@/hooks/use-toast";
import RevisionSummaryCards from '@/components/revision/RevisionSummaryCards';
import RevisionChart from '@/components/revision/RevisionChart';
import { ReviewProductsTable } from '@/components/revision/ReviewProductsTable';
import { ReviewFilters } from '@/components/revision/ReviewFilters';
import { ReviewDashboardHeader } from '@/components/dashboard/ReviewDashboardHeader';
import { ReviewDashboardAlerts } from '@/components/dashboard/ReviewDashboardAlerts';
import { QuickAssignDialog } from '@/components/revision/QuickAssignDialog';
import { useReviewData } from '@/hooks/useReviewData';
import { useAuth } from '@/contexts/AuthContext';
import { ALL_PRODUCTS } from '@/data';
import { runUrlValidation } from '@/utils/urlValidation';

import SEO from '@/components/SEO';

const ReviewDashboard = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
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

  // Quick assignment state
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showQuickAssign, setShowQuickAssign] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Product Review Dashboard - Quality Control & Maintenance",
    "description": "Internal dashboard for tracking product information quality, review status, and maintenance tasks for the Deep Learning in Radiotherapy database.",
    "url": "https://dlinrt.eu/review"
  };

  // Run URL validation on mount (logs a report to console)
  React.useEffect(() => {
    runUrlValidation(ALL_PRODUCTS);
  }, []);

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

  // Handle product selection for quick assign
  const handleProductSelect = (productId: string, checked: boolean) => {
    setSelectedProductIds(prev =>
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedProductIds(checked ? filteredProducts.map(p => p.id as string) : []);
  };

  const handleQuickAssign = () => {
    if (selectedProductIds.length === 0) {
      toast({
        title: "No Products Selected",
        description: "Please select at least one product to assign",
        variant: "destructive",
      });
      return;
    }
    setShowQuickAssign(true);
  };

  const handleAssignmentComplete = () => {
    setSelectedProductIds([]);
    toast({
      title: "Assignment Complete",
      description: "Products have been assigned and notifications sent",
    });
  };

  const selectedProductNames = filteredProducts
    .filter(p => selectedProductIds.includes(p.id as string))
    .map(p => p.name);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Product Review Dashboard - Quality Control & Data Maintenance"
        description="Internal quality control dashboard for tracking product data accuracy, review status, and maintenance tasks for the Deep Learning in Radiotherapy database. Monitor data quality metrics and review progress."
        canonical="https://dlinrt.eu/review"
        structuredData={structuredData}
        noindex={true}
      />
      <div className="container mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <ReviewDashboardHeader
            criticalCount={summaryStats.criticalCount}
            warningCount={summaryStats.warningCount}
            overdueCount={summaryStats.overdueCount}
            onExportCSV={handleExportCSV}
            onExportExcel={handleExportExcel}
          />
        </div>
        <div className="flex gap-2">
          {isAdmin && selectedProductIds.length > 0 && (
            <Button onClick={handleQuickAssign} variant="default">
              <UserCheck className="mr-2 h-4 w-4" />
              Quick Assign ({selectedProductIds.length})
            </Button>
          )}
          <Button asChild variant="outline">
            <Link to="/admin/review-rounds">
              <Calendar className="mr-2 h-4 w-4" />
              Review Rounds
            </Link>
          </Button>
        </div>
      </div>

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
              <div className="flex items-center justify-between">
                <CardTitle>Products Requiring Review</CardTitle>
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                      Select All ({filteredProducts.length})
                    </label>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ReviewFilters
                selectedStatus={selectedStatus}
                selectedUrgency={selectedUrgency}
                onFilterChange={handleFilterChange}
              />
              <ReviewProductsTable 
                products={filteredProducts}
                enableSelection={isAdmin}
                selectedIds={selectedProductIds}
                onSelectionChange={handleProductSelect}
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

      {/* Quick Assignment Dialog */}
      <QuickAssignDialog
        open={showQuickAssign}
        onOpenChange={setShowQuickAssign}
        productIds={selectedProductIds}
        productNames={selectedProductNames}
        onAssignmentComplete={handleAssignmentComplete}
      />
      </div>
    </div>
  );
};

export default ReviewDashboard;
