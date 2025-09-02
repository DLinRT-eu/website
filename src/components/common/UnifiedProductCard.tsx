import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { getModalityColor } from "@/utils/chartColors";
import { getKeyFeatures, getLogoInfo } from "@/lib/utils";

interface UnifiedProductCardProps {
  product: ProductDetails;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (product: ProductDetails, selected: boolean) => void;
  showModality?: boolean;
  showFeatures?: boolean;
  compactMode?: boolean;
}

const UnifiedProductCard = ({ 
  product,
  isSelectable = false,
  isSelected = false,
  onSelectionChange,
  showModality = true,
  showFeatures = true,
  compactMode = false
}: UnifiedProductCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const displayFeatures = getKeyFeatures(product);
  const logoInfo = getLogoInfo(product);

  const handleCardClick = () => {
    if (!isSelectable && product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleSelectionChange = async (checked: boolean) => {
    if (onSelectionChange) {
      // Dynamically import DataService to avoid circular dependencies
      const { default: DataService } = await import('@/services/DataService');
      const fullProduct = DataService.getProductById(product.id || '');
      if (fullProduct) {
        onSelectionChange(fullProduct, checked);
      }
    }
  };

  const renderModalityBadges = (modality: string | string[] | undefined) => {
    if (!modality || !showModality) return null;
    
    const modalities = Array.isArray(modality) ? modality : [modality];
    return modalities.map((mod, index) => (
      <Badge 
        key={index} 
        variant="secondary" 
        className="text-xs"
        style={{ backgroundColor: getModalityColor(mod) }}
      >
        {mod}
      </Badge>
    ));
  };

  return (
    <Card 
      className={`h-full transition-all duration-200 hover:shadow-lg ${
        !isSelectable ? 'cursor-pointer hover:shadow-md' : ''
      } ${compactMode ? 'p-3' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className={compactMode ? "pb-2" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {!imageError && (
              <img 
                src={logoInfo.url} 
                alt={`${product.company} logo`}
                className={`${compactMode ? 'w-8 h-8' : 'w-12 h-12'} object-contain flex-shrink-0`}
                onError={() => setImageError(true)}
              />
            )}
            <div className="min-w-0 flex-1">
              <CardTitle className={`${compactMode ? 'text-sm' : 'text-lg'} leading-tight`}>
                {product.name}
              </CardTitle>
              <p className={`text-muted-foreground ${compactMode ? 'text-xs' : 'text-sm'} mt-1`}>
                {product.company}
              </p>
            </div>
          </div>
          
          {isSelectable && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelectionChange}
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className={compactMode ? "pt-0" : ""}>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          {renderModalityBadges(product.modality)}
        </div>
        
        {!compactMode && (
          <>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {product.description}
            </p>
            
            {showFeatures && displayFeatures.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {displayFeatures.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="line-clamp-2">{feature}</span>
                    </li>
                  ))}
                  {displayFeatures.length > 3 && (
                    <li className="text-xs text-muted-foreground/70 italic">
                      +{displayFeatures.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            )}
          </>
        )}
        
        {product.website && (
          <div className="flex justify-end mt-3">
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              Visit
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedProductCard;