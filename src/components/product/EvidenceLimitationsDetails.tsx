
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { FileText, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EvidenceLimitationsDetailsProps {
  product: ProductDetails;
}

const EvidenceLimitationsDetails = ({ product }: EvidenceLimitationsDetailsProps) => {
  const { evidence, limitations } = product;
  
  // Skip rendering if no evidence or limitations are available
  if ((!evidence || evidence.length === 0) && (!limitations || limitations.length === 0)) {
    return null;
  }

  // Helper function to format DOI links
  const formatDOI = (doi: string) => {
    const cleanDoi = doi.trim();
    const doiUrl = cleanDoi.startsWith("https://doi.org/") 
      ? cleanDoi
      : `https://doi.org/${cleanDoi.replace(/^doi:/, '')}`;
    
    return (
      <a 
        href={doiUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <FileText className="h-4 w-4" />
        {cleanDoi.replace(/^https:\/\/doi\.org\//, '').replace(/^doi:/, '')}
      </a>
    );
  };

  // Helper function to render evidence items (handles both string and object formats)
  const renderEvidenceItem = (item: string | { type: string; description: string; link: string }, index: number) => {
    if (typeof item === 'string') {
      // Handle legacy DOI string format
      return (
        <div key={index} className="pl-2 py-1 border-l-2 border-blue-200">
          {formatDOI(item)}
        </div>
      );
    } else {
      // Handle new object format
      return (
        <div key={index} className="pl-2 py-2 border-l-2 border-blue-200 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-700">{item.description}</p>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
          >
            <FileText className="h-4 w-4" />
            View Evidence
          </a>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence & Limitations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evidence Section */}
        {evidence && evidence.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">Clinical Evidence</h3>
            <div className="space-y-2">
              {evidence.map((item, index) => renderEvidenceItem(item, index))}
            </div>
          </div>
        )}

        {/* Limitations Section */}
        {limitations && limitations.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">Limitations</h3>
            <ul className="space-y-1">
              {limitations.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 mt-1 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EvidenceLimitationsDetails;
