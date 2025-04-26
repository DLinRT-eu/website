
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
}

const ProductCard = ({ name, company, description, features, category }: ProductCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-blue-600">{company}</p>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          {category}
        </Badge>
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
