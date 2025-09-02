
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import Footer from "@/components/Footer";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsItem = dataService.getNewsById(id || '');

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="News Not Found"
          description="The requested news article could not be found."
          canonical={`https://dlinrt.eu/news`}
        />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">News Article Not Found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": newsItem.title,
    "description": newsItem.summary,
    "datePublished": newsItem.date,
    "author": {
      "@type": "Organization",
      "name": "DLinRT"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={newsItem.title}
        description={newsItem.summary}
        canonical={`https://dlinrt.eu/news/${id}`}
        ogType="article"
        structuredData={structuredData}
      />
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
        <p className="text-gray-600 text-lg leading-relaxed mb-8">{newsItem.summary}</p>
        
        {newsItem.content && (
          <div className="prose prose-blue max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 prose-strong:text-blue-600">
            <ReactMarkdown
              allowedElements={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre']}
              disallowedElements={['script', 'iframe', 'object', 'embed']}
            >
              {newsItem.content}
            </ReactMarkdown>
          </div>
        )}
        <div className="text-center mt-2 text-xs text-gray-400">
          Content is revised periodically, but the website and its maintainers do not assume any liability on possible incorrect information. Also, no copyright is infringed.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
