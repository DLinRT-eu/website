import { ALL_PRODUCTS, COMPANIES, NEWS_ITEMS, ALL_INITIATIVES } from '@/data';
import { ProductDetails } from '@/types/productDetails.d';
import { CompanyDetails } from '@/types/company.d';
import { NewsItem } from '@/types/news.d';
import { Initiative } from '@/types/initiative.d';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
  }>;
}

/**
 * Calculate priority based on product characteristics
 */
function calculateProductPriority(product: ProductDetails): number {
  let priority = 0.7; // Base priority for products
  
  // Higher priority for products with regulatory approval
  if (product.regulatory?.ce?.status === 'Certified' || product.regulatory?.fda) {
    priority += 0.1;
  }
  
  // Higher priority for auto-contouring (most popular category)
  if (product.category === 'Auto-Contouring') {
    priority += 0.1;
  }
  
  // Higher priority for products with recent updates
  if (product.lastRevised) {
    const lastRevised = new Date(product.lastRevised);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    if (lastRevised > sixMonthsAgo) {
      priority += 0.05;
    }
  }
  
  return Math.min(priority, 0.9); // Cap at 0.9
}

/**
 * Format date for XML sitemap
 */
function formatSitemapDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Generate sitemap URLs for all content
 */
function generateSitemapUrls(): SitemapUrl[] {
  const baseUrl = 'https://dlinrt.eu';
  const urls: SitemapUrl[] = [];
  
  // Main pages
  urls.push(
    {
      loc: `${baseUrl}/`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/products`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/companies`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/initiatives`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/news`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/dashboard`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/support`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/donate`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'yearly',
      priority: 0.5
    }
  );
  
  // Category landing pages
  const categories: string[] = [...new Set(ALL_PRODUCTS.map((p: ProductDetails) => p.category).filter((cat: unknown): cat is string => typeof cat === 'string'))];
  categories.forEach((category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    urls.push({
      loc: `${baseUrl}/products?task=${encodeURIComponent(category)}`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'weekly',
      priority: 0.8
    });
  });
  
  // Product detail pages
  ALL_PRODUCTS.forEach((product: ProductDetails) => {
    if (!product.id) return;
    
    const images: Array<{ loc: string; caption?: string; title?: string }> = [];
    
    // Add product logo if available
    if (product.logoUrl && !product.logoUrl.includes('placeholder')) {
      images.push({
        loc: `${baseUrl}${product.logoUrl}`,
        caption: `${product.name} by ${product.company}`,
        title: product.name
      });
    }
    
    urls.push({
      loc: `${baseUrl}/product/${product.id}`,
      lastmod: product.lastRevised ? formatSitemapDate(product.lastRevised) : formatSitemapDate(new Date()),
      changefreq: 'monthly',
      priority: calculateProductPriority(product),
      images: images.length > 0 ? images : undefined
    });
  });
  
  // Company pages
  COMPANIES.forEach((company: CompanyDetails) => {
    urls.push({
      loc: `${baseUrl}/company/${company.id}`,
      lastmod: formatSitemapDate(new Date()),
      changefreq: 'monthly',
      priority: 0.6
    });
  });
  
  // News pages
  NEWS_ITEMS.forEach((news: NewsItem) => {
    urls.push({
      loc: `${baseUrl}/news/${news.id}`,
      lastmod: formatSitemapDate(news.date),
      changefreq: 'never',
      priority: 0.5
    });
  });
  
  return urls;
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(): string {
  const urls = generateSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    
    if (url.changefreq) {
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    
    if (url.priority !== undefined) {
      xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    }
    
    // Add image sitemap data
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image.loc}</image:loc>\n`;
        if (image.caption) {
          xml += `      <image:caption>${escapeXML(image.caption)}</image:caption>\n`;
        }
        if (image.title) {
          xml += `      <image:title>${escapeXML(image.title)}</image:title>\n`;
        }
        xml += '    </image:image>\n';
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats() {
  const urls = generateSitemapUrls();
  
  return {
    totalUrls: urls.length,
    productUrls: urls.filter(u => u.loc.includes('/product/')).length,
    companyUrls: urls.filter(u => u.loc.includes('/company/')).length,
    newsUrls: urls.filter(u => u.loc.includes('/news/')).length,
    categoryUrls: urls.filter(u => u.loc.includes('?task=')).length,
    imagesIncluded: urls.reduce((sum, url) => sum + (url.images?.length || 0), 0)
  };
}
