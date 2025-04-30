
import { useState, useEffect } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { getAllOptions } from "@/utils/filterOptions";

export const useChartData = (products: ProductDetails[], selectedTask: string, clickedTask: string | null) => {
  const [structureData, setStructureData] = useState<{name: string, value: number}[]>([]);
  
  // Get filtered products based on selected task
  const filteredProducts = selectedTask === "all" 
    ? products 
    : products.filter(p => p.category === selectedTask);

  // Prepare data for task distribution
  const taskData = getAllOptions('category').map(category => ({
    name: category,
    value: products.filter(p => p.category === category).length,
    isSelected: category === clickedTask,
    fill: category === clickedTask ? '#F43F5E' : '#00A6D6'  // Directly set the fill based on selection
  }));

  // Total product count
  const totalProducts = products.length;

  // Prepare data for anatomical location distribution
  const locationData = getAllOptions('anatomicalLocation').map(location => ({
    name: location,
    value: filteredProducts.filter(p => p.anatomicalLocation?.includes(location)).length
  })).filter(item => item.value > 0);
  
  const totalLocations = locationData.reduce((sum, item) => sum + item.value, 0);

  // Prepare data for modality distribution - normalize LINAC and MRI-LINAC to CBCT or MRI
  const modalityData = getAllOptions('modality').map(modality => {
    // Skip LINAC and MRI-LINAC in the chart data
    if (modality === 'LINAC' || modality === 'MRI-LINAC') {
      return { name: modality, value: 0 };
    }
    
    return {
      name: modality || 'Unknown',
      value: filteredProducts.filter(p => {
        if (Array.isArray(p.modality)) {
          return p.modality.includes(modality);
        }
        return p.modality === modality;
      }).length
    };
  }).filter(item => item.value > 0);
  
  const totalModalities = modalityData.reduce((sum, item) => sum + item.value, 0);

  // Update structure data when task changes
  useEffect(() => {
    if (selectedTask === "Auto-Contouring") {
      // Get all auto-contouring products
      const autoContouringProducts = products.filter(p => p.category === "Auto-Contouring");
      
      // Extract and count all supported structures
      const structureCounts: Record<string, number> = {};
      autoContouringProducts.forEach((product: ProductDetails) => {
        if (product.supportedStructures && product.supportedStructures.length > 0) {
          product.supportedStructures.forEach(structure => {
            // Extract the structure name (after the colon)
            const structureName = structure.split(":")[1]?.trim() || structure;
            structureCounts[structureName] = (structureCounts[structureName] || 0) + 1;
          });
        }
      });
      
      // Convert to chart data format
      const structureChartData = Object.entries(structureCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15); // Take top 15 structures for readability
        
      setStructureData(structureChartData);
    } else {
      setStructureData([]);
    }
  }, [selectedTask, products]);

  return {
    taskData,
    totalProducts,
    locationData,
    totalLocations,
    modalityData,
    totalModalities,
    structureData,
    filteredProducts
  };
};
