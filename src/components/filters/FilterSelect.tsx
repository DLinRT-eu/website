
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterSelectProps {
  placeholder: string;
  options: string[];
  selectedValues: string[];
  onValueChange: (value: string) => void;
}

export const FilterSelect = ({
  placeholder,
  options,
  selectedValues,
  onValueChange,
}: FilterSelectProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  // Format the display text to show selections or placeholder
  const displayText = selectedValues.length > 0
    ? selectedValues.length > 1
      ? `${selectedValues[0]} +${selectedValues.length - 1}`
      : selectedValues[0]
    : placeholder;

  const handleOptionClick = (option: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onValueChange(option);
  };

  return (
    <div className="relative w-full">
      <Select 
        open={isOpen} 
        onOpenChange={setIsOpen}
      >
        <SelectTrigger 
          className={`w-full md:w-full cursor-pointer ${selectedValues.length > 0 ? "text-black font-medium" : "text-gray-500"}`}
          aria-label={placeholder}
        >
          <SelectValue placeholder={displayText} />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border border-gray-200 shadow-lg w-[220px] z-[500] max-h-[300px] overflow-y-auto"
          align="start"
          position="popper"
          sideOffset={8}
        >
          {options.length === 0 ? (
            <div className="text-sm py-2 px-2 text-gray-500">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <div
                  key={option}
                  className={`
                    flex items-center space-x-2 px-2 py-2 cursor-pointer rounded-sm text-sm
                    ${isSelected ? "bg-[#00A6D6]/10" : ""}
                    hover:bg-gray-100 transition-colors
                  `}
                  onClick={(e) => handleOptionClick(option, e)}
                >
                  <Checkbox 
                    checked={isSelected}
                    className={`h-4 w-4 cursor-pointer ${isSelected ? "bg-[#00A6D6] border-[#00A6D6]" : "border-gray-300"}`}
                    onCheckedChange={() => handleOptionClick(option)}
                    onClick={(e) => e.stopPropagation()}
                    id={`checkbox-${option}`}
                  />
                  <label 
                    htmlFor={`checkbox-${option}`}
                    className="flex-1 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(option, e);
                    }}
                  >
                    {option}
                  </label>
                  {isSelected && <Check className="h-4 w-4 text-[#00A6D6]" />}
                </div>
              );
            })
          )}
          
          {selectedValues.length > 0 && (
            <div 
              className="flex justify-center mt-2 pt-2 border-t border-gray-200"
            >
              <button
                type="button"
                className="text-xs text-gray-500 hover:text-[#00A6D6] py-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectedValues.forEach(value => onValueChange(value));
                }}
              >
                Clear selection
              </button>
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
