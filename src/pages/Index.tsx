import React from 'react';
import IntroSection from "@/components/IntroSection";
import NewsSection from "@/components/NewsSection";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import TaskTaxonomy from "@/components/TaskTaxonomy";
import { getAllOptions } from "@/utils/filterOptions";
import dataService from "@/services/DataService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import NewsletterSignupCompact from "@/components/NewsletterSignupCompact";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deep Learning in Radiotherapy",
    "url": "https://dlinrt.eu",
    "logo": "https://dlinrt.eu/logo.png",
    "description": "Search and explore deep learning products in Radiotherapy"
  };

  // Get all products and count by category
  const allProducts = dataService.getAllProducts();
  const categories = getAllOptions('category');
  const categoryCounts = categories.map(category => ({
    name: category,
    count: allProducts.filter(p => p.category === category).length
  }));

  // Handle category click by navigating to products page with filter
  const handleCategoryClick = (category: string) => {
    toast.info(`Exploring ${category} products`);
    navigate(`/products?task=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Deep Learning in Radiotherapy"
        description="Search and explore DL products in Radiotherapy - the leading database for deep learning solutions in radiation oncology."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />
      <IntroSection />
      
      {/* Website Description Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Advancing Radiotherapy Through AI Innovation
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                DLinRT.eu is a dedicated resource for commercial deep learning (DL) solutions in radiation oncology, 
                focused on the European market and beyond. The platform supports the integration of DL technologies 
                into routine clinical practice in radiotherapy.
              </p>
              <p className="mb-4">
                We catalogue and evaluate DL products across the radiotherapy workflow—from image reconstruction 
                and enhancement to auto-contouring, treatment planning, and clinical prediction. Each product entry 
                includes technical specifications, regulatory status, clinical evidence, and market availability.
              </p>
              <p>
                Whether you're a medical physicist seeking auto-contouring tools, a radiation oncologist exploring 
                treatment planning solutions, or a healthcare administrator reviewing new technologies, DLinRT.eu 
                provides clear, up-to-date information to support informed decision-making. Our goal is to promote 
                the safe and effective adoption of DL tools in clinical radiotherapy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <TaskTaxonomy 
          categories={categoryCounts} 
          onCategoryClick={handleCategoryClick}
          filterType="task"
        />
      </div>

      {/* Newsletter Signup Section - Moved below TaskTaxonomy */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Stay Connected</h2>
                <p className="text-gray-600 mb-4">
                  Join our community to receive updates about new deep learning products, research initiatives, 
                  and developments in radiotherapy AI. Be part of the movement advancing patient care through technology.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>✓ Product updates</span>
                  <span>✓ Research news</span>
                  <span>✓ Community events</span>
                </div>
              </div>
              <div className="flex justify-center">
                <NewsletterSignupCompact />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsSection />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Footer />
      </main>
    </div>
  );
};

export default Index;
