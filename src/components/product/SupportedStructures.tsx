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

const SupportedStructures = ({ structures }: SupportedStructuresProps) => {
  if (!structures || structures.length === 0) {
    return null;
  }

  // Parse and categorize structures
  const groupedStructures: Record<string, StructureGroup> = {};
  let hasOARs = false;
  let hasGTV = false;
  let hasElective = false;
  const modelTypes: Record<string, StructureTypes> = {};
  
  structures.forEach(structure => {
    const parts = structure.split(":");
    if (parts.length > 1) {
      const region = parts[0].trim();
      const structureName = parts[1].trim();
      
      // Extract model name if present (e.g., "Head & Neck-CT", "Pelvis-MRI T2")
      const modelMatch = region.match(/(.*?(?:-(?:CT|MR(?:I)?(?:\s+T[12])?))?$)/i);
      const model = modelMatch ? modelMatch[1].trim() : region;
      
      // Determine structure types with improved pattern matching
      const isGTV = /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structureName);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structureName);
      const isOAR = !isGTV && !isElective;
      
      // Update global flags
      if (isGTV) hasGTV = true;
      if (isElective) hasElective = true;
      if (isOAR) hasOARs = true;
      
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
    } else {
      // Handle ungrouped structures with the same multi-type support
      if (!groupedStructures["Other"]) {
        groupedStructures["Other"] = {
          name: "Other",
          structures: [],
          types: { hasOAR: false, hasGTV: false, hasElective: false }
        };
      }
      
      const isGTV = /\bGTV\b|Gross\s+Tumor|Gross\s+Target/i.test(structure);
      const isElective = /CTV|PTV|Clinical\s+Target|Planning\s+Target|Elective|LN[_\s]|Lymph\s*[Nn]ode|Nodal|ESTRO_LN|Ax_|\bIMN\b/i.test(structure);
      const isOAR = !isGTV && !isElective;
      
      // Update global flags
      if (isGTV) hasGTV = true;
      if (isElective) hasElective = true;
      if (isOAR) hasOARs = true;
      
      // Update model types for "Other" category
      if (!modelTypes["Other"]) {
        modelTypes["Other"] = { hasOAR: false, hasGTV: false, hasElective: false };
      }
      if (isGTV) modelTypes["Other"].hasGTV = true;
      if (isElective) modelTypes["Other"].hasElective = true;
      if (isOAR) modelTypes["Other"].hasOAR = true;
      
      const isSupported = !structure.includes("(unsupported)");
      const cleanName = structure.replace("(unsupported)", "").trim();
      
      groupedStructures["Other"].structures.push({
        name: cleanName,
        supported: isSupported
      });
      
      // Update group types
      if (isGTV) groupedStructures["Other"].types.hasGTV = true;
      if (isElective) groupedStructures["Other"].types.hasElective = true;
      if (isOAR) groupedStructures["Other"].types.hasOAR = true;
    }
  });

  // Sort groups: put groups with multiple types first, then by type presence
  const sortedGroups = Object.values(groupedStructures).sort((a, b) => {
    const aTypeCount = Number(a.types.hasOAR) + Number(a.types.hasGTV) + Number(a.types.hasElective);
    const bTypeCount = Number(b.types.hasOAR) + Number(b.types.hasGTV) + Number(b.types.hasElective);
    
    if (bTypeCount !== aTypeCount) return bTypeCount - aTypeCount;
    if (a.types.hasGTV !== b.types.hasGTV) return b.types.hasGTV ? 1 : -1;
    if (a.types.hasElective !== b.types.hasElective) return b.types.hasElective ? 1 : -1;
    return 0;
  });

  // Function to render a capability badge with model information
  const renderCapabilityBadge = (type: "OAR" | "GTV" | "Elective", models: string[]) => {
    const icon = type === "OAR" ? 
      <Shield className="h-4 w-4 text-blue-600" /> :
      type === "GTV" ? 
        <Target className="h-4 w-4 text-red-600" /> :
        <CircleDot className="h-4 w-4 text-purple-600" />;
    
    return (
      <Badge 
        variant="outline"
        className="flex items-center gap-1.5 px-3 py-1 text-sm bg-white"
      >
        {icon}
        {type === "OAR" ? "OARs" : type}
        <span className="text-gray-500 font-normal"> ({models.join(", ")})</span>
      </Badge>
    );
  };

  // Get the appropriate icons for a structure group based on its types
  const getStructureIcons = (types: StructureTypes) => {
    const icons = [];
    if (types.hasOAR) icons.push(<Shield key="oar" className="h-4 w-4 text-blue-600" />);
    if (types.hasGTV) icons.push(<Target key="gtv" className="h-4 w-4 text-red-600" />);
    if (types.hasElective) icons.push(<CircleDot key="elective" className="h-4 w-4 text-purple-600" />);
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
                  <Badge 
                    key={index} 
                    variant={structure.supported ? "outline" : "secondary"}
                    className={`${structure.supported ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-600"}`}
                  >
                    {structure.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Capability badges section */}
        <div className="flex flex-wrap gap-3 border-t pt-4">
          {/* Show OARs badge if any model has OARs */}
          {hasOARs && renderCapabilityBadge("OAR", 
            Object.entries(modelTypes)
              .filter(([_, types]) => types.hasOAR)
              .map(([model]) => model)
          )}
          
          {/* Show GTV badge if any model has GTV */}
          {hasGTV && renderCapabilityBadge("GTV",
            Object.entries(modelTypes)
              .filter(([_, types]) => types.hasGTV)
              .map(([model]) => model)
          )}
          
          {/* Show Elective badge if any model has Elective */}
          {hasElective && renderCapabilityBadge("Elective",
            Object.entries(modelTypes)
              .filter(([_, types]) => types.hasElective)
              .map(([model]) => model)
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
