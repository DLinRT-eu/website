
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import dataService from '@/services/DataService';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsItem = dataService.getNewsById(id || '');

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">News Article Not Found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <time className="text-sm text-blue-600 mb-2 block">{newsItem.date}</time>
        <h1 className="text-3xl font-bold mb-6">{newsItem.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">{newsItem.summary}</p>
        
        {newsItem.content && (
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{newsItem.content}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsDetail;
