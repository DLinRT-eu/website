import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const StandardsGuidelines = () => {
  const standards = [
    {
      category: "Quality & Software Lifecycle",
      items: [
        {
          standard: "ISO 13485",
          description: "Quality Management System for medical devices",
          scope: "Mandatory QMS framework for medical device manufacturers"
        },
        {
          standard: "IEC 62304",
          description: "Medical device software lifecycle processes", 
          scope: "Software development and maintenance requirements"
        }
      ]
    },
    {
      category: "Good Machine Learning Practice",
      items: [
        {
          standard: "GMLP / IMDRF",
          description: "Best practices for dataset use, validation, continuous monitoring",
          scope: "International harmonized guidance for ML in medical devices"
        },
        {
          standard: "ISO/IEC 23053",
          description: "Framework for AI risk management",
          scope: "Risk management principles for AI systems"
        }
      ]
    },
    {
      category: "Regulatory Guidance",
      items: [
        {
          standard: "MDCG Guidelines",
          description: "MDR/AI Act intersection and harmonised expectations",
          scope: "European guidance for medical device AI compliance"
        },
        {
          standard: "FDA AI/ML Guidance",
          description: "Lifecycle management and marketing submission expectations",
          scope: "US regulatory pathway for AI-enabled medical devices"
        }
      ]
    },
    {
      category: "Cybersecurity & Privacy",
      items: [
        {
          standard: "ISO 27001",
          description: "Information security management systems",
          scope: "Cybersecurity framework for healthcare organizations"
        },
        {
          standard: "GDPR",
          description: "General Data Protection Regulation",
          scope: "Data privacy and protection requirements in EU"
        }
      ]
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {standards.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              {category.category}
              <Badge variant="outline" className="text-xs">
                {category.items.length} standards
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="font-mono text-xs whitespace-nowrap">
                      {item.standard}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">
                        {item.description}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.scope}
                      </p>
                    </div>
                  </div>
                  {itemIndex < category.items.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StandardsGuidelines;