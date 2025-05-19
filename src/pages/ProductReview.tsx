import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductReviewStatus } from '@/components/revision/ProductReviewStatus';
import { useCompanyData } from '@/hooks/useCompanyData';
import ProductDetails from '@/components/ProductDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getProducts } from '@/data';

const ProductReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const companies = useCompanyData();
  const company = product ? companies.find(c => c.name === product.company) : null;

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-muted-foreground">Review Mode</p>
      </div>

      <Tabs defaultValue="review" className="space-y-4">
        <TabsList>
          <TabsTrigger value="review">Review Progress</TabsTrigger>
          <TabsTrigger value="details">Product Details</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-4">
          <ProductReviewStatus product={product} />
          
          <Card>
            <CardHeader>
              <CardTitle>Review Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm">
                <h3>Review Guidelines</h3>
                <ul>
                  <li>Check all validation warnings and errors</li>
                  <li>Verify information against official sources</li>
                  <li>Ensure structure classifications are accurate</li>
                  <li>Validate regulatory information is current</li>
                </ul>

                <h3>Required Actions</h3>
                <ul>
                  <li>Address any critical issues flagged by validation</li>
                  <li>Update outdated information</li>
                  <li>Document verification sources</li>
                  <li>Mark review completion in status tracker</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <ProductDetails product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductReviewPage;
