import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Image, ArrowRight, Wand2, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dataService from '@/services/DataService';

const ImageSynthesisPage = () => {
  const imageSynthesisProducts = dataService.getAllProducts().filter(p => p.category === 'Image Synthesis');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Image Synthesis Solutions for Radiotherapy - Synthetic CT Generation",
    "description": "Comprehensive guide to deep learning image synthesis solutions for radiation oncology. Explore MR-to-CT conversion, synthetic CT generation, and MR-only workflow solutions.",
    "url": "https://dlinrt.eu/category/image-synthesis",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": imageSynthesisProducts.length,
      "itemListElement": imageSynthesisProducts.map((product, index) => ({
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
      icon: Wand2,
      title: "MR-Only Workflows",
      description: "Enable MR-only radiation therapy planning by generating synthetic CT images from MR data, eliminating the need for separate CT acquisition."
    },
    {
      icon: Clock,
      title: "Reduced Scan Time",
      description: "Streamline patient workflow by reducing the number of required imaging sessions and decreasing overall treatment preparation time."
    },
    {
      icon: ShieldCheck,
      title: "Radiation Dose Reduction",
      description: "Minimize patient radiation exposure by replacing CT scans with MR-based synthetic alternatives where clinically appropriate."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Image Synthesis for Radiotherapy - Synthetic CT Generation & MR-Only Workflows"
        description="Discover advanced AI image synthesis solutions for radiation oncology. Compare MR-to-CT conversion tools, synthetic CT generation systems, and MR-only workflow solutions from leading medical imaging companies."
        canonical="https://dlinrt.eu/category/image-synthesis"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image className="h-12 w-12 text-green-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">AI Image Synthesis</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced deep learning solutions for synthetic medical image generation. Transform MR images into synthetic CT scans 
              and enable innovative MR-only radiotherapy workflows with AI-powered precision.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products?task=Image%20Synthesis"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
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
            Revolutionize Medical Imaging Workflows
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-green-600" />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Synthetic Image Innovation</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  AI-powered image synthesis is transforming radiotherapy workflows, with <strong>{imageSynthesisProducts.length} cutting-edge solutions</strong> 
                  enabling new possibilities in treatment planning and patient care. These innovative tools generate high-quality synthetic 
                  medical images that match the clinical utility of traditional imaging modalities.
                </p>
                <p>
                  Leading medical imaging companies like Philips, Siemens, and specialized AI firms are pioneering synthetic CT generation 
                  from MR images, enabling MR-only workflows that reduce patient radiation exposure while maintaining treatment planning accuracy.
                </p>
                <p>
                  From brain and head & neck applications to pelvic treatments, these solutions cover diverse anatomical regions 
                  with clinically validated accuracy and regulatory approval for clinical use.
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Innovation Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-green-200 pb-2">
                  <span className="text-gray-700">Synthesis Solutions</span>
                  <span className="text-2xl font-bold text-green-600">{imageSynthesisProducts.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-green-200 pb-2">
                  <span className="text-gray-700">Technology Leaders</span>
                  <span className="text-2xl font-bold text-green-600">{new Set(imageSynthesisProducts.map(p => p.company)).size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Clinically Approved</span>
                  <span className="text-2xl font-bold text-green-600">
                    {imageSynthesisProducts.filter(p => p.certification?.includes('CE') || p.certification?.includes('FDA')).length}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Image Synthesis Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore advanced synthetic image generation tools that are reshaping medical imaging and radiotherapy workflows.
            </p>
          </div>
          <ProductGrid filters={{ tasks: ['Image Synthesis'], locations: [], modalities: [], certifications: [] }} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover More AI Solutions</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore complementary deep learning technologies that work seamlessly with image synthesis workflows.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/category/image-enhancement"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Image Enhancement
            </Link>
            <Link 
              to="/category/reconstruction"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reconstruction
            </Link>
            <Link 
              to="/category/registration"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Registration
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ImageSynthesisPage;