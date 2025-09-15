import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownNavItemProps {
  label: string;
  icon: LucideIcon;
  items: Array<{
    label: string;
    to: string;
    icon: LucideIcon;
  }>;
  className?: string;
}

const DropdownNavItem: React.FC<DropdownNavItemProps> = ({
  label,
  icon: Icon,
  items,
  className = "",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base ${className}`}>
          <Icon className="w-4 h-4 mr-1 lg:mr-2" />
          {label}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50"
        align="start"
        sideOffset={5}
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link 
              to={item.to}
              className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavItem;