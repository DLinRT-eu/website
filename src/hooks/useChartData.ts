import { useState, useEffect } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { getAllOptions } from "@/utils/filterOptions";
import { LOCATION_COLORS } from '@/utils/chartColors';
import { countStructureTypes } from '@/utils/structureClassification';

/**
 * Helper function to check if a product matches a task/category
 */
const matchesTask = (product: ProductDetails, task: string): boolean => {
  if (product.category === task) return true;
  if (product.secondaryCategories?.includes(task)) return true;
  return false;
};

export const useChartData = (
  products: ProductDetails[], 
  selectedTask: string, 
  selectedLocation: string,
  selectedModality: string
) => {
  const [structureData, setStructureData] = useState<{name: string, value: number}[]>([]);
  const [structureTypeData, setStructureTypeData] = useState<{
    productName: string;
    OARs: number;
    GTV: number;
    Elective: number;
    total: number;
  }[]>([]);
  
  // Apply all filters simultaneously
  const filteredProducts = products.filter(product => {
    // Filter by task if not "all" - now includes secondary categories
    if (selectedTask !== "all" && !matchesTask(product, selectedTask)) {
      return false;
    }
    
    // Filter by location if not "all"
    if (selectedLocation !== "all") {
      const anatomyList = product.anatomicalLocation || product.anatomy || [];
      if (!anatomyList.includes(selectedLocation)) {
        return false;
      }
    }
    
    // Filter by modality if not "all"
    if (selectedModality !== "all") {
      if (!product.modality) {
        return false;
      }
      
      if (Array.isArray(product.modality)) {
        if (!product.modality.includes(selectedModality)) {
          return false;
        }
      } else if (product.modality !== selectedModality) {
        return false;
      }
    }
    
    // Product passed all filters
    return true;
  });

  // Prepare data for task distribution - based on filtered products for location/modality
  const taskData = getAllOptions('category').map(category => {
    // Count products that match this category (after other filters are applied) - includes secondary categories
    const value = filteredProducts.filter(p => matchesTask(p, category)).length;
    // Original count before location and modality filters - includes secondary categories
    const originalValue = selectedTask === "all" ? 
      products.filter(p => matchesTask(p, category)).length : 
      value;
    
    return {
      name: category,
      value,
      originalValue,
      isSelected: category === selectedTask,
      isFiltered: value < originalValue && value > 0,
      fill: category === selectedTask ? '#F43F5E' : undefined
    };
  }).filter(item => item.value > 0);

  // Total product count - use filtered products if any filter is active
  const totalProducts = filteredProducts.length;

  // Prepare data for anatomical location distribution - based on filtered products for task/modality
  const allLocations = getAllOptions('anatomicalLocation');
  
  const locationData = allLocations.map(location => {
    // Count products that match this location (after other filters are applied)
    const value = filteredProducts.filter(p => {
      const anatomyList = p.anatomicalLocation || p.anatomy || [];
      return anatomyList.includes(location);
    }).length;
    
    // Original count before task and modality filters
    const originalValue = selectedLocation === "all" ?
      products.filter(p => {
        const anatomyList = p.anatomicalLocation || p.anatomy || [];
        return anatomyList.includes(location);
      }).length :
      value;
    
    // Assign a fixed color based on the location name
    const color = LOCATION_COLORS[location] || '#0EA5E9';
    
    return {
      name: location,
      value,
      originalValue,
      isSelected: location === selectedLocation,
      isFiltered: value < originalValue && value > 0,
      color,
      fill: location === selectedLocation ? '#F43F5E' : color
    };
  }).filter(item => item.value > 0);
  
  // If specific location is selected, only include that location
  const finalLocationData = selectedLocation !== "all" 
    ? locationData.filter(item => item.name === selectedLocation)
    : locationData;
  
  const totalLocations = finalLocationData.reduce((sum, item) => sum + item.value, 0);

  // Prepare data for modality distribution - based on filtered products for task/location
  const modalityData = getAllOptions('modality').map(modality => {
    // Skip LINAC and MRI-LINAC in the chart data
    if (modality === 'LINAC' || modality === 'MRI-LINAC') {
      return { name: modality, value: 0, originalValue: 0, isSelected: false };
    }
    
    // Count products that match this modality (after other filters are applied)
    const value = filteredProducts.filter(p => {
      if (Array.isArray(p.modality)) {
        return p.modality.includes(modality);
      }
      return p.modality === modality;
    }).length;

    // Original count before task and location filters
    const originalValue = selectedModality === "all" ?
      products.filter(p => {
        if (Array.isArray(p.modality)) {
          return p.modality.includes(modality);
        }
        return p.modality === modality;
      }).length :
      value;
    
    return {
      name: modality || 'Unknown',
      value,
      originalValue,
      isSelected: modality === selectedModality,
      isFiltered: value < originalValue && value > 0,
      fill: modality === selectedModality ? '#F43F5E' : '#00A6D6'
    };
  }).filter(item => item.value > 0);
  
  // If specific modality is selected, only include that modality
  const finalModalityData = selectedModality !== "all" 
    ? modalityData.filter(item => item.name === selectedModality)
    : modalityData;
  
  const totalModalities = finalModalityData.reduce((sum, item) => sum + item.value, 0);

  // Update structure data when task changes
  useEffect(() => {
    if (selectedTask === "Auto-Contouring") {
      // Get all auto-contouring products - includes secondary categories
      const autoContouringProducts = filteredProducts.filter(p => matchesTask(p, "Auto-Contouring"));
      
      // Extract and count all supported structures
      const structureCounts: Record<string, number> = {};
      autoContouringProducts.forEach((product: ProductDetails) => {
        if (product.supportedStructures) {
          if (Array.isArray(product.supportedStructures)) {
            product.supportedStructures.forEach(structure => {
              // Handle both string and object structures
              const structureName = typeof structure === 'string' ? 
                structure : structure.name;
              structureCounts[structureName] = (structureCounts[structureName] || 0) + 1;
            });
          }
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
  }, [selectedTask, selectedLocation, selectedModality, filteredProducts]);

  // Update structure type counting effect using shared utility
  useEffect(() => {
    if (selectedTask === "Auto-Contouring") {
      const structureTypeStats = filteredProducts.map(product => {
        // Convert complex structures to strings for counting
        const structureList: string[] = [];
        if (product.supportedStructures) {
          if (Array.isArray(product.supportedStructures)) {
            product.supportedStructures.forEach(structure => {
              if (typeof structure === 'string') {
                structureList.push(structure);
              } else {
                structureList.push(`Default:${structure.name}`);
              }
            });
          }
        }
        
        const counts = countStructureTypes(structureList);
        return {
          productName: product.name,
          ...counts
        };
      })
      .sort((a, b) => b.total - a.total); // Sort by total number of structures
        
      setStructureTypeData(structureTypeStats);
    }
  }, [filteredProducts, selectedTask]);

  return {
    taskData,
    totalProducts,
    locationData: finalLocationData,
    totalLocations,
    modalityData: finalModalityData,
    totalModalities,
    structureData,
    structureTypeData,
    filteredProducts
  };
};
