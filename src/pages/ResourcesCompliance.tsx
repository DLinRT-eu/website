import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TaxonomyDiagram from '@/components/resources/TaxonomyDiagram';
import ClinicalTasksGlossary from '@/components/resources/ClinicalTasksGlossary';
import RegulatoryFramework from '@/components/resources/RegulatoryFramework';
import DisclaimerBox from '@/components/resources/DisclaimerBox';
import ResourceLinks from '@/components/resources/ResourceLinks';

const ResourcesCompliance = () => {
  return (
    <PageLayout
      title="Resources & Compliance"
      description="Educational resources on AI solution classification, clinical tasks, and regulatory frameworks governing medical AI in Europe"
      canonical="https://dlinrt.eu/resources-compliance"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Resources & Compliance - DLinRT.eu",
        "description": "Educational resources on AI solution classification, clinical tasks, and regulatory frameworks governing medical AI in Europe",
        "url": "https://dlinrt.eu/resources-compliance"
      }}
    >
      <div className="bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Resources & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This page provides the foundational knowledge to navigate the DLinRT platform. 
              Here you can learn about the taxonomy we use to classify AI solutions, understand 
              the clinical tasks they perform, and review the important regulatory frameworks 
              that govern their use in Europe.
            </p>
          </div>

          {/* Classification Taxonomy Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Classification Taxonomy
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              How We Organize AI Solutions in Radiotherapy
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
              Glossary of Clinical Tasks
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Defining AI's Role in the Clinic
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              AI applications are defined by the clinical task they perform. Below is a glossary 
              of common tasks you will encounter on our platform.
            </p>
            <ClinicalTasksGlossary />
          </section>

          {/* Regulatory Framework */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Regulatory Framework
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Navigating Medical Device Regulations
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              In the European Union, AI software intended for medical use is regulated under the 
              Medical Device Regulation (MDR 2017/745). Our platform helps users understand the 
              regulatory context of these tools.
            </p>
            <RegulatoryFramework />
            <div className="mt-8">
              <DisclaimerBox />
            </div>
          </section>

          {/* Further Reading */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Further Reading
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Explore Authoritative Sources
            </h3>
            <ResourceLinks />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourcesCompliance;