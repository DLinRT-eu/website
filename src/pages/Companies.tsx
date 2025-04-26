
import React, { useState, useMemo } from 'react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import CompanyCard from '@/components/CompanyCard';
import { Product } from '@/types/product';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group products by company
  const companiesWithProducts = useMemo(() => {
    // Create a map of company names to arrays of products
    const companyMap = SAMPLE_PRODUCTS.reduce((acc: Record<string, Product[]>, product) => {
      if (!acc[product.company]) {
        acc[product.company] = [];
      }
      acc[product.company].push(product);
      return acc;
    }, {});

    // Convert to array of company objects
    return Object.entries(companyMap).map(([name, products]) => ({
      name,
      products,
      productCount: products.length
    }));
  }, []);

  // Filter companies based on search query
  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companiesWithProducts;
    
    const query = searchQuery.toLowerCase();
    return companiesWithProducts.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.products.some(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      )
    );
  }, [companiesWithProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Companies</h1>
        <p className="text-gray-600 mb-8">
          Discover companies developing AI solutions for radiotherapy.
        </p>

        {/* Search input */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search for companies or their products..." 
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Companies count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
          </p>
        </div>

        {/* Companies list */}
        <div className="space-y-6">
          {filteredCompanies.map((company) => (
            <CompanyCard 
              key={company.name} 
              name={company.name} 
              products={company.products} 
            />
          ))}
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Companies;
