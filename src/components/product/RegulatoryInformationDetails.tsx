
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { getStandardizedCertificationTags } from "@/utils/productFilters";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const RegulatoryInformationDetails = ({ product }: RegulatoryInformationProps) => {
  const certificationTags = getStandardizedCertificationTags(product);
  const hasCE = certificationTags.includes('CE');
  const hasFDA = certificationTags.includes('FDA');
  const hasMDRExempt = certificationTags.includes('MDR exempt');
  
  // Helper function to check certification type and status for CE
  const getCEStatus = () => {
    if (hasMDRExempt) {
      return {
        label: "MDR exempt",
        icon: <AlertTriangle className="h-3 w-3" />,
        variant: "warning" as const,
        description: "Medical Device Regulation Exempt"
      };
    }
    
    return {
      label: hasCE ? "CE Approved" : "Not CE Approved",
      icon: hasCE ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasCE ? "success" as const : "outline" as const,
      description: product.regulatory?.ce?.class ? `Class ${product.regulatory.ce.class}` : ""
    };
  };
  
  // Helper function for FDA status
  const getFDAStatus = () => {
    return {
      label: hasFDA ? "FDA Cleared/Approved" : "Not FDA Cleared",
      icon: hasFDA ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasFDA ? "success" as const : "outline" as const,
      description: product.regulatory?.fda || ""
    };
  };
  
  const ceStatus = getCEStatus();
  const fdaStatus = getFDAStatus();
  
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
                variant={ceStatus.variant}
                className="flex items-center gap-1"
              >
                {ceStatus.icon}
                <span>{ceStatus.label}</span>
              </Badge>
              {ceStatus.description && (
                <span className="text-sm text-gray-500">
                  {ceStatus.description}
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
                variant={fdaStatus.variant}
                className="flex items-center gap-1"
              >
                {fdaStatus.icon}
                <span>{fdaStatus.label}</span>
              </Badge>
              {fdaStatus.description && (
                <span className="text-sm text-gray-500">
                  {fdaStatus.description}
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
