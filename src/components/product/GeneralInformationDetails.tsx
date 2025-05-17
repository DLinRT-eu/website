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

// Format date to YYYY-MM-DD
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const GeneralInformationDetails = ({ product }: GeneralInformationProps) => {
  // Set default source if not specified
  const sourceInfo = product.source || "automatically retrieved";
  
  return (
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
            <p className="text-gray-500">{formatDate(product.releaseDate)}</p>
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
            <p className="text-sm font-medium">Data Source:</p>
            <p className="text-gray-500">{formatField(sourceInfo)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInformationDetails;
