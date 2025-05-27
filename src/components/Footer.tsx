import React from 'react';
import { Link } from 'react-router-dom';
import MailingListSignupCompact from './MailingListSignupCompact';
import RSSIcon from './RSSIcon';

const Footer = () => {
  const rssUrl = "https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/rss-feed";

  return (
    <footer className="bg-gray-50 border-t">
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <MailingListSignupCompact />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About DLinRT</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/maintenance-team" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Maintenance Team
                </Link>
              </li>
              <li>
                <a href="https://github.com/DLinRT-eu/website" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=AI-based Segmentation" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  AI-based Segmentation
                </Link>
              </li>
              <li>
                <Link to="/products?category=AI-based Treatment Planning" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  AI-based Treatment Planning
                </Link>
              </li>
              <li>
                <Link to="/products?category=AI-based QA" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  AI-based QA
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Support & Contact
                </Link>
              </li>
              <li>
                <a 
                  href={rssUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200 flex items-center gap-2"
                >
                  <RSSIcon className="h-4 w-4" />
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-8">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} DLinRT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
