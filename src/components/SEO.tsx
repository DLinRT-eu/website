
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  canonical = 'https://dlinrt.eu',
  ogType = 'website',
  ogImage = '/opengraph-image.png', // Using relative path
  structuredData,
  noindex = false,
}: SEOProps) => {
  const fullTitle = `${title} | DLinRT`;
  
  // Determine if we're in development or production
  const isDev = import.meta.env.DEV;
  
  // Adjust paths for development vs production
  const resolvedOgImage = isDev ? ogImage : `https://dlinrt.eu${ogImage}`;
  const resolvedCanonical = isDev && (() => {
    try {
      const parsedUrl = new URL(canonical);
      return parsedUrl.host === 'dlinrt.eu';
    } catch {
      return false;
    }
  })()
    ? canonical.replace('https://dlinrt.eu', '') 
    : canonical;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      {noindex && <meta name="robots" content="noindex" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
