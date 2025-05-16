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
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
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
      
      {/* Black Paper Download Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">DLinRT.eu Intent & Roadmap</h2>
          <p className="text-gray-600 mb-4">
            Learn more about our mission, goals, and future plans—rooted in our non-profit, independent, open-source, and community-driven ethos—in our official Black Paper document
          </p>
          <p className="text-gray-600 mb-4">
            Learn more about our mission, goals and future plans in our official Black Paper document.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white hover:bg-gray-100 border border-gray-200 shadow-sm"
            asChild
          >
            <a 
              href="/DLinRT_eu_Intent_Roadmap_v0_1.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <FileDown className="h-5 w-5" />
              <span>Download Black Paper (PDF)</span>
            </a>
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <TaskTaxonomy 
          categories={categoryCounts} 
          onCategoryClick={handleCategoryClick}
          filterType="task"
        />
      </div>

      <NewsSection />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Footer />
      </main>
    </div>
  );
};

export default Index;
