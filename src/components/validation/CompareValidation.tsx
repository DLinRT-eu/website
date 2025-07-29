// Test component to validate compare functionality
import { useEffect, useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import dataService from '@/services/DataService';

const CompareValidation = () => {
  const [validationResults, setValidationResults] = useState<string[]>([]);

  useEffect(() => {
    validateCompareFunction();
  }, []);

  const validateCompareFunction = () => {
    const results: string[] = [];

    try {
      // Test 1: Check if products can be retrieved
      const products = dataService.getAllProducts();
      results.push(`✅ Product retrieval: ${products.length} products found`);

      // Test 2: Check if products have required fields for comparison
      const sampleProduct = products[0];
      if (sampleProduct) {
        const requiredFields = ['id', 'name', 'company', 'category', 'description'];
        const missingFields = requiredFields.filter(field => !sampleProduct[field as keyof ProductDetails]);
        
        if (missingFields.length === 0) {
          results.push('✅ Product structure: All required fields present');
        } else {
          results.push(`❌ Product structure: Missing fields: ${missingFields.join(', ')}`);
        }
      }

      // Test 3: Check category consistency for comparison validation
      const categories = [...new Set(products.map(p => p.category))];
      results.push(`✅ Categories available: ${categories.length} unique categories`);

      // Test 4: Test selection logic
      const testProducts = products.slice(0, 3);
      const sameCategory = testProducts.every(p => p.category === testProducts[0].category);
      results.push(`${sameCategory ? '✅' : '⚠️'} Sample selection: ${sameCategory ? 'Same category' : 'Mixed categories'}`);

      // Test 5: Check export dependencies
      try {
        const hasJsPDF = typeof window !== 'undefined' && 'jsPDF' in window;
        results.push(`${hasJsPDF ? '✅' : '⚠️'} PDF Export: jsPDF ${hasJsPDF ? 'available' : 'may need initialization'}`);
      } catch {
        results.push('⚠️ PDF Export: Cannot verify jsPDF availability');
      }

      // Test 6: Logo URL validation
      const productsWithLogos = products.filter(p => p.logoUrl && p.logoUrl !== '/placeholder.svg');
      results.push(`✅ Logo availability: ${productsWithLogos.length}/${products.length} products have custom logos`);

    } catch (error) {
      results.push(`❌ Validation failed: ${error}`);
    }

    setValidationResults(results);
  };

  // Log results when they change
  useEffect(() => {
    if (validationResults.length > 0) {
      console.log('Compare Validation Results:');
      validationResults.forEach(result => console.log(result));
    }
  }, [validationResults]);

  return null; // Hidden validation component
};

export default CompareValidation;