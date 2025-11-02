import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Layers, ArrowRight, Workflow, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dataService from '@/services/DataService';

const PlatformPage = () => {
  const platformProducts = dataService.getAllProducts().filter(p => p.category === 'Platform');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Platform Solutions for Radiotherapy - Enterprise Integration Systems",
    "description": "Comprehensive guide to enterprise AI platform solutions for radiation oncology. Explore systems that unify multiple AI applications, streamline deployment, and integrate with clinical workflows.",
    "url": "https://dlinrt.eu/category/platform",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": platformProducts.length,
      "itemListElement": platformProducts.map((product, index) => ({
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
      icon: Workflow,
      title: "Unified AI Integration",
      description: "Consolidate multiple AI applications into a single platform for seamless access to diverse imaging tools and clinical decision support systems."
    },
    {
      icon: Shield,
      title: "Enterprise Security & Compliance",
      description: "Ensure robust data protection with GDPR and HIPAA compliance, advanced security architectures, and comprehensive audit trails for healthcare environments."
    },
    {
      icon: Zap,
      title: "Streamlined Deployment",
      description: "Accelerate clinical implementation with cloud-native scalability, automated workflows, and standardized quality assurance across your radiation oncology department."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Platform Solutions for Radiotherapy - Enterprise Integration & Workflow Automation"
        description="Discover enterprise AI platform solutions for radiation oncology. Compare systems that unify multiple AI applications, streamline clinical deployment, and integrate seamlessly with PACS, TPS, and oncology information systems."
        canonical="https://dlinrt.eu/category/platform"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-violet-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Layers className="h-12 w-12 text-violet-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">AI Integration Platforms</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade systems that unify multiple AI applications and imaging tools within clinical workflows. 
              Streamline deployment, ensure compliance, and accelerate radiation therapy planning with comprehensive platform solutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products?task=Platform"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Browse All Platforms <ArrowRight className="h-4 w-4" />
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
            Transform Your Clinical Workflow
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-violet-100">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-8 w-8 text-violet-600" />
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* What is a Platform Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is an AI Integration Platform?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                An AI integration platform is a comprehensive enterprise system designed to unify multiple artificial intelligence 
                applications and imaging tools within clinical workflows. These platforms serve as centralized hubs that integrate 
                seamlessly with existing hospital infrastructure, including PACS (Picture Archiving and Communication Systems), 
                treatment planning systems, and oncology information systems.
              </p>
              <p>
                Platforms streamline the deployment and implementation of AI technologies by providing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unified access to multiple AI applications from a single interface</li>
                <li>Cloud-native scalability with enterprise-grade performance and reliability</li>
                <li>Robust security architectures ensuring GDPR and HIPAA compliance</li>
                <li>Workflow automation that accelerates planning processes and standardizes quality</li>
                <li>Centralized management and monitoring of AI models and applications</li>
                <li>Seamless integration with existing clinical information systems</li>
              </ul>
              <p>
                Platforms can be single-vendor solutions, integrating multiple products from one manufacturer, or multi-vendor 
                ecosystems that bring together AI tools from various providers. They eliminate the complexity of managing individual 
                AI applications separately and ensure consistent performance, security, and compliance across all integrated tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Platform Solutions</h2>
            <p className="text-lg text-gray-600">
              {platformProducts.length} enterprise platform{platformProducts.length !== 1 ? 's' : ''} for AI integration in radiation oncology
            </p>
          </div>
          
          <ProductGrid filters={{ tasks: ['Platform'], locations: [], modalities: [], certifications: [] }} />

          {platformProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No platform solutions currently listed in our database.</p>
              <Link 
                to="/products"
                className="text-violet-600 hover:text-violet-700 font-medium"
              >
                View all products →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Impact Section */}
      <div className="py-16 bg-violet-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Clinical Impact</h2>
            <p className="text-lg text-gray-700 mb-8">
              AI integration platforms are revolutionizing radiation oncology workflows by reducing implementation complexity, 
              improving operational efficiency, and ensuring consistent quality across multiple AI-powered applications. 
              These systems enable healthcare institutions to adopt AI technologies at scale while maintaining rigorous 
              security and compliance standards.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-violet-900 mb-2">Reduced Implementation Time</h3>
                <p className="text-gray-600">Streamlined deployment process accelerates time-to-value for AI applications</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-violet-900 mb-2">Enhanced Workflow Efficiency</h3>
                <p className="text-gray-600">Automated processes and unified interfaces improve clinician productivity</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-violet-900 mb-2">Standardized Quality</h3>
                <p className="text-gray-600">Consistent performance monitoring and quality assurance across all AI tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlatformPage;
