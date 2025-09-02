import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";

interface ProductHeaderInfoProps {
  product: ProductDetails;
}

const ProductHeaderInfo = ({ product }: ProductHeaderInfoProps) => {
  // Generate logo URL based on company name if needed
  const generateLogoUrl = () => {
    if (product.logoUrl && product.logoUrl.trim() !== '') {
      return product.logoUrl.startsWith('/') ? product.logoUrl.trim() : `/${product.logoUrl.trim()}`;
    }
    
    // Create a standardized company logo filename
    const standardizedCompany = product.company.toLowerCase().replace(/\s+/g, '-');
    return `/logos/${standardizedCompany}.png`;
  };
  
  const logoSrc = generateLogoUrl();
  
  // Check if revision is recent (less than 6 months)
  const isRevised = !!product.lastRevised;
  const isRecentlyRevised = isRevised && 
    new Date().getTime() - new Date(product.lastRevised).getTime() < 6 * 30 * 24 * 60 * 60 * 1000;
  
  // Format revision date in YYYY-MM-DD format
  const formattedRevisionDate = product.lastRevised 
    ? new Date(product.lastRevised).toISOString().split('T')[0]
    : null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-24 h-24 rounded-md overflow-hidden bg-white">
          <img 
            src={logoSrc} 
            alt={product.name} 
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
              console.error(`Failed to load product logo: ${logoSrc}`);
            }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          
          <div className="mt-2 flex items-center">
            <Badge 
              variant={isRecentlyRevised ? "success" : isRevised ? "outline" : "secondary"} 
              className={`flex items-center gap-1 ${isRecentlyRevised ? 'bg-green-100 text-green-800' : isRevised ? '' : 'bg-gray-100 text-gray-600'}`}
            >
              {isRecentlyRevised ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {formattedRevisionDate ? `Revised: ${formattedRevisionDate}` : "Not revised"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {product.productUrl && (
          <Button asChild variant="outline">
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
              Product Website <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
        {product.companyUrl && (
          <Button asChild variant="secondary">
            <a href={product.companyUrl} target="_blank" rel="noopener noreferrer">
              Visit Company <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHeaderInfo;
