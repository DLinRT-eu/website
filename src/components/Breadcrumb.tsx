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
      'analytics': 'Analytics',
      'about': 'About',
      'support': 'Support',
      'donate': 'Donate',
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

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center text-gray-900 font-medium">
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;