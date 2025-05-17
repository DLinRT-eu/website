
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

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

// Check if update is recent (less than 6 months)
const isRecentUpdate = (date: string | undefined): boolean => {
  if (!date) return false;
  
  const updateDate = new Date(date);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  return updateDate > sixMonthsAgo;
};

const GeneralInformationDetails = ({ product }: GeneralInformationProps) => {
  // Set last revised date to 2000-01-01 if not specified
  const lastRevised = product.lastRevised || "2000-01-01";
  
  // Check if revision is recent (less than 6 months)
  const hasRecentRevision = isRecentUpdate(lastRevised);
  
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
            <p className="text-sm font-medium">Last Revised:</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-500">{formatField(lastRevised)}</p>
              <Badge 
                variant={hasRecentRevision ? "success" : "outline"} 
                className="flex items-center gap-1"
              >
                {hasRecentRevision ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
              </Badge>
            </div>
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
