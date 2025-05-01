
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import SEO from '@/components/SEO';
import dataService from '@/services/DataService';

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const company = dataService.getCompanyById(id || '');

  if (!company) {
    return (
      <Container className="py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Company not found</h1>
          <p className="mt-2 text-gray-600">The company you're looking for doesn't exist or has been removed.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <SEO
        title={`${company.name} | Deep Learning in Radiotherapy`}
        description={`Learn about ${company.name} and their AI/ML solutions for radiotherapy`}
        canonical={`https://dlinrt.eu/company/${id}`}
      />
      
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="mt-4 text-lg text-gray-700">{company.description}</p>
            
            {company.website && (
              <div className="mt-6">
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                  Visit company website
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.productIds.length > 0 ? (
              company.productIds.map(productId => {
                const product = dataService.getProductById(productId);
                if (!product) return null;
                
                return (
                  <div 
                    key={productId} 
                    className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
                    <div className="mt-4">
                      <a
                        href={`/product/${productId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View details
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-full">No products found for this company.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompanyDetails;
