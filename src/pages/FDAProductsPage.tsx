
import React from "react";
import FDAProductsList from "@/components/FDAProductsList";
import dataService from "@/services/DataService"; 
import { Container } from "@/components/ui/container";
import SEO from "@/components/SEO";

const FDAProductsPage = () => {
  const allProducts = dataService.getAllProducts();
  
  return (
    <Container className="py-8">
      <SEO
        title="FDA-Cleared AI/ML Medical Devices"
        description="List of FDA-cleared AI/ML medical devices for radiation therapy and medical imaging"
        canonical="https://dlinrt.eu/fda-products"
      />
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h1>FDA-Cleared AI/ML Medical Devices</h1>
          <p>
            The following products have received FDA clearance as AI/ML-enabled medical devices. 
            Each listing includes a link to the FDA submission information.
          </p>
        </div>
        <FDAProductsList products={allProducts} />
      </div>
    </Container>
  );
};

export default FDAProductsPage;
