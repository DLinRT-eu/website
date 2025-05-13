
import React from "react";
import type { ProductDetails as ProductDetailsType } from "@/types/productDetails";
import ProductHeaderInfo from "./product/ProductHeaderInfo";
import GeneralInformationDetails from "./product/GeneralInformationDetails";
import ProductFeaturesDetails from "./product/ProductFeaturesDetails";
import TechnicalSpecificationsDetails from "./product/TechnicalSpecificationsDetails";
import RegulatoryInformationDetails from "./product/RegulatoryInformationDetails";
import MarketInformationDetails from "./product/MarketInformationDetails";
import PricingInformationDetails from "./product/PricingInformationDetails";
import ContactInformation from "./product/ContactInformation";
import SupportedStructures from "./product/SupportedStructures";
import ProductRevisionStatus from "./ProductRevisionStatus";

interface ProductDetailsProps {
  product: ProductDetailsType;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductHeaderInfo product={product} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInformationDetails product={product} />
          <ProductFeaturesDetails product={product} />
          <TechnicalSpecificationsDetails product={product} />
          
          {product.category === "Auto-Contouring" && product.supportedStructures && (
            <SupportedStructures structures={product.supportedStructures} />
          )}
          
          <RegulatoryInformationDetails product={product} />
          <MarketInformationDetails product={product} />
          <PricingInformationDetails product={product} />
        </div>
        
        <div className="space-y-6">
          <ContactInformation product={product} />
          
          {/* Add revision status component */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revision Information</h3>
            <ProductRevisionStatus product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
