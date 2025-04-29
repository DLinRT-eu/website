
import React, { ReactNode } from 'react';
import { Initiative } from '@/types/initiative';
import InitiativeCard from './InitiativeCard';
import { Database } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  initiatives: Initiative[];
  icon?: ReactNode;
}

const CategorySection = ({ title, initiatives, icon }: CategorySectionProps) => {
  if (initiatives.length === 0) return null;
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        {icon ? icon : <Database className="h-5 w-5 text-[#1A1F2C]" />}
        <h2 className="text-2xl font-bold text-[#1A1F2C] border-b pb-2">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} {...initiative} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

