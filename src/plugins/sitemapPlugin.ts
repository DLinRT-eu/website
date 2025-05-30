
import type { Plugin } from 'vite';
import { generateSitemapXML, getSitemapStats } from '../utils/generateSitemap';

export function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap-generator',
    generateBundle() {
      try {
        const sitemapContent = generateSitemapXML();
        const stats = getSitemapStats();
        
        // Emit the sitemap file
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemapContent
        });
        
        console.log('\n🗺️  Dynamic Sitemap Generated Successfully!');
        console.log(`📊 Stats: ${stats.totalUrls} URLs, ${stats.productUrls} products, ${stats.imagesIncluded} images`);
        console.log(`📂 Categories: ${stats.categoryUrls}, Companies: ${stats.companyUrls}, News: ${stats.newsUrls}`);
        
      } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        throw error;
      }
    }
  };
}
