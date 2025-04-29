
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";

interface ProductHeaderInfoProps {
  product: ProductDetails;
}

const ProductHeaderInfo = ({ product }: ProductHeaderInfoProps) => {
  // Clean up logo URL to ensure proper formatting
  const logoSrc = product.logoUrl ? (product.logoUrl.startsWith('/') ? product.logoUrl.trim() : `/${product.logoUrl.trim()}`) : '/placeholder.svg';
  
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
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
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
