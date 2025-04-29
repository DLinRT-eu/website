
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface MarketInformationProps {
  product: ProductDetails;
}

const MarketInformationDetails = ({ product }: MarketInformationProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Market Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">On Market Since:</p>
          <p className="text-gray-500">{product.market?.onMarketSince || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Countries Present:</p>
          <p className="text-gray-500">{product.market?.countriesPresent || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Paying Customers:</p>
          <p className="text-gray-500">{product.market?.payingCustomers || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Research Users:</p>
          <p className="text-gray-500">{product.market?.researchUsers || "N/A"}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MarketInformationDetails;
