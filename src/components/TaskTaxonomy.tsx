
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, FileImage, LayoutGrid, Microscope, Monitor, Waves, ZoomIn } from 'lucide-react';

interface CategoryCount {
  name: string;
  count: number;
}

interface TaskTaxonomyProps {
  categories: CategoryCount[];
  onCategoryClick: (category: string) => void;
  filterType?: 'task' | 'modality' | 'anatomy' | 'certification';
}

// Map for category icons and descriptions
const categoryInfo: Record<string, { icon: React.ElementType, description: string, color: string }> = {
  "Reconstruction": { 
    icon: Waves, 
    description: "Advanced algorithms for reconstructing high-quality images from raw scanner data", 
    color: "bg-purple-100" 
  },
  "Image Enhancement": { 
    icon: ZoomIn, 
    description: "DL-powered improvement of image quality, reducing noise and artifacts", 
    color: "bg-yellow-100" 
  },
  "Image Synthesis": { 
    icon: FileImage, 
    description: "Creation of synthetic images for treatment planning, enabling MR-only workflows", 
    color: "bg-green-100" 
  },
  "Auto-Contouring": { 
    icon: LayoutGrid, 
    description: "Deep learning-driven automatic segmentation of organs at risk and target volumes", 
    color: "bg-blue-100" 
  },
  "Treatment Planning": { 
    icon: Brain, 
    description: "DL-assisted creation and optimization of radiation treatment plans", 
    color: "bg-pink-100" 
  },
  "Clinical Prediction": { 
    icon: Microscope, 
    description: "Machine learning models that predict treatment outcomes and complications", 
    color: "bg-orange-100" 
  },
  "Registration": { 
    icon: Microscope, 
    description: "Automatic alignment of images from different modalities or timepoints", 
    color: "bg-indigo-100" 
  },
  "Performance Monitor": { 
    icon: Monitor, 
    description: "Tools for quality assurance and performance monitoring in radiotherapy", 
    color: "bg-gray-100" 
  },
  "Model Training": { 
    icon: Brain, 
    description: "Models trainable by the user", 
    color: "bg-cyan-100" 
  }
};

// Default icon for categories not in our map
const defaultCategoryInfo = {
  icon: Brain,
  description: "Technologies for radiotherapy applications",
  color: "bg-gray-100"
};

const TaskTaxonomy = ({ categories, onCategoryClick, filterType = 'task' }: TaskTaxonomyProps) => {
  // Sort categories based on specified order
  const categoryOrder = [
    "Reconstruction",
    "Image Enhancement",
    "Image Synthesis",
    "Auto-Contouring",
    "Treatment Planning",
    "Clinical Prediction",
    "Registration",
    "Performance Monitor"
  ];
  
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.name);
    const indexB = categoryOrder.indexOf(b.name);
    
    // If both are in the order list, sort by that order
    if (indexA >= 0 && indexB >= 0) {
      return indexA - indexB;
    }
    
    // If only one is in the list, prioritize it
    if (indexA >= 0) return -1;
    if (indexB >= 0) return 1;
    
    // Otherwise sort alphabetically
    return a.name.localeCompare(b.name);
  });

  // Generate the component title based on filter type
  const getTaxonomyTitle = () => {
    switch(filterType) {
      case 'modality': return 'Imaging Modalities';
      case 'anatomy': return 'Anatomical Locations';
      case 'certification': return 'Regulatory Approvals';
      case 'task':
      default: return 'Tasks Across the Patient Workflow';
    }
  };

  // Split categories into two rows for better layout and visibility
  const midpoint = Math.ceil(sortedCategories.length / 2);
  const firstRowCategories = sortedCategories.slice(0, midpoint);
  const secondRowCategories = sortedCategories.slice(midpoint);

  // Function to render a category card
  const renderCategoryCard = (category: CategoryCount) => {
    const { icon: Icon, description, color } = categoryInfo[category.name] || defaultCategoryInfo;
    
    return (
      <div 
        key={category.name}
        className="flex flex-col items-center max-w-[160px] z-10"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => onCategoryClick(category.name)}
          className={`flex flex-col h-auto p-4 ${color} hover:bg-[#00A6D6]/10 border border-gray-200 rounded-lg w-full transition-all duration-200 hover:shadow-md`}
        >
          <Icon className="h-8 w-8 mb-2 text-[#00A6D6]" />
          <span className="text-sm font-medium">{category.name}</span>
          <Badge variant="secondary" className="mt-1 bg-white">
            {category.count}
          </Badge>
        </Button>
        <p className="text-xs text-gray-600 mt-2 text-center px-1">
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className="mb-10 p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h3 className="font-medium text-lg text-gray-800 mb-4">{getTaxonomyTitle()}</h3>
      
      {/* First row of categories */}
      <div className="mb-10">
        <div className="flex flex-wrap items-start justify-center gap-4 relative">
          {filterType === 'task' && (
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-[#00A6D6] to-blue-300 hidden md:block" />
          )}
          
          {firstRowCategories.map(renderCategoryCard)}
        </div>
      </div>

      {/* Second row of categories */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-center gap-4 relative">
          {filterType === 'task' && (
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-[#00A6D6] to-blue-300 hidden md:block" />
          )}
          
          {secondRowCategories.map(renderCategoryCard)}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        Click on a category to explore products
      </div>
    </div>
  );
};

export default TaskTaxonomy;
