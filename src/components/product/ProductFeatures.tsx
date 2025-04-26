
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductDetails } from "@/types/productDetails";

interface ProductFeaturesProps {
  product: ProductDetails;
}

const ProductFeatures = ({ product }: ProductFeaturesProps) => {
  if (!product.diseaseTargeted && !product.keyFeatures) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features & Capabilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {product.diseaseTargeted && (
          <div>
            <h3 className="font-semibold mb-2">Disease targeted</h3>
            <div className="flex flex-wrap gap-2">
              {product.diseaseTargeted.map((disease, index) => (
                <Badge key={index} variant="secondary">
                  {disease}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {product.keyFeatures && (
          <div>
            <h3 className="font-semibold mb-2">Key features</h3>
            <div className="flex flex-wrap gap-2">
              {product.keyFeatures.map((feature, index) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFeatures;
