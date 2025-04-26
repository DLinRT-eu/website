
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import dataService from '@/services/DataService';

const News = () => {
  const newsItems = dataService.getAllNews();
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <p className="text-gray-600 mb-8">
          Stay updated with the latest developments in AI radiotherapy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link key={item.id} to={`/news/${item.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <time className="text-sm text-blue-600 mb-2 block">{item.date}</time>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
