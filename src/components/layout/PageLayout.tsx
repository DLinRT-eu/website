import React from 'react';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { usePageTracking } from '@/services/analytics/hooks/usePageTracking';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  structuredData?: any;
  className?: string;
}

const PageLayout = ({ 
  children, 
  title, 
  description, 
  canonical, 
  structuredData,
  className = ""
}: PageLayoutProps) => {
  // Auto-track page views
  usePageTracking();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {(title || description || canonical || structuredData) && (
        <SEO 
          title={title}
          description={description}
          canonical={canonical}
          structuredData={structuredData}
        />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;