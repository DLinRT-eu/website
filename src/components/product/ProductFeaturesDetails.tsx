
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { getKeyFeatures } from "@/lib/utils";

interface ProductFeaturesProps {
  product: ProductDetails;
}

const ProductFeaturesDetails = ({ product }: ProductFeaturesProps) => {
  const keyFeatures = getKeyFeatures(product);
  
  if (keyFeatures.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Features</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 space-y-2">
          {keyFeatures.map((feature, index) => (
            <li key={index} className="text-muted-foreground">{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductFeaturesDetails;
