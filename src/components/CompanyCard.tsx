
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface CompanyCardProps {
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
  products: Product[];
}

const CompanyCard = ({ name, description, website, logoUrl, products }: CompanyCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card className="mb-4 w-full border-[#00A6D6]/10 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border">
              <img 
                src={logoUrl || "/placeholder.svg"} 
                alt={`${name} logo`} 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold">{name}</h3>
                {website && (
                  <a 
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00A6D6] hover:text-[#00A6D6]/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="text-gray-600 text-sm">{description}</p>
              <div className="flex items-center mt-2 text-gray-500">
                <Package className="w-4 h-4 mr-1" />
                <span>{products.length} product{products.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className="ml-4"
          >
            <Badge variant="outline" className="flex items-center cursor-pointer">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Badge>
          </button>
        </div>
      </CardHeader>

      {expanded && (
        <>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-center">
            <button 
              className="text-sm text-[#00A6D6] hover:text-[#00A6D6]/80 flex items-center"
              onClick={toggleExpanded}
            >
              Hide Products <ChevronUp className="h-4 w-4 ml-1" />
            </button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default CompanyCard;
