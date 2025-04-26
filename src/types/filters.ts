
export interface FilterState {
  tasks: string[];
  locations: string[];
  companies: string[];
  certifications: string[];
  modalities: string[];
}

export interface FilterBarProps {
  onFiltersChange?: (active: boolean) => void;
  onFilterUpdate?: (filters: FilterState) => void;
}
