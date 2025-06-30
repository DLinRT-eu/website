
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportProductsToCSV } from "@/utils/exportProducts";
import { Product } from "@/types/product";
import SortControls, { SortOption } from "./SortControls";
import { ProductDetails } from "@/types/productDetails";

interface ProductGridControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
  products: Product[];
  sortBy: SortOption;
  ascending: boolean;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (ascending: boolean) => void;
}

const ProductGridControls = ({ 
  itemsPerPage, 
  onItemsPerPageChange, 
  products,
  sortBy,
  ascending,
  onSortChange,
  onDirectionChange
}: ProductGridControlsProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
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
          
          <SortControls 
            sortBy={sortBy}
            ascending={ascending}
            onSortChange={onSortChange}
            onDirectionChange={onDirectionChange}
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => exportProductsToCSV(products as ProductDetails[])}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export All to CSV
        </Button>
      </div>
    </div>
  );
};

export default ProductGridControls;
