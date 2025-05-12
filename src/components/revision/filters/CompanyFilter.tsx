
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface CompanyFilterProps {
  companies: string[];
  selectedCompany: string | null;
  onCompanyFilter: (company: string | null) => void;
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({ 
  companies, 
  selectedCompany, 
  onCompanyFilter 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Company</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onCompanyFilter(null)}
          className={selectedCompany === null ? "bg-accent" : ""}
        >
          All Companies
        </DropdownMenuItem>
        {companies.map((company) => (
          <DropdownMenuItem 
            key={company} 
            onClick={() => onCompanyFilter(company)}
            className={selectedCompany === company ? "bg-accent" : ""}
          >
            {company}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyFilter;
