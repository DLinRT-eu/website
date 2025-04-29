
import React, { useState } from 'react';
import dataService from "@/services/DataService";
import { getAllOptions } from "@/utils/filterOptions";
import { useToast } from "@/hooks/use-toast";
import { CHART_COLORS } from "@/utils/chartColors";
import { useChartData } from "@/hooks/useChartData";
import { useCompanyData } from "@/hooks/useCompanyData";
import SEO from '@/components/SEO';

// Import dashboard components
import TaskDistributionChart from "@/components/dashboard/TaskDistributionChart";
import LocationDistributionChart from "@/components/dashboard/LocationDistributionChart";
import ModalityDistributionChart from "@/components/dashboard/ModalityDistributionChart";
import CompanyDistributionChart from "@/components/dashboard/CompanyDistributionChart";
import StructuresChart from "@/components/dashboard/StructuresChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState<string>("all");
  const [clickedTask, setClickedTask] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get all data needed for charts
  const products = dataService.getAllProducts();
  const companies = dataService.getAllCompanies();
  const allTasks = getAllOptions('category');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Radiotherapy AI Analytics Dashboard",
    "description": "Visualize data about AI products in radiotherapy, including distribution by task, location, modality, and manufacturer.",
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
    totalProducts, 
    locationData, 
    totalLocations, 
    modalityData, 
    totalModalities, 
    structureData,
    filteredProducts 
  } = useChartData(products, selectedTask, clickedTask);

  const { companyData, totalCompanies } = useCompanyData(companies, filteredProducts);

  // Handle task bar click
  const handleTaskBarClick = (data: any) => {
    const taskName = data.name;
    if (taskName === clickedTask) {
      // If clicking the same task again, reset filter
      setSelectedTask("all");
      setClickedTask(null);
      toast({
        description: "Filter reset to show all products",
      });
    } else {
      // Update selected task
      setSelectedTask(taskName);
      setClickedTask(taskName);
      toast({
        description: `Now showing only ${taskName} products`,
      });
    }
  };

  // Handle reset filter button click
  const handleResetFilter = () => {
    setSelectedTask("all");
    setClickedTask(null);
    toast({
      description: "Filter reset to show all products",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <SEO
        title="Analytics Dashboard"
        description="Interactive data visualization dashboard for AI products in radiotherapy. Explore product distribution by task, geography, imaging modality, and company."
        canonical="https://dlinrt.eu/dashboard"
        structuredData={structuredData}
      />
      <DashboardHeader 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        handleResetFilter={handleResetFilter}
        allTasks={allTasks}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskDistributionChart 
          taskData={taskData}
          totalProducts={totalProducts}
          onTaskClick={handleTaskBarClick}
        />

        <LocationDistributionChart 
          locationData={locationData}
          totalLocations={totalLocations}
          selectedTask={selectedTask}
          colors={CHART_COLORS}
        />

        <ModalityDistributionChart 
          modalityData={modalityData}
          totalModalities={totalModalities}
          selectedTask={selectedTask}
        />

        <CompanyDistributionChart 
          companyData={companyData}
          totalCompanies={totalCompanies}
          selectedTask={selectedTask}
        />
        
        {/* Auto-Contouring Structures - Only shown when Auto-Contouring is selected */}
        {selectedTask === "Auto-Contouring" && structureData.length > 0 && (
          <StructuresChart structureData={structureData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
