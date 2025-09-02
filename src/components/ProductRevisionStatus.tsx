
import React from 'react';
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CalendarCheck2, Shield, AlertCircle } from 'lucide-react';

interface ProductRevisionStatusProps {
  product: ProductDetails;
}

// Format date consistently as YYYY-MM-DD
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

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
    if (daysSinceRevision === null) return { label: 'Unknown', color: 'bg-gray-400', icon: AlertCircle };
    
    if (daysSinceRevision <= 90) return { label: 'Recent', color: 'bg-green-500', icon: Shield };
    if (daysSinceRevision <= 180) return { label: 'Due Soon', color: 'bg-yellow-400', icon: CalendarCheck2 };
    if (daysSinceRevision <= 365) return { label: 'Overdue', color: 'bg-orange-500', icon: CalendarClock };
    return { label: 'Critical', color: 'bg-red-500', icon: AlertCircle };
  };
  
  const status = getRevisionStatus();
  const StatusIcon = status.icon;
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge className={`${status.color} gap-1 text-white`}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span>
            {status.label}
            {daysSinceRevision !== null && ` (${daysSinceRevision} days)`}
          </span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-start gap-2">
          <span className="font-medium min-w-[120px]">Last Updated:</span>
          <span className="text-muted-foreground">{formatDate(product.lastUpdated)}</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="font-medium min-w-[120px]">Last Revised:</span>
          <span className="text-muted-foreground">{formatDate(product.lastRevised)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductRevisionStatus;
