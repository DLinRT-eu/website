
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <Select
      value={selectedValues.join(',')}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem 
            key={option} 
            value={option}
            className={selectedValues.includes(option) ? "bg-[#00A6D6]/10" : ""}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
