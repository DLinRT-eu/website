
import React from "react";
import { Container } from "@/components/ui/container";
import SEO from "@/components/SEO";

const GuidelinesPage = () => {
  return (
    <Container className="py-8">
      <SEO
        title="Guidelines | Deep Learning in Radiotherapy"
        description="Guidelines for implementing AI/ML solutions in radiotherapy"
        canonical="https://dlinrt.eu/guidelines"
      />
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h1>Guidelines</h1>
          <p>
            This page contains guidelines for implementing AI/ML solutions in radiotherapy.
            Content is currently under development.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default GuidelinesPage;
