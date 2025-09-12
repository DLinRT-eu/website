import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TaxonomyDiagram from '@/components/resources/TaxonomyDiagram';
import ClinicalTasksGlossary from '@/components/resources/ClinicalTasksGlossary';
import PurposeSection from '@/components/resources/PurposeSection';
import RegulatoryLandscape from '@/components/resources/RegulatoryLandscape';
import StandardsGuidelines from '@/components/resources/StandardsGuidelines';
import ComplianceChecklist from '@/components/resources/ComplianceChecklist';
import CoreDocuments from '@/components/resources/CoreDocuments';
import DisclaimerBox from '@/components/resources/DisclaimerBox';

const ResourcesCompliance = () => {
  return (
    <PageLayout
      title="Resources & compliance"
      description="Essential regulatory and practical resources for deploying deep-learning solutions in clinical radiotherapy workflows, covering EU MDR, AI Act, FDA pathways, and compliance checklists"
      canonical="https://dlinrt.eu/resources-compliance"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Resources & compliance - DLinRT.eu",
        "description": "Essential regulatory and practical resources for deploying deep-learning solutions in clinical radiotherapy workflows",
        "url": "https://dlinrt.eu/resources-compliance"
      }}
    >
      <div className="bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Resources & compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This page provides both foundational knowledge and practical compliance guidance for AI in radiotherapy. 
              Learn about our classification taxonomy, understand clinical tasks, and access essential regulatory 
              resources for deploying deep-learning solutions in clinical workflows.
            </p>
          </div>

          {/* Classification Taxonomy Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our classification taxonomy
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              How we organize AI solutions in radiotherapy
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              To help you navigate the landscape, we categorize solutions based on a multi-layered 
              taxonomy. This allows for precise filtering and discovery.
            </p>
            <TaxonomyDiagram />
          </section>

          {/* Clinical Tasks Glossary */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Glossary of clinical tasks
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Defining AI's role in the clinic
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              AI applications are defined by the clinical task they perform. Below is a glossary 
              of common tasks you will encounter on our platform.
            </p>
            <ClinicalTasksGlossary />
          </section>

          {/* Purpose & Regulatory Summary */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Regulatory overview
            </h2>
            <PurposeSection />
          </section>

          {/* Regulatory Landscape Quick Guide */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Regulatory landscape — quick guide
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              EU and US regulatory pathways for medical AI
            </h3>
            <RegulatoryLandscape />
          </section>

          {/* Standards & Guidelines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Standards, guidelines & principles
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Practical targets for implementation
            </h3>
            <StandardsGuidelines />
          </section>

          {/* Practical Compliance Checklist */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Practical compliance checklist
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              For DL teams preparing clinical deployment
            </h3>
            <ComplianceChecklist />
          </section>

          {/* Core Documents & References */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core documents & references
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Essential starting points — start here
            </h3>
            <CoreDocuments />
          </section>

          {/* Disclaimer */}
          <section>
            <DisclaimerBox />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourcesCompliance;