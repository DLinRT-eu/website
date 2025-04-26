
import SearchHeader from "@/components/SearchHeader";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
          <span className="text-sm text-gray-500">Showing all products</span>
        </div>
        <FilterBar />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
