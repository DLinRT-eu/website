
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { getStandardizedCertificationTags } from "@/utils/productFilters";
import { parseFDAInfo, parseCEInfo, formatFDAInfo, formatCEInfo } from "@/utils/regulatoryUtils";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const RegulatoryInformationDetails = ({ product }: RegulatoryInformationProps) => {
  const certificationTags = getStandardizedCertificationTags(product);
  const hasCE = certificationTags.includes('CE');
  const hasFDA = certificationTags.includes('FDA');
  const hasMDRExempt = certificationTags.includes('MDR exempt');
  
  const getCEStatus = () => {
    const ceInfo = parseCEInfo(product.regulatory?.ce);
    
    if (!ceInfo) {
      return {
        label: "Not available",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: "CE marking information not available",
        details: null
      };
    }
    
    if (hasMDRExempt) {
      return {
        label: "MDR exempt",
        icon: <AlertTriangle className="h-3 w-3" />,
        variant: "warning" as const,
        description: "Medical Device Regulation Exempt",
        details: ceInfo
      };
    }
    
    return {
      label: hasCE ? "CE Marked" : "Not CE Marked",
      icon: hasCE ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasCE ? "success" as const : "outline" as const,
      description: formatCEInfo(ceInfo),
      details: ceInfo
    };
  };
  
  const getFDAStatus = () => {
    const fdaInfo = parseFDAInfo(product.regulatory?.fda);
    
    if (!fdaInfo) {
      return {
        label: "Not available",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: "FDA clearance information not available",
        details: null
      };
    }
    
    let label = fdaInfo.status;
    if (fdaInfo.clearanceNumber?.startsWith('K')) {
      label = "510(k) Cleared";
    } else if (fdaInfo.clearanceNumber?.startsWith('P')) {
      label = "PMA Approved";
    } else if (fdaInfo.status.includes("510(k)")) {
      label = "510(k) Cleared";
    } else if (fdaInfo.status.includes("PMA")) {
      label = "PMA Approved";
    }
    
    return {
      label,
      icon: hasFDA ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasFDA ? "success" as const : "outline" as const,
      description: formatFDAInfo(fdaInfo),
      details: fdaInfo
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
            {ceStatus.details && (
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                {ceStatus.details.type && <div>Type: {ceStatus.details.type}</div>}
                {ceStatus.details.certificateNumber && <div>Certificate: {ceStatus.details.certificateNumber}</div>}
                {ceStatus.details.notifiedBody && <div>Notified Body: {ceStatus.details.notifiedBody}</div>}
                {ceStatus.details.regulation && <div>Regulation: {ceStatus.details.regulation}</div>}
              </div>
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
            {fdaStatus.details && (
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                {fdaStatus.details.clearanceNumber && <div>Clearance: {fdaStatus.details.clearanceNumber}</div>}
                {fdaStatus.details.class && <div>Class: {fdaStatus.details.class}</div>}
                {fdaStatus.details.regulationNumber && <div>Regulation: {fdaStatus.details.regulationNumber}</div>}
                {fdaStatus.details.productCode && <div>Product Code: {fdaStatus.details.productCode}</div>}
                {fdaStatus.details.type && <div>Type: {fdaStatus.details.type}</div>}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Intended Use Statement:</p>
          <p className="text-gray-500 text-sm">{product.regulatory?.intendedUseStatement || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">AI Technology:</p>
          <p className="text-gray-500 text-sm">
            This product utilizes {product.features?.filter(f => 
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
