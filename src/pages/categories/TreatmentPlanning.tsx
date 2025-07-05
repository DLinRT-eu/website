import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Target, ArrowRight, Zap, Brain, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dataService from '@/services/DataService';

const TreatmentPlanningPage = () => {
  const treatmentPlanningProducts = dataService.getAllProducts().filter(p => p.category === 'Treatment Planning');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Treatment Planning Solutions for Radiotherapy",
    "description": "Comprehensive guide to deep learning-powered treatment planning solutions for radiation oncology. Compare AI-driven planning systems and optimization tools.",
    "url": "https://dlinrt.eu/category/treatment-planning",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": treatmentPlanningProducts.length,
      "itemListElement": treatmentPlanningProducts.map((product, index) => ({
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
      icon: Zap,
      title: "Automated Optimization",
      description: "AI-driven plan optimization that automatically balances target coverage and organ sparing for superior dosimetric outcomes."
    },
    {
      icon: Brain,
      title: "Intelligent Planning",
      description: "Machine learning algorithms that learn from thousands of treatment plans to suggest optimal planning strategies."
    },
    {
      icon: BarChart3,
      title: "Quality Assurance",
      description: "Built-in quality metrics and automated plan evaluation to ensure consistent, high-quality treatment plans."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Treatment Planning Solutions for Radiotherapy - Deep Learning Planning Tools"
        description="Explore cutting-edge AI-powered treatment planning solutions for radiation oncology. Compare deep learning planning systems, optimization algorithms, and automated planning tools from leading medical technology companies."
        canonical="https://dlinrt.eu/category/treatment-planning"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="h-12 w-12 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">AI Treatment Planning</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary deep learning solutions for radiation treatment planning. Harness the power of AI to create 
              optimized, clinically superior treatment plans with automated workflow integration.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products?task=Treatment%20Planning"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
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
            Transform Your Treatment Planning Workflow
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-purple-600" />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Future of Treatment Planning</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  AI-powered treatment planning represents the next frontier in radiation oncology, with <strong>{treatmentPlanningProducts.length} innovative solutions</strong> 
                  currently transforming how treatment plans are created, optimized, and validated.
                </p>
                <p>
                  These advanced systems leverage machine learning algorithms trained on vast datasets of successful treatment plans, 
                  enabling automated plan generation that rivals or exceeds human expertise while significantly reducing planning time.
                </p>
                <p>
                  From fully automated planning systems to AI-assisted optimization tools, these solutions support various treatment 
                  modalities including IMRT, VMAT, stereotactic treatments, and proton therapy, ensuring broad clinical applicability.
                </p>
              </div>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Planning Intelligence</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-purple-200 pb-2">
                  <span className="text-gray-700">AI Planning Tools</span>
                  <span className="text-2xl font-bold text-purple-600">{treatmentPlanningProducts.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-purple-200 pb-2">
                  <span className="text-gray-700">Technology Partners</span>
                  <span className="text-2xl font-bold text-purple-600">{new Set(treatmentPlanningProducts.map(p => p.company)).size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Clinical Ready</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {treatmentPlanningProducts.filter(p => p.certification?.includes('CE') || p.certification?.includes('FDA')).length}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Treatment Planning Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover intelligent planning systems that combine clinical expertise with artificial intelligence 
              to deliver optimal treatment outcomes.
            </p>
          </div>
          <ProductGrid filters={{ tasks: ['Treatment Planning'], locations: [], modalities: [], certifications: [] }} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Related Technologies</h2>
          <p className="text-xl text-gray-600 mb-8">
            Complete your radiotherapy AI toolkit with complementary deep learning solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/category/auto-contouring"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Auto-Contouring
            </Link>
            <Link 
              to="/category/performance-monitor"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Performance Monitor
            </Link>
            <Link 
              to="/category/clinical-prediction"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clinical Prediction
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TreatmentPlanningPage;