
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const BlackPaperSection = () => {
  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = './DLinRT_eu_Intent_Roadmap_v0_1.pdf';
    link.download = 'DLinRT_eu_Intent_Roadmap_v0_1.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
          onClick={handleDownloadClick}
        >
          <FileDown className="h-5 w-5" />
          <span>Download Black Paper (PDF)</span>
        </Button>
      </div>
    </div>
  );
};

export default BlackPaperSection;
