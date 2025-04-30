
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateRangeSelectorProps {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ dateRange, setDateRange }) => {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover open={startOpen} onOpenChange={setStartOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(dateRange.startDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateRange.startDate}
            onSelect={(date) => {
              if (date) {
                setDateRange({ ...dateRange, startDate: date });
                setStartOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span>to</span>
      <Popover open={endOpen} onOpenChange={setEndOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(dateRange.endDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateRange.endDate}
            onSelect={(date) => {
              if (date) {
                setDateRange({ ...dateRange, endDate: date });
                setEndOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeSelector;
