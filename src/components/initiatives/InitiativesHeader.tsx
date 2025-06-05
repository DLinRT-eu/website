
import React from 'react';
import { Beaker } from 'lucide-react';
import SEO from '@/components/SEO';

const InitiativesHeader = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Research Initiatives in Radiotherapy",
    "description": "Explore research initiatives, open datasets, model zoos, and grand challenges in radiotherapy.",
    "url": "https://dlinrt.eu/initiatives",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  return (
    <>
      <SEO
        title="Research Initiatives"
        description="Explore research initiatives, open datasets, model zoos, and grand challenges in radiotherapy. Discover resources to accelerate innovation in radiation oncology research."
        canonical="https://dlinrt.eu/initiatives"
        structuredData={structuredData}
      />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="h-8 w-8 text-[#9b87f5]" />
          <h1 className="text-3xl font-bold text-gray-900">Research Initiatives</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl">
          Discover the latest research initiatives, grand challenges, open datasets, and model zoos in the field of radiotherapy. 
          These resources aim to accelerate innovation and collaboration in radiation oncology research.
        </p>
      </div>
    </>
  );
};

export default InitiativesHeader;
