
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface GeneralInformationProps {
  product: ProductDetails;
}

// Helper function to display standard format for missing data
const formatField = (value: any): string => {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  return String(value);
};

const GeneralInformationDetails = ({ product }: GeneralInformationProps) => (
  <Card>
    <CardHeader>
      <CardTitle>General Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Company:</p>
          <p className="text-gray-500">{formatField(product.company)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Category:</p>
          <p className="text-gray-500">{formatField(product.category)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Release Date:</p>
          <p className="text-gray-500">{formatField(product.releaseDate)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Version:</p>
          <p className="text-gray-500">{formatField(product.version)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Certification:</p>
          <p className="text-gray-500">{formatField(product.certification)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Price:</p>
          <p className="text-gray-500">{product.price ? `$${product.price}` : "-"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Last Updated:</p>
          <p className="text-gray-500">{formatField(product.lastUpdated)}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Clinical Evidence:</p>
          <p className="text-gray-500">{formatField(product.clinicalEvidence)}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GeneralInformationDetails;
