import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Shapes, ArrowRight, Brain, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dataService from '@/services/DataService';

const AutoContouringPage = () => {
  const autoContouringProducts = dataService.getAllProducts().filter(p => p.category === 'Auto-Contouring');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Auto-Contouring Deep Learning Solutions for Radiotherapy",
    "description": "Comprehensive guide to AI-powered automatic contouring solutions for radiation oncology. Compare products, features, and clinical evidence.",
    "url": "https://dlinrt.eu/category/auto-contouring",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": autoContouringProducts.length,
      "itemListElement": autoContouringProducts.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.description,
        "manufacturer": {
          "@type": "Organization",
          "name": product.company
        }
      }))
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: "Time Efficiency",
      description: "Reduce contouring time from hours to minutes, increasing patient throughput and reducing waiting times."
    },
    {
      icon: CheckCircle,
      title: "Consistency",
      description: "Standardize organ and target delineation across different operators and institutions."
    },
    {
      icon: Brain,
      title: "Clinical Accuracy",
      description: "AI-powered precision that matches or exceeds manual contouring quality with built-in quality assurance."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Auto-Contouring Solutions for Radiotherapy - AI Segmentation Tools"
        description="Discover the latest AI-powered auto-contouring solutions for radiation oncology. Compare features, clinical evidence, and regulatory status of deep learning segmentation tools from leading vendors."
        canonical="https://dlinrt.eu/category/auto-contouring"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shapes className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Auto-Contouring Solutions</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced deep learning algorithms for automatic segmentation of organs at risk and target volumes 
              in radiation therapy planning. Streamline your workflow with AI-powered precision.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products?task=Auto-Contouring"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/dashboard"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Analytics Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose AI-Powered Auto-Contouring?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Overview</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The auto-contouring market in radiotherapy is rapidly evolving, with <strong>{autoContouringProducts.length} solutions</strong> currently 
                  available from leading medical technology companies. These AI-powered tools are transforming radiation therapy workflows 
                  by automating the time-intensive process of organ and target delineation.
                </p>
                <p>
                  From established imaging companies like Philips and Siemens to specialized AI firms like Limbus AI and MVision, 
                  the market offers diverse approaches to automatic segmentation, each with unique strengths in accuracy, speed, 
                  and clinical integration.
                </p>
                <p>
                  Whether you're looking for comprehensive multi-organ solutions or specialized tools for specific anatomical regions, 
                  our database provides detailed comparisons of features, regulatory status, and clinical evidence to support your 
                  technology adoption decisions.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                  <span className="text-gray-700">Available Solutions</span>
                  <span className="text-2xl font-bold text-blue-600">{autoContouringProducts.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                  <span className="text-gray-700">Leading Vendors</span>
                  <span className="text-2xl font-bold text-blue-600">{new Set(autoContouringProducts.map(p => p.company)).size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Regulatory Approved</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {autoContouringProducts.filter(p => p.certification?.includes('CE') || p.certification?.includes('FDA')).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Auto-Contouring Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive database of AI-powered segmentation tools, complete with technical specifications, 
              clinical evidence, and regulatory information.
            </p>
          </div>
          <ProductGrid filters={{ tasks: ['Auto-Contouring'], locations: [], modalities: [], certifications: [] }} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Explore More?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover other deep learning solutions across the complete radiotherapy workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/category/treatment-planning"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Treatment Planning
            </Link>
            <Link 
              to="/category/image-synthesis"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Image Synthesis
            </Link>
            <Link 
              to="/category/image-enhancement"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Image Enhancement
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AutoContouringPage;