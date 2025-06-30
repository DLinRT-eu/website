
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardEdit, FileSpreadsheet, Download, FileText, FileImage } from "lucide-react";
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
import EvidenceLimitationsDetails from "./product/EvidenceLimitationsDetails";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: ProductDetailsType;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();

  const handleExportExcel = () => {
    import("@/utils/modelCard").then(({ exportModelCardToExcel }) => {
      exportModelCardToExcel(product);
      toast.success(`Model card exported to Excel for ${product.name}`);
    }).catch(() => {
      toast.error("Failed to export model card to Excel");
    });
  };

  const handleExportCSV = () => {
    import("@/utils/modelCard").then(({ exportModelCardToCSV }) => {
      exportModelCardToCSV(product);
      toast.success(`Model card exported to CSV for ${product.name}`);
    }).catch(() => {
      toast.error("Failed to export model card to CSV");
    });
  };

  const handleExportJSON = () => {
    import("@/utils/modelCard").then(({ exportModelCardToJSON }) => {
      exportModelCardToJSON(product);
      toast.success(`Model card exported to JSON for ${product.name}`);
    }).catch(() => {
      toast.error("Failed to export model card to JSON");
    });
  };

  const handleExportPDF = () => {
    import("@/utils/modelCard").then(({ exportModelCardToPDF }) => {
      exportModelCardToPDF(product);
      toast.success(`Model card exported to PDF for ${product.name}`);
    }).catch(() => {
      toast.error("Failed to export model card to PDF");
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <ProductHeaderInfo product={product} />
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-4"
          onClick={() => navigate(`/review/${product.id}`)}
        >
          <ClipboardEdit className="h-4 w-4 mr-2" />
          Review Mode
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInformationDetails product={product} />
          <ProductFeaturesDetails product={product} />
          <TechnicalSpecificationsDetails product={product} />
          
          {product.category === "Auto-Contouring" && product.supportedStructures && (
            <SupportedStructures structures={product.supportedStructures} />
          )}
          
          <EvidenceLimitationsDetails product={product} />
          <RegulatoryInformationDetails product={product} />
          <MarketInformationDetails product={product} />
          <PricingInformationDetails product={product} />
        </div>
        
        <div className="space-y-6">
          <ContactInformation product={product} />
          
          {/* Model Card Export Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Export Model Card</h3>
            <div className="space-y-3">
              <Button
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center gap-2"
                variant="default"
              >
                <FileImage className="h-4 w-4" />
                Export to PDF
              </Button>
              
              <Button
                onClick={handleExportExcel}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Export to Excel
              </Button>
              
              <Button
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="h-4 w-4" />
                Export to CSV
              </Button>
              
              <Button
                onClick={handleExportJSON}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <FileText className="h-4 w-4" />
                Export to JSON
              </Button>
            </div>
          </div>
          
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
