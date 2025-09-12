import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const RegulatoryLandscape = () => {
  return (
    <div className="space-y-8">
      {/* EU: MDR Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              EU: MDR (Medical Device Regulation)
            </CardTitle>
            <Badge variant="secondary">EU 2017/745</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            AI/ML software used for diagnosis, treatment planning or clinical decision support typically qualifies as a medical device under MDR (2017/745). Manufacturers need CE marking, technical documentation, clinical evaluation, quality management (e.g., ISO 13485) and post-market surveillance (PMS).
          </p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <span>EUR-Lex Official Text</span>
          </div>
        </CardContent>
      </Card>

      {/* EU: AI Act Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              EU: AI Act
            </CardTitle>
            <Badge variant="outline">Entered Force Aug 1, 2024</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The AI Act defines rules for AI systems, with strict obligations for <strong>high-risk</strong> systems (datasets, transparency, human oversight, risk management). For regulated medical AI, additional AI Act obligations may apply; timelines and exact obligations are clarified by the Commission and MDCG guidance.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <span>Public Health - AI Act Overview</span>
          </div>
        </CardContent>
      </Card>

      {/* Interplay: MDR + AI Act */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              Interplay: MDR + AI Act
            </CardTitle>
            <Badge variant="default">Critical</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MDCG's FAQ (MDCG 2025-6) explains joint applicability, classification cues, and practical expectations for MDAI (Medical Device AI). Follow MDCG guidance for harmonised interpretation.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <span>Public Health - MDCG Interplay Guidance</span>
          </div>
        </CardContent>
      </Card>

      {/* USA: FDA Pathway */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              USA: FDA Pathway
            </CardTitle>
            <Badge variant="secondary">SaMD Framework</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The FDA expects premarket demonstration of safety & effectiveness for SaMD. The agency's work on AI/ML includes the AI/ML SaMD Action Plan and guidance on lifecycle management and marketing submissions for AI functions; FDA also publishes an "AI-enabled medical device" list. Plan for iterative learning systems and post-market monitoring.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <ExternalLink className="h-4 w-4" />
            <span>U.S. Food and Drug Administration - AI/ML Guidance</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryLandscape;