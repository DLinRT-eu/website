import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Globe } from 'lucide-react';

const PurposeSection = () => {
  const highlights = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "EU Regulatory Framework",
      description: "AI used for medical purposes may be both a medical device under the Medical Device Regulation (MDR 2017/745) and a \"high-risk\" AI system under the EU AI Act. Expect overlapping obligations (technical documentation, clinical evidence, post-market surveillance, transparency, data governance).",
      reference: "EUR-Lex [1]"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Interplay Guidance",
      description: "MDCG (Medical Device Coordination Group) guidance clarifies how MDR/IVDR and the AI Act apply together for AI-enabled medical devices — a must-read for EU market entry.",
      reference: "Public Health [2]"
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      title: "USA (FDA) Pathway",
      description: "The FDA treats AI/ML-enabled Software as a Medical Device (SaMD) within established device frameworks; it has published lifecycle and submission guidance (including draft guidance on marketing submissions for AI-enabled device functions).",
      reference: "U.S. Food and Drug Administration [3]"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Purpose Statement */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Purpose</h3>
          <p className="text-muted-foreground leading-relaxed">
            This page gathers essential regulatory and practical resources for deploying deep-learning (DL) solutions in clinical radiotherapy workflows. It covers the EU regulatory environment (MDR, the EU AI Act and recent MDCG guidance), the U.S. (FDA) pathway, technical standards, and a compact checklist to help teams move from research to clinically-deployed solutions.
          </p>
        </CardContent>
      </Card>

      {/* High-Level Summary */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xl font-semibold text-foreground">High-level summary</h3>
          <Badge variant="outline">What matters</Badge>
        </div>
        
        <div className="grid gap-4">
          {highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{highlight.title}</h4>
                      <span className="text-xs text-muted-foreground font-mono">
                        {highlight.reference}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurposeSection;