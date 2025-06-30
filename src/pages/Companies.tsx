
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Building, ArrowDownAZ, ArrowDownZA } from 'lucide-react';
import CompanyCard from '@/components/CompanyCard';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [sortActive, setSortActive] = useState(false);

  // Get companies and their products, filtering out companies with no products
  const companies = useMemo(() => {
    return dataService.getAllCompanies()
      .map(company => ({
        ...company,
        products: dataService.getProductsByCompany(company.id),
        productCount: dataService.getProductsByCompany(company.id).length
      }))
      .filter(company => company.productCount > 0);
  }, []);

  // Shuffle companies randomly on each reload (only once)
  const shuffledCompanies = useMemo(() => {
    const arr = [...companies];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [companies]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Radiotherapy DL Companies",
    "description": "Leading companies developing innovative DL solutions for radiation therapy",
    "url": "https://dlinrt.eu/companies",
    "itemListOrder": "Unordered",
    "numberOfItems": shuffledCompanies.length,
    "itemListElement": shuffledCompanies.map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": company.name,
        "description": company.description,
        "url": company.website
      }
    }))
  };

  // Filter companies based on search query
  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return shuffledCompanies;
    
    const query = searchQuery.toLowerCase();
    return shuffledCompanies.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query) ||
      company.products.some(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      )
    );
  }, [shuffledCompanies, searchQuery]);

  // Sort companies based on name only if sortActive is true
  const sortedCompanies = useMemo(() => {
    if (!sortActive) return filteredCompanies;
    return [...filteredCompanies].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAscending ? comparison : -comparison;
    });
  }, [filteredCompanies, sortAscending, sortActive]);

  const toggleSortDirection = () => {
    setSortActive(true);
    setSortAscending(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Companies"
        description="Explore leading companies developing innovative DL solutions for radiation therapy, medical imaging synthesis, and clinical decision support in radiotherapy."
        canonical="https://dlinrt.eu/companies"
        structuredData={structuredData}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Building className="h-8 w-8 text-[#00A6D6]" />
          <h1 className="text-3xl font-bold">Companies</h1>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore leading companies developing innovative AI solutions for radiation therapy, medical imaging synthesis, and clinical decision support in radiotherapy.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search companies or products..." 
              className="pl-10 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Sort button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            title={sortAscending ? "Sort Z-A" : "Sort A-Z"}
            className="h-10 w-10"
          >
            {sortAscending ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowDownZA className="h-4 w-4" />}
          </Button>
        </div>

        {/* Companies count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedCompanies.length} {sortedCompanies.length === 1 ? 'company' : 'companies'}
            {sortActive ? (sortAscending ? ' (A-Z)' : ' (Z-A)') : ' (Random order)'}
          </p>
        </div>

        {/* Companies list */}
        <div className="space-y-6">
          {sortedCompanies.map((company) => (
            <CompanyCard 
              key={company.id} 
              name={company.name}
              website={company.website}
              logoUrl={company.logoUrl}
              products={company.products as any[]}
              description={company.description}
            />
          ))}
          
          {sortedCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Companies;
