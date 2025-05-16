import React from 'react';
import NewsCard from '@/components/news/NewsCard';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import Footer from "@/components/Footer";

const News = () => {
  const newsItems = dataService.getAllNews();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Latest News in Radiotherapy AI",
    "description": "Stay updated with the latest developments of deep learning in Radiotherapy",
    "url": "https://dlinrt.eu/news",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Latest News"
        description="Stay updated with the latest developments and announcements in the field of deep learning in radiotherapy."
        canonical="https://dlinrt.eu/news"
        structuredData={structuredData}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <p className="text-gray-600 mb-8">
          Stay updated with the latest developments of DL in Radiotherapy
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-2 text-xs text-gray-400">
          Content is revised periodically, but the website and its maintainers do not assume any liability on possible incorrect information. Also, no copyright is infringed.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
