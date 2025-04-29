
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface ProductFeaturesProps {
  product: ProductDetails;
}

const ProductFeaturesDetails = ({ product }: ProductFeaturesProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Key Features</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-4 space-y-2">
        {product.keyFeatures?.map((feature, index) => (
          <li key={index} className="text-gray-500">{feature}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default ProductFeaturesDetails;
