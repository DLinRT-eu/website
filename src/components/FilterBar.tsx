
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TASKS = [
  "Auto-Contouring",
  "Image Synthesis",
  "Image Registration",
  "Treatment Planning",
  "Quality Assurance",
  "Clinical Prediction"
];
const COMPANIES = ["RadTech Solutions", "MedTech Innovations", "AI Medical Systems", "HealthAI Solutions"];
const CERTIFICATIONS = ["CE", "FDA", "CE & FDA"];
const ANATOMICAL_LOCATIONS = ["Head & Neck", "Thorax", "Breast", "Prostate", "Abdomen", "Pelvis"];

const FilterBar = () => {
  const [selectedTask, setSelectedTask] = React.useState<string>("");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("");
  const [selectedCompany, setSelectedCompany] = React.useState<string>("");
  const [selectedCertification, setSelectedCertification] = React.useState<string>("");

  // Filter available options based on current selections
  const getFilteredOptions = (field: 'task' | 'location' | 'company' | 'certification') => {
    const products = SAMPLE_PRODUCTS.filter(product => {
      if (selectedTask && product.category !== selectedTask) return false;
      if (selectedLocation && !product.anatomicalLocation?.includes(selectedLocation)) return false;
      if (selectedCompany && product.company !== selectedCompany) return false;
      if (selectedCertification && product.certification !== selectedCertification) return false;
      return true;
    });

    switch (field) {
      case 'task':
        return [...new Set(products.map(p => p.category))];
      case 'location':
        return [...new Set(products.flatMap(p => p.anatomicalLocation || []))];
      case 'company':
        return [...new Set(products.map(p => p.company))];
      case 'certification':
        return [...new Set(products.map(p => p.certification || ''))];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 p-4 rounded-lg bg-[#00A6D6]/5">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#00A6D6]" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <Select value={selectedTask} onValueChange={setSelectedTask}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select task" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('task').map((task) => (
            <SelectItem key={task} value={task}>
              {task}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('location').map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCompany} onValueChange={setSelectedCompany}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('company').map((company) => (
            <SelectItem key={company} value={company}>
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCertification} onValueChange={setSelectedCertification}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select certification" />
        </SelectTrigger>
        <SelectContent>
          {getFilteredOptions('certification').map((cert) => (
            <SelectItem key={cert} value={cert}>
              {cert}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
