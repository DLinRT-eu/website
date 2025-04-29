
import React from 'react';
import { Initiative } from '@/types/initiative';
import InitiativeCard from './InitiativeCard';

interface CategorySectionProps {
  title: string;
  initiatives: Initiative[];
}

const CategorySection = ({ title, initiatives }: CategorySectionProps) => {
  if (initiatives.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#1A1F2C] border-b pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} {...initiative} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
