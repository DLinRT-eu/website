
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InitiativeSearchProps {
  onSearch: (query: string) => void;
}

const InitiativeSearch = ({ onSearch }: InitiativeSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative w-full mb-4">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#9b87f5]" />
      <Input 
        placeholder="Search initiatives by name, description, tags..." 
        className="pl-10 bg-white border-gray-200"
        value={searchQuery}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default InitiativeSearch;
