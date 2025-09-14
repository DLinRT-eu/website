
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import DebouncedSearchWithSuggestions from "@/components/search/DebouncedSearchWithSuggestions";
import { ProductDetails } from "@/types/productDetails";

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onAdvancedSearchToggle?: (enabled: boolean) => void;
  products?: ProductDetails[];
}

const SearchHeader = ({ onSearch, onAdvancedSearchToggle, products = [] }: SearchHeaderProps = {}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleAdvancedToggle = (enabled: boolean) => {
    setAdvancedSearch(enabled);
    onAdvancedSearchToggle?.(enabled);
  };

  return (
    <section className="w-full bg-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          DL in Radiotherapy products
        </h1>
        <div className="flex flex-col gap-4">
          <div className="max-w-2xl">
            <DebouncedSearchWithSuggestions
              onSearch={onSearch || (() => {})}
              products={products}
              placeholder="Search for products, companies, or features..."
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="advanced-search" 
              checked={advancedSearch}
              onCheckedChange={handleAdvancedToggle}
            />
            <Label htmlFor="advanced-search" className="text-sm text-gray-600">
              Advanced search (search in all fields including technical specifications, regulatory info, etc.)
            </Label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHeader;
