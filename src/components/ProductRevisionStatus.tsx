
import React from 'react';
import { ProductDetails } from "@/types/productDetails";

interface ProductRevisionStatusProps {
  product: ProductDetails;
}

const ProductRevisionStatus: React.FC<ProductRevisionStatusProps> = ({ product }) => {
  // Calculate days since last revision
  const calculateDaysSinceRevision = () => {
    if (!product.lastRevised) return null;
    
    const today = new Date();
    const lastRevised = new Date(product.lastRevised);
    const differenceInTime = today.getTime() - lastRevised.getTime();
    return Math.round(differenceInTime / (1000 * 3600 * 24));
  };
  
  const daysSinceRevision = calculateDaysSinceRevision();
  
  // Determine status based on days since revision
  const getRevisionStatus = () => {
    if (daysSinceRevision === null) return { label: 'Unknown', color: 'bg-gray-400' };
    
    if (daysSinceRevision <= 90) return { label: 'Recent', color: 'bg-green-500' };
    if (daysSinceRevision <= 180) return { label: 'Due Soon', color: 'bg-yellow-400' };
    if (daysSinceRevision <= 365) return { label: 'Overdue', color: 'bg-orange-500' };
    return { label: 'Critical', color: 'bg-red-500' };
  };
  
  const status = getRevisionStatus();
  
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-medium">Last Revised:</span>
        <span>{product.lastRevised || 'Not available'}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Status:</span>
        <span className={`${status.color} text-white px-2 py-0.5 rounded-full text-xs`}>
          {status.label}
          {daysSinceRevision !== null && ` (${daysSinceRevision} days)`}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Last Verified:</span>
        <span>{product.lastVerified || 'Not available'}</span>
      </div>
    </div>
  );
};

export default ProductRevisionStatus;
