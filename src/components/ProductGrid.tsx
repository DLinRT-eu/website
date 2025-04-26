import { useState } from "react";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductGridControls from "./grid/ProductGridControls";
import ProductPagination from "./grid/ProductPagination";

interface FilterState {
  tasks: string[];
  locations: string[];
  companies: string[];
  certifications: string[];
  modalities: string[];
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
    if (filters?.modalities.length && !filters.modalities.includes(
      product.modality || '')) {
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

  return (
    <div>
      <ProductGridControls
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        products={filteredProducts}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
