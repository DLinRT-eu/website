
import React from 'react';
import { LayoutDashboard, Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  selectedTask: string;
  setSelectedTask: (task: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedModality: string;
  setSelectedModality: (modality: string) => void;
  handleResetAllFilters: () => void;
  allTasks: string[];
  allLocations: string[];
  allModalities: string[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedTask,
  setSelectedTask,
  selectedLocation,
  setSelectedLocation,
  selectedModality,
  setSelectedModality,
  handleResetAllFilters,
  allTasks,
  allLocations,
  allModalities
}) => {
  const isMobile = useIsMobile();
  
  // Check if any filter is active
  const hasActiveFilters = selectedTask !== "all" || 
                          selectedLocation !== "all" || 
                          selectedModality !== "all";

  return (
    <div className="mb-6">
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'} mb-4`}>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-[#00A6D6]" />
          <h1 className="text-xl md:text-2xl font-bold">Analytics Dashboard</h1>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetAllFilters}
            className="flex items-center gap-1 h-9"
          >
            <RefreshCcw className="h-4 w-4" /> Reset All Filters
          </Button>
        )}
      </div>
      
      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTask !== "all" && (
            <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
              Task: {selectedTask}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTask("all")} 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
              >
                <span className="text-xs">×</span>
              </Button>
            </Badge>
          )}
          
          {selectedLocation !== "all" && (
            <Badge variant="outline" className="bg-green-50 flex items-center gap-1">
              Location: {selectedLocation}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedLocation("all")} 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
              >
                <span className="text-xs">×</span>
              </Button>
            </Badge>
          )}
          
          {selectedModality !== "all" && (
            <Badge variant="outline" className="bg-purple-50 flex items-center gap-1">
              Modality: {selectedModality}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedModality("all")} 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
              >
                <span className="text-xs">×</span>
              </Button>
            </Badge>
          )}
        </div>
      )}
      
      {/* Filter dropdowns */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
        {/* Task filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select 
            value={selectedTask} 
            onValueChange={setSelectedTask}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by task" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              {allTasks.map(task => (
                <SelectItem key={task} value={task}>{task}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Location filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select 
            value={selectedLocation} 
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {allLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Modality filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select 
            value={selectedModality} 
            onValueChange={setSelectedModality}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by modality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modalities</SelectItem>
              {allModalities.map(modality => (
                <SelectItem key={modality} value={modality}>{modality}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
