
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductDetails } from "@/types/productDetails";

interface PricingInformationProps {
  product: ProductDetails;
}

const PricingInformation = ({ product }: PricingInformationProps) => {
  if (!product.pricing) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        {product.pricing.model && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Pricing model</h3>
            <div className="flex flex-wrap gap-2">
              {product.pricing.model.map((model, index) => (
                <Badge key={index} variant="secondary">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {product.pricing.basedOn && (
          <div>
            <h3 className="font-semibold mb-2">Based on</h3>
            <div className="flex flex-wrap gap-2">
              {product.pricing.basedOn.map((basis, index) => (
                <Badge key={index} variant="outline">
                  {basis}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingInformation;
