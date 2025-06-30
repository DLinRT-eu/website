
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onAdvancedSearchToggle?: (enabled: boolean) => void;
}

const SearchHeader = ({ onSearch, onAdvancedSearchToggle }: SearchHeaderProps = {}) => {
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
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for products, companies, or features..." 
              className="pl-10 bg-white border-gray-200"
              value={searchQuery}
              onChange={handleSearchInput}
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
