import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TaxonomyDiagram = () => {
  const layers = [
    {
      title: "Workflow Phase",
      examples: ["Planning", "Treatment Delivery", "Follow-up"],
      color: "bg-blue-50 border-blue-200",
      description: "The phase of radiotherapy where AI is applied"
    },
    {
      title: "Clinical Task", 
      examples: ["Auto-contouring", "Dose Prediction", "Image Synthesis"],
      color: "bg-green-50 border-green-200",
      description: "The specific clinical function performed by AI"
    },
    {
      title: "Anatomical Site",
      examples: ["Head & Neck", "Thorax", "Pelvis", "Brain"],
      color: "bg-purple-50 border-purple-200", 
      description: "The anatomical region targeted by the AI solution"
    },
    {
      title: "Modality",
      examples: ["CT", "MRI", "CBCT", "PET", "Proton Therapy"],
      color: "bg-orange-50 border-orange-200",
      description: "The imaging or treatment modality involved"
    }
  ];

  return (
    <div className="bg-card rounded-lg p-8 border">
      {/* Diagram */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
        {/* Layers */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          {layers.map((layer, index) => (
            <div key={index} className="flex items-center gap-4">
              <Card className={`w-48 ${layer.color} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-sm mb-2">{layer.title}</h4>
                  <div className="text-xs text-muted-foreground">
                    {layer.examples.slice(0, 2).map((example, i) => (
                      <div key={i}>{example}</div>
                    ))}
                    <div>...</div>
                  </div>
                </CardContent>
              </Card>
              {/* Connection Arrow (hidden on mobile for layers 1-2) */}
              <div className="hidden lg:block">
                <div className="w-8 h-0.5 bg-border"></div>
                <div className="w-0 h-0 border-l-[8px] border-l-border border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-8 -mt-0.5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Central AI Solution Hub */}
        <div className="relative">
          <Card className="w-64 h-32 bg-primary/10 border-primary/30 shadow-lg">
            <CardContent className="p-6 text-center flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold text-primary mb-2">AI Solution</h3>
              <p className="text-sm text-muted-foreground">
                Classified by all four layers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Layer Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {layers.map((layer, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-semibold text-foreground">{layer.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {layer.description}
            </p>
            <div className="text-xs text-muted-foreground">
              <strong>Examples:</strong> {layer.examples.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxonomyDiagram;