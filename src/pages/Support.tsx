import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';

const Support = () => {
  const handleGitHubIssue = () => {
    window.open('https://github.com/matteomaspero/dlinrt-products/issues/new', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Support & Contact</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-gray-700">
            We value your feedback and are committed to improving the DLinRT Products Finder. If you have questions, suggestions, or have identified an issue, please submit a GitHub issue.
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleGitHubIssue} variant="outline" className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Submit an Issue on GitHub
          </Button>
        </div>

        <div className="text-center text-gray-600 mt-4">
          <p>Your feedback helps us make the DLinRT Products Finder better for everyone.</p>
        </div>
      </main>
    </div>
  );
};

export default Support;
