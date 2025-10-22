import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    // Map path segments to readable labels
    const pathLabels: Record<string, string> = {
      'products': 'Products',
      'product': 'Product Details',
      'companies': 'Companies',
      'news': 'News',
      'initiatives': 'Initiatives', 
      'dashboard': 'Dashboard',
      
      'about': 'About',
      'support': 'Support',
      
      'timeline': 'Timeline',
      'review': 'Review',
      'privacy-policy': 'Privacy Policy',
      'terms-of-use': 'Terms of Use',
      'security': 'Security',
      'category': 'Categories',
      'auto-contouring': 'Auto-Contouring',
      'treatment-planning': 'Treatment Planning',
      'image-synthesis': 'Image Synthesis',
      'image-enhancement': 'Image Enhancement',
      'reconstruction': 'Reconstruction',
      'clinical-prediction': 'Clinical Prediction',
      'registration': 'Registration',
      'performance-monitor': 'Performance Monitor'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  // Sanitize breadcrumb data to prevent injection attacks
  const sanitizeText = (text: string): string => {
    // Remove any HTML tags and special characters that could be exploited
    return text.replace(/[<>\"']/g, '').trim();
  };

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": sanitizeText(item.label),
      ...(item.href && { "item": `${window.location.origin}${sanitizeText(item.href)}` })
    }))
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav aria-label="Breadcrumb" className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            {breadcrumbItems.map((item, index) => (
              <li 
                key={index} 
                className="flex items-center"
                itemProp="itemListElement"
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
                )}
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">
                      {index === 0 && <Home className="h-4 w-4 mr-1" aria-label="Home" />}
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span 
                    className="flex items-center text-foreground font-medium"
                    itemProp="name"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" aria-label="Home" />}
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;