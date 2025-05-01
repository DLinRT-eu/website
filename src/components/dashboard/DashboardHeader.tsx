
import React from 'react';
import { LayoutDashboard, Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  selectedTask: string;
  setSelectedTask: (task: string) => void;
  handleResetFilter: () => void;
  allTasks: string[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedTask,
  setSelectedTask,
  handleResetFilter,
  allTasks
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'} mb-6`}>
      <div className="flex items-center gap-2">
        <LayoutDashboard className="h-6 w-6 text-[#00A6D6]" />
        <h1 className="text-xl md:text-2xl font-bold">Analytics Dashboard</h1>
      </div>
      <div className={`flex ${isMobile ? 'w-full' : ''} items-center gap-3`}>
        {selectedTask !== "all" && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetFilter}
            className="flex items-center gap-1 h-9"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </Button>
        )}
        <div className={`flex items-center gap-2 ${isMobile ? 'flex-1' : ''}`}>
          <Filter className="h-5 w-5 text-gray-500" />
          <Select 
            value={selectedTask} 
            onValueChange={setSelectedTask}
          >
            <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[180px]'}`}>
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
      </div>
    </div>
  );
};

export default DashboardHeader;
