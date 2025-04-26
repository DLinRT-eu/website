
import { HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Donate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HeartHandshake className="h-16 w-16 mx-auto text-[#9b87f5] mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Project</h1>
          <p className="text-lg text-gray-600">Help us make a difference in medical device innovation</p>
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-lg p-8 shadow-sm">
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

          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How You Can Help</h2>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Your support helps us maintain and improve this valuable resource for the medical community. 
                You can contribute in several ways:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-md">
                  <h3 className="font-medium text-purple-900 mb-2">Submit Issues</h3>
                  <p className="text-gray-600 mb-2">
                    Help us improve by reporting bugs, suggesting improvements, or requesting new features through GitHub issues.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
                    onClick={() => window.open('https://github.com/matteomaspero/dlinrt-products/issues/new', '_blank')}
                  >
                    Submit an Issue
                  </Button>
                </div>

                <div className="bg-purple-50 p-4 rounded-md">
                  <h3 className="font-medium text-purple-900 mb-2">Contribute Product Information</h3>
                  <p className="text-gray-600 mb-2">
                    Help expand our database by gathering and submitting information about DL products in radiotherapy:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4 ml-2">
                    <li>Research product specifications</li>
                    <li>Gather regulatory information</li>
                    <li>Document clinical implementations</li>
                    <li>Submit updates to existing product data</li>
                  </ul>
                  <Button 
                    variant="outline"
                    className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
                    onClick={() => window.open('https://github.com/matteomaspero/dlinrt-products/issues/new?template=product-information.md', '_blank')}
                  >
                    Submit Product Information
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="text-[#9b87f5] hover:text-[#8b5cf6] transition-colors duration-200"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
