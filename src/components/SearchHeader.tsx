
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchHeader = () => {
  return (
    <section className="w-full bg-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          DL in Radiotherapy products
        </h1>
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search for products, companies, or features..." 
            className="pl-10 bg-white border-gray-200"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchHeader;
