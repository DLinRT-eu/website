
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const RegulatoryInformationDetails = ({ product }: RegulatoryInformationProps) => {
  // Helper function to check if CE is approved
  const hasCEApproval = product.regulatory?.ce?.status === "Approved";
  
  // Helper function to check if FDA is approved/cleared
  const hasFDAApproval = product.regulatory?.fda && 
    (product.regulatory.fda.includes('510(k)') || 
     product.regulatory.fda.includes('Cleared') || 
     product.regulatory.fda.includes('Approved'));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regulatory Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">CE Status:</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant={hasCEApproval ? "success" : "outline"} 
                className="flex items-center gap-1"
              >
                {hasCEApproval ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    <span>Approved</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    <span>Not Approved</span>
                  </>
                )}
              </Badge>
              {product.regulatory?.ce?.class && (
                <span className="text-sm text-gray-500">
                  Class {product.regulatory.ce.class}
                </span>
              )}
            </div>
            {product.regulatory?.ce?.type && (
              <p className="text-sm text-gray-500">Type: {product.regulatory.ce.type}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">FDA Status:</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant={hasFDAApproval ? "success" : "outline"} 
                className="flex items-center gap-1"
              >
                {hasFDAApproval ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    <span>Cleared/Approved</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    <span>Not Cleared</span>
                  </>
                )}
              </Badge>
              {product.regulatory?.fda && (
                <span className="text-sm text-gray-500">
                  {product.regulatory.fda}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Intended Use Statement:</p>
          <p className="text-gray-500 text-sm">{product.regulatory?.intendedUseStatement || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">AI Technology:</p>
          <p className="text-gray-500 text-sm">
            This product utilizes {product.features.filter(f => 
              f.toLowerCase().includes('deep learning') || 
              f.toLowerCase().includes('ai') ||
              f.toLowerCase().includes('artificial intelligence')
            ).join(', ') || "artificial intelligence"} technology for {product.category.toLowerCase()} applications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryInformationDetails;
