
import { useMemo } from "react";
import { ProductDetails } from "@/types/productDetails";
import { SortOption } from "./SortControls";

interface ProductSortingProps {
  products: ProductDetails[];
  sortBy: SortOption;
  ascending: boolean;
}

export const useProductSorting = ({ products, sortBy, ascending }: ProductSortingProps) => {
  return useMemo(() => {
    if (sortBy === "random") {
      return products;
    }
    
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "releaseDate":
          // Handle potentially undefined release dates
          const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case "lastUpdated":
          // Handle potentially undefined last updated dates
          const aUpdated = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const bUpdated = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          comparison = aUpdated - bUpdated;
          break;
      }
      
      // Apply direction
      return ascending ? comparison : -comparison;
    });
  }, [products, sortBy, ascending]);
};

export const useProductShuffle = (products: ProductDetails[]) => {
  return useMemo(() => {
    const arr = [...products];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [products]);
};
