
export interface FilterState {
  tasks: string[];
  locations: string[];
  certifications: string[];
  modalities: string[];
}

export interface InitiativeFilterState {
  categories: string[];
  status: string[];
  tags: string[];
}

export interface FilterBarProps {
  onFiltersChange?: (active: boolean) => void;
  onFilterUpdate?: (filters: FilterState) => void;
}

export interface InitiativeFilterBarProps {
  onFiltersChange?: (active: boolean) => void;
  onFilterUpdate?: (filters: InitiativeFilterState) => void;
}
