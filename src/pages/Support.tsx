
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Heart } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';

const Support = () => {
  const handleGitHubIssue = () => {
    window.open('https://github.com/matteomaspero/dlinrt-products/issues/new', '_blank', 'noopener,noreferrer');
  };

  const handleDonate = () => {
    window.open('https://gofund.me/f775f8ba', '_blank', 'noopener,noreferrer');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Support & Contact",
    "description": "Get help, submit feedback, or contact the DLinRT team",
    "url": "https://dlinrt.eu/support"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Support & Contact"
        description="Get help, submit feedback, report issues, or contact our team about the DLinRT products finder."
        canonical="https://dlinrt.eu/support"
        structuredData={structuredData}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Support & Contact</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-gray-700">
            We value your feedback and are committed to improving the DLinRT products finder. If you have questions, suggestions, or have identified an issue, please submit a GitHub issue or contact us directly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 py-4">
          <Button onClick={handleGitHubIssue} variant="outline" className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Submit an Issue on GitHub
          </Button>
          
          <Button 
            onClick={handleDonate} 
            className="bg-[#FF6F2F] hover:bg-[#FF5A1F] text-white flex items-center gap-2"
          >
            <Heart className="h-5 w-5" />
            Donate on GoFundMe
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <section className="bg-white rounded-lg p-8 shadow-sm mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                This project was born from a vision to make medical device information more accessible and transparent. 
                We started as a small team of healthcare professionals and developers who saw the need for a 
                centralized platform where medical professionals could easily find and compare medical devices.
              </p>
            </section>

            <section className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Operate</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We maintain this platform through a combination of community support and dedicated volunteer work. 
                Our team works tirelessly to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Verify and update medical device information</li>
                <li>Improve the platform's functionality</li>
                <li>Ensure data accuracy and completeness</li>
                <li>Provide technical support to our users</li>
              </ul>
            </section>
          </div>
          
          <div>
            <section className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Have questions or feedback? Reach out to our team at <span className="font-medium">info at dlinrt dot eu</span> 
                or use the form below:
              </p>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
