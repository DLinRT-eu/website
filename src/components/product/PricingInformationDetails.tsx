
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface PricingInformationProps {
  product: ProductDetails;
}

const PricingInformationDetails = ({ product }: PricingInformationProps) => {
  // Check if pricing is a string or an object
  const isPricingString = typeof product.pricing === 'string';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isPricingString ? (
          // If pricing is a string, display it directly
          <div>
            <p className="text-sm font-medium">Pricing:</p>
            <p className="text-gray-500">{product.pricing}</p>
          </div>
        ) : (
          // If pricing is an object, display model and basedOn properties
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Model:</p>
              <p className="text-gray-500">{product.pricing?.model?.join(", ") || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Based On:</p>
              <p className="text-gray-500">{product.pricing?.basedOn?.join(", ") || "N/A"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingInformationDetails;
