import React from "react";
import { ProductDetails } from "@/types/productDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SupportedStructures from "./product/SupportedStructures";

interface ProductDetailsProps {
  product: ProductDetails;
}

const GeneralInformation = ({ product }: ProductDetailsProps) => (
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

const ProductFeatures = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Key Features</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-4 space-y-2">
        {product.keyFeatures?.map((feature, index) => (
          <li key={index} className="text-gray-500">{feature}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const TechnicalSpecifications = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Technical Specifications</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="population">
          <AccordionTrigger>Population</AccordionTrigger>
          <AccordionContent>{product.technicalSpecifications?.population || "N/A"}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="input">
          <AccordionTrigger>Input</AccordionTrigger>
          <AccordionContent>{product.technicalSpecifications?.input?.join(", ") || "N/A"}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="inputFormat">
          <AccordionTrigger>Input Format</AccordionTrigger>
          <AccordionContent>{product.technicalSpecifications?.inputFormat?.join(", ") || "N/A"}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="output">
          <AccordionTrigger>Output</AccordionTrigger>
          <AccordionContent>{product.technicalSpecifications?.output?.join(", ") || "N/A"}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="outputFormat">
          <AccordionTrigger>Output Format</AccordionTrigger>
          <AccordionContent>{product.technicalSpecifications?.outputFormat?.join(", ") || "N/A"}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
);

const RegulatoryInformation = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Regulatory Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">CE Status:</p>
          <p className="text-gray-500">{product.regulatory?.ce?.status || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">FDA:</p>
          <p className="text-gray-500">{product.regulatory?.fda || "N/A"}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Intended Use Statement:</p>
        <p className="text-gray-500">{product.regulatory?.intendedUseStatement || "N/A"}</p>
      </div>
    </CardContent>
  </Card>
);

const MarketInformation = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Market Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">On Market Since:</p>
          <p className="text-gray-500">{product.market?.onMarketSince || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Countries Present:</p>
          <p className="text-gray-500">{product.market?.countriesPresent || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Paying Customers:</p>
          <p className="text-gray-500">{product.market?.payingCustomers || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Research Users:</p>
          <p className="text-gray-500">{product.market?.researchUsers || "N/A"}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PricingInformation = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Pricing Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Model:</p>
          <p className="text-gray-500">{product.pricing?.model?.join(", ") || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Based On:</p>
          <p className="text-gray-500">{product.pricing?.basedOn?.join(", ") || "N/A"}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ContactInformation = ({ product }: ProductDetailsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Contact Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div>
        <p className="text-sm font-medium">Website:</p>
        <Link href={product.website || ""} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
          {product.website || "N/A"}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
      <div>
        <p className="text-sm font-medium">Support Email:</p>
        <p className="text-gray-500">{product.supportEmail || "N/A"}</p>
      </div>
    </CardContent>
  </Card>
);

const ProductHeaderInfo = ({ product }: ProductDetailsProps) => (
  <div className="mb-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-24 h-24 rounded-md overflow-hidden">
        <img src={product.logoUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
      </div>
    </div>
    <div className="flex gap-4">
      {product.productUrl && (
        <Button asChild variant="outline">
          <Link href={product.productUrl} target="_blank" rel="noopener noreferrer">
            Product Website <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {product.companyUrl && (
        <Button asChild variant="secondary">
          <Link href={product.companyUrl} target="_blank" rel="noopener noreferrer">
            Visit Company <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  </div>
);

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductHeaderInfo product={product} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInformation product={product} />
          <ProductFeatures product={product} />
          <TechnicalSpecifications product={product} />
          
          {product.category === "Auto-Contouring" && product.supportedStructures && (
            <SupportedStructures structures={product.supportedStructures} />
          )}
          
          <RegulatoryInformation product={product} />
          <MarketInformation product={product} />
          <PricingInformation product={product} />
        </div>
        
        <div className="space-y-6">
          <ContactInformation product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
