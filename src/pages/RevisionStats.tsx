
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
import RevisionSummaryCards from '@/components/revision/RevisionSummaryCards';
import RevisionChart from '@/components/revision/RevisionChart';
import RevisionTable from '@/components/revision/RevisionTable';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDetails } from '@/types/productDetails';
import dataService from '@/services/DataService';
import { calculateRevisionStats } from '@/utils/revisionUtils';

const RevisionStats = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { toast } = useToast();

  // Get all products
  const allProducts = dataService.getAllProducts();
  const { 
    productsNeedingRevision, 
    revisionPercentage, 
    averageDaysSinceRevision,
    revisionAgeGroups 
  } = calculateRevisionStats(allProducts);

  // Filter products based on selected filters
  const filteredProducts = productsNeedingRevision.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedCompany && product.company !== selectedCompany) return false;
    if (selectedUrgency) {
      const daysSinceRevision = getDaysSinceRevision(product);
      
      if (selectedUrgency === 'low' && daysSinceRevision <= 180) return false;
      if (selectedUrgency === 'medium' && (daysSinceRevision <= 180 || daysSinceRevision > 365)) return false;
      if (selectedUrgency === 'high' && daysSinceRevision <= 365) return false;
    }
    
    return true;
  });

  // Handle filter changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleCompanyChange = (company: string | null) => {
    setSelectedCompany(company);
  };

  const handleUrgencyChange = (urgency: string | null) => {
    setSelectedUrgency(urgency);
  };

  // Handle assignment changes
  const handleAssignmentChange = (productId: string, assignee: string) => {
    // In a real app, this would save to a backend
    // For now, just show a toast notification
    toast({
      title: "Assignment updated",
      description: `Product assigned to ${assignee}`,
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Product Revision Statistics",
    "description": "Internal dashboard for tracking product revision status and assignments.",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Product Revision Statistics"
        description="Internal dashboard for tracking product revision status and assignments."
        canonical="https://dlinrt.eu/revision-stats"
        structuredData={structuredData}
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Product Revision Statistics</h1>
        <p className="text-muted-foreground">
          Track the status of product revisions and assign team members to update products.
        </p>

        {/* Summary Cards */}
        <RevisionSummaryCards
          totalProducts={allProducts.length}
          productsNeedingRevision={productsNeedingRevision.length}
          revisionPercentage={revisionPercentage}
          averageDaysSinceRevision={averageDaysSinceRevision}
        />

        {/* Tabs for different views */}
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Revision Chart</TabsTrigger>
            <TabsTrigger value="table">Product List</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <Card>
              <CardContent className="pt-6">
                <RevisionChart revisionAgeGroups={revisionAgeGroups} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="table">
            <RevisionTable 
              products={filteredProducts}
              onAssignmentChange={handleAssignmentChange}
              onCategoryFilter={handleCategoryChange}
              onCompanyFilter={handleCompanyChange}
              onUrgencyFilter={handleUrgencyChange}
              selectedCategory={selectedCategory}
              selectedCompany={selectedCompany}
              selectedUrgency={selectedUrgency}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper function to calculate days since revision
export const getDaysSinceRevision = (product: ProductDetails): number => {
  const lastRevised = product.lastRevised || "2000-01-01";
  const revisionDate = new Date(lastRevised);
  const today = new Date();
  
  const diffTime = Math.abs(today.getTime() - revisionDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default RevisionStats;
