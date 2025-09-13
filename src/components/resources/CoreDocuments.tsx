import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText, Gavel, Shield, Globe } from 'lucide-react';

const CoreDocuments = () => {
  const documentCategories = [
    {
      title: "EU Regulatory Framework",
      icon: <Gavel className="h-5 w-5" />,
      badge: "Essential",
      documents: [
        {
          title: "MDR (Regulation EU 2017/745)",
          description: "Official Medical Device Regulation text",
          url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745",
          type: "Official Text",
          reference: "[1]"
        },
        {
          title: "MDCG 2025-6 - MDR/AI Act Interplay FAQ", 
          description: "Joint applicability guidance for medical device AI",
          url: "https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-documents_en",
          type: "Guidance",
          reference: "[2]"
        },
        {
          title: "EU AI Act Overview",
          description: "Commission guidance on AI in healthcare",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
          type: "Overview",
          reference: "[4]"
        }
      ]
    },
    {
      title: "US FDA Framework",
      icon: <Shield className="h-5 w-5" />,
      badge: "US Market",
      documents: [
        {
          title: "AI/ML in Software as Medical Device",
          description: "FDA overview and guidance pages",
          url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device",
          type: "Guidance",
          reference: "[3]"
        },
        {
          title: "AI-Enabled Device Software Functions",
          description: "Draft guidance on lifecycle and marketing submissions",
          url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices",
          type: "Draft Guidance",
          reference: "[8]"
        }
      ]
    },
    {
      title: "Implementation Guidance",
      icon: <FileText className="h-5 w-5" />,
      badge: "Practical",
      documents: [
        {
          title: "MDCG Endorsed Guidance Hub",
          description: "Collection of MDCG guidance documents",
          url: "https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-documents_en",
          type: "Resource Hub",
          reference: "[5]"
        },
        {
          title: "ISO 13485 Quality Management",
          description: "Quality management systems for medical devices",
          url: "https://www.iso.org/standard/59752.html",
          type: "Standard",
          reference: "[6]"
        }
      ]
    },
    {
      title: "Research & Evidence",
      icon: <Globe className="h-5 w-5" />,
      badge: "Academic",
      documents: [
        {
          title: "Clinical Evidence for AI in Healthcare",
          description: "Best practices for clinical validation of AI systems",
          url: "https://www.who.int/publications/i/item/9789240029200",
          type: "Research",
          reference: "[7]"
        }
      ]
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Essential": return "default";
      case "US Market": return "secondary"; 
      case "Practical": return "outline";
      case "Academic": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {documentCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  {category.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {category.title}
                </CardTitle>
              </div>
              <Badge variant={getBadgeVariant(category.badge)}>
                {category.badge}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.documents.map((doc, docIndex) => (
                <div 
                  key={docIndex}
                  className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-foreground">
                        {doc.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {doc.reference}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-shrink-0"
                    asChild
                  >
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Open ${doc.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Reference Note */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Reference numbers [1] through [8] correspond to the footnote-style citations in the regulatory guidance. 
            These documents represent the core starting points for understanding regulatory requirements for AI in medical devices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreDocuments;