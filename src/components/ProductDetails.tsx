
import React from 'react';
import { ProductDetails } from "@/types/productDetails";
import ProductNavigation from './product/ProductNavigation';
import ProductHeaderInfo from './product/ProductHeaderInfo';
import GeneralInformation from './product/GeneralInformation';
import ProductFeatures from './product/ProductFeatures';
import TechnicalSpecifications from './product/TechnicalSpecifications';
import RegulatoryInformation from './product/RegulatoryInformation';
import MarketInformation from './product/MarketInformation';
import PricingInformation from './product/PricingInformation';

const ProductDetailsPage = ({ product }: { product: ProductDetails }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProductNavigation />
      
      <div className="space-y-8">
        <ProductHeaderInfo product={product} />
        <GeneralInformation product={product} />
        <ProductFeatures product={product} />
        <TechnicalSpecifications product={product} />
        <RegulatoryInformation product={product} />
        <MarketInformation product={product} />
        <PricingInformation product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
