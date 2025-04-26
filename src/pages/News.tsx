
import React from 'react';
import NewsCard from '@/components/news/NewsCard';
import dataService from '@/services/DataService';

const News = () => {
  const newsItems = dataService.getAllNews();
  
  return (
    <div className="min-h-screen bg-white">
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
      </main>
    </div>
  );
};

export default News;
