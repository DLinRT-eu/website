
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";

interface ContactInformationProps {
  product: ProductDetails;
}

const ContactInformation = ({ product }: ContactInformationProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Contact Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div>
        <p className="text-sm font-medium">Website:</p>
        {product.website ? (
          <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
            {product.website}
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <p className="text-gray-500">N/A</p>
        )}
      </div>
      <div>
        <p className="text-sm font-medium">Support Email:</p>
        <p className="text-gray-500">{product.supportEmail || "N/A"}</p>
      </div>
    </CardContent>
  </Card>
);

export default ContactInformation;
