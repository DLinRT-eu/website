
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";

interface GeneralInformationProps {
  product: ProductDetails;
}

const GeneralInformationDetails = ({ product }: GeneralInformationProps) => (
  <Card>
    <CardHeader>
      <CardTitle>General Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Company:</p>
          <p className="text-gray-500">{product.company}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Category:</p>
          <p className="text-gray-500">{product.category}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Release Date:</p>
          <p className="text-gray-500">{product.releaseDate || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Version:</p>
          <p className="text-gray-500">{product.version || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Certification:</p>
          <p className="text-gray-500">{product.certification || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Price:</p>
          <p className="text-gray-500">{product.price ? `$${product.price}` : "N/A"}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GeneralInformationDetails;
