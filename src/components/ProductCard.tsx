import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
  logoUrl: string;
  website?: string;
  productUrl?: string;
  companyUrl?: string;
  releaseDate?: string;
  version?: string;
}

const ProductCard = ({ 
  id,
  name, 
  company, 
  description, 
  features, 
  category, 
  certification, 
  logoUrl,
  website,
  productUrl,
  companyUrl,
  releaseDate,
  version
}: ProductCardProps) => {
  // Format date if available
  const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString() : null;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-[#00A6D6]/10">
      <Link to={`/product/${id}`} className="block">
        <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
          <AspectRatio ratio={16/9} className="bg-white">
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="object-contain w-full h-full p-4"
            />
          </AspectRatio>
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              {productUrl ? (
                <a 
                  href={productUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00A6D6] flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {name} <ExternalLink className="h-4 w-4" />
                </a>
              ) : name}
            </h3>
            <p className="text-sm text-[#00A6D6]">
              {companyUrl ? (
                <a 
                  href={companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00A6D6]/80 flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {company} <ExternalLink className="h-4 w-4" />
                </a>
              ) : company}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant="secondary" className="bg-[#00A6D6]/10 text-[#00A6D6] border-none">
              {category}
            </Badge>
            {certification && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {certification}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        {/* Website link if available */}
        {website && (
          <div className="mb-4">
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#00A6D6] flex items-center gap-1 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Visit website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        
        {/* Version and release date information */}
        {(version || releaseDate) && (
          <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
            {version && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>v{version}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Released: {formattedDate}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {feature}
            </Badge>
          ))}
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
