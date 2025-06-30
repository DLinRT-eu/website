import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileSpreadsheet } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { toast } from "sonner";

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
  
  const handleExportModelCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Create a simplified product object for export
    const productForExport: ProductDetails = {
      id,
      name,
      company,
      description,
      features,
      category,
      certification,
      logoUrl,
      anatomicalLocation,
      modality,
      website,
      companyUrl,
      productUrl
    } as ProductDetails;
    
    import("@/utils/modelCardExport").then(({ exportModelCardToExcel }) => {
      exportModelCardToExcel(productForExport);
      toast.success(`Model card exported for ${name}`);
    }).catch(() => {
      toast.error("Failed to export model card");
    });
  };

  const formatModality = (modality: string | string[] | undefined): string => {
    if (!modality) return "Unknown";
    return Array.isArray(modality) ? modality.join(", ") : modality;
  };

  const getModalityColor = (modality: string | string[] | undefined): string => {
    const modalityStr = formatModality(modality).toLowerCase();
    if (modalityStr.includes("ct")) return "bg-blue-100 text-blue-800";
    if (modalityStr.includes("mri")) return "bg-green-100 text-green-800";
    if (modalityStr.includes("pet")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card 
      className="h-full hover:shadow-lg transition-shadow cursor-pointer group" 
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                src={logoUrl} 
                alt={`${company} logo`} 
                className="w-8 h-8 object-contain"
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
          <div className="flex flex-col items-end gap-1 ml-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportModelCard}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              title="Export Model Card"
            >
              <FileSpreadsheet className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-0">
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
          <div className="flex items-center mt-2">
            <Badge className={`mr-2 text-xs ${getModalityColor(modality)}`}>
              {formatModality(modality)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
