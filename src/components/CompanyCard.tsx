
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface CompanyCardProps {
  name: string;
  products: Product[];
}

const CompanyCard = ({ name, products }: CompanyCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card className="mb-4 w-full border-[#00A6D6]/10 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 cursor-pointer" onClick={toggleExpanded}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="flex items-center mt-1 text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              <span>{products.length} product{products.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Badge>
        </div>
      </CardHeader>

      {expanded && (
        <>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
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
