
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryCount {
  name: string;
  count: number;
}

interface TaskTaxonomyProps {
  categories: CategoryCount[];
  onCategoryClick: (category: string) => void;
}

const TaskTaxonomy = ({ categories, onCategoryClick }: TaskTaxonomyProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-700 mb-3">Product categories:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-[#00A6D6]/10 border border-gray-200"
            onClick={() => onCategoryClick(category.name)}
          >
            {category.name}
            <Badge variant="secondary" className="ml-2 bg-gray-100">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskTaxonomy;
