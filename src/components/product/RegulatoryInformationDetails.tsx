
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const RegulatoryInformationDetails = ({ product }: RegulatoryInformationProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Regulatory Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">CE Status:</p>
          <p className="text-gray-500">{product.regulatory?.ce?.status || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">FDA:</p>
          <p className="text-gray-500">{product.regulatory?.fda || "N/A"}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Intended Use Statement:</p>
        <p className="text-gray-500">{product.regulatory?.intendedUseStatement || "N/A"}</p>
      </div>
    </CardContent>
  </Card>
);

export default RegulatoryInformationDetails;
