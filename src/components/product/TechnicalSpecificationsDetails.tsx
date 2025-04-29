
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface TechnicalSpecificationsProps {
  product: ProductDetails;
}

// Helper function to format array or string fields
const formatField = (value: any): string => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return "-";
  }
  
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  
  return String(value);
};

const TechnicalSpecificationsDetails = ({ product }: TechnicalSpecificationsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Technical Specifications</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Population:</p>
          <p className="text-gray-500">{formatField(product.technicalSpecifications?.population)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Input:</p>
          <p className="text-gray-500">{formatField(product.technicalSpecifications?.input)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Input Format:</p>
          <p className="text-gray-500">{formatField(product.technicalSpecifications?.inputFormat)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Output:</p>
          <p className="text-gray-500">{formatField(product.technicalSpecifications?.output)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Output Format:</p>
          <p className="text-gray-500">{formatField(product.technicalSpecifications?.outputFormat)}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TechnicalSpecificationsDetails;
