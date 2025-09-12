import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ComplianceChecklist = () => {
  const checklistItems = [
    {
      title: "Determine legal status & classification",
      description: "Is the software a medical device? Under MDR, what class? Will the AI element be \"high-risk\" under the AI Act? (Use MDCG guidance).",
      details: "Assess whether your AI solution qualifies as a medical device under MDR and determine its risk classification. Consider AI Act implications for high-risk AI systems."
    },
    {
      title: "Establish QMS & documentation",
      description: "Implement ISO 13485-aligned QMS and produce complete Technical Documentation (device description, intended use, risk analysis, software architecture, verification/validation reports, clinical evaluation).",
      details: "Set up quality management system and prepare comprehensive technical documentation covering all regulatory requirements."
    },
    {
      title: "Clinical evidence plan",
      description: "Collect retrospective and prospective evidence showing performance across intended populations and settings; pre-specify acceptance criteria and evaluate generalisability.",
      details: "Develop robust clinical evidence demonstrating safety and performance in real-world clinical environments."
    },
    {
      title: "Data governance & DPIA",
      description: "Document dataset provenance, representativeness, label quality, privacy (GDPR), and perform Data Protection Impact Assessment where needed.",
      details: "Ensure proper data governance, GDPR compliance, and conduct DPIA for high-risk data processing activities."
    },
    {
      title: "Risk management & human oversight",
      description: "Maintain ISO 14971 risk management for devices; implement AI Act-style risk mitigation and human-in-the-loop controls if classification requires.",
      details: "Implement comprehensive risk management following ISO 14971 and ensure appropriate human oversight mechanisms."
    },
    {
      title: "Cybersecurity & resilience",
      description: "Follow up-to-date guidance on cybersecurity for medical devices; document controls and update processes.",
      details: "Implement robust cybersecurity measures and establish procedures for security updates and incident response."
    },
    {
      title: "Post-market surveillance & real-world performance",
      description: "Define post-market performance monitoring, incident reporting, and model-update procedures (retraining / change control). FDA and MDCG both emphasise TPLC (total product lifecycle) monitoring.",
      details: "Establish comprehensive post-market surveillance system for ongoing performance monitoring and continuous improvement."
    },
    {
      title: "Regulatory submission & notified body / FDA engagement",
      description: "For EU: prepare CE technical file and liaise with a notified body (if required by class). For US: prepare a marketing submission/510(k)/PMA as appropriate and consider early Q-submission / pre-submission engagement with FDA.",
      details: "Prepare and submit appropriate regulatory documentation and engage with relevant regulatory bodies early in the process."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {checklistItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                    {item.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {item.details}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist;