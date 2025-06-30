
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, Download, FileText } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { exportModelCardToExcel, exportModelCardToCSV, exportModelCardToJSON } from "@/utils/modelCardExport";
import { toast } from "sonner";

interface ModelCardExportControlsProps {
  products: ProductDetails[];
  selectedProduct?: ProductDetails;
}

const ModelCardExportControls = ({ products, selectedProduct }: ModelCardExportControlsProps) => {
  const [exportFormat, setExportFormat] = useState<"excel" | "csv" | "json">("excel");
  const [exportProduct, setExportProduct] = useState<string>(selectedProduct?.id || "");

  const handleExport = () => {
    const product = products.find(p => p.id === exportProduct);
    if (!product) {
      toast.error("Please select a product to export");
      return;
    }

    try {
      switch (exportFormat) {
        case "excel":
          exportModelCardToExcel(product);
          toast.success(`Model card exported to Excel for ${product.name}`);
          break;
        case "csv":
          exportModelCardToCSV(product);
          toast.success(`Model card exported to CSV for ${product.name}`);
          break;
        case "json":
          exportModelCardToJSON(product);
          toast.success(`Model card exported to JSON for ${product.name}`);
          break;
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export model card");
    }
  };

  const getIcon = () => {
    switch (exportFormat) {
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "csv":
        return <FileText className="h-4 w-4" />;
      case "json":
        return <Download className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Model Card:</span>
        <Select value={exportProduct} onValueChange={setExportProduct}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select product..." />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id || ""}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={exportFormat} onValueChange={(value: "excel" | "csv" | "json") => setExportFormat(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excel">Excel (.xlsx)</SelectItem>
            <SelectItem value="csv">CSV (.csv)</SelectItem>
            <SelectItem value="json">JSON (.json)</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center gap-2"
          disabled={!exportProduct}
        >
          {getIcon()}
          Export
        </Button>
      </div>
    </div>
  );
};

export default ModelCardExportControls;
