
import { useState, useEffect } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { countTotalModels } from '@/utils/modelCounting';
import { filterProducts } from '@/utils/productFiltering';
import { 
  transformTaskData, 
  transformLocationData, 
  transformModalityData,
  transformStructureData,
  transformStructureTypeData 
} from '@/utils/chartDataTransformation';

export const useChartData = (
  products: ProductDetails[], 
  selectedTask: string, 
  selectedLocation: string,
  selectedModality: string,
  countingMode: 'models' | 'products' = 'models'
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
  const filteredProducts = filterProducts(products, selectedTask, selectedLocation, selectedModality);

  // Transform data for charts
  const taskData = transformTaskData(products, filteredProducts, selectedTask, countingMode);
  const totalModels = countTotalModels(filteredProducts, countingMode);
  const locationData = transformLocationData(products, filteredProducts, selectedLocation, countingMode);
  const totalLocations = locationData.reduce((sum, item) => sum + item.value, 0);
  const modalityData = transformModalityData(products, filteredProducts, selectedModality, countingMode);
  const totalModalities = modalityData.reduce((sum, item) => sum + item.value, 0);

  // Update structure data when task changes
  useEffect(() => {
    const newStructureData = transformStructureData(filteredProducts, selectedTask);
    setStructureData(newStructureData);
  }, [selectedTask, selectedLocation, selectedModality, filteredProducts]);

  // Update structure type data when task changes
  useEffect(() => {
    const newStructureTypeData = transformStructureTypeData(filteredProducts, selectedTask);
    setStructureTypeData(newStructureTypeData);
  }, [filteredProducts, selectedTask]);

  return {
    taskData,
    totalModels,
    locationData,
    totalLocations,
    modalityData,
    totalModalities,
    structureData,
    structureTypeData,
    filteredProducts
  };
};
