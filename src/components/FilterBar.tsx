
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data - in a real app, this would come from your data source
const TASKS = ["Auto-Contouring", "Dose Optimization", "Quality Assurance", "Treatment Planning"];
const COMPANIES = ["RadTech Solutions", "AI Medical Systems", "HealthAI Solutions"];

const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select task" />
        </SelectTrigger>
        <SelectContent>
          {TASKS.map((task) => (
            <SelectItem key={task} value={task.toLowerCase()}>
              {task}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          {COMPANIES.map((company) => (
            <SelectItem key={company} value={company.toLowerCase()}>
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
