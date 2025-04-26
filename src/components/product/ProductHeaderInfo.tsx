
import { Calendar, Info, ExternalLink } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";

interface ProductHeaderInfoProps {
  product: ProductDetails;
}

const ProductHeaderInfo = ({ product }: ProductHeaderInfoProps) => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <Info className="h-4 w-4" />
        <span>Information source: Vendor</span>
        {product.lastUpdated && (
          <>
            <Calendar className="h-4 w-4 ml-4" />
            <span>Last updated: {formatDate(product.lastUpdated)}</span>
          </>
        )}
      </div>
      <p className="text-lg text-gray-700 mb-6">{product.description}</p>
      
      {product.website && (
        <div className="mb-4">
          <a 
            href={product.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00A6D6] flex items-center gap-1 hover:underline inline-flex"
          >
            Visit official website <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductHeaderInfo;
