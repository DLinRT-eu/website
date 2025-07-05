
import React, { useState, useMemo } from 'react';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import TimelineChart from '@/components/timeline/TimelineChart';
import TimelineFilters from '@/components/timeline/TimelineFilters';
import TimelineStats from '@/components/timeline/TimelineStats';
import { useTimelineData } from '@/hooks/useTimelineData';

const Timeline = () => {
  const [selectedTask, setSelectedTask] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedModality, setSelectedModality] = useState("all");
  const [timeGranularity, setTimeGranularity] = useState<"monthly" | "quarterly" | "yearly">("quarterly");

  const {
    timelineData,
    filteredProducts,
    allTasks,
    allLocations,
    allModalities,
    stats
  } = useTimelineData({
    selectedTask,
    selectedLocation,
    selectedModality,
    timeGranularity
  });

  const handleResetFilters = () => {
    setSelectedTask("all");
    setSelectedLocation("all");
    setSelectedModality("all");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Product Release Timeline",
    "description": "Interactive timeline showing the release history of AI radiotherapy products",
    "url": "https://dlinrt.eu/timeline"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="AI Radiotherapy Product Timeline - Release History & Market Evolution"
        description="Interactive timeline visualization showing the chronological release history and market evolution of deep learning products in radiotherapy. Track AI innovation trends in radiation oncology."
        canonical="https://dlinrt.eu/timeline"
        structuredData={structuredData}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-8 w-8 text-[#00A6D6]" />
            <h1 className="text-3xl font-bold text-gray-900">Product Release Timeline</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Explore the evolution of AI in radiotherapy through an interactive timeline of product releases.
          </p>
        </div>

        {/* Filters */}
        <TimelineFilters
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedModality={selectedModality}
          setSelectedModality={setSelectedModality}
          timeGranularity={timeGranularity}
          setTimeGranularity={setTimeGranularity}
          onResetFilters={handleResetFilters}
          allTasks={allTasks}
          allLocations={allLocations}
          allModalities={allModalities}
        />

        {/* Stats */}
        <TimelineStats stats={stats} />

        {/* Timeline Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-[#00A6D6]" />
            <h2 className="text-xl font-semibold">Release Timeline</h2>
          </div>
          <TimelineChart 
            data={timelineData} 
            granularity={timeGranularity}
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
