
import React from "react";
import { Link } from "react-router-dom";
import NewsletterSignupCompact from "@/components/NewsletterSignupCompact";

const Footer = () => (
  <footer className="mt-16 border-t border-gray-200 pt-8 pb-12">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <NewsletterSignupCompact />
        </div>
        
        <div className="md:col-span-1 lg:col-span-2">
          <div className="text-center text-xs text-gray-400">
            <div>
              This website's content is periodically reviewed. The maintainers assume no liability for inaccuracies. All information is provided for general use, with no copyright infringement intended.
            </div>
            <div className="mt-2">
              <Link to="/privacy-policy" className="underline hover:text-gray-600" aria-label="Privacy Policy">Privacy Policy</Link>
            </div>
            <div className="mt-2">
              &copy; {new Date().getFullYear()} DLinRT.eu
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
