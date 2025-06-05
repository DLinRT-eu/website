
import React from 'react';
import SEO from '@/components/SEO';
import { FileDown, Users, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About DLinRT.eu",
    "description": "Learn about our mission, goals, and team dedicated to advancing deep learning in radiotherapy.",
    "url": "https://dlinrt.eu/about",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About DLinRT.eu"
        description="Learn about our mission, goals, and team dedicated to advancing deep learning in radiotherapy through open-source, community-driven initiatives."
        canonical="https://dlinrt.eu/about"
        structuredData={structuredData}
      />
      
      {/* Black Paper Download Section - Moved from home page */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About DLinRT.eu</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">DLinRT.eu Intent & Roadmap</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Learn more about our mission, goals, and future plans—rooted in our non-profit, independent, open-source, and community-driven ethos—in our official Black Paper document
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

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-[#00A6D6]" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To accelerate innovation in radiotherapy by creating an open, comprehensive database of deep learning solutions. 
              We bridge the gap between cutting-edge AI research and clinical practice, making advanced tools accessible to 
              radiation oncology professionals worldwide.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-[#00A6D6]" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              A future where every radiation oncology center, regardless of size or location, has access to state-of-the-art 
              deep learning tools that improve patient outcomes, enhance treatment precision, and streamline clinical workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Non-Profit</h3>
                <p className="text-gray-600 text-sm">
                  Driven by mission, not profit. We prioritize patient care and scientific advancement.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Independent</h3>
                <p className="text-gray-600 text-sm">
                  Unbiased evaluations and recommendations free from commercial influence.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Open-Source</h3>
                <p className="text-gray-600 text-sm">
                  Transparent, collaborative development with open access to knowledge and tools.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Community-Driven</h3>
                <p className="text-gray-600 text-sm">
                  Built by and for the radiotherapy community, fostering collaboration and knowledge sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section Link */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 text-[#00A6D6]" />
            <h2 className="text-2xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Learn more about the dedicated professionals and researchers behind DLinRT.eu
          </p>
          <Button asChild>
            <Link to="/maintenance-team">
              View Team & Contributors
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Footer />
      </main>
    </div>
  );
};

export default About;
