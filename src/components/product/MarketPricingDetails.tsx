import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface MarketPricingProps {
  product: ProductDetails;
}

const MarketPricingDetails = ({ product }: MarketPricingProps) => {
  // Check if pricing is a string or an object
  const isPricingString = typeof product.pricing === 'string';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market & Pricing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Information Section */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Market Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">On Market Since:</p>
              <p className="text-gray-500">{product.market?.onMarketSince || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Distribution Channels:</p>
              <p className="text-gray-500">
                {product.market?.distributionChannels?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Information Section */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Pricing Information</h4>
          {isPricingString ? (
            // If pricing is a string, display it directly
            <div>
              <p className="text-sm font-medium">Pricing:</p>
              <p className="text-gray-500">{product.pricing as string}</p>
            </div>
          ) : (
            // If pricing is an object, display model and basedOn properties
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Model:</p>
                <p className="text-gray-500">
                  {typeof product.pricing === 'object' && product.pricing?.model 
                    ? product.pricing.model.join(", ") 
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Based On:</p>
                <p className="text-gray-500">
                  {typeof product.pricing === 'object' && product.pricing?.basedOn 
                    ? product.pricing.basedOn.join(", ") 
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPricingDetails;