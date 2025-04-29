
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ProductDetails } from "@/types/productDetails";

interface TechnicalSpecificationsProps {
  product: ProductDetails;
}

const TechnicalSpecificationsDetails = ({ product }: TechnicalSpecificationsProps) => (
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

export default TechnicalSpecificationsDetails;
