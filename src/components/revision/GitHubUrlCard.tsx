
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from 'lucide-react';
import { ProductDetails } from '@/types/productDetails';

interface GitHubUrlCardProps {
  product: ProductDetails;
}

export const GitHubUrlCard: React.FC<GitHubUrlCardProps> = ({ product }) => {
  if (!product.githubUrl) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Github className="h-5 w-5" />
            GitHub Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 text-sm mb-3">
            No GitHub URL specified for this product. Consider adding one to help reviewers locate the source code.
          </p>
          <p className="text-xs text-yellow-600">
            Expected format: https://github.com/DLinRT-eu/website/tree/main/src/data/products/{'{category}'}/{'{filename}'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Repository
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          Edit the product data directly in the GitHub repository:
        </p>
        <Button asChild variant="outline" className="w-full">
          <a 
            href={product.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            View/Edit Product Code
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default GitHubUrlCard;
