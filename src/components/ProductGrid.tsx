
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState } from "react";

interface FilterState {
  tasks: string[];
  locations: string[];
  companies: string[];
  certifications: string[];
}

interface ProductGridProps {
  filters?: FilterState;
}

const ProductGrid = ({ filters }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredProducts = SAMPLE_PRODUCTS.filter((product: Product) => {
    if (filters?.tasks.length && !filters.tasks.includes(product.category)) {
      return false;
    }
    if (filters?.locations.length && !product.anatomicalLocation?.some(loc => 
      filters.locations.includes(loc))) {
      return false;
    }
    if (filters?.companies.length && !filters.companies.includes(product.company)) {
      return false;
    }
    if (filters?.certifications.length && !filters.certifications.includes(
      product.certification || '')) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const headers = [
      "Name", "Company", "Category", "Certification", "Features", 
      "Anatomical Location", "Release Date", "Version", "Price",
      "Website", "Support Email", "Training Required", "Compatible Systems", 
      "User Rating", "Last Updated"
    ];
    
    const data = filteredProducts.map(product => [
      product.name,
      product.company,
      product.category,
      product.certification || "N/A",
      product.features.join(", "),
      (product.anatomicalLocation || []).join(", "),
      product.releaseDate || "N/A",
      product.version || "N/A",
      product.price ? `$${product.price}` : "N/A",
      product.website || "N/A",
      product.supportEmail || "N/A",
      product.trainingRequired ? "Yes" : "No",
      (product.compatibleSystems || []).join(", "),
      product.userRating?.toString() || "N/A",
      product.lastUpdated || "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "products.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Products per page:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={handleItemsPerPageChange}
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
          onClick={exportToExcel}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
