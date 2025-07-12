
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { getModalityColor } from "@/utils/chartColors";

interface ProductCardProps {
  id?: string;
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
  logoUrl?: string;
  anatomicalLocation?: string[];
  modality?: string | string[];
  website?: string;
  companyUrl?: string;
  productUrl?: string;
}

const ProductCard = ({ 
  id, 
  name, 
  company, 
  description, 
  features, 
  category, 
  certification,
  logoUrl = "/placeholder.svg",
  anatomicalLocation,
  modality,
  website,
  companyUrl,
  productUrl
}: ProductCardProps) => {
  const navigate = useNavigate();

  const formatModality = (modality: string | string[] | undefined): string => {
    if (!modality) return "Unknown";
    return Array.isArray(modality) ? modality.join(", ") : modality;
  };

  const getModalityBadgeStyle = (): string => {
    return `border-transparent text-white`;
  };

  const renderModalityBadges = (modality: string | string[] | undefined) => {
    if (!modality) return null;
    
    const modalities = Array.isArray(modality) ? modality : [modality];
    
    return modalities.map((singleModality, index) => (
      <Badge 
        key={index}
        className={`text-xs mr-2 ${getModalityBadgeStyle()}`}
        style={{ backgroundColor: getModalityColor(singleModality.trim()) }}
      >
        {singleModality.trim()}
      </Badge>
    ));
  };

  return (
    <Card 
      className="h-full hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardHeader className="pb-3 px-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border">
              <img 
                src={logoUrl} 
                alt={`${company} logo`} 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg leading-tight truncate">{name}</CardTitle>
              <p className="text-sm text-gray-600 truncate">{company}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-0 px-4 sm:px-6">
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{description}</p>
        {features && features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800">Key Features:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="line-clamp-1">{feature}</li>
              ))}
              {features.length > 3 && (
                <li className="line-clamp-1">And more...</li>
              )}
            </ul>
          </div>
        )}
        {modality && (
          <div className="flex items-center flex-wrap gap-1 mt-2 mb-4">
            {renderModalityBadges(modality)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
