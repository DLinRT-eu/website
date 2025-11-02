import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface MarketPricingProps {
  product: ProductDetails;
}

const MarketPricingDetails = ({ product }: MarketPricingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Information Section */}
        <div>
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
      </CardContent>
    </Card>
  );
};

export default MarketPricingDetails;