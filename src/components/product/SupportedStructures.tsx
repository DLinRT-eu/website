/** @jsxImportSource react */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportedStructuresProps {
  structures?: string[];
}

interface StructureTypes {
  hasOAR: boolean;
  hasGTV: boolean;
  hasElective: boolean;
}

interface StructureGroup {
  name: string;
  structures: StructureInfo[];
  types: StructureTypes;
  model?: string;
}

interface StructureInfo {
  name: string;
  supported: boolean;
}

const SupportedStructures: React.FC<SupportedStructuresProps> = ({ structures }) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Parse and categorize structures
  const groupedStructures: Record<string, StructureGroup> = {};
  let hasOARs = false;
  let hasGTV = false;
  let hasElective = false;
  const modelTypes: Record<string, StructureTypes> = {};
  let totalOARs = 0;
  let totalGTV = 0;
  let totalElective = 0;
  
  // Process and group structures
  structures.forEach(structure => {
    const parts = structure.split(":");
    if (parts.length > 1) {
      const region = parts[0].trim();
      const structureName = parts[1].trim();
      
      // Extract model name if present
      const modelMatch = region.match(/(.*?(?:-(?:CT|MR(?:I)?(?:\s+T[12])?))?$)/i);
      const model = modelMatch ? modelMatch[1].trim() : region;
      
      // Determine structure types with pattern matching
      const isGTV = /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structureName);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structureName);
      const isOAR = !isGTV && !isElective;
      
      // Update structure counts
      if (isGTV) {
        totalGTV++;
        hasGTV = true;
      }
      if (isElective) {
        totalElective++;
        hasElective = true;
      }
      if (isOAR) {
        totalOARs++;
        hasOARs = true;
      }
      
      // Track which types each model supports
      if (!modelTypes[model]) {
        modelTypes[model] = { hasOAR: false, hasGTV: false, hasElective: false };
      }
      if (isGTV) modelTypes[model].hasGTV = true;
      if (isElective) modelTypes[model].hasElective = true;
      if (isOAR) modelTypes[model].hasOAR = true;
      
      const isSupported = !structureName.includes("(unsupported)");
      const cleanName = structureName.replace("(unsupported)", "").trim();
      
      if (!groupedStructures[region]) {
        groupedStructures[region] = {
          name: region,
          structures: [],
          types: { hasOAR: false, hasGTV: false, hasElective: false },
          model
        };
      }
      
      groupedStructures[region].structures.push({
        name: cleanName,
        supported: isSupported
      });
      
      // Update group types
      if (isGTV) groupedStructures[region].types.hasGTV = true;
      if (isElective) groupedStructures[region].types.hasElective = true;
      if (isOAR) groupedStructures[region].types.hasOAR = true;
    }
  });

  // Sort groups
  const sortedGroups = Object.values(groupedStructures).sort((a, b) => {
    const aTypeCount = Number(a.types.hasOAR) + Number(a.types.hasGTV) + Number(a.types.hasElective);
    const bTypeCount = Number(b.types.hasOAR) + Number(b.types.hasGTV) + Number(b.types.hasElective);
    if (bTypeCount !== aTypeCount) return bTypeCount - aTypeCount;
    if (a.types.hasGTV !== b.types.hasGTV) return b.types.hasGTV ? 1 : -1;
    if (a.types.hasElective !== b.types.hasElective) return b.types.hasElective ? 1 : -1;
    return 0;
  });

  // Get the appropriate icons for a structure group based on its types
  const getStructureIcons = (types: StructureTypes) => {
    const icons = [];
    if (types.hasOAR) icons.push(<Shield key="oar" className="h-4 w-4 text-blue-600" aria-hidden="true" />);
    if (types.hasGTV) icons.push(<Target key="gtv" className="h-4 w-4 text-red-600" aria-hidden="true" />);
    if (types.hasElective) icons.push(<CircleDot key="elective" className="h-4 w-4 text-purple-600" aria-hidden="true" />);
    return icons;
  };

  // Get type labels for a structure group
  const getTypeLabels = (types: StructureTypes) => {
    const labels = [];
    if (types.hasOAR) labels.push("OARs");
    if (types.hasGTV) labels.push("GTV");
    if (types.hasElective) labels.push("Elective");
    return labels.join(" + ");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Structures</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary badges section */}
        <div className="flex flex-wrap gap-3 mb-6">
          {totalOARs > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">OARs</span>
              <span className="font-normal">({totalOARs})</span>
            </div>
          )}
          {totalGTV > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">GTV</span>
              <span className="font-normal">({totalGTV})</span>
            </div>
          )}
          {totalElective > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Elective</span>
              <span className="font-normal">({totalElective})</span>
            </div>
          )}
        </div>

        {/* Detailed structures grouped by region */}
        <div className="space-y-4">
          {sortedGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {getStructureIcons(group.types)}
                </div>
                {group.name}
                <span className="text-sm text-gray-500 font-normal">
                  ({getTypeLabels(group.types)})
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.structures.map((structure, index) => (
                  <div
                    key={index}
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                      structure.supported 
                        ? "bg-blue-50 text-blue-800 border-blue-200" 
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    )}
                  >
                    {structure.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Model capability badges section */}
        <div className="flex flex-wrap gap-3 border-t pt-4 mt-6">
          {hasOARs && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>OARs</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasOAR).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasGTV && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>GTV</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasGTV).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasElective && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span>Elective</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasElective).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
