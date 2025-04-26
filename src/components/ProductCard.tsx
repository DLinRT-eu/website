
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
}

const ProductCard = ({ name, company, description, features, category, certification }: ProductCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-[#00A6D6]/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-[#00A6D6]">{company}</p>
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
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <Badge key={index} variant="outline" className="bg-gray-50">
            {feature}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default ProductCard;
