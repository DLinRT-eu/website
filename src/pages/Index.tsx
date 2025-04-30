
import React from 'react';
import IntroSection from "@/components/IntroSection";
import NewsSection from "@/components/NewsSection";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '@/components/CookieConsent';

const Index = () => {
  const { updateCookieConsent } = useCookieConsent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deep Learning in Radiotherapy",
    "url": "https://dlinrt.eu",
    "logo": "https://dlinrt.eu/logo.png",
    "description": "Search and explore deep learning products in Radiotherapy"
  };

  const handleOpenCookieSettings = () => {
    // Reset consent to trigger the cookie consent dialog
    localStorage.removeItem("cookie-consent");
    // Force a refresh to show the cookie dialog
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Deep Learning in Radiotherapy"
        description="Search and explore AI products in Radiotherapy - the leading database for deep learning solutions in radiation oncology."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />
      <IntroSection />
      <NewsSection />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <footer className="mt-16 border-t border-gray-200 pt-8 pb-12">
          <div className="flex justify-center space-x-8">
            <Link 
              to="/maintenance-team" 
              className="text-[#00A6D6] hover:text-[#00A6D6]/80 transition-colors duration-200"
            >
              Meet Our Maintenance Team
            </Link>
            <Link 
              to="/donate" 
              className="text-[#9b87f5] hover:text-[#8b5cf6] transition-colors duration-200"
            >
              Support Our Project
            </Link>
            <Button 
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 p-0 h-auto"
              onClick={handleOpenCookieSettings}
            >
              <Cookie className="w-4 h-4" />
              Cookie Settings
            </Button>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            &copy; <a href="https://github.com/DLinRT-eu" target="_blank" rel="noopener noreferrer" className="hover:underline">DLinRT.eu</a>, 2025
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
