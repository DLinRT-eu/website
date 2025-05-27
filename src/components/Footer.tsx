
import React from 'react';
import { Link } from 'react-router-dom';
import RSSIcon from './RSSIcon';

const Footer = () => {
  const rssUrl = "https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/rss-feed";

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
              Terms of Use
            </Link>
            <a href="https://github.com/DLinRT-eu/website" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
              GitHub
            </a>
          </div>
          
          <div className="flex items-center">
            <a 
              href={rssUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <RSSIcon className="h-4 w-4" />
              RSS Feed
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DLinRT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
