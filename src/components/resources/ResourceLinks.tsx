import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Database, Shield, Users } from 'lucide-react';

const ResourceLinks = () => {
  const resources = [
    {
      title: "European Medical Device Regulation (MDR)",
      description: "Official text of EU Regulation 2017/745 governing medical devices",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745",
      icon: FileText,
      category: "Regulation"
    },
    {
      title: "European Database on Medical Devices (EUDAMED)",
      description: "Official EU database for medical device registration and information",
      url: "https://ec.europa.eu/tools/eudamed/",
      icon: Database,
      category: "Database"
    },
    {
      title: "FDA Medical Device Database",
      description: "US FDA database of approved and cleared medical devices",
      url: "https://www.fda.gov/medical-devices/device-approvals-denials-and-clearances/510k-clearances",
      icon: Shield,
      category: "FDA Resources"
    },
    {
      title: "ESTRO - European Society for Radiotherapy & Oncology",
      description: "Professional guidelines and educational resources for radiotherapy",
      url: "https://www.estro.org/",
      icon: Users,
      category: "Professional Society"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <resource.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                {resource.category}
              </span>
            </div>
            <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {resource.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              asChild 
              className="w-full group"
              variant="outline"
            >
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Visit Resource
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceLinks;