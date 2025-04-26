import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";

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

  const exportToExcel = () => {
    const headers = ["Name", "Company", "Category", "Certification", "Features", "Anatomical Location"];
    const data = filteredProducts.map(product => [
      product.name,
      product.company,
      product.category,
      product.certification || "N/A",
      product.features.join(", "),
      (product.anatomicalLocation || []).join(", ")
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

  return (
    <div>
      <div className="mb-6 flex justify-end">
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
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
