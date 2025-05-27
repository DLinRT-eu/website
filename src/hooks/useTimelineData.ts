import { useMemo } from 'react';
import { ALL_PRODUCTS } from '@/data';
import { ProductDetails } from '@/types/productDetails';
import { hasRegulatoryApproval, normalizeAnatomicalLocations } from '@/utils/productFilters';

interface TimelineFilters {
  selectedTask: string;
  selectedLocation: string;
  selectedModality: string;
  timeGranularity: "monthly" | "quarterly" | "yearly";
}

interface TimelineDataPoint {
  period: string;
  date: Date;
  count: number;
  products: ProductDetails[];
  [key: string]: any; // For category-specific counts
}

/**
 * Helper function to check if a product matches a task/category
 */
const matchesTask = (product: ProductDetails, task: string): boolean => {
  if (product.category === task) return true;
  if (product.secondaryCategories?.includes(task)) return true;
  return false;
};

export const useTimelineData = (filters: TimelineFilters) => {
  const productsWithApproval = useMemo(
    () => ALL_PRODUCTS.filter(hasRegulatoryApproval),
    []
  );

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return productsWithApproval.filter((product) => {
      // Task filter
      if (filters.selectedTask !== "all" && !matchesTask(product, filters.selectedTask)) {
        return false;
      }

      // Location filter
      if (filters.selectedLocation !== "all") {
        const normalizedLocations = normalizeAnatomicalLocations(product.anatomicalLocation || []);
        if (!normalizedLocations.includes(filters.selectedLocation)) {
          return false;
        }
      }

      // Modality filter
      if (filters.selectedModality !== "all") {
        const productModalities = Array.isArray(product.modality) 
          ? product.modality 
          : (product.modality ? [product.modality] : []);
        if (!productModalities.includes(filters.selectedModality)) {
          return false;
        }
      }

      // Only include products with release dates
      return !!product.releaseDate;
    });
  }, [productsWithApproval, filters]);

  // Generate timeline data
  const timelineData = useMemo(() => {
    const dataMap = new Map<string, TimelineDataPoint>();
    const categories = [...new Set(productsWithApproval.map(p => p.category))];

    filteredProducts.forEach((product) => {
      if (!product.releaseDate) return;

      const releaseDate = new Date(product.releaseDate);
      let periodKey: string;

      switch (filters.timeGranularity) {
        case "monthly":
          periodKey = `${releaseDate.getFullYear()}-${String(releaseDate.getMonth() + 1).padStart(2, '0')}`;
          break;
        case "quarterly":
          const quarter = Math.floor(releaseDate.getMonth() / 3) + 1;
          periodKey = `${releaseDate.getFullYear()}-Q${quarter}`;
          break;
        case "yearly":
          periodKey = `${releaseDate.getFullYear()}`;
          break;
      }

      if (!dataMap.has(periodKey)) {
        const dataPoint: TimelineDataPoint = {
          period: periodKey,
          date: releaseDate,
          count: 0,
          products: []
        };
        
        // Initialize category counts
        categories.forEach(category => {
          dataPoint[category] = 0;
        });
        
        dataMap.set(periodKey, dataPoint);
      }

      const dataPoint = dataMap.get(periodKey)!;
      dataPoint.count++;
      dataPoint.products.push(product);
      dataPoint[product.category] = (dataPoint[product.category] || 0) + 1;
    });

    return Array.from(dataMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filteredProducts, filters.timeGranularity]);

  // Get all unique values for filters - include secondary categories in task options
  const allTasks = useMemo(() => {
    const taskSet = new Set<string>();
    productsWithApproval.forEach(product => {
      taskSet.add(product.category);
      if (product.secondaryCategories) {
        product.secondaryCategories.forEach(cat => taskSet.add(cat));
      }
    });
    return Array.from(taskSet).sort();
  }, [productsWithApproval]);

  // Get all unique values for filters
  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    productsWithApproval.forEach(product => {
      if (product.anatomicalLocation) {
        const normalized = normalizeAnatomicalLocations(product.anatomicalLocation);
        normalized.forEach(loc => locations.add(loc));
      }
    });
    return Array.from(locations).sort();
  }, [productsWithApproval]);

  const allModalities = useMemo(() => {
    const modalities = new Set<string>();
    productsWithApproval.forEach(product => {
      const productModalities = Array.isArray(product.modality) 
        ? product.modality 
        : (product.modality ? [product.modality] : []);
      productModalities.forEach(mod => modalities.add(mod));
    });
    return Array.from(modalities).sort();
  }, [productsWithApproval]);

  // Calculate stats - update to include secondary categories
  const stats = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const firstRelease = filteredProducts.reduce((earliest, product) => {
      if (!product.releaseDate) return earliest;
      const releaseDate = new Date(product.releaseDate);
      return !earliest || releaseDate < earliest ? releaseDate : earliest;
    }, null as Date | null);

    const lastRelease = filteredProducts.reduce((latest, product) => {
      if (!product.releaseDate) return latest;
      const releaseDate = new Date(product.releaseDate);
      return !latest || releaseDate > latest ? releaseDate : latest;
    }, null as Date | null);

    const categoryStats = filteredProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalProducts,
      firstRelease,
      lastRelease,
      categoryStats,
      timeSpan: firstRelease && lastRelease 
        ? lastRelease.getFullYear() - firstRelease.getFullYear() + 1 
        : 0
    };
  }, [filteredProducts]);

  return {
    timelineData,
    filteredProducts,
    allTasks,
    allLocations,
    allModalities,
    stats
  };
};
