
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductReviewStatus } from '@/components/revision/ProductReviewStatus';
import { useCompanyData } from '@/hooks/useCompanyData';
import ProductDetails from '@/components/ProductDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clipboard } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ProductReview = () => {
  const { id } = useParams<{ id: string }>();
  const product = ALL_PRODUCTS.find(p => p.id === id);
  const { companyData } = useCompanyData();
  const company = product ? companyData.find(c => c.name === product.company) : null;

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild variant="outline">
          <Link to="/review">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Review Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/review">Review</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground">Review Mode</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/product/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a 
              href={`https://github.com/DLinRT/medical-ai-product-database/issues/new?title=Review%3A+${encodeURIComponent(product.name)}&template=product-review.md&labels=review`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Create Review Issue
            </a>
          </Button>
        </div>
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

export default ProductReview;
