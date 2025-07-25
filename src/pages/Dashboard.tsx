import React, { useState, Suspense, lazy } from 'react';
import dataService from "@/services/DataService";
import { getAllOptions } from "@/utils/filterOptions";
import { useToast } from "@/hooks/use-toast";
import { CHART_COLORS } from "@/utils/chartColors";
import { useChartData } from "@/hooks/useChartData";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from '@/components/SEO';
import Footer from "@/components/Footer";

// Import dashboard components
import TaskDistributionChart from "@/components/dashboard/TaskDistributionChart";
import LocationDistributionChart from "@/components/dashboard/LocationDistributionChart";
import ModalityDistributionChart from "@/components/dashboard/ModalityDistributionChart";
import CompanyDistributionChart from "@/components/dashboard/CompanyDistributionChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { CountingModeToggle } from "@/components/dashboard/CountingModeToggle";

// Lazily load the charts that are only shown conditionally
const StructuresChart = lazy(() => import("@/components/dashboard/StructuresChart"));
const StructureTypeDistributionChart = lazy(() => import("@/components/dashboard/StructureTypeDistributionChart"));

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedModality, setSelectedModality] = useState<string>("all");
  const [countingMode, setCountingMode] = useState<'models' | 'products'>('models');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Get all data needed for charts
  const products = dataService.getAllProducts();
  const companies = dataService.getAllCompanies();
  const allTasks = getAllOptions('category');
  const allLocations = getAllOptions('anatomicalLocation');
  const allModalities = getAllOptions('modality');
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Radiotherapy DL Analytics Dashboard",
    "description": "Visualize data about deep learning products in radiotherapy, including distribution by task, location, modality, and manufacturer.",
    "url": "https://dlinrt.eu/dashboard",
    "creator": {
      "@type": "Person",
      "name": "Matteo Maspero"
    },
    "datePublished": "2025-04-29"
  };

  // Use custom hooks to process chart data
  const { 
    taskData, 
    totalModels, 
    locationData, 
    totalLocations, 
    modalityData, 
    totalModalities, 
    structureData,
    structureTypeData,
    filteredProducts 
  } = useChartData(products, selectedTask, selectedLocation, selectedModality, countingMode);

  // Get company data using the updated hook with filtered products
  const { companyData, totalCompanies } = useCompanyData(companies, filteredProducts, countingMode);

  // Handler functions
  const handleTaskBarClick = (data: any) => {
    const taskName = data.name;
    if (taskName === selectedTask) {
      // If clicking the same task again, reset filter
      setSelectedTask("all");
      toast({
        description: `Filter reset for tasks`,
      });
    } else {
      // Update selected task
      setSelectedTask(taskName);
      toast({
        description: `Now filtering by task: ${taskName}`,
      });
    }
  };

  const handleLocationSliceClick = (data: any) => {
    const locationName = data.name;
    if (locationName === selectedLocation) {
      // If clicking the same location again, reset filter
      setSelectedLocation("all");
      toast({
        description: `Filter reset for anatomical locations`,
      });
    } else {
      // Update selected location
      setSelectedLocation(locationName);
      toast({
        description: `Now filtering by location: ${locationName}`,
      });
    }
  };

  const handleModalityBarClick = (data: any) => {
    const modalityName = data.name;
    if (modalityName === selectedModality) {
      // If clicking the same modality again, reset filter
      setSelectedModality("all");
      toast({
        description: `Filter reset for modalities`,
      });
    } else {
      // Update selected modality
      setSelectedModality(modalityName);
      toast({
        description: `Now filtering by modality: ${modalityName}`,
      });
    }
  };

  const handleResetAllFilters = () => {
    setSelectedTask("all");
    setSelectedLocation("all");
    setSelectedModality("all");
    toast({
      description: "All filters reset",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-2 sm:px-4 md:px-8 py-4 md:py-8 mx-auto">
      <SEO
        title="AI Radiotherapy Analytics Dashboard - Product Distribution & Market Insights"
        description="Interactive analytics dashboard visualizing deep learning products in radiotherapy. Explore comprehensive data on product distribution by clinical task, geography, imaging modality, and manufacturer trends."
        canonical="https://dlinrt.eu/dashboard"
        structuredData={structuredData}
      />
      <DashboardHeader 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedModality={selectedModality}
        setSelectedModality={setSelectedModality}
        handleResetAllFilters={handleResetAllFilters}
        allTasks={allTasks}
        allLocations={allLocations}
        allModalities={allModalities}
      />
      
      <CountingModeToggle 
        countingMode={countingMode}
        onToggle={setCountingMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <TaskDistributionChart 
          taskData={taskData}
          totalModels={totalModels}
          countingMode={countingMode}
          onTaskClick={handleTaskBarClick}
          selectedTask={selectedTask}
          selectedLocation={selectedLocation}
          selectedModality={selectedModality}
        />

        <LocationDistributionChart 
          locationData={locationData}
          totalLocations={totalLocations}
          countingMode={countingMode}
          selectedLocation={selectedLocation}
          selectedTask={selectedTask}
          selectedModality={selectedModality}
          onLocationClick={handleLocationSliceClick}
          colors={CHART_COLORS}
        />

        <ModalityDistributionChart 
          modalityData={modalityData}
          totalModalities={totalModalities}
          countingMode={countingMode}
          selectedModality={selectedModality}
          selectedTask={selectedTask}
          selectedLocation={selectedLocation}
          onModalityClick={handleModalityBarClick}
        />

        <CompanyDistributionChart 
          companyData={companyData}
          totalCompanies={totalCompanies}
          countingMode={countingMode}
          selectedTask={selectedTask}
          selectedLocation={selectedLocation}
          selectedModality={selectedModality}
        />
        
        {/* Auto-Contouring Structures - Only shown when Auto-Contouring is selected */}
        {selectedTask === "Auto-Contouring" && (
          <>
            {/* Structure type distribution chart */}
            {structureTypeData.length > 0 && (
              <Suspense fallback={<div className="col-span-full min-h-[400px] flex items-center justify-center">Loading structure type data...</div>}>
                <StructureTypeDistributionChart structureTypeData={structureTypeData} />
              </Suspense>
            )}
            
            {/* Overall structure count chart */}
            {structureData.length > 0 && (
              <Suspense fallback={<div className="col-span-full min-h-[400px] flex items-center justify-center">Loading structures data...</div>}>
                <StructuresChart structureData={structureData} />
              </Suspense>
            )}
          </>
        )}
      </div>

      <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
