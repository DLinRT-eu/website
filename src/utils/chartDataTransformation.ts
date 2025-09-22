import { ProductDetails } from '@/types/productDetails';
import { getAllOptions } from './filterOptions';
import { LOCATION_COLORS, getTaskColor, getModalityColor, getCertificationColor } from './chartColors';
import { getStandardizedCertificationTags } from './regulatoryUtils';
import { countStructureTypes } from './structureClassification';
import { matchesTask, countModelsInProduct, countTotalModels, countModelsForTask } from './modelCounting';
import { filterProductsByLocation, filterProductsByModality } from './productFiltering';

/**
 * Transform products data into task distribution chart data
 */
export const transformTaskData = (
  products: ProductDetails[],
  filteredProducts: ProductDetails[],
  selectedTask: string,
  countingMode: 'models' | 'products' = 'models'
) => {
  return getAllOptions('category').map(category => {
    // Count models that match this category (after other filters are applied) - includes secondary categories
    const matchingProducts = filteredProducts.filter(p => matchesTask(p, category));
    const value = countTotalModels(matchingProducts, countingMode);
    
    // Original count before location and modality filters - includes secondary categories
    const originalMatchingProducts = selectedTask === "all" ? 
      products.filter(p => matchesTask(p, category)) : 
      matchingProducts;
    const originalValue = countTotalModels(originalMatchingProducts, countingMode);
    
    return {
      name: category,
      value,
      originalValue,
      isSelected: category === selectedTask,
      isFiltered: value < originalValue && value > 0,
      fill: getTaskColor(category)
    };
  }).filter(item => item.value > 0);
};

/**
 * Transform products data into location distribution chart data
 */
export const transformLocationData = (
  products: ProductDetails[],
  filteredProducts: ProductDetails[],
  selectedLocation: string,
  countingMode: 'models' | 'products' = 'models'
) => {
  const allLocations = getAllOptions('anatomicalLocation');
  
  const locationData = allLocations.map(location => {
    // Count models that match this location (after other filters are applied)
    const matchingProducts = filterProductsByLocation(filteredProducts, location);
    const value = countTotalModels(matchingProducts, countingMode);
    
    // Original count before task and modality filters
    const originalMatchingProducts = selectedLocation === "all" ?
      filterProductsByLocation(products, location) :
      matchingProducts;
    const originalValue = countTotalModels(originalMatchingProducts, countingMode);
    
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
  return selectedLocation !== "all" 
    ? locationData.filter(item => item.name === selectedLocation)
    : locationData;
};

/**
 * Transform products data into modality distribution chart data
 */
export const transformModalityData = (
  products: ProductDetails[],
  filteredProducts: ProductDetails[],
  selectedModality: string,
  countingMode: 'models' | 'products' = 'models'
) => {
  const modalityData = getAllOptions('modality').map(modality => {
    // Skip LINAC and MRI-LINAC in the chart data
    if (modality === 'LINAC' || modality === 'MRI-LINAC') {
      return { name: modality, value: 0, originalValue: 0, isSelected: false };
    }
    
    // Count models that match this modality (after other filters are applied)
    const matchingProducts = filterProductsByModality(filteredProducts, modality);
    const value = countTotalModels(matchingProducts, countingMode);

    // Original count before task and location filters
    const originalMatchingProducts = selectedModality === "all" ?
      filterProductsByModality(products, modality) :
      matchingProducts;
    const originalValue = countTotalModels(originalMatchingProducts, countingMode);
    
    return {
      name: modality || 'Unknown',
      value,
      originalValue,
      isSelected: modality === selectedModality,
      isFiltered: value < originalValue && value > 0
    };
  }).filter(item => item.value > 0);
  
  // If specific modality is selected, only include that modality
  return selectedModality !== "all" 
    ? modalityData.filter(item => item.name === selectedModality)
    : modalityData;
};

/**
 * Transform products data into structure data for auto-contouring
 */
export const transformStructureData = (
  filteredProducts: ProductDetails[],
  selectedTask: string
): {name: string, value: number}[] => {
  if (selectedTask !== "Auto-Contouring") {
    return [];
  }

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
  return Object.entries(structureCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 15); // Take top 15 structures for readability
};

/**
 * Transform products data into structure type data for auto-contouring
 */
export const transformStructureTypeData = (
  filteredProducts: ProductDetails[],
  selectedTask: string
): {productName: string; companyName: string; OARs: number; Targets: number; Elective: number; total: number}[] => {
  if (selectedTask !== "Auto-Contouring") {
    return [];
  }

  return filteredProducts.map(product => {
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
      companyName: product.company,
      ...counts
    };
  })
  .sort((a, b) => b.total - a.total); // Sort by total number of structures
};

/**
 * Transform products data into certification distribution chart data
 */
export const transformCertificationData = (
  products: ProductDetails[],
  filteredProducts: ProductDetails[],
  countingMode: 'models' | 'products' = 'models'
) => {
  // Count certifications in filtered products
  const certificationCounts: Record<string, number> = {
    'CE Only': 0,
    'FDA Only': 0,
    'CE & FDA': 0,
    'NMPA': 0,
    'Other': 0,
    'No Certification': 0
  };

  filteredProducts.forEach(product => {
    const certificationTags = getStandardizedCertificationTags(product);
    
    if (certificationTags.length === 0) {
      certificationCounts['No Certification'] += countTotalModels([product], countingMode);
    } else {
      const hasCE = certificationTags.some(tag => tag.includes('CE'));
      const hasFDA = certificationTags.some(tag => tag.includes('FDA'));
      const hasNMPA = certificationTags.some(tag => tag.includes('NMPA'));
      
      if (hasCE && hasFDA) {
        certificationCounts['CE & FDA'] += countTotalModels([product], countingMode);
      } else if (hasCE) {
        certificationCounts['CE Only'] += countTotalModels([product], countingMode);
      } else if (hasFDA) {
        certificationCounts['FDA Only'] += countTotalModels([product], countingMode);
      } else if (hasNMPA) {
        certificationCounts['NMPA'] += countTotalModels([product], countingMode);
      } else {
        certificationCounts['Other'] += countTotalModels([product], countingMode);
      }
    }
  });

  // Convert to chart data format and filter out zero values
  return Object.entries(certificationCounts)
    .map(([name, value]) => ({
      name,
      value,
      fill: getCertificationColor(name)
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
};