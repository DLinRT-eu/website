import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, CircleDot } from "lucide-react";

interface SupportedStructuresProps {
  structures?: string[];
}

interface StructureTypes {
  hasOAR: boolean;
  hasGTV: boolean;
  hasElective: boolean;
}

const SupportedStructures: React.FC<SupportedStructuresProps> = ({ structures }) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Parse and track structure types
  let totalOARs = 0;
  let totalGTV = 0;
  let totalElective = 0;
  
  structures.forEach(structure => {
    const structureName = structure.includes(":") ? structure.split(":")[1].trim() : structure;
    
    const isGTV = /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structureName);
    const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structureName);
    const isOAR = !isGTV && !isElective;

    if (isGTV) totalGTV++;
    if (isElective) totalElective++;
    if (isOAR) totalOARs++;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Structures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {totalOARs > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 px-3 py-1.5 bg-blue-50 text-blue-700">
              <Shield className="h-4 w-4" />
              <span className="font-medium">OARs</span>
              <span className="font-normal">({totalOARs})</span>
            </div>
          )}
          {totalGTV > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 bg-red-50 text-red-700">
              <Target className="h-4 w-4" />
              <span className="font-medium">GTV</span>
              <span className="font-normal">({totalGTV})</span>
            </div>
          )}
          {totalElective > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 px-3 py-1.5 bg-purple-50 text-purple-700">
              <CircleDot className="h-4 w-4" />
              <span className="font-medium">Elective</span>
              <span className="font-normal">({totalElective})</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
