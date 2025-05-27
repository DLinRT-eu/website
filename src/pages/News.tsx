
import React from 'react';
import NewsCard from '@/components/news/NewsCard';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import Footer from "@/components/Footer";
import RSSIcon from '@/components/RSSIcon';

const News = () => {
  const newsItems = dataService.getAllNews();
  const rssUrl = "https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/rss-feed";
  
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Latest News</h1>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest developments of DL in Radiotherapy
            </p>
          </div>
          <a
            href={rssUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
            title="Subscribe to RSS Feed"
          >
            <RSSIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Subscribe RSS</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
