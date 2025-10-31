
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
import QuickAccessSection from "@/components/homepage/QuickAccessSection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Building2, FileText, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, activeRole } = useAuth();
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
  const allCompanies = dataService.getAllCompanies();
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

  // Personalized dashboard for authenticated users
  const renderAuthenticatedView = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO 
        title="Dashboard - DLinRT"
        description="Your personalized dashboard for deep learning products in radiotherapy"
        noindex={true}
      />
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#00A6D6] to-[#0086b3] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {profile?.first_name}!
          </h1>
          <p className="text-lg text-white/90">
            {activeRole === 'admin' && "Manage users, reviews, and system settings"}
            {activeRole === 'reviewer' && "Review products and validate compliance"}
            {activeRole === 'company' && "Manage your company's product information"}
            {(!activeRole || activeRole === 'user') && "Explore deep learning solutions in radiotherapy"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {activeRole === 'admin' && (
            <>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5" />
                    Admin Panel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Manage users and system settings</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/review-dashboard')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Review product submissions</p>
                </CardContent>
              </Card>
            </>
          )}
          {(activeRole === 'reviewer' || activeRole === 'admin') && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/reviewer/dashboard')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  My Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View your assigned reviews</p>
              </CardContent>
            </Card>
          )}
          {(activeRole === 'company' || activeRole === 'admin') && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/company/dashboard')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5" />
                  Company Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage your products</p>
              </CardContent>
            </Card>
          )}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Browse all products</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View market insights</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/my-products')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                My Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Track your adoptions</p>
            </CardContent>
          </Card>
        </div>

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

  return user ? renderAuthenticatedView() : (
    <div className="min-h-screen bg-white">
      <SEO 
        title="DLinRT - Deep learning-based products database for radiotherapy"
        description="Search and explore deep learning products for auto-contouring, treatment planning, and imaging in radiation oncology."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />
      <IntroSection />
      
      {/* Quick Access Section */}
      <QuickAccessSection 
        productCount={allProducts.length}
        companyCount={allCompanies.length}
      />
      
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
                Beyond product cataloguing, our <Link to="/resources-compliance" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">Resources & Compliance section</Link> provides essential regulatory guidance, 
                practical compliance checklists, and comprehensive standards documentation to support the safe deployment 
                of deep learning solutions in clinical radiotherapy workflows. From understanding the regulatory landscape 
                to implementing quality management systems and post-market surveillance, we offer actionable resources 
                for both newcomers and experts navigating the complex requirements of medical AI deployment.
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
