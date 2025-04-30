
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Beaker, Brain, Cpu, FileImage, FlaskConical, LayoutGrid, Microscope, Waves, ZoomIn } from 'lucide-react';

interface CategoryCount {
  name: string;
  count: number;
}

interface TaskTaxonomyProps {
  categories: CategoryCount[];
  onCategoryClick: (category: string) => void;
}

// Map for category icons and descriptions
const categoryInfo: Record<string, { icon: React.ElementType, description: string, color: string }> = {
  "Auto-Contouring": { 
    icon: LayoutGrid, 
    description: "AI-driven automatic segmentation of organs at risk and target volumes", 
    color: "bg-blue-100" 
  },
  "Image Synthesis": { 
    icon: FileImage, 
    description: "Creation of synthetic images for treatment planning, enabling MR-only workflows", 
    color: "bg-green-100" 
  },
  "Image Enhancement": { 
    icon: ZoomIn, 
    description: "AI-powered improvement of image quality, reducing noise and artifacts", 
    color: "bg-yellow-100" 
  },
  "Reconstruction": { 
    icon: Waves, 
    description: "Advanced algorithms for reconstructing high-quality images from raw scanner data", 
    color: "bg-purple-100" 
  },
  "Treatment Planning": { 
    icon: Brain, 
    description: "AI-assisted creation and optimization of radiation treatment plans", 
    color: "bg-pink-100" 
  },
  "Clinical Prediction": { 
    icon: Cpu, 
    description: "Machine learning models that predict treatment outcomes and complications", 
    color: "bg-orange-100" 
  },
  "Registration": { 
    icon: Microscope, 
    description: "Automatic alignment of images from different modalities or timepoints", 
    color: "bg-indigo-100" 
  }
};

// Default icon for categories not in our map
const defaultCategoryInfo = {
  icon: Beaker,
  description: "AI technologies for radiotherapy applications",
  color: "bg-gray-100"
};

const TaskTaxonomy = ({ categories, onCategoryClick }: TaskTaxonomyProps) => {
  // Sort categories by count (descending)
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className="mb-10 p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h3 className="font-medium text-lg text-gray-800 mb-4">Radiotherapy AI Tasks by Workflow Stage</h3>
      
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-center gap-2 relative">
          {/* Workflow line connecting the tasks */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-[#00A6D6] to-blue-300 hidden md:block" />
          
          {sortedCategories.map((category) => {
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
          })}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        Click on a category to filter products
      </div>
    </div>
  );
};

export default TaskTaxonomy;
