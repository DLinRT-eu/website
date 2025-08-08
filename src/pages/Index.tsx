
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
import MailingListSignup from "@/components/MailingListSignup";
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
        title="DLinRT - Deep learning-based products database for radiotherapy"
        description="Search and explore deep learning products for auto-contouring, treatment planning, and imaging in radiation oncology."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />
      <IntroSection />
      
      {/* Website Description Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                DLinRT.eu is a dedicated resource for <Link to="/products" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">commercial deep learning (DL) solutions</Link> in radiation oncology, 
                focused on the European market and beyond. The platform supports the integration of DL technologies 
                into routine clinical practice in radiotherapy.
              </p>
              <p className="mb-4">
                We <Link to="/products" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">catalogue and evaluate DL products</Link> across the radiotherapy workflow—from image reconstruction 
                and enhancement to auto-contouring, treatment planning, and clinical prediction. Each product entry 
                includes technical specifications, regulatory status, clinical evidence, and market availability. 
                Our <Link to="/dashboard" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">analytics dashboard</Link> delivers quantitative insights into how deep learning solutions are distributed across different categories and market segments, while our <Link to="/companies" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">companies directory</Link> highlights 
                the vendors pioneering deep learning integration in radiotherapy product development.
              </p>
              <p className="mb-4">
                Whether you're a medical physicist seeking <Link to="/products?task=Auto-contouring" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">auto-contouring tools</Link>, a radiation oncologist exploring 
                <Link to="/products?task=Treatment%20Planning" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline"> treatment planning solutions</Link>, or a healthcare administrator reviewing new technologies, DLinRT.eu 
                provides clear, up-to-date information to support informed decision-making. Our goal is to promote 
                the safe and effective adoption of DL tools in clinical radiotherapy. Learn more about our mission 
                and team on our <Link to="/about" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">about page</Link>, explore ongoing <Link to="/initiatives" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">research initiatives</Link>, or reach out through our <Link to="/support" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">support center</Link>.
              </p>
              <p>
                Stay informed about the latest developments in the field through our <Link to="/news" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">news section</Link>, which covers 
                product updates, research breakthroughs, and industry announcements. For questions, feedback, or 
                collaboration opportunities, our <Link to="/support" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">support team</Link> is ready to assist you in navigating 
                the evolving landscape of deep learning in radiotherapy.
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

      {/* Mailing List Signup Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Join Our Mailing List</h2>
                <p className="text-gray-600 mb-4">
                  Stay informed about the latest deep learning solutions in radiotherapy. Get updates on new products, 
                  industry news, and community announcements delivered to your inbox.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <MailingListSignup />
                </div>
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
