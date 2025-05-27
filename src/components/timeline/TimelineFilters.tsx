
import React from 'react';
import { Filter, RefreshCcw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimelineFiltersProps {
  selectedTask: string;
  setSelectedTask: (task: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedModality: string;
  setSelectedModality: (modality: string) => void;
  timeGranularity: "monthly" | "quarterly" | "yearly";
  setTimeGranularity: (granularity: "monthly" | "quarterly" | "yearly") => void;
  onResetFilters: () => void;
  allTasks: string[];
  allLocations: string[];
  allModalities: string[];
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  selectedTask,
  setSelectedTask,
  selectedLocation,
  setSelectedLocation,
  selectedModality,
  setSelectedModality,
  timeGranularity,
  setTimeGranularity,
  onResetFilters,
  allTasks,
  allLocations,
  allModalities
}) => {
  const isMobile = useIsMobile();
  
  const hasActiveFilters = selectedTask !== "all" || 
                          selectedLocation !== "all" || 
                          selectedModality !== "all";

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      {/* Header */}
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'} mb-4`}>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#00A6D6]" />
          <h2 className="text-lg font-semibold">Filters & Timeline Controls</h2>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetFilters}
            className="flex items-center gap-1"
          >
            <RefreshCcw className="h-4 w-4" /> Reset Filters
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTask !== "all" && (
            <Badge variant="outline" className="bg-blue-50">
              Task: {selectedTask}
            </Badge>
          )}
          {selectedLocation !== "all" && (
            <Badge variant="outline" className="bg-green-50">
              Location: {selectedLocation}
            </Badge>
          )}
          {selectedModality !== "all" && (
            <Badge variant="outline" className="bg-purple-50">
              Modality: {selectedModality}
            </Badge>
          )}
        </div>
      )}

      {/* Filter Controls */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {/* Task Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task/Category</label>
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger>
              <SelectValue placeholder="All Tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              {allTasks.map(task => (
                <SelectItem key={task} value={task}>{task}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Anatomy</label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {allLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Modality Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modality</label>
          <Select value={selectedModality} onValueChange={setSelectedModality}>
            <SelectTrigger>
              <SelectValue placeholder="All Modalities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modalities</SelectItem>
              {allModalities.map(modality => (
                <SelectItem key={modality} value={modality}>{modality}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Granularity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline h-4 w-4 mr-1" />
            Time Period
          </label>
          <Select value={timeGranularity} onValueChange={setTimeGranularity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimelineFilters;
