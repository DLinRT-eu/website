
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the sitemap generator (we'll need to build it first or use a different approach)
const generateSitemap = async () => {
  try {
    // Since we can't directly import TypeScript in Node.js without compilation,
    // we'll create a simple version that reads the data files
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://dlinrt.eu/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/products</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/companies</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/initiatives</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/news</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/dashboard</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/support</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://dlinrt.eu/donate</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.5</priority>
  </url>
</urlset>`;
    
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(outputPath, sitemapContent);
    
    console.log('✅ Basic sitemap generated successfully!');
    console.log('📍 Output:', outputPath);
    console.log('📊 This is a placeholder. The full dynamic sitemap will be generated during build.');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

generateSitemap();
