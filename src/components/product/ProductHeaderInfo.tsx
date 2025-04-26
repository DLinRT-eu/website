
import { Calendar, Info } from "lucide-react";
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
    </div>
  );
};

export default ProductHeaderInfo;
