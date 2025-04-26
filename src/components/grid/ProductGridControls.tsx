
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportProductsToCSV } from "@/utils/exportProducts";
import { Product } from "@/types/product";

interface ProductGridControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
  products: Product[];
}

const ProductGridControls = ({ 
  itemsPerPage, 
  onItemsPerPageChange, 
  products 
}: ProductGridControlsProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Products per page:</span>
        <Select
          value={String(itemsPerPage)}
          onValueChange={onItemsPerPageChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((number) => (
              <SelectItem key={number} value={String(number)}>
                {number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        onClick={() => exportProductsToCSV(products)}
        className="flex items-center gap-2"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export to CSV
      </Button>
    </div>
  );
};

export default ProductGridControls;
