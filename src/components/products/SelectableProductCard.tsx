import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Building2, Check } from "lucide-react";

interface SelectableProductCardProps {
  product: ProductDetails;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

export const SelectableProductCard = ({
  product,
  isSelected,
  onSelect,
}: SelectableProductCardProps) => {
  const modalities = Array.isArray(product.modality) 
    ? product.modality 
    : product.modality ? [product.modality] : [];

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => onSelect(product.id)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{product.company}</span>
              </div>
            </div>
            {isSelected && (
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            {modalities.slice(0, 2).map((modality) => (
              <Badge key={modality} variant="outline" className="text-xs">
                {modality}
              </Badge>
            ))}
            {modalities.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{modalities.length - 2}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            className="w-full"
            variant={isSelected ? "default" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.id);
            }}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Selected
              </>
            ) : (
              'Select'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
