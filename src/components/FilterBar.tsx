import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TASKS = ["Auto-Contouring", "Treatment Planning", "Dose Optimization", "Quality Assurance"];
const COMPANIES = ["RadTech Solutions", "MedTech Innovations", "AI Medical Systems", "HealthAI Solutions"];
const CERTIFICATIONS = ["CE", "FDA", "CE & FDA"];
const ANATOMICAL_LOCATIONS = ["Head & Neck", "Thorax", "Breast", "Prostate", "Abdomen", "Pelvis"];

const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 p-4 rounded-lg bg-[#00A6D6]/5">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#00A6D6]" />
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

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select certification" />
        </SelectTrigger>
        <SelectContent>
          {CERTIFICATIONS.map((cert) => (
            <SelectItem key={cert} value={cert.toLowerCase()}>
              {cert}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {ANATOMICAL_LOCATIONS.map((location) => (
            <SelectItem key={location} value={location.toLowerCase()}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
